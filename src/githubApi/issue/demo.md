**关键词**：Babel Polyfill 原理、Babel Polyfill 作用、Babel Polyfill 使用、Babel Polyfill 按需加载

### Babel Polyfill 作用是啥

Babel Polyfill 的作用是在旧版本浏览器中提供对新的JavaScript特性和API的支持。当使用Babel进行代码转换时，它只会转换语法，而不会转换新的API和全局对象（如Promise、Map、Set等）。

旧版本的浏览器可能不支持这些新的API和全局对象，因此在运行使用这些特性的代码时会抛出错误。为了解决这个问题，可以使用Babel Polyfill来填充缺失的功能，以确保代码在旧版本浏览器中正常运行。

Babel Polyfill通过修改全局对象和原型链，添加缺失的方法和属性，使得代码能够在不支持这些功能的浏览器中运行。它会检测当前环境的特性支持情况，并根据需要自动加载所需的Polyfill代码。

使用Babel Polyfill可以让开发人员在编写代码时不必过多考虑浏览器的兼容性，而专注于使用最新的JavaScript特性和API。它提供了一种简单方便的方式来填充浏览器的功能差异，确保代码在各种浏览器环境中具有一致的行为。


### 如何使用

要使用 Babel Polyfill，需要按照以下步骤进行设置：

1. 安装依赖：首先，确保你的项目已经安装了 Babel 相关的依赖包。这包括 `@babel/core`、`@babel/preset-env` 和 `@babel/polyfill`。你可以使用 npm 或者 yarn 进行安装：

```shell
npm install --save-dev @babel/core @babel/preset-env @babel/polyfill
```

2. 配置 Babel：在项目根目录下创建一个 `.babelrc` 文件，并添加以下配置：

```json
{
 "presets": ["@babel/preset-env"]
}
```

这样的配置将告诉 Babel 使用 `@babel/preset-env` 预设来进行转换。

3. 导入 Polyfill：在你的入口文件（通常是项目的主 JavaScript 文件）中导入 Babel Polyfill。你可以使用 import 语句或者 require 来导入 Polyfill：

使用 import（适用于 ES6 模块）：

```javascript
import '@babel/polyfill';
```

使用 require（适用于 CommonJS 模块）：

```javascript
require('@babel/polyfill');
```

导入 Polyfill 的位置很重要，通常应该在你的应用程序代码之前导入，以确保 Polyfill 在应用程序代码之前被加载和执行。

4. 配置目标浏览器：为了让 Babel Polyfill 根据目标浏览器进行特性填充，你可以在 `.babelrc` 文件中的 `@babel/preset-env` 配置中指定目标浏览器的选项。例如，你可以在配置中添加 `targets` 属性：

```json
{
 "presets": [
   [
     "@babel/preset-env",
     {
       "targets": {
         "browsers": ["last 2 versions", "ie >= 11"]
       }
     }
   ]
 ]
}
```

这样，Polyfill 将根据所选的目标浏览器填充相应的功能。

完成以上步骤后，Babel Polyfill 将根据配置在目标浏览器中填充所需的功能，以确保你的代码在旧版本浏览器中正常运行。请注意，Polyfill 会增加你的应用程序的大小，因此请考虑仅填充所需的功能，以减小文件大小并优化性能。


### 按需加载 Polyfill

Babel Polyfill 默认会填充所有缺失的功能，但如果你只需要按需加载特定功能，可以使用 core-js 库的按需加载特性。下面是按需加载 Babel Polyfill 的步骤：

1. 安装依赖：确保你的项目已经安装了必要的依赖。除了之前提到的 Babel 相关依赖外，你还需要安装 `core-js`。

```shell
npm install --save-dev @babel/core @babel/preset-env core-js
```

2. 配置 Babel：在 `.babelrc` 文件中，添加以下配置：

```json
{
 "presets": [
   [
     "@babel/preset-env",
     {
       "useBuiltIns": "usage",
       "corejs": 3
     }
   ]
 ]
}
```

`useBuiltIns` 选项设置为 `"usage"` 表示按需加载特性，而 `"corejs": 3` 指定了使用的 `core-js` 版本。

3. 导入 Polyfill：在需要使用特定功能的文件中，按需导入所需的 Polyfill。例如，如果你需要填充 `Promise` 和 `Array.prototype.includes`，你可以按如下方式导入：

```javascript
import 'core-js/features/promise';
import 'core-js/features/array/includes';
```

这样只会加载和填充所需的功能，而不会加载整个 Polyfill 库。你可以根据具体的功能需求进行按需导入。

请注意，使用按需加载的方式可以减小应用程序的文件大小，并且只填充需要的功能，但需要确保在使用相关功能之前已经导入了相应的 Polyfill。



