**关键词**：mini-css-extract-plugin作用、mini-css-extract-plugin使用

在 webpack 中，通常使用 `mini-css-extract-plugin` 来提取 CSS。它是一个独立的插件，可以将 CSS 从 JavaScript 文件中提取出来，生成独立的 CSS 文件。
使用 `mini-css-extract-plugin` 可以优化代码分离和缓存，以及提高加载速度。

通过配置 webpack 的插件选项，可以将 `mini-css-extract-plugin` 添加到 webpack 构建流程中。在配置中，需要将该插件实例化，并指定输出的 CSS 文件名和路径。
一旦配置完成并运行 webpack 构建，`mini-css-extract-plugin` 就会将 CSS 提取到独立的文件中，而不是将其嵌入到 JavaScript 文件中。

示例代码如下：

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...其他配置
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
```

在上述示例中，`MiniCssExtractPlugin.loader` 是用于提取 CSS 的 loader。`css-loader` 用于处理 CSS 文件的导入和解析。
`MiniCssExtractPlugin`则是插件实例，用于配置输出的 CSS 文件名。
