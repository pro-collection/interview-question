**关键词**：webpack externals

1. **`externals`基础原理**

   - 当在 Webpack 配置文件中使用`externals`选项时，实际上是在告诉 Webpack 某些模块应该被视为外部依赖，而不是被打包进最终的输出文件。这意味着这些模块将在运行时由浏览器或其他运行环境提供，而不是由 Webpack 处理。

2. **在浏览器环境中的加载方式（以全局变量为例）**

   - **配置`externals`**：
     - 假设项目依赖于`lodash`库，并且希望在浏览器环境中通过`<script>`标签加载`lodash`的全局变量。首先在 Webpack 配置文件中这样配置`externals`：
     ```javascript
     module.exports = {
       //...其他配置
       externals: {
         lodash: "lodash",
       },
     };
     ```
   - **HTML 文件中的脚本引入**：
     - 然后在 HTML 文件中，需要手动添加`<script>`标签来引入`lodash`。例如：
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
         <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
         <script src="your - main - app - bundle.js"></script>
       </body>
     </html>
     ```
     - 在这里，`your - main - app - bundle.js`是 Webpack 打包后的应用程序主文件。当 Webpack 在代码中遇到`import _ from 'lodash';`语句时，它不会将`lodash`的代码打包进输出文件，而是假设`lodash`已经在运行时环境中存在，并且可以通过全局变量`lodash`访问。所以在打包后的 JavaScript 代码中，实际上是通过全局变量来引用外部依赖的。

3. **在其他运行环境（如 Node.js）中的加载方式（以 CommonJS 模块为例）**

   - **配置`externals`类似操作**：
     - 在 Webpack 配置文件中，对于要作为外部依赖处理的模块（假设是`axios`，用于在 Node.js 环境中进行 HTTP 请求），配置`externals`如下：
     ```javascript
     module.exports = {
       //...其他配置
       externals: {
         axios: "axios",
       },
     };
     ```
   - **运行时环境中的模块引用**：
     - 在 Node.js 应用程序代码中，需要确保`axios`已经作为一个 CommonJS 模块安装在项目的`node_modules`目录下或者在全局环境中有相应的模块路径。当运行打包后的代码时，Webpack 不会打包`axios`，而是期望在 Node.js 的模块加载机制中找到它。例如，在打包后的 Node.js 代码中可能会有类似这样的引用：
     ```javascript
     const axios = require("axios");
     ```
     - 此时，Node.js 会按照自己的模块加载规则去查找`axios`模块，就像没有经过 Webpack 打包一样。这是因为 Webpack 通过`externals`配置将`axios`模块的加载责任交给了运行时环境的模块加载系统。

4. **AMD（Asynchronous Module Definition）模块加载方式（适用于支持 AMD 的环境）**
   - **配置`externals`和模块定义**：
     - 假设在一个支持 AMD 的浏览器环境或者 JavaScript 运行环境中，有一个名为`backbone`的外部依赖，在 Webpack 配置文件中设置`externals`：
     ```javascript
     module.exports = {
       //...其他配置
       externals: {
         backbone: "backbone",
       },
     };
     ```
   - **AMD 模块加载脚本**：
     - 在 HTML 文件或者 AMD 模块加载器的配置文件中，需要使用 AMD 的方式来加载`backbone`模块。例如，在一个简单的 AMD 配置中，可能会有如下代码来加载`backbone`和应用程序主模块：
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
         <script src="https://requirejs.org/docs/release/2.3.6/minified/require.js"></script>
         <script>
           require.config({
             paths: {
               backbone: "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.0/backbone-min",
             },
           });
           require(["your - main - app - module", "backbone"], function (app, backbone) {
             // 应用程序主模块和backbone模块都加载完成后执行的代码
             app.init();
           });
         </script>
       </body>
     </html>
     ```
     - 这里使用`require.js`作为 AMD 模块加载器，通过`require.config`配置`backbone`模块的路径，然后在`require`函数中加载应用程序主模块和`backbone`模块。Webpack 在打包过程中，由于`externals`配置，知道`backbone`是外部依赖，会正确地处理代码中的引用，使得在运行时可以通过 AMD 模块加载器来加载`backbone`模块并正确地执行应用程序。
