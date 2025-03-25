**关键词**：前端单测模拟 react 交互

在 Jest 中测试 React 组件交互，通常会结合 React Testing Library 一起使用，它专注于从用户交互的角度来测试组件，鼓励编写接近用户实际使用场景的测试用例。以下将详细介绍测试 React 组件交互的步骤和示例。

### 1. 安装依赖

首先要确保项目中安装了 Jest、React Testing Library 以及相关的 React 依赖。若还未安装，可使用以下命令进行安装：

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### 2. 编写测试用例

下面通过几个不同交互场景的示例，展示如何使用 Jest 和 React Testing Library 测试 React 组件的交互。

#### 示例 1：测试按钮点击事件

假设存在一个简单的 React 组件，点击按钮会更新文本内容：

```jsx
// ButtonComponent.jsx
import React, { useState } from "react";

const ButtonComponent = () => {
  const [text, setText] = useState("未点击");
  const handleClick = () => {
    setText("已点击");
  };
  return (
    <div>
      <p>{text}</p>
      <button onClick={handleClick}>点击我</button>
    </div>
  );
};

export default ButtonComponent;
```

对应的测试代码如下：

```javascript
// ButtonComponent.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ButtonComponent from "./ButtonComponent";

test("点击按钮后文本更新", () => {
  render(<ButtonComponent />);
  // 查找按钮元素
  const button = screen.getByText("点击我");
  // 查找文本元素
  const textElement = screen.getByText("未点击");
  // 模拟点击事件
  fireEvent.click(button);
  // 断言文本内容是否更新
  expect(screen.getByText("已点击")).toBeInTheDocument();
});
```

在这个测试用例中，首先使用 `render` 函数渲染组件，接着使用 `screen.getByText` 方法查找按钮和文本元素，再用 `fireEvent.click` 模拟点击按钮的操作，最后通过 `expect` 断言文本内容是否更新。

#### 示例 2：测试输入框输入事件

假设有一个输入框组件，输入内容后会显示输入的值：

```jsx
// InputComponent.jsx
import React, { useState } from "react";

const InputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <p>{inputValue}</p>
    </div>
  );
};

export default InputComponent;
```

对应的测试代码如下：

```javascript
// InputComponent.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputComponent from "./InputComponent";

test("输入框输入内容后文本更新", () => {
  render(<InputComponent />);
  // 查找输入框元素
  const inputElement = screen.getByRole("textbox");
  // 模拟输入操作
  fireEvent.change(inputElement, { target: { value: "测试内容" } });
  // 断言文本内容是否更新
  expect(screen.getByText("测试内容")).toBeInTheDocument();
});
```

此测试用例中，先渲染组件，然后使用 `screen.getByRole` 方法查找输入框元素，通过 `fireEvent.change` 模拟输入操作，最后断言显示的文本内容是否正确。

#### 示例 3：测试表单提交事件

假设有一个表单组件，提交表单后会显示提交成功的提示：

```jsx
// FormComponent.jsx
import React, { useState } from "react";

const FormComponent = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">提交</button>
      {submitted && <p>提交成功</p>}
    </form>
  );
};

export default FormComponent;
```

对应的测试代码如下：

```javascript
// FormComponent.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormComponent from "./FormComponent";

test("表单提交后显示提交成功提示", () => {
  render(<FormComponent />);
  // 查找提交按钮元素
  const submitButton = screen.getByText("提交");
  // 模拟表单提交事件
  fireEvent.click(submitButton);
  // 断言是否显示提交成功提示
  expect(screen.getByText("提交成功")).toBeInTheDocument();
});
```

在这个测试用例里，同样先渲染组件，使用 `screen.getByText` 方法查找提交按钮元素，通过 `fireEvent.click` 模拟表单提交操作，最后断言是否显示提交成功的提示信息。

通过以上示例，你可以掌握在 Jest 中使用 React Testing Library 测试 React 组件交互的基本方法。在实际项目中，可根据组件的具体交互逻辑编写相应的测试用例。
