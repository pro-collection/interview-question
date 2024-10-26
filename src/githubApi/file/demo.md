**关键词**：eslint 配置

要将 ESLint 集成到 Webpack 中，可以按照以下步骤进行操作：

**一、安装必要的包**

1. 确保已经安装了 Webpack 和 ESLint。如果还没有安装，可以使用以下命令进行安装：

   - 使用 npm：
     ```
     npm install webpack webpack-cli eslint --save-dev
     ```
   - 使用 yarn：
     ```
     yarn add webpack webpack-cli eslint --dev
     ```

2. 安装`eslint-webpack-plugin`插件，这个插件可以将 ESLint 集成到 Webpack 构建过程中。

   - 使用 npm：
     ```
     npm install eslint-webpack-plugin --save-dev
     ```
   - 使用 yarn：
     ```
     yarn add eslint-webpack-plugin --dev
     ```

**二、配置 ESLint**

1. 在项目根目录下，运行`eslint --init`命令来初始化 ESLint 配置。按照提示选择适合项目的选项，生成`.eslintrc.*`配置文件。

2. 根据项目需求，调整 ESLint 配置文件中的规则、解析器、插件等选项。

**三、配置 Webpack**

1. 在 Webpack 配置文件（通常是`webpack.config.js`）中，引入`eslint-webpack-plugin`插件：

   ```javascript
   const ESLintPlugin = require("eslint-webpack-plugin");
   ```

2. 在 Webpack 配置对象的`plugins`数组中添加`ESLintPlugin`实例：

   ```javascript
   module.exports = {
     //...其他配置项
     plugins: [
       new ESLintPlugin({
         // 可以在这里配置 ESLintPlugin 的选项，例如指定要检查的文件路径
         files: ["./src/**/*.js"],
       }),
     ],
   };
   ```

**四、运行 Webpack 构建**

当运行 Webpack 构建时，`eslint-webpack-plugin`会在构建过程中自动运行 ESLint 检查。如果有不符合 ESLint 规则的代码，会在控制台输出错误信息。
