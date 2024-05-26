**关键词**：webpack 模块化支持

Webpack 支持以下几种模块化标准：

1. **ESM (ECMAScript Modules)**: 这是 JavaScript ES6 中引入的官方标准模块系统。使用 `import` 和 `export` 语句来导入和导出模块。

2. **CommonJS**: 主要用于 Node.js，允许使用 `require()` 来加载模块和 `module.exports` 来导出模块。

3. **AMD (Asynchronous Module Definition)**: 用于异步加载模块，并使用 `define` 方法来定义模块。

4. **UMD (Universal Module Definition)**: 结合了 AMD 和 CommonJS 的特点，并支持全局变量定义的方式，使得模块可以在客户端和服务端上运行。

除此之外，Webpack 还可以处理非 JavaScript 文件并将它们视为模块，例如 CSS, LESS, SASS, 图像文件(PNG, JPG, GIF, SVG 等), 字体(OTF, TTF, WOFF, WOFF2, EOT), HTML 以及任何其他类型的文件。这通过使用相应的 loader 来实现，如 `style-loader`, `css-loader`, `file-loader` 等。这些 loader 会将非 JavaScript 文件转换为可以被 Webpack 处理的模块。

**参考文档**

- https://www.webpackjs.com/concepts/modules/#supported-module-types
