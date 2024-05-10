**关键词**：webpack 分割代码

在 webpack 中，`splitChunks`选项是`optimization`对象的一个属性，可以用来定义如何分割代码块。默认情况下，webpack 会将所有来自`node_modules`的模块分割到一个叫做`vendors`的 chunk 中，并且将共享或来自异步请求的模块分割成不同的 chunks。通过配置`splitChunks`选项，你可以控制这些行为，创建更细致的代码分割策略。以下是如何使用`splitChunks`来优化你的 bundle。

### 基本配置

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "all", // 分割所有类型的chunks：初始和动态加载的chunk
    },
  },
};
```

在这个配置中，`chunks: 'all'`指示 webpack 对同步和异步引入的模块都进行分割。webpack 会根据内部的一些默认标准（如模块大小、请求的 chunks 数目等）来决定是否分割一个模块。

### 基础属性配置

下面的表格详细描述了 `splitChunks` 配置选项及其作用：

| 配置选项                         | 类型                            | 默认值         | 说明                                                                                         |
| -------------------------------- | ------------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `chunks`                         | `'all'`, `'async'`, `'initial'` | `'async'`      | 设置优化哪些类型的 chunk。                                                                   |
| `minSize`                        | Number                          | `20000` (20kb) | 生成 chunk 的最小体积（以字节为单位）。                                                      |
| `maxSize`                        | Number                          | `0`            | 尝试将 chunk 分割成不大于指定体积的块。此选项正在实验中，并可能在将来的 webpack 版本中更改。 |
| `minChunks`                      | Number                          | `1`            | 模块被分享到的最少 chunk 数。                                                                |
| `maxAsyncRequests`               | Number                          | `5`            | 按需加载时的最大并行请求数。                                                                 |
| `maxInitialRequests`             | Number                          | `3`            | 一个入口点的最大并行请求数。                                                                 |
| `automaticNameDelimiter`         | String                          | `'~'`          | 用于生成名称的分隔符。                                                                       |
| `name`                           | Boolean or String or Function   | `true`         | 分割块的名称。                                                                               |
| `cacheGroups`                    | Object                          | -              | 一个对象，它定义了对于.cacheGroups 的子选项，用来控制缓存组聚合和生成的 chunks。             |
| `cacheGroups.test`               | RegExp or Function              | -              | 控制哪些模块被这个缓存组捕捉。                                                               |
| `cacheGroups.priority`           | Number                          | `0`            | 缓存组点击时的优先级，数值越大，优先级越高。                                                 |
| `cacheGroups.reuseExistingChunk` | Boolean                         | `true`         | 如果当前块包含已从主 bundle 分割的模块，则重用它。                                           |
| `cacheGroups.filename`           | String or Function              | -              | 允许为生成的 chunk 自定义文件名。                                                            |

以下是针对上述表格中提及的某些属性的进一步说明：

- `chunks`选项指定是对哪些 chunks 应用这些优化措施。它可以是三个值之一：'all'会影响所有的 chunks，这使得在异步和非异步 chunks 之间共享模块成为可能；'async' 仅仅影响被异步加载的 chunks；'initial' 仅影响初始加载的 chunks。

- `minSize`和`maxSize`用于控制 webpack 试图以多大的 chunk 为目标。`minSize`可以避免 chunks 过小，而`maxSize`可以帮助进一步分割大的 chunks。

- `cacheGroups`是配置高度定制化的代码分割策略的地方。默认情况下 webpack 会将来自 `node_modules` 文件夹的代码分割到一个叫做 `vendors`的 chunk 中，另外 webpack 会将重复引入的代码分割到一个叫做 `default` 的 chunk 中。在这里可以覆盖这些默认设置，或是增加新的缓存组。

使用实例：

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000, // 最小 30kb
      maxSize: 0, // 默认无上限
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace("@", "")}`;
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 高级配置 - 缓存组

缓存组（cacheGroups）能让你对分割出来的 chunks 进一步细分和控制。

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity, // 允许在一个入口处无限多的并行请求
      minSize: 0, // 生成chunk的最小体积（以字节为单位）
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 正则表达式，用于测试模块路径，匹配node_modules目录下的模块
          name(module) {
            // 得到模块名，可能是node_modules包名称的一部分
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace("@", "")}`; // 创建chunk名
          },
        },
      },
    },
  },
};
```

这个配置创建了一个缓存组`vendor`，它会将所有从`node_modules`目录导入的模块分割到不同的 chunk 中，并为每个包创建一个以`npm`开头的 chunk 名。例如，如果你的应用依赖于`lodash`和`react`，应用中就会有`npm.lodash`和`npm.react`两个额外的 chunks。

### 动态导入

当你使用像`import()`这样的动态导入语法时，`splitChunks`插件会自动进行代码分割。

```javascript
function getComponent() {
  // 当我们调用 import() 时，webpack 会对 lodash 进行代码分割
  return import("lodash").then(({ default: _ }) => {
    const element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    return element;
  });
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

在这个例子中，`lodash`会被分成一个单独的 chunk。当`getComponent`函数执行并调用`import()`时，`lodash`库会作为一个单独的异步 chunk 加载进来。

通过`splitChunks`的适当配置，我们可以大幅度减小初始加载所需的时间，并确保用户只下载当前真正需要的代码，这样就可以加快应用程序的交互速度。
