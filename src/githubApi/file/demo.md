> 也是作者无意中看到的一个有意思的问题。  
> 虽然有意思， 但是没有任何价值， 如果说在项目中遇到过的， 而且处理过的同学， 肯定知道怎么回答。  
> 但是压根没有碰到过得， 就算是你工作十年的老油条也是干望着。 所有没有任何面试价值。  
> 故此， 可以当做科普来看看就行。

在使用 Webpack 打包的项目中，通常资源（如 JavaScript、CSS、图片等）会被 Webpack 处理，因为 Webpack 的设计初衷就是将所有资源视为模块，并进行有效的管理和打包。但有时候可能需要通过`<script>`标签直接引入资源，这通常有两种情况：

1. **在 HTML 文件中直接引入：**
   可以在项目的 HTML 文件中直接使用`<script>`标签来引入外部资源：

   ```html
   <!-- 若要使用 CDN 上托管的库 -->
   <script src="https://cdn.example.com/library.js"></script>
   ```

   这种方法简单直接，但要记住，由于这些资源不会被 Webpack 处理，它们不会被包含在 Webpack 的依赖图中，并且也不会享受到 Webpack 的各种优化。

2. **使用 Webpack 管理：**
   如果想要 Webpack 来处理这些通过`<script>`引入的资源，可以使用几种插件和加载器：

   - `html-webpack-plugin`可以帮助你生成一个 HTML 文件，并在文件中自动引入 Webpack 打包后的 bundles。
   - `externals`配置允许你将一些依赖排除在 Webpack 打包之外，但还是可以通过`require`或`import`引用它们。
   - `script-loader`可以将第三方全局变量注入的库当作模块来加载使用。

   例如，使用`html-webpack-plugin`和`externals`，你可以将一个库配置为 external，然后通过`html-webpack-plugin`将其引入：

   ```javascript
   // webpack.config.js 文件
   const HtmlWebpackPlugin = require("html-webpack-plugin");

   module.exports = {
     // ...
     externals: {
       libraryName: "LibraryGlobalVariable",
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: "src/index.html",
         scriptLoading: "blocking", // 或者 'defer'
       }),
     ],
   };
   ```

   然后，在你的`index.html`模板文件中可以这样引入资源：

   ```html
   <script src="https://cdn.example.com/library.js"></script>
   ```

   使用`externals`的方法能让你在 Webpack 打包的模块代码中用正常的`import`或`require`语句来引用那个全局变量：

   ```javascript
   // 你的 JavaScript 代码文件中
   import Library from "libraryName"; // 虽然定义了external，Webpack依然会处理这个import
   ```

应根据项目需求和现有的架构来决定使用哪种方法。上述两种方法中，第二种可以更好地利用 Webpack 的功能，第一种则更加简单直接。
