**关键词**：webpack mode

在 webpack 中，`mode` 属性用来指定当前的构建环境是：`development`、`production` 或者是 `none`。设置 `mode` 可以使用 webpack 内置的函数，默认值为 `production`。

`mode` 属性的主要作用是：根据当前的构建环境，启用 webpack 内置在该环境下推荐的优化。

### mode 的具体作用包括：

1. **development**

   - 主要优化了增量构建速度和开发体验。
   - `process.env.NODE_ENV` 的值设为 `development`。
   - 启用热替换模块（Hot Module Replacement）。
   - 启用开发工具（如调试源码的 source map）以更好地进行调试。

2. **production**

   - 一些处理优化，以提升应用在生产环境的性能。
   - `process.env.NODE_ENV` 的值设为 `production`。
   - 启用代码压缩（例如 TerserPlugin）。
   - 删除 dead code（通过 Tree Shaking）。
   - 作用域提升等各种性能优化措施。

3. **none**
   - `mode` 设置为 `none` 则不启用任何默认优化选项，`process.env.NODE_ENV` 也不会被设置，默认为 `production`。

### 使用方法：

在 webpack 配置文件中，可以直接设置 `mode` 的值：

```javascript
module.exports = {
  mode: "development", // 'production' 或 'none'
  // 其他配置...
};
```

或者，在命令行中使用 `--mode` 参数：

```bash
webpack --mode=production
```

设置 mode 是告诉 webpack 使用其内部的优化策略，各个模式预定义了一些 webpack 的行为，开发者可以不需要进行详细的配置，也能快速启动一个针对特定环境优化过的构建过程。
