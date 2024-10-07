**关键词**：异常处理

题目是：以下代码有错吗？如果有错，应该如何改正？

```js
try {
  setTimeout(() => {
    throw new Error("err");
  }, 200);
} catch (err) {
  console.log(err);
}

try {
  Promise.resolve().then(() => {
    throw new Error("err");
  });
} catch (err) {
  console.log(err);
}
```

**解答**

才知道 try...catch 不能异步捕获代码错误。在 JavaScript 中，setTimeout 是一个异步函数，它的回调函数会在指定的延时后被放入事件队列，等待当前执行栈清空后才执行。因此，当 setTimeout 的回调函数执行并抛出错误时，try...catch 已经执行完毕，无法捕捉到异步回调中的错误。
正确的做法是在异步操作中直接处理错误，例如使用回调函数、Promises 或者 async/await 结合 try...catch

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw new Error("err");
    } catch (err) {
      reject(err);
    }
  }, 200);
})
  .then(() => {
    // 正常执行时的处理逻辑
  })
  .catch((err) => {
    console.log(err); // 这里会捕捉到错误
  });
```

至于第二个例子，尝试使用 try...catch 来捕捉一个在 Promise 链中抛出的错误。这种方式同样是无效的，因为 try...catch 不能捕捉到在 Promise 链中的异步错误。

在 Promise 中抛出一个错误（例如通过 throw 语句）会导致 Promise 被拒绝（或失败）。要正确处理这个错误，需要在 Promise 链中使用.catch 方法或者在一个 async 函数中使用 try...catch。

```js
// 方法一
Promise.resolve()
  .then(() => {
    throw new Error("err");
  })
  .catch((err) => {
    console.log(err); // 这里会捕捉到错误
  });

// 方法二
async function handleError() {
  try {
    await Promise.resolve().then(() => {
      throw new Error("err");
    });
  } catch (err) {
    console.log(err); // 这里会捕捉到错误
  }
}

handleError();
```

**补充**

![1](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0729c13766834971947e0f9c78a00b43~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.avis#?w=686&h=182&s=24314&e=png&b=fcfcfc)
