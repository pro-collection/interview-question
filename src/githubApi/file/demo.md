**关键词**：webpack 代码分割

为了实现你的需求，即将所有外部依赖（`node_modules` 中的依赖）打包成一个单独的包，而你自己的源码打包成另一个包，可以通过配置 Webpack 的 `optimization.splitChunks` 选项来实现。下面是具体的实施方案：

### 1. 编辑 `webpack.config.js`

在你的 `webpack.config.js` 配置文件中，找到或添加 `optimization` 部分，并在 `splitChunks` 中配置如下：

```javascript
module.exports = {
  // ...其他配置

  optimization: {
    runtimeChunk: "single", // 为 webpack 运行时代码创建一个额外的包
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 定义一个缓存组用以分离外部依赖
          test: /[\\/]node_modules[\\/]/, // 检索 node_modules 目录下的模块
          name: "vendors", // 分离后的包名称
          chunks: "all", // 对所有模块生效
        },
        source: {
          // 我们可以通过添加另一个缓存组来实现源码的分离（如果需要）
          test: /[\\/]src[\\/]/, // 检索 src 目录
          name: "source",
          chunks: "all",
        },
      },
    },
  },
};
```

### 解释

- `runtimeChunk: 'single'` 创建一个运行时文件，管理模块化交互，比如加载和解析模块。
- 在`splitChunks.cacheGroups` 中定义了两个缓存组:
  - `vendor`：这个缓存组的目标是将来自 `node_modules` 目录的所有代码移动到命名为 `vendors` 的包中。它通过 `test` 属性来匹配 `node_modules` 目录下的模块。
  - `source`：这个部分是为了演示如何单独将 `src` 目录下的源代码打包成一个文件。这不是必须的，因为默认情况下，Webpack 会将未被上述规则匹配到的模块（即你的源代码）打包到主包中。
