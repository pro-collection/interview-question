**关键词**：退出浏览器发送积压请求数据

退出浏览器时发送积压的埋点数据请求是 web 开发中的一个常见需求，尤其是在需要确保用户活动数据尽可能准确地被记录的场景下。实现这一需求的关键在于捕获用户关闭浏览器或离开页面的时刻，并在这一时刻尽可能快速地发送所有积压的数据。由于浏览器对于即将关闭时发出的请求处理方式不同，这一过程可能会有些复杂。

### 使用 `navigator.sendBeacon()`

`navigator.sendBeacon()` 方法允许你在浏览器会话结束时异步地向服务器发送小量数据。这个方法的设计初衷就是为了解决上述问题。`sendBeacon()` 在大多数现代浏览器中得到支持，并且其异步特性意味着它不会阻塞页面卸载或影响用户体验。

```javascript
window.addEventListener("beforeunload", function (event) {
  var data = {
    /* 收集的埋点数据 */
  };
  var beaconUrl = "https://yourserver.com/path"; // 你的服务器接收端点

  navigator.sendBeacon(beaconUrl, JSON.stringify(data));
});
```

### 使用 `fetch()` API 与 `keepalive` 选项

如果因某种原因 `navigator.sendBeacon()` 不能满足需求，`fetch()` API 的 `keepalive` 选项是另一个选择。这个选项允许你发送一个保持存活状态的请求，即使用户已经离开页面。但是，需要注意的是，使用 `keepalive` 选项发送的请求有大小限制（大约为 64KB）。

```javascript
window.addEventListener("beforeunload", function (event) {
  var data = {
    /* 收集的埋点数据 */
  };
  var beaconUrl = "https://yourserver.com/path"; // 你的服务器接收端点

  fetch(beaconUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true, // 保持请求存活
  });
});
```

### 注意事项

- **浏览器兼容性**：尽管 `navigator.sendBeacon()` 和 `fetch()` 的 `keepalive` 选项被许多现代浏览器支持，但在实施解决方案时仍然需要考虑目标用户可能使用的浏览器类型和版本。
- **数据量限制**：`sendBeacon()` 和 `keepalive` 选项的请求都有数据量限制。确保不要发送超过限制大小的数据。
- **可靠性**：虽然这些方法能够提高数据发送的成功率，在浏览器关闭时发送数据的操作本身依然不能保证 100% 的成功率，特别是在网络状况不佳的情况下。

通过上述方法，你可以在浏览器即将关闭时尝试发送积压的埋点数据，从而尽可能减少数据丢失的情况。
