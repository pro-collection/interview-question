**关键词**：前端单测，如何排除样式文件、图片

在进行前端单元测试时，样式文件（如 CSS、SCSS 等）和图片等资源文件通常不会影响代码的逻辑功能，为了让测试更加专注于代码逻辑，避免不必要的依赖和错误，需要排除这些资源文件。下面分别介绍使用不同测试框架（如 Jest）时的处理方法。

### 使用 Jest 排除资源文件

#### 1. 样式文件处理

对于样式文件，可使用 `identity-obj-proxy` 包来模拟样式导入。`identity-obj-proxy` 会将所有的 CSS 类名转换为相同的字符串，从而避免实际加载 CSS 文件。

**安装依赖**

```bash
npm install --save-dev identity-obj-proxy
```

**配置 Jest**
在 `jest.config.js` 或 `package.json` 中的 `jest` 配置里添加如下内容：

```javascript
module.exports = {
  // ...其他配置
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
```

或者在 `package.json` 中：

```json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  }
}
```

这样，当在测试代码中导入 CSS 文件时，Jest 会使用 `identity-obj-proxy` 来模拟，而不会真正加载 CSS 文件。

**示例代码**
假设有如下组件：

```jsx
// MyComponent.jsx
import React from "react";
import "./styles.css";

const MyComponent = () => {
  return <div className="my-class">Hello, World!</div>;
};

export default MyComponent;
```

测试代码可以正常编写，不用担心 `styles.css` 文件的加载问题：

```javascript
// MyComponent.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders MyComponent", () => {
  render(<MyComponent />);
  const element = screen.getByText("Hello, World!");
  expect(element).toBeInTheDocument();
});
```

#### 2. 图片文件处理

对于图片文件，可使用一个简单的模块来模拟图片导入。

**配置 Jest**
在 `jest.config.js` 或 `package.json` 中的 `jest` 配置里添加如下内容：

```javascript
module.exports = {
  // ...其他配置
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
```

或者在 `package.json` 中：

```json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

**创建模拟文件**
在项目根目录下创建 `__mocks__` 文件夹，并在其中创建 `fileMock.js` 文件，内容如下：

```javascript
module.exports = "test-file-stub";
```

这样，当在测试代码中导入图片文件时，Jest 会使用 `fileMock.js` 中的模拟值来替代，而不会真正加载图片文件。

**示例代码**
假设有如下组件：

```jsx
// ImageComponent.jsx
import React from "react";
import myImage from "./my-image.png";

const ImageComponent = () => {
  return <img src={myImage} alt="Test Image" />;
};

export default ImageComponent;
```

测试代码可以正常编写，不用担心 `my-image.png` 文件的加载问题：

```javascript
// ImageComponent.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import ImageComponent from "./ImageComponent";

test("renders ImageComponent", () => {
  render(<ImageComponent />);
  const imageElement = screen.getByAltText("Test Image");
  expect(imageElement).toBeInTheDocument();
});
```

通过以上配置，你可以在 Jest 单元测试中排除样式文件和图片等资源文件的干扰，专注于代码逻辑的测试。
