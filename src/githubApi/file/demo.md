**关键词**：前端测试 jest 配置

当使用 Babel 编译 React TypeScript 项目并配置 Jest 时，可按以下步骤进行：

### 1. 安装必要的依赖

在项目根目录下，通过以下命令安装所需的依赖：

```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- `jest`：测试框架。
- `babel-jest`：让 Jest 能使用 Babel 转换代码。
- `@babel/core`：Babel 的核心库。
- `@babel/preset-env`：根据目标环境转换代码。
- `@babel/preset-react`：处理 React 的 JSX 语法。
- `@babel/preset-typescript`：支持 TypeScript 代码的转换。
- `@types/jest`：为 Jest 提供 TypeScript 类型定义。
- `@testing-library/react`：用于测试 React 组件的工具库。
- `@testing-library/jest-dom`：提供额外的 DOM 断言方法。
- `@testing-library/user-event`：模拟用户交互的工具库。

### 2. 配置 Babel

在项目根目录下创建或修改 `.babelrc` 文件（也可以使用 `babel.config.js`），添加以下配置：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
}
```

- `@babel/preset-env`：依据 `package.json` 里的 `browserslist` 配置转换代码。
- `@babel/preset-react`：处理 React 的 JSX 语法。
- `@babel/preset-typescript`：将 TypeScript 代码转换为 JavaScript 代码。

### 3. 配置 Jest

在项目根目录下创建 `jest.config.js` 文件，并添加以下配置：

```javascript
module.exports = {
  // 使用 babel-jest 转换文件
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  // 配置测试环境
  testEnvironment: "jsdom",
  // 配置模块名映射，处理样式和图片文件
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  // 在每个测试文件运行前执行的脚本
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // 识别的文件扩展名
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```

- `transform`：指定使用 `babel-jest` 转换 `.js`、`.jsx`、`.ts` 和 `.tsx` 文件。
- `testEnvironment`：设置测试环境为 `jsdom`，模拟浏览器环境。
- `moduleNameMapper`：处理样式文件和图片文件的导入，避免在测试时实际加载这些资源。
- `setupFilesAfterEnv`：指定在每个测试文件运行前执行的脚本文件。
- `moduleFileExtensions`：指定 Jest 识别的文件扩展名。

### 4. 创建模拟文件

在项目根目录下创建 `__mocks__` 文件夹，并在其中创建 `fileMock.js` 文件，内容如下：

```javascript
module.exports = "test-file-stub";
```

该文件用于模拟图片等资源文件的导入。

### 5. 创建测试设置文件

在 `src` 目录下创建 `setupTests.ts` 文件，并添加以下内容：

```typescript
import "@testing-library/jest-dom";
```

这会引入 `@testing-library/jest-dom` 提供的额外 DOM 断言方法。

### 6. 配置 `package.json`

在 `package.json` 文件中添加测试脚本：

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 7. 编写并运行测试用例

例如，有一个简单的 React TypeScript 组件 `App.tsx`：

```tsx
import React from "react";

const App: React.FC = () => {
  return <h1>Hello, Jest!</h1>;
};

export default App;
```

对应的测试文件 `App.test.tsx` 可以这样写：

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  const element = screen.getByText("Hello, Jest!");
  expect(element).toBeInTheDocument();
});
```

在终端运行以下命令来执行测试：

```bash
npm test
```

通过以上步骤，你就可以在使用 Babel 编译的 React TypeScript 项目中配置好 Jest 进行测试了。
