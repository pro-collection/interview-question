**关键词**：webpack 作用、webpack 概念

Webpack是一个现代的JavaScript模块打包工具，它的核心概念包括以下几个方面：

1. 入口（Entry）：指定Webpack开始构建依赖图谱的起点。可以通过配置文件中的entry属性来指定入口文件，也可以指定多个入口文件。

2. 输出（Output）：指定Webpack打包后的文件输出的路径和文件名。可以通过配置文件中的output属性来定义输出路径和文件名的规则。

3. 加载器（Loader）：Webpack本身只能处理JavaScript文件，通过加载器，Webpack可以处理其他类型的文件，如CSS、图片、字体等。加载器会在打包过程中对文件进行转换和处理。

4. 插件（Plugin）：插件是Webpack的核心功能扩展机制，可以用于解决很多构建过程中的复杂问题或实现特定的需求。插件可以用于优化打包结果、自动生成HTML文件、提取CSS文件等。

5. 模式（Mode）：Webpack提供了两种模式，分别是开发模式（development）和生产模式（production）。开发模式会启用一些有助于开发调试的功能，而生产模式则会启用代码压缩、优化等功能。

6. 代码分割（Code Splitting）：Webpack支持将代码分割成多个块，实现按需加载和提高应用性能。可以使用动态导入、SplitChunks插件等方式进行代码分割。

7. 解析（Resolve）：Webpack会解析模块之间的依赖关系，通过解析规则来确定模块的依赖关系。可以通过配置resolve属性来设置模块的解析规则。

**参考文档**                        

https://webpack.docschina.org/concepts/
