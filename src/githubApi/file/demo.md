**关键词**：前端单测，如何排除三方依赖

在单元测试里，当存在三方依赖时，为保证测试的独立性与稳定性，你可以采用模拟（Mock）或桩（Stub）的方式排除这些三方依赖。下面结合不同的测试框架和场景，介绍具体的实现方法。

### 使用 Jest 进行模拟

Jest 是一个功能强大的 JavaScript 测试框架，它内置了模拟功能，可方便地模拟三方依赖。

#### 模拟模块

若三方依赖以模块形式引入，可使用 `jest.mock` 方法模拟该模块。

**示例代码**：

```javascript
// api.js （三方依赖模块）
export const fetchData = async () => {
  const response = await fetch("https://example.com/api/data");
  return response.json();
};

// myModule.js （使用三方依赖的模块）
import { fetchData } from "./api";

export const processData = async () => {
  const data = await fetchData();
  return data.length;
};

// myModule.test.js （测试文件）
import { processData } from "./myModule";
jest.mock("./api");
import { fetchData } from "./api";

describe("processData", () => {
  test("should return the length of the data", async () => {
    const mockData = ["item1", "item2", "item3"];
    fetchData.mockResolvedValue(mockData);

    const result = await processData();
    expect(result).toBe(mockData.length);
  });
});
```

在上述示例中，`jest.mock('./api')` 模拟了 `api.js` 模块，`fetchData.mockResolvedValue(mockData)` 指定了 `fetchData` 函数的返回值。

#### 模拟全局对象或函数

若三方依赖是全局对象或函数，可使用 `jest.spyOn` 或直接覆盖该对象或函数。

**示例代码**：

```javascript
// myFunction.js
export const myFunction = () => {
  return Math.random();
};

// myFunction.test.js
import { myFunction } from "./myFunction";

describe("myFunction", () => {
  test("should return a mocked value", () => {
    const originalMathRandom = Math.random;
    Math.random = () => 0.5;

    const result = myFunction();
    expect(result).toBe(0.5);

    Math.random = originalMathRandom;
  });
});
```

此例中，通过覆盖 `Math.random` 函数来模拟其返回值，测试结束后恢复原始函数。

### 使用 Sinon 进行模拟

Sinon 是一个流行的 JavaScript 测试工具，可创建间谍（spy）、存根（stub）和模拟（mock）对象。

#### 安装 Sinon

```bash
npm install --save-dev sinon
```

#### 使用 Sinon 存根函数

```javascript
// api.js
export const fetchData = async () => {
  const response = await fetch("https://example.com/api/data");
  return response.json();
};

// myModule.js
import { fetchData } from "./api";

export const processData = async () => {
  const data = await fetchData();
  return data.length;
};

// myModule.test.js
import sinon from "sinon";
import { processData } from "./myModule";
import { fetchData } from "./api";

describe("processData", () => {
  let stub;
  beforeEach(() => {
    stub = sinon.stub();
    stub.resolves(["item1", "item2", "item3"]);
    sinon.replace(fetchData, "fetchData", stub);
  });

  afterEach(() => {
    sinon.restore();
  });

  test("should return the length of the data", async () => {
    const result = await processData();
    expect(result).toBe(3);
  });
});
```

在这个示例中，使用 `sinon.stub` 创建一个存根函数，使用 `sinon.replace` 替换 `fetchData` 函数，测试结束后使用 `sinon.restore` 恢复原始函数。

通过以上方法，你可以在单元测试中排除三方依赖，确保测试的独立性和稳定性。
