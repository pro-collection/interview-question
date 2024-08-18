**关键词**：webpack loader 通信

在 webpack 中，loader 之间传递数据的常见方式是通过资源文件（即要处理的源文件本身）的内容。每个 loader 接收上一个 loader 的处理结果作为输入，并提供自己的输出给下一个 loader。这种方式适用于大多数使用场景。然而，在某些情况下，loader 需要在它们之间共享额外的状态或数据，而不仅仅是文件内容。对于这种需求，webpack 提供了一种机制，允许 loader 之间共享数据。

### 使用 `this.data`

在 webpack 4 及以后的版本中，一个 loader 可以利用它的 `this.data` 属性来共享会话数据。这个属性是特定于当前 loader 运行实例的，可以在 loader 的 `pitch` 阶段和正常的加载阶段之间共享数据。

```javascript
// pitch 阶段
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  data.sharedValue = "Hello from pitch phase";
};
```

在上面的代码片段中，`pitch` 方法设置了 `data.sharedValue`。这个 `pitch` 方法是可选的，它在 loader 处理资源之前执行。`data` 对象会从 `pitch` 阶段传递到正常的加载阶段，从而可以在后者中访问之前设置的共享值。

```javascript
// 正常的加载阶段
module.exports = function (content) {
  const callback = this.async();
  const sharedValue = this.data.sharedValue;

  // 这里可以根据 sharedValue 来处理 content
  console.log(sharedValue); // 将输出 "Hello from pitch phase"

  callback(null, content);
};
```

### 使用自定义属性

一些特定的 loader 实现可能通过向源文件内容附加额外的信息来实现间接的通信。例如，一个 loader 可以在文件内容的末尾追加一些注释或者特殊标记，然后下一个 loader 可以读取这些注释或标记来获取必要的信息。然而，这种方法是高度依赖上下文且难以维护的，不推荐在实际项目中使用。

### 注意事项

当使用一种方法在 loader 之间共享数据时，请注意数据的共享是在每个模块的构建过程中进行的，这些数据是特定于当前处理中的资源文件的。通过这种方式共享的数据不应该包含敏感信息，也不应该用于在不同模块或不同构建之间共享全局状态。

理解这些机制以及如何在 loader 之间正确共享数据是创建高效可维护 webpack 构建流程的关键。
