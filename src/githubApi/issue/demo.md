**关键词**：tree shaking 失效

在以下情况下，`webpack` 的 `tree-shaking` 可能会失效：

1. 使用了 `sideEffects` 属性：在 webpack 的配置文件中，如果设置了 `sideEffects: false`，则 webpack 会假设所有模块都没有副作用，因此不会进行 tree-shaking。这通常用于避免某些模块被误标记为无用代码而被删除。

2. 动态导入：如果你使用了动态导入（例如使用了 `import()` 或 `require.ensure()`），webpack 无法静态分析模块的导入和导出，因此无法进行 tree-shaking。

3. 使用了 `commonjs` 模块语法：如果你的代码中使用了 `commonjs` 模块语法（例如使用了 `require()` 或 `module.exports`），webpack 无法进行静态分析，因此无法进行 tree-shaking。

4. 未使用 ES6 模块语法：tree-shaking 只能对 ES6 模块语法进行优化，如果你的代码中没有使用 ES6 模块语法，webpack 将无法进行 tree-shaking。

5. 模块被动态引用或条件引用：如果模块的引用方式是动态的（例如在循环或条件语句中引用），或者通过字符串拼接来引用模块，webpack 无法确定哪些模块会被引用，因此无法进行 tree-shaking。

6. 使用了副作用的代码：如果你的代码中包含有副作用的代码（例如在模块的顶级作用域中执行了一些操作），webpack 无法确定哪些代码是无用的，因此无法进行 tree-shaking。

需要注意的是，即使 tree-shaking 可能会失效，webpack 仍然会进行其他优化，例如代码压缩和代码分割等。同时，你可以通过设置 `mode` 为 `production`，来启用 webpack 的优化功能，包括 tree-shaking。
