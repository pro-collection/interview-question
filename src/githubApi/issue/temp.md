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
