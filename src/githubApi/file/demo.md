**关键词**：chunkFilename 和 filename

在 Webpack 中的 `output` 配置对象中，`filename` 和 `chunkFilename` 是用来指定输出文件的命名方式的关键属性。它们之间的区别主要涉及到最终生成的 JavaScript 文件的类型。

1. **filename**: `filename` 属性用于指定输出的 **bundle** 的名称。当你的应用只有一个入口点时，可以直接使用一个固定名称。如果有多个入口点，那么你可以使用占位符来确保每个文件具有唯一的名称，如使用 `[name]` 来对应每个入口点的名称。`filename` 主要与入口点相关联的那些文件有关。

   ```javascript
   output: {
     filename: "bundle.js"; // 一个固定名称，适用于单入口
     // 或者
     filename: "[name].bundle.js"; // 使用占位符，适用于多入口
   }
   ```

2. **chunkFilename**: `chunkFilename` 属性用于指定非入口的 **chunk**（通常是动态加载的模块）的名称。这些 chunk 文件通常是由于代码分割产生的。当使用如 `import()` 这样的动态导入语法时，Webpack 会分割代码到新的 chunk 中，这时候 `chunkFilename` 的命名规则就会被应用。

   ```javascript
   output: {
     chunkFilename: "[name].chunk.js";
   }
   ```

这意味着如果你有一个动态加载的模块（例如懒加载模块），Webpack 会使用 chunkFilename 的规则来生成这些额外的文件。同样，你也可以在 `chunkFilename` 中使用占位符来保持文件名的唯一性。常用的占位符有 `[id]`, `[name]`, `[chunkhash]` 等。

使用这两个属性使得 Webpack 能够区分出入口文件和其他类型的文件，从而允许开发者更好地控制输出资源的命名和缓存。
