**关键词**：promise 状态

`Promise` 在 JavaScript 中是一种非常有用的异步编程构造，它代表了一个可能现在、将来或永远都不会完成的操作的结果。每个`Promise`对象都会经历以下三种状态之一：

### Promise 的三种状态：

1. **Pending (待定)**: 这是`Promise`的初始状态，表示异步操作尚未完成，也尚未失败。
2. **Fulfilled (已兑现)**: 表示与`Promise`相关联的异步操作已成功完成。
3. **Rejected (已拒绝)**: 表示与`Promise`相关联的异步操作已失败。

### 状态转换：

- **从 Pending 到 Fulfilled**:

  - 当异步操作成功完成时，调用`resolve()`函数，此时 Promise 的状态会从`Pending`变为`Fulfilled`。
  - 这时`.then()`方法中注册的成功处理函数（如果有的话）会被调用。

- **从 Pending 到 Rejected**:
  - 当异步操作失败或出现错误时，调用`reject()`函数，此时 Promise 的状态会从`Pending`变为`Rejected`。
  - 这时`.catch()`方法中注册的失败处理函数（如果有的话）会被调用。

一旦`Promise`的状态从`Pending`变为`Fulfilled`或`Rejected`，它就不能再变为任何其它状态，即`Promise`的状态是不可逆的。相应地，`resolve`和`reject`函数也只能有效地各自调用一次；额外的调用将被忽略。

### 转换时机：

- `Promise`状态的转换时机取决于异步操作何时完成或失败。
- 使用`resolve()`或`reject()`函数明确地标记异步操作的成功或失败。
- 调用`resolve()`后，所有挂在该`Promise`上的`.then()`中成功处理函数将被异步调用。
- 调用`reject()`后，所有挂在该`Promise`上的`.catch()`中失败处理函数将被异步调用。

### 示例：

下面是一个简单的`Promise`示例，它演示了如何创建`Promise`，以及`Promise`的状态如何从`Pending`转变为其他状态：

```javascript
let promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true; // 假设这是根据异步操作结果而定的逻辑
    if (success) {
      resolve("Operation successful"); // 从 Pending 到 Fulfilled
    } else {
      reject("Operation failed"); // 从 Pending 到 Rejected
    }
  }, 1000);
});

// 监听 Promise 的结果
promise.then(
  (value) => console.log(value), // 成功处理函数
  (error) => console.log(error) // 失败处理函数
);
```

在这个示例中，`setTimeout`模拟了异步操作，`success`变量代表操作是否成功。根据`success`的值，`promise`的状态会相应地转换成`Fulfilled`或`Rejected`。
