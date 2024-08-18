**关键词**：手写 webpack loader

要在方法调用时上报调用源文件的地址，并且希望通过 webpack 编译时来实现，你可以通过编写一个自定义的 webpack loader 来操作源代码，为特定的方法调用插入上报的代码。自定义 loader 本质上是一个函数，该函数接收源码作为输入，对源码进行处理后返回新的源码。

### 步骤 1: 设计你的上报逻辑

首先明确你想要上报的信息和上报的方式。比如，你可能想要在方法调用时，插入一个上报函数调用，该函数包含当前文件的路径和文件名。

### 步骤 2: 创建自定义 Loader

你可以开始编写你的 loader。假设你有一个上报函数 `reportFunction(filePath)`，你希望自动为所有 `targetMethod()` 调用注入这个上报函数。

loader 文件 `report-loader.js` 可能看起来像这样：

```javascript
module.exports = function (source) {
  // 使用此 loader 处理的文件的路径
  const filePath = this.resourcePath;

  // 定义一个正则表达式匹配特定的方法调用，比如 targetMethod()
  const methodCallRegex = /targetMethod\(\)/g;

  // 替换匹配到的方法调用
  const modifiedSource = source.replace(methodCallRegex, function (match) {
    // 插入上报函数调用，传入文件路径
    return `reportFunction('${filePath}'); ${match}`;
  });

  return modifiedSource;
};
```

这个简单的 loader 使用正则表达式查找文件中所有的 `targetMethod()` 调用，并在每个调用前插入 `reportFunction(filePath)` 的调用。注意，考虑到文件路径可能需要处理才能安全地用作字符串字面量（例如，转义特殊字符），这里的实现做得很简单，可能需要根据你的具体需求调整。

### 步骤 3: 在 webpack 配置中使用你的 Loader

在你的 `webpack.config.js` 文件中，添加一个 `module.rules` 条目，以确定哪些文件应该通过你的 loader 处理：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 JavaScript 文件
        use: [
          {
            loader: "path/to/your/report-loader.js", // 使用自定义 loader 的路径
          },
        ],
      },
    ],
  },
};
```

确保将 `loader` 属性设置为你自定义 loader 文件的路径。

### 注意事项

1. **正则表达式**: 我在例子中使用的正则表达式非常简单，只匹配特定形式的方法调用。根据你的需要，可能要编写更复杂的正则表达式或使用其他方法（比如抽象语法树解析库，如 Babel）来更准确地识别和修改代码。

2. **安全性**: 自动修改源代码会带来风险，确保你的匹配和替换逻辑不会导致代码中出现意外的改变。

3. **性能**: 增加自定义 loader 可能会影响构建的速度，特别是匹配和修改逻辑比较复杂的时候。

编写和测试好你的 loader 后，就可以集成到你的项目中，通过 webpack 构建过程中自动执行所需的代码注入了。
