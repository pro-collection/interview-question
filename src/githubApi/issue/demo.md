Promise 构造函数是同步执行的，而 then 方法是异步执行的。

在 Promise 构造函数中，Promise 的状态（pending/resolved/rejected）是同步确定的。但是 Promise 中的异步操作可能还没有完成，因此 Promise 对象本身的值可能还没有可用的值。所以，当我们在构造函数中使用 resolve/reject 时，它们并不会立即触发 then 中注册的回调函数执行。

而 then 方法则是异步执行的。当我们在一个 Promise 对象上调用 then 方法并注册了回调函数时，这些回调函数并不会立即执行。相反，它们会被添加到一个任务队列中，等到当前 JavaScript 上下文中的所有同步代码执行完成后再执行。

这也是 Promise 非常重要的特性之一，即能够在异步任务完成后执行回调函数，避免了回调地狱等问题。