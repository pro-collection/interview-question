**关键词**：前端单测 jest 配置

Jest 有许多重要配置项，它们能帮助你根据项目需求定制测试环境和流程。以下是一些关键的 Jest 配置项及其用途：

### 1. `testMatch`

- **作用**：指定 Jest 要测试的文件匹配模式。Jest 会在项目中查找符合这些模式的文件并执行测试。
- **示例**：

```javascript
module.exports = {
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
};
```

上述配置表示 Jest 会查找 `__tests__` 目录下的所有 `.js` 或 `.jsx` 文件，以及文件名包含 `spec` 或 `test` 的 `.js` 或 `.jsx` 文件。

### 2. `moduleNameMapper`

- **作用**：用于映射模块名，可将特定的模块名映射到另一个模块或文件。常见用途是处理样式文件、图片等资源文件的导入，避免在测试时实际加载这些资源。
- **示例**：

```javascript
module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
```

这里将 CSS 等样式文件映射到 `identity-obj-proxy`，将图片文件映射到自定义的模拟文件 `fileMock.js`。

### 3. `setupFilesAfterEnv`

- **作用**：在每个测试文件运行前执行的脚本文件列表。常用于设置测试环境，如引入测试工具、全局配置等。
- **示例**：

```javascript
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
```

在 `setupTests.js` 文件中可以进行一些全局的测试配置，例如引入 `@testing-library/jest-dom` 扩展断言：

```javascript
import "@testing-library/jest-dom";
```

### 4. `testEnvironment`

- **作用**：指定测试运行的环境，常见的值有 `node` 和 `jsdom`。`node` 适用于 Node.js 环境的测试，`jsdom` 模拟了浏览器环境，适用于前端 JavaScript 代码的测试。
- **示例**：

```javascript
module.exports = {
  testEnvironment: "jsdom",
};
```

### 5. `coverageDirectory`

- **作用**：指定代码覆盖率报告的输出目录。
- **示例**：

```javascript
module.exports = {
  coverageDirectory: "<rootDir>/coverage",
};
```

### 6. `coverageThreshold`

- **作用**：设置代码覆盖率的阈值。可以为全局或特定文件设置分支、函数、行和语句的覆盖率阈值，如果测试结果未达到这些阈值，Jest 会报错。
- **示例**：

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 7. `transform`

- **作用**：指定如何转换不同类型的文件。通常用于处理 Babel 转换，将 ES6+ 代码转换为兼容的 JavaScript 代码。
- **示例**：

```javascript
module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
```

上述配置表示使用 `babel-jest` 来转换 `.js` 和 `.jsx` 文件。

### 8. `verbose`

- **作用**：一个布尔值，控制是否在测试结果中显示每个测试用例的详细信息。设置为 `true` 会显示更详细的测试结果。
- **示例**：

```javascript
module.exports = {
  verbose: true,
};
```

### 9. `watchPlugins`

- **作用**：指定在 watch 模式下使用的插件。例如，`jest-watch-typeahead` 插件可以让你在 watch 模式下通过输入文件名或测试用例名来快速过滤测试。
- **示例**：

```javascript
module.exports = {
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
```

这些配置项能帮助你更好地定制 Jest 的行为，满足不同项目的测试需求。你可以根据项目的具体情况进行选择和配置。
