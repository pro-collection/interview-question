**关键词**：原生路由监听

在原生 JavaScript 中，可以使用 window 对象上的 popstate 事件来监听路由的变化。popstate 事件在浏览器的历史记录发生变化时触发，包括当用户点击浏览器的前进或后退按钮、调用 history.pushState() 或 history.replaceState() 方法等。

下面是一个简单的示例代码，演示如何使用 popstate 事件监听路由的变化：

```javascript
// 监听 popstate 事件
window.addEventListener('popstate', function(event) {
  // 在这里可以执行路由变化后的处理逻辑
  console.log('路由发生了变化');
});

// 修改 URL 并添加一条历史记录
history.pushState(null, null, '/new-route');

// 或者使用 history.replaceState() 方法替换当前历史记录
// history.replaceState(null, null, '/new-route');
```

在上面的代码中，当 popstate 事件触发时，回调函数会被执行。你可以在回调函数中添加适当的处理逻辑，例如更新页面内容、重新渲染视图等。

需要注意的是，popstate 事件不会在页面加载时触发，因此如果你需要在页面加载时执行一些初始化的路由处理逻辑，可以将该逻辑封装为一个函数，并在加载时调用一次，然后再通过 popstate 事件监听路由的变化。

另外，还可以使用 history.state 属性来获取当前历史记录的状态对象，该对象可以在调用 history.pushState() 或 history.replaceState() 方法时传入。这样可以在 popstate 事件回调函数中访问和使用该状态对象。

```javascript
window.addEventListener('popstate', function(event) {
  var state = history.state;
  // 在这里可以访问和使用历史记录的状态对象
});
```

通过监听 popstate 事件，可以在原生 JavaScript 中轻松地监听和响应路由的变化，从而实现相应的页面切换和处理逻辑。
