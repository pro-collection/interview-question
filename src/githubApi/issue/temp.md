在 ECMAScript Promise 标准中，本身并没有提供 Promise 取消的机制。但是在实践中，可以通过一些技巧来实现 Promise 的取消。

当 Promise 还没有被 resolve 或 reject 时，我们可以使用 `AbortController` 来取消 Promise。`AbortController` 是一个新的 Web API，它可以用来取消任何异步操作，包括 Promise。下面是一个简单的示例：

```javascript
const controller = new AbortController();
const signal = controller.signal;

const promise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    resolve("Promise resolved");
  }, 5000);

  // 监听 signal 的 abort 事件，当 abort 被触发时，清除定时器，并 reject Promise
  signal.addEventListener("abort", () => {
    clearTimeout(timeout);
    reject("Promise aborted");
  });
});

// 3 秒后取消 Promise
setTimeout(() => {
  controller.abort();
}, 3000);

promise.then((value) => {
  console.log(value); // 不会打印，因为 Promise 已经被取消了
}).catch((error) => {
  console.log(error); // 打印 "Promise aborted"
});
```

在上面的示例中，我们创建了一个新的 `AbortController` 对象，然后使用 `signal` 属性将其传递给 Promise 的构造函数。接着，我们在 Promise 内部使用 `signal.addEventListener()` 方法监听 `abort` 事件，当事件触发时，清除定时器，并 reject Promise。最后，我们通过 `controller.abort()` 方法在 3 秒后取消 Promise。当 Promise 被取消时，它将会执行 `catch()` 方法中的回调函数，并打印 "Promise aborted"。
