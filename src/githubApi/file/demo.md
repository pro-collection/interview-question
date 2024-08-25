**关键词**：sendBeacon 发送请求

`navigator.sendBeacon()` 方法使得网页可以异步地将数据发送到服务器，与页面的卸载过程同时进行，这一点非常重要，因为它允许在不影响用户体验的情况下，安全地结束会话或者发送统计数据。这方法主要用于追踪和诊断信息，特别是在需要确保数据被成功发送到服务器的场景中——比如记录用户在网页上的行为数据。

### 基本语法

```javascript
navigator.sendBeacon(url, data);
```

- `url`：一个字符串，代表您想要发送数据到的服务器地址。
- `data`：可选参数，要发送的数据。可以是 `ArrayBufferView`、`Blob`、`DOMString`、或者 `FormData` 对象。

### 返回值

- 该方法返回一个布尔值：如果浏览器成功地将请求入队进行发送，则返回 `true`；如果请求因任何原因未能入队，则返回 `false`。

### 特点

1. **异步**：`sendBeacon()` 发送的请求是异步的，不会阻塞页面卸载过程或者延迟用户浏览器的关闭操作。
2. **小数据量**：适用于发送少量数据，如统计信息和会话结束信号。
3. **不影响关闭**：它允许在页面卸载或关闭时发送数据，而不会阻止或延迟页面的卸载过程。
4. **可靠**：它确保数据能够在页面退出时被送出，相较于 `beforeunload` 或 `unload` 事件中使用同步的 `XMLHttpRequest` 更为可靠。

### 使用示例

发送一些统计数据到服务器的简单示例：

```javascript
window.addEventListener("unload", function () {
  var data = { action: "leave", timestamp: Date.now() };
  navigator.sendBeacon("https://example.com/analytics", JSON.stringify(data));
});
```

在上面的例子中，当用户离开页面时，我们监听 `unload` 事件，并在该事件触发时使用 `navigator.sendBeacon()` 方法发送一些统计数据到服务器。使用 `JSON.stringify(data)` 将数据对象转换成字符串形式，因为 `sendBeacon` 需要发送的数据必须是文本或二进制形式。

### 兼容性与限制

- 虽然 `navigator.sendBeacon()` 被现代浏览器广泛支持，但在使用前最好检查浏览器兼容性。
- 发送数据量有限制，一般适用于发送小量的数据。
- 某些浏览器实现可能有细微差异，建议在实际使用前进行充分测试。

通过使用 `navigator.sendBeacon()`，开发者可以确保在页面卸载过程中，重要的数据能够被可靠地发送到服务器，从而改善数据收集的准确性和用户体验。
