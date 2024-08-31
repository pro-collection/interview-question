**关键词**：ts 类型强校验

要开启 TypeScript 的类型强校验，并使得 Webpack 在遇到类型错误时编译失败，可以通过以下步骤实现：

### 1. 开启 TS 严格模式

首先，在`tsconfig.json`中启用严格模式。这是通过设置`"strict": true`来实现的，这个选项会启用一系列严格的类型检查，帮助你写出更健壮的代码。

```json
{
  "compilerOptions": {
    "strict": true,
    ...
  },
  ...
}
```

`"strict": true`基本等同于下面这些选项全部开启：

- `noImplicitAny`
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitThis`
- `alwaysStrict`

### 2. 使用`ForkTsCheckerWebpackPlugin`并配置使编译失败

当使用 Webpack 和`ts-loader`时，你可以通过安装并配置`ForkTsCheckerWebpackPlugin`来进行强类型校验。这个插件可以并行运行 TypeScript 类型检查器和 ESLint，并能在检测到错误时使 Webpack 编译失败。

首先，安装`ForkTsCheckerWebpackPlugin`（如果你还没安装）：

```bash
npm install --save-dev fork-ts-checker-webpack-plugin
```

然后，在你的`webpack.config.js`配置文件中，修改`ForkTsCheckerWebpackPlugin`的配置，确保在遇到 TypeScript 类型错误时构建失败：

```javascript
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  ... // 其他webpack配置
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false, // 关键配置：这将使得webpack等待TypeScript类型检查器和ESLint完成，如果发现任何错误都将导致构建失败
    }),
  ],
  ... // 其他webpack配置
};
```

### 注意

- 设置`async: false`，会使得 Webpack 等待类型检查完成，如果有任何错误则构建失败。这对于生产构建很有用，但可能会降低开发环境的迭代速度。

- 由于这个插件是并行在一个单独的进程中运行的，它不会延长 Webpack 的编译时间。然而，如果设置了`async: false`，则 Webpack 会等待该插件的结果，从而影响到构建的总时间。
