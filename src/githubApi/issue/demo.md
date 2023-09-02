**关键词**：前端防止移除水印

关于加水印的问题， 可以看这篇文档： https://github.com/pro-collection/interview-question/issues/351

关于如何防止移除水印：

可以通过监听 DOM 的变化来检测是否有人删除水印，可以使用 `MutationObserver API`。
`MutationObserver` 可以观察 DOM 树的变化，并在变化发生时触发回调函数。你可以在回调函数中检查是否有水印被删除，然后采取相应的措施。

以下是一个简单的示例代码，演示了如何使用 MutationObserver 监听 DOM 变化：

```javascript
// 目标节点
const targetNode = document.body;

// 创建 MutationObserver 实例
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        // 检查是否有子节点被删除
        if (mutation.removedNodes.length > 0) {
            // 在此处判断是否有水印被删除
            // 如果水印被删除，则重新插入水印的 DOM 元素到目标节点
            // 例如： targetNode.appendChild(watermarkElement);
        }
    }
});

// 配置 MutationObserver
const config = { childList: true, subtree: true };

// 开始观察目标节点
observer.observe(targetNode, config);
```

在上述代码中，我们创建了一个 MutationObserver 实例，并通过 `observe` 方法将其绑定到目标节点上。在回调函数中，我们使用 `mutation.removedNodes` 来检查是否有子节点被删除，如果发现水印被删除，则可以采取相应的措施来重新插入水印的 DOM 元素。

需要注意的是，MutationObserver API 是现代浏览器提供的功能，在老旧的浏览器中可能不支持。因此，在实际使用时，你需要对浏览器的兼容性进行测试和处理。

另外，如果水印被删除后立即加回去，你可以在检测到水印被删除时，立即执行插入水印的代码，以确保水印能够迅速地重新出现在页面上。
