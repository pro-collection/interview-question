JavaScript异步解决方案的发展历程主要有以下几个阶段：

1. 回调函数

最初，JavaScript采用回调函数的方式来解决异步编程问题。回调函数即在异步任务完成后调用的回调函数。例如，`setTimeout`函数就是一个使用回调函数的例子。

```javascript
setTimeout(() => {
  console.log('Hello, world!');
}, 1000);
```

回调函数的优点是简单易懂，缺点是嵌套层次多、代码难以维护。

2. jQuery.Deferred()    

jQuery.Deferred()是jQuery提供的一种异步编程解决方案。它是一种Promise风格的API，使得异步操作可以更加简单和可读性更高。

jQuery.Deferred()可以用于串行和并行异步操作的组织和控制，避免了回调地狱和代码复杂性。

在使用过程中，通过使用jQuery.Deferred()的resolve()和reject()方法来决定异步操作的成功或失败，并且可以使用then()方法添加成功和失败的回调函数。

jQuery.Deferred()主要的优点包括：

- 简单易用：可以通过链式操作来组织和控制异步操作。
- 可读性高：可以使用then()方法添加成功和失败的回调函数，使代码的意图更加明确。
- 良好的兼容性：jQuery.Deferred()已经成为了jQuery的一部分，可以与其他jQuery的功能和插件良好地协作。

而缺点则包括：
- jQuery.Deferred()不能被取消，且对于异步操作的结果状态只能被设置一次。
- 依赖于jQuery库：因为jQuery.Deferred()是jQuery的一部分，所以需要依赖于jQuery库，不适合非jQuery项目。

3. Promise

Promise是ES6引入的一种异步编程解决方案，用于解决回调函数的嵌套问题。Promise是一个对象，表示异步操作的最终完成或失败。它有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise的优点是解决了回调函数嵌套的问题，使得代码可读性和可维护性更好。缺点是语法相对复杂。

```javascript
// Promise示例
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 1000);
  });
}

fetchData().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

4. Generator

Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。


5. Async/Await

ES8引入了Async/Await语法，使得异步编程更加简单和可读。Async/Await是基于Promise实现的，可以看作是对Promise的一种封装。Async/Await语法可以让异步代码像同步代码一样书写，让代码的可读性更高。

```javascript
// Async/Await示例
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 1000);
  });
}

async function run() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

run();
```

Async/Await 的优点是语法简单易懂、可读性好，缺点是需要掌握Promise的基本用法。

综上，JavaScript 异步编程方案的发展历程从最初的回调函数到Promise再到Async/Await，每个阶段都解决了前一阶段存在的问题，使得异步编程更加方便和易读。但是，不同方案都有自己的优缺点，需要根据实际情况选择使用。
