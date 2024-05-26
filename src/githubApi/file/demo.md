**关键词**：依赖打包

在 Webpack 中，将一些通用的依赖，如 React、React DOM、React Router 等库和框架，打包成一个独立的 bundle，通常是为了长期缓存和减少每次部署更新的下载量。这可以通过 "代码分割" (code splitting) 和 "优化" (optimization) 配置来实现。

以下是 Webpack 中分离通用依赖的几个步骤：

1. **使用 `entry` 来定义不同的入口点**: 可以通过配置一个额外的入口来创建一个只包含通用库的 bundle，也就是所谓的 "vendor" bundle。

```javascript
module.exports = {
  entry: {
    main: "./src/index.js", // 你的应用代码
    vendor: ["react", "react-dom", "react-router"], // 指定共享库
  },
  // ...
};
```

2. **使用 `SplitChunksPlugin`**: 这个插件可以将共享代码分割成不同的 chunks，并可以通过配置将其从业务代码中分离出来。在 Webpack 4 及之后的版本中，默认内置了 `optimization.splitChunks`，就是这个插件的配置方法。

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 指定是 node_modules 下的第三方包
          name: "vendors", // 打包后的文件名，任意命名
          chunks: "all", // 对所有的 chunk 生效
        },
      },
    },
  },
};
```

3. **配置 `output`**: 虽然不是必须的，你还可以在 output 中定义 `filename` 和 `chunkFilename`，来控制主入口和非主入口 chunks 的文件名。

```javascript
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js'
}
```

通过这样的配置，Webpack 在打包时会自动将 node_modules 中的依赖和业务代码分离开来，业务代码会被打包到 `main` chunk 中，而第三方库则会打包到 `vendors` chunk。
