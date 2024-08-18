**关键词**：手写 webpack plugin

创建一个 webpack 插件需要遵循 webpack 插件的基本结构和原则，同时为了实现统计源码里的 `console.log` 调用数量与调用路径的目标，我们可能需要对 webpack 的编译过程有一定的了解，尤其是如何操作 webpack 的模块系统内部的原始源代码。

以下是创建这样一个插件的步骤与代码示例：

### 步骤 1: 定义插件类

首先，你需要定义一个 JavaScript 类。在类的 `apply` 方法中，你将会监听 webpack 的 `compilation` 钩子来访问并处理模块的源代码。

### 步骤 2: 监听适当的 webpack 钩子

针对源代码的处理，我们选择监听 `compilation` 阶段的 `optimizeModules` 钩子。在这个阶段，模块的原始源代码可以被访问和修改。

### 步骤 3: 处理源代码

处理每个模块的源代码，你可以使用简单的正则表达式或更高级的方法（如 AST 解析）来识别 `console.log` 的调用。在这个示例中，我将使用正则表达式来简化处理流程。

### 代码示例

下面是一个插件的基本实现：

```javascript
class ConsoleLogStatsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("ConsoleLogStatsPlugin", (compilation) => {
      compilation.moduleTemplates.javascript.hooks.render.tap("ConsoleLogStatsPlugin", (moduleSource, module) => {
        // 计算当前模块的 console.log 调用并记录文件路径
        const source = moduleSource.source();
        const consoleLogMatches = source.match(/console\.log\(/g) || [];

        if (consoleLogMatches.length > 0) {
          console.log(`模块 ${module.resource} 包含 ${consoleLogMatches.length} 次 console.log 调用。`);
        }

        return moduleSource;
      });
    });
  }
}

module.exports = ConsoleLogStatsPlugin;
```

### 使用该插件

要在你的 webpack 配置中使用这个插件，首先要导入它，然后将它的一个实例添加到配置的 `plugins` 数组中：

```javascript
const ConsoleLogStatsPlugin = require("./path/to/ConsoleLogStatsPlugin");

module.exports = {
  // ...其他配置...
  plugins: [
    new ConsoleLogStatsPlugin(),
    // ...其他插件...
  ],
};
```

### 注意事项

- **性能考虑**：直接操作源码可能对构建性能有一定影响。如果项目较大，可能需要考虑更高效的方式，例如仅在生产构建中运行该插件，或者使用更高效的代码分析方法。
- **正则表达式的局限性**：简单的正则表达式可能无法准确匹配所有 `console.log` 调用的场景，尤其是当代码中包含多行语句或复杂表达式时。更复杂的场景可能需要使用抽象语法树（AST）解析工具，如 Babel。
- **webpack 版本兼容性**：webpack 的插件 API 在不同的版本之间可能会有所变化。上述代码示例是基于假定的 API 结构编写的，实际使用时需要根据你的 webpack 版本调整 API 的使用。

此插件可以视为检测源代码中 `console.log` 使用情况的起点，可以根据具体需求进行扩展和优化。
