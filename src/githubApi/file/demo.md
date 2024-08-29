**关键词**：beforeunload 和 unload 事件

在页面关闭时执行特定的方法，你可以使用 `window` 对象的 `beforeunload` 和 `unload` 事件。不过，这两个事件有一些微妙的区别和适用场景。

### 使用 `beforeunload` 事件

`beforeunload` 事件在窗口、文档或其资源即将卸载时触发，这一点让它成为在页面关闭前提示用户保存未保存更改的理想选择。在绑定到该事件的处理函数中，你可以执行特定的逻辑，但请注意，按照现代浏览器的安全策略，除非你设置了 `event.returnValue`，否则不会显示自定义的离开提示信息。

```javascript
window.addEventListener("beforeunload", (event) => {
  // 在这里执行你的清理逻辑或者其他操作
  // 例如，发送一个统计日志
  navigator.sendBeacon("/log", "用户即将离开页面");

  // 显示离开提示（大多数现代浏览器不支持自定义文本）
  event.returnValue = "您确定要离开此页面吗？";
});
```

### 使用 `unload` 事件

`unload` 事件在用户即将从页面导航走，或关闭页面时触发。你可以在这个事件的处理函数中执行不能阻止页面卸载的清理逻辑。不过需要注意，这个事件的执行时间非常短，某些操作（例如异步操作）可能无法完成。

```javascript
window.addEventListener("unload", (event) => {
  // 执行简短的同步操作，例如发送统计信息
  // 注意：这种情况下 navigator.sendBeacon 是更好的选择
});
```

### 使用 `navigator.sendBeacon`

对于在页面卸载时需要发送数据到服务器的情况，使用 `navigator.sendBeacon` 方法是一种更可靠的方式。它有效地解决了通过异步 AJAX 请求可能导致的数据不被送出的问题。

```javascript
window.addEventListener("unload", (event) => {
  navigator.sendBeacon("/log-out", "用户离开");
});
```

### 注意事项

- 不是所有浏览器都完全一样地支持这些事件和 `navigator.sendBeacon` 方法。实施时应当考虑兼容性。
- 在 `beforeunload` 和 `unload` 事件中执行大量的同步操作或长时间运行的脚本可能会导致用户体验下降。推荐尽量使用简洁快速的逻辑。
- `beforeunload` 事件可以控制是否提示用户离开页面的确认对话框，但自定义的确认对话框信息可能不被所有浏览器支持。
- 使用 `navigator.sendBeacon` 来发送数据是因为它能在请求中携带足够的数据量，且即使页面卸载过程中也能确保数据被发送。

根据你的应用需求，选择合适的事件和方法，确保页面关闭时能够执行你的逻辑。
