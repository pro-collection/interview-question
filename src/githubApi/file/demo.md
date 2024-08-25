**关键词**：fetch keepalive 属性

`keepalive` 选项在 `fetch` 请求中的作用主要是允许在浏览器即将关闭或者用户即将离开当前页面时，仍然能够成功发送网络请求。这个选项的设计初衷是为了处理那些需要在页面生命周期结束时发送的统计或追踪数据的场景，比如用户的行为追踪数据、性能数据等。

### keepalive 选项的主要特点包括：

- **异步发送**：`keepalive` 选项允许请求在后台异步发送，即使在 `unload` 或 `beforeunload` 事件中触发。这确保了页面卸载过程不会因等待数据发送而延迟。
- **请求不会阻止页面关闭**：使用了 `keepalive` 选项的请求不会阻止浏览器关闭页面，提升了用户体验。
- **数据量限制**：为了保证功能的有效性和避免滥用，`keepalive` 请求的数据大小有限制。最新的浏览器通常限制请求体的大小在 64KB 左右。

- **用例限制**：考虑到 `keepalive` 选项设计的是为了处理小量且关键的数据，比如统计和追踪数据，因此它并不适合用于发送大量数据。

### 示例

以下是如何在 `fetch` 请求中使用 `keepalive` 选项的例子：

```javascript
window.addEventListener("beforeunload", (event) => {
  // 构造你想要发送的数据
  const data = {
    // ...一些追踪数据
  };

  // 发送请求到服务器
  fetch("https://yourserver.com/api/track", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true, // 使用 keepalive 选项
  });
});
```

这种方法非常适合收集页面关闭前的最后一些用户行为数据，以便于更准确地追踪用户在网页上的活动和体验。但要记住，`keepalive` 选项应当谨慎使用，并确保发送的数据量不会超过浏览器的限制。
