| Loader 名称                | 作用                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `babel-loader`              | 将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行。                                                              |
| `css-loader`                | 解析 CSS 文件，处理 CSS 中的依赖关系，并将 CSS 转换为 JS 模块。                                                       |
| `style-loader`              | 将 CSS 代码以内联的方式注入到 HTML 页面中。                                                                          |
| `file-loader`               | 处理文件资源（如图片、字体等），将文件复制到输出目录，并返回文件路径。                                               |
| `url-loader`                | 与 `file-loader` 类似，但可以根据文件大小将文件转换为 Data URL（base64 格式）或文件路径。                          |
| `sass-loader`               | 解析 Sass/SCSS 文件，并将其转换为 CSS 代码。                                                                         |
| `less-loader`               | 解析 Less 文件，并将其转换为 CSS 代码。                                                                              |
| `postcss-loader`            | 使用 PostCSS 处理 CSS，可以进行自动添加前缀、压缩、CSS Modules 等操作。                                              |
| `ts-loader`                 | 将 TypeScript 代码转换为 JavaScript 代码。                                                                           |
| `eslint-loader`             | 在构建过程中使用 ESLint 进行代码检查。                                                                               |
| `stylelint-webpack-plugin`  | 在构建过程中使用 Stylelint 进行 CSS/SCSS 代码检查。                                                                   |
| `vue-loader`                | 解析 Vue 单文件组件（.vue 文件），并将其转换为 JavaScript 代码。                                                      |
| `image-webpack-loader`      | 优化图片资源，包括压缩、转换格式等操作。                                                                             |
| `html-loader`               | 解析 HTML 文件，处理其中的引用资源（如图片、字体等），并返回处理后的 HTML 代码。                                      |
| `markdown-loader`           | 将 Markdown 文件转换为 HTML 代码。                                                                                   |
| `json-loader`               | 解析 JSON 文件，并返回解析后的 JavaScript 对象。                                                                     |
| `eslint-loader`             | 在构建过程中使用 ESLint 进行代码检查。                                                                               |
| `tslint-loader`             | 在构建过程中使用 TSLint 进行 TypeScript 代码检查。                                                                    |
| `prettier-loader`           | 在构建过程中使用 Prettier 进行代码格式化。                                                                           |
| `stylelint-webpack-plugin`  | 在构建过程中使用 Stylelint 进行 CSS/SCSS 代码检查。                                                                   |
| `mini-css-extract-plugin`   | 提取 CSS 代码到单独的文件，而不是内联到 JavaScript 代码中。                                                           |
| `optimize-css-assets-webpack-plugin` | 压缩 CSS 代码。                                                                                       |
| `terser-webpack-plugin`     | 压缩 JavaScript 代码。                                                                                             |

这些 Loader 可以根据需要配置在 Webpack 的模块规则（`module.rules`）中，以实现对不同类型文件的处理和转换操作。
