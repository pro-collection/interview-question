**关键词**：Webpack es6 产物

1. **分别打包 ES5 和 ES6 产物（从一份 ES6 源码）**

   - **配置 Webpack 和 Babel 基础环境**
     - 首先，安装必要的依赖。除了 Webpack 本身相关的依赖外，还需要`babel - loader`、`@babel/core`和`@babel/preset - env`。
     ```bash
     npm install webpack webpack - cli babel - loader @babel/core @babel/preset - env --save - dev
     ```
     - 创建 Webpack 配置文件（例如`webpack.config.js`），并在其中配置基本的模块规则，用于处理 JavaScript 文件。先配置一个简单的 ES6 打包规则：
     ```javascript
     const path = require("path");
     module.exports = {
       entry: "./src/index.js", // 假设ES6源码入口文件是index.js
       output: {
         filename: "es6 - bundle.js",
         path: path.resolve(__dirname, "dist/es6"),
       },
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: {
               loader: "babel - loader",
               options: {
                 presets: [
                   [
                     "@babel/preset - env",
                     {
                       targets: {
                         // 设置一个较高的浏览器版本支持ES6原生，这里假设现代浏览器都支持
                         chrome: "80",
                         firefox: "70",
                       },
                     },
                   ],
                 ],
               },
             },
           },
         ],
       },
     };
     ```
   - **添加 ES5 打包配置**
     - 为了打包 ES5 产物，在 Webpack 配置文件中添加另一个配置对象。可以通过`webpack - merge`工具（需要安装`webpack - merge`）来合并基础配置和 ES5 特定配置，避免重复配置。
     ```javascript
     const path = require("path");
     const webpackMerge = require("webpack - merge");
     const baseConfig = {
       entry: "./src/index.js",
       output: {
         filename: "es6 - bundle.js",
         path: path.resolve(__dirname, "dist/es6"),
       },
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: {
               loader: "babel - loader",
               options: {
                 presets: [
                   [
                     "@babel/preset - env",
                     {
                       targets: {
                         chrome: "80",
                         firefox: "70",
                       },
                     },
                   ],
                 ],
               },
             },
           },
         ],
       },
     };
     const es5Config = {
       output: {
         filename: "es5 - bundle.js",
         path: path.resolve(__dirname, "dist/es5"),
       },
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: {
               loader: "babel - loader",
               options: {
                 presets: [
                   [
                     "@babel/preset - env",
                     {
                       targets: {
                         // 设置较低的浏览器版本，确保转换为ES5语法
                         chrome: "50",
                         firefox: "40",
                       },
                       useBuiltIns: "usage",
                       corejs: 3,
                     },
                   ],
                 ],
               },
             },
           },
         ],
       },
     };
     module.exports = [baseConfig, webpackMerge(baseConfig, es5Config)];
     ```
     - 上述配置中，`es5Config`部分重新定义了输出文件名和路径，并且在`babel - loader`的选项中，通过`@babel/preset - env`的`targets`选项设置了较低的浏览器支持范围，这样就可以将源码转换为 ES5 语法并打包到`dist/es5`目录下的`es5 - bundle.js`文件。

2. **区分加载 ES5 还是 ES6 产物**
   - **使用浏览器特性检测脚本（HTML + JavaScript）**
     - 在 HTML 文件（假设是`index.html`）中，可以添加一段 JavaScript 代码来检测浏览器是否支持 ES6 特性。例如，检测`Promise`是否存在（`Promise`是 ES6 的一个典型特性）。
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <title>Document</title>
       </head>
       <body>
         <script>
           if (typeof Promise === "undefined") {
             document.write('<script src="dist/es5/es5 - bundle.js"><\/script>');
           } else {
             document.write('<script src="dist/es6/es6 - bundle.js"><\/script>');
           }
         </script>
       </body>
     </html>
     ```
     - 这种方法简单直接，但有一定的局限性。如果浏览器对 ES6 的支持不完全（例如，支持部分 ES6 语法但不支持检测的特性），可能会导致加载错误的产物。
   - **使用服务端渲染（SSR）或构建时检测（更高级）**
     - 如果是在服务端渲染的应用中，可以在服务端根据用户代理（User - Agent）来判断浏览器版本，进而选择加载 ES5 还是 ES6 产物。这需要在服务端代码（例如 Node.js 中的 Express 应用）中进行逻辑处理。
     - 另一种构建时检测的方法是，在构建过程中生成一个包含浏览器支持信息的配置文件。可以使用`browserslist`工具（`@babel/preset - env`内部也使用了这个工具来确定目标浏览器）结合一些自定义脚本，在构建时确定目标浏览器范围，然后生成一个配置文件（例如`browser - config.json`），内容可能是`{"supportsES6": true}`或者`{"supportsES6": false}`。在 HTML 文件中，通过读取这个配置文件来加载相应的产物。
     ```javascript
     // 假设这是一个自定义脚本，用于生成browser - config.json
     const browserslist = require("browserslist");
     const fs = require("fs");
     const targets = {
       chrome: "50",
       firefox: "40",
     };
     const browsers = browserslist(Object.keys(targets).map((browser) => `${browser} >= ${targets[browser]}`));
     const supportsES6 = browsers.some(
       (browser) => browser.includes("Chrome >= 80") || browser.includes("Firefox >= 70")
     );
     fs.writeFileSync("browser - config.json", JSON.stringify({ supportsES6 }));
     ```
     - 然后在 HTML 文件中：
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
         <script>
           const browserConfig = JSON.parse(document.currentScript.getAttribute("data - config"));
           if (browserConfig.supportsES6) {
             document.write('<script src="dist/es6/es6 - bundle.js"><\/script>');
           } else {
             document.write('<script src="dist/es5/es5 - bundle.js"><\/script>');
           }
         </script>
         <script src="browser - config.json" data - config></script>
       </body>
     </html>
     ```
