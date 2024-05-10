**关键词**：webpack 主要配置项

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。配置文件名通常为 `webpack.config.js`，它提供了一种配置 Webpack 的方式。下面是一些主要的 Webpack 配置选项：

1. **entry**: 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。可以指定一个或多个入口起点。

2. **output**: output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。

3. **module**: module 属性用于决定如何处理项目中的不同类型的模块。

   - **rules**: 配置模块的读取和解析规则，通常用来配置 loader。

4. **resolve**: 配置模块如何解析。

   - **extensions**: 自动解析确定的扩展，此选项能够使用户在引入模块时不带扩展。

5. **plugins**: 插件是用来扩展 webpack 功能的。它们会在构建流程中的特定时机注入运行逻辑来改变构建结果或做你想要的事情。

6. **devServer**: 通过来自 `webpack-dev-server` 的这些选项能够对开发服务器的行为进行控制。

7. **devtool**: 此选项控制是否生成，以及如何生成 source map。

8. **mode**: 通过设置 `development` 或 `production` 之中的一个，来为流程提供相应模式下的内置优化。

9. **optimization**: 包含一组可用来调整构建输出的选项。

   - **splitChunks**: 配置模块的拆分，可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
   - **runtimeChunk**: 为每个 entry 创建一个运行时文件。

10. **performance**: 允许 webpack 根据某些参数，控制资产和入口起点的最大大小。

11. **externals**: 防止将某些 import 包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。

每个项目的具体需求不同，Webpack 的配置也会有所不同。这些选项提供了强大的配置能力和灵活性，可以用来定制 Webpack 的打包、加载和转换行为。
