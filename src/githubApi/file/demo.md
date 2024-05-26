**关键词**：代码复用

在 Webpack 中提取源码里被多个入口点复用的代码，例如一个 `utils` 文件，可以通过配置 `optimization.splitChunks` 来实现。Webpack 会将这些频繁复用的模块提取出来，打包到一个独立的 chunk 中，使得浏览器可以单独缓存这部分代码，并在多个页面间共享使用，优化加载性能。

使用 `splitChunks` 的基本配置如下：

```javascript
module.exports = {
  // ...其他配置...
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有的 chunk 有效，包括异步和非异步 chunk
      cacheGroups: {
        commons: {
          name: "commons", // 提取出来的文件命名为 'commons.js'
          chunks: "initial", // 提取出的 chunk 类型，'initial' 为初始 chunk，'async' 为异步 chunk，'all' 表示全部 chunk
          minChunks: 2, // 模块被引用>=2次，便分割
          minSize: 0, // 模块的最小体积
        },
      },
    },
  },
};
```

这个配置的含义是：

- `chunks: 'all'` 指定要优化的 chunk 类型，这里设置为 `all` 代表所有的 chunk，不管是动态还是非动态加载的模块。
- `cacheGroups` 是一个对象，用于定义缓存组，可以继承和/或覆盖 `splitChunks` 的任何选项。每个缓存组可以有自己的配置，将不同的模块提取到不同的文件中。
- `cacheGroups.commons` 定义了一个缓存组，专门用于提取 `initial` chunk（最初依赖的模块）中被至少两个 chunk 所共享的模块。
- `name: 'commons'` 为生成的文件定义了一个自定义名称。
- `minChunks: 2` 表示模块至少被两个入口点引用时，才会被提取。
- `minSize: 0` 指定模块的最小体积是 0，即任意大小的模块都被提取。

这会让任何从 `node_modules` 目录导入，并在至少两个入口点中使用的模块，都会被打包到一个名为 `commons.js` 的文件中（当然，实际的文件名会受到 `output` 配置的影响，例如是否包含哈希值等）。

正确配置这些参数后，`utils` 这样的模块就会被自动提取并共享，而不是在每个入口点的 bundle 中重复包含。这样做的好处是，任何更新业务逻辑的时候，只要 `utils` 没有发生变化，用户浏览器上已缓存的 `commons.js` 文件就不需要重新下载。
