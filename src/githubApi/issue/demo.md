如果你想使用 `babel-loader` 来编译 TypeScript 文件（`.tsx`），你需要在 `babel.config.js` 和 `webpack.config.js` 两个文件中进行相应的配置。

首先，在 `babel.config.js` 文件中，你需要添加 `@babel/preset-typescript` 预设，以便兼容 TypeScript：

```javascript
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
};
```

接下来，在 `webpack.config.js` 文件中，你需要对 `.tsx` 文件使用 `babel-loader`：

```javascript
module.exports = {
  // ...其他配置项
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

这样，当 webpack 执行构建时，`babel-loader` 将会使用 `babel.config.js` 中配置的预设来编译 `.tsx` 文件。同时，除了 TypeScript 文件，你还可以使用该配置来编译 JavaScript 文件（`.js`）和 React JSX 文件（`.jsx`）。

**追问**                  
`'@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'` 这三个插件的作用是什么？

- `@babel/preset-env`：它是 Babel 的一个预设，用于根据目标环境（浏览器、Node.js 等）自动确定需要转译的 JavaScript 特性，并将其转换为目标环境所支持的代码。它将根据你配置的目标环境和浏览器的使用情况，智能地选择需要转译的特性，以减小转译后的代码体积。它也包含了一些插件，例如转换箭头函数、解构赋值、模板字符串等。

- `@babel/preset-typescript`：它是 Babel 的一个预设，用于将 TypeScript 代码转译为 JavaScript 代码，以便在不支持 TypeScript 的环境中运行。它包含了一些插件，例如转换 TypeScript 的类型注解、类成员修饰符、泛型类型等。

- `@babel/preset-react`：它是 Babel 的一个预设，用于将 React 的 JSX 语法转译为普通的 JavaScript 代码，以便在不支持 JSX 的环境中运行。它也包含了一些插件，例如转换 JSX 语法、处理 React 的内置组件等。
