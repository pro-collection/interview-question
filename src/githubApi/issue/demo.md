下表列出了常见的 Webpack 插件及其作用：

| 插件名称                                     | 作用                                                                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `HtmlWebpackPlugin`                      | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。                                                                     |
| `MiniCssExtractPlugin`                | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。                                                                   |
| `CopyWebpackPlugin`                   | 将指定的文件或目录复制到输出目录。                                                                                         |
| `CleanWebpackPlugin`                  | 在每次构建之前清理输出目录，避免旧的文件残留。                                                                               |
| `DefinePlugin`                          | 在编译过程中创建全局常量，可以在代码中直接使用。                                                                             |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。                           |
| `ProvidePlugin`                           | 自动加载模块，使模块在使用时可以直接使用对应的全局变量，无需引入。                                                               |
| `MiniCssExtractPlugin`                | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。                                                                   |
| `OptimizeCSSAssetsPlugin`        | 压缩提取出的 CSS 文件。                                                                                                    |
| `uglifyjs-webpack-plugin`           | 压缩 JavaScript 代码。                                                                                                      |
| `webpack-bundle-analyzer`        | 分析打包后的文件大小，并可视化展示，方便优化打包结果。                                                                       |
| `CompressionWebpackPlugin`   | 使用 gzip 或其他压缩算法对文件进行压缩，减小文件大小，加快网络传输速度。                                                      |
| `CopyWebpackPlugin`                 | 将指定的文件或目录复制到输出目录。                                                                                          |
| `FriendlyErrorsWebpackPlugin`     | 提供友好的构建错误提示和优化构建速度的功能。                                                                                 |
| `ImageminWebpackPlugin`           | 压缩图片资源，减小文件大小，提升加载速度。                                                                                  |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。                            |
| `HtmlWebpackPlugin`                      | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。                                                                     |
| `IgnorePlugin`                                | 忽略特定的模块，避免将其打包到最终的输出文件中。                                                                             |
| `BannerPlugin`                                | 在打包的文件块顶部添加自定义的注释和信息。                                                                                   |
| `webpack.DefinePlugin`              | 在编译过程中创建全局常量，可以在代码中直接使用。                                                                             |
| `webpack.ProgressPlugin`          | 在控制台输出构建进度信息。                                                                                                  |
| `webpack-bundle-analyzer`        | 分析打包后的文件大小，并可视化展示，方便优化打包结果。                                                                       |
| `webpackbar`                                  | 在命令行中显示构建进度条，提供更直观的构建进度信息。                                                                          |

这些插件可以根据需要配置在 Webpack 的插件列表（`plugins`）中，以实现对构建过程的各种增强和优化操作。
