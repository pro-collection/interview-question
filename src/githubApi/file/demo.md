**关键词**：侦听器 watchEffect

Vue 3 引入了 Composition API，其中包括一个强大的函数 `watchEffect`，用于侦听响应式状态的变化，并当响应式状态变化时自动执行。

### 基本用法

`watchEffect` 接收一个函数作为参数，Vue 将会自动跟踪这个函数内部使用的所有响应式状态（响应式引用、响应式对象等）。当这些状态变化时，`watchEffect` 将重新执行这个函数。

```javascript
import { ref, watchEffect } from "vue";

const count = ref(0);

watchEffect(() => {
  console.log(count.value);
});
```

在上面的示例中，每当 `count` 的值发生变化时，`watchEffect`回调函数都会被执行，并打印 `count` 的新值。

### 立即执行

与 `watch` API 不同，`watchEffect` 在初次调用时会立即执行一次回调函数。这对于根据响应式状态进行初始化设置非常有用。

### 清理副作用

`watchEffect` 的回调函数可以返回一个清理函数，用来在回调函数重新执行之前进行清理。这就像组件的 `beforeDestroy` 钩子函数，用来防止内存泄露等问题。

```javascript
watchEffect((onInvalidate) => {
  const timer = setInterval(() => {
    /* ... */
  }, 1000);

  // 当侦听器重新执行或组件卸载时，清理定时器
  onInvalidate(() => {
    clearInterval(timer);
  });
});
```

### 控制侦听

`watchEffect` 函数还可以接收一个第二个参数——一个选项对象，用来控制侦听器的行为。例如，通过设置 `flush` 选项，你可以控制执行时机是在组件更新之前、之后，还是同步执行。

```javascript
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: "post", // 'pre', 'post', 或 'sync'
  }
);
```

### 使用场景

`watchEffect` 适用于以下场景：

- 自动收集依赖：不需要像 `watch` 那样明确指定侦听的源。
- 初始化时的副作用：例如，根据响应式状态的初始值进行 DOM 操作、发送请求等。
- 定期自动清理：比如，自动清理定时器、取消订阅等。

`watchEffect` 提供了一种更为简洁和自动化的方式来响应状态变更，使得管理副作用（side effects）的逻辑更加直观和易于维护。
