**关键词**：侦听器副作用

在 Vue 3 中，清理副作用主要指的是在一个响应式侦听器（例如：`watch` 或 `watchEffect`）中，当侦听的响应式状态（或侦听的回调函数）重新执行之前或组件销毁时，移除或停止之前创建的资源，以避免内存泄漏、性能问题或意外的行为。下面列举了一些需要清理副作用的典型情况：

### 1. **使用定时器时**

当你在侦听器的回调函数中设置了定时器（如使用`setInterval`或`setTimeout`），并且不希望这个定时器在回调函数下次执行时仍然活动，你就需要在回调函数下一次执行之前清理这个定时器。

```javascript
watchEffect((onInvalidate) => {
  const timer = setInterval(() => {
    // 执行一些逻辑
  }, 1000);

  // 清理函数
  onInvalidate(() => {
    clearInterval(timer);
  });
});
```

### 2. **订阅外部或异步资源时**

当你订阅了一些外部资源，如 WebSocket 连接、外部 API 的实时数据流、或是自定义事件监听器，如果这些资源在组件卸载后继续活动，可能会导致内存泄漏或其他意外行为。

```javascript
watchEffect((onInvalidate) => {
  const ws = new WebSocket("ws://example.com/feed");

  ws.onmessage = (message) => {
    // 处理消息
  };

  // 侦听器清理函数
  onInvalidate(() => {
    ws.close();
  });
});
```

### 3. **响应式引用发生变化时**

当你侦听的响应式引用（如 `ref` 或 `reactive` 对象）在回调函数生命周期中发生变化时，如果回调生产了外部副作用（比如修改了外部状态、操作了 DOM、设置了全局事件监听器等），你可能需要清理这些副作用，避免它们在重新计算或组件卸载时造成问题。

```javascript
const user = ref(null);

watchEffect((onInvalidate) => {
  // 假设fetchUser返回一个取消订阅或清理资源的函数
  const unsubscribe = fetchUser(user.value, (newUser) => {
    user.value = newUser;
  });

  onInvalidate(() => {
    unsubscribe();
  });
});
```

### 为什么要清理副作用

清理副作用是为了防止不必要的资源占用和潜在的内存泄漏，尤其是在使用外部资源、设置定时器、或订阅数据时。Vue 提供的`onInvalidate`回调允许在侦听器重新运行之前或组件销毁时执行清理逻辑，确保应用资源被适当管理和释放。
