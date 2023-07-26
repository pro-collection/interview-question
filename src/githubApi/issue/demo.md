**关键词**：popstate

**`onpopstate` 事件只能监听到浏览器历史记录的前进和后退操作，无法直接监听到 `pushState` 或 `replaceState` 的调用**。这是因为 `pushState` 和 `replaceState` 方法可以修改浏览器历史记录而不触发 `onpopstate` 事件。

但是，您可以在调用 `pushState` 或 `replaceState` 之后手动触发 `popstate` 事件，来模拟类似的效果。示例如下：

```javascript
// 监听 popstate 事件
window.addEventListener('popstate', function(event) {
  console.log('popstate event triggered');
});

// 调用 pushState 方法
window.history.pushState(null, null, '/new-url');

// 手动触发 popstate 事件
var popStateEvent = new PopStateEvent('popstate', { state: null });
window.dispatchEvent(popStateEvent);
```

在上述示例中，我们首先通过 `addEventListener` 方法监听 `popstate` 事件。然后，我们调用 `pushState` 方法来修改浏览器历史记录，并在之后手动创建一个 `PopStateEvent` 对象，并使用 `dispatchEvent` 方法来触发 `popstate` 事件。

这样就可以实现在调用 `pushState` 或 `replaceState` 之后手动触发一个事件来模拟监听到 `pushState` 的效果。
