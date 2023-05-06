### 基础实现

可以使用闭包实现 promise 缓存的功能。下面是一个示例代码：

```js
function cachedPromise(promiseFunction) {
  let lastPromise = null;
  
  return function() {
    if (lastPromise !== null) {
      return lastPromise;
    }
    
    lastPromise = promiseFunction();
    return lastPromise;
  }
}

const promiseFunction = () => {
  // 这里可以是任何一个返回 Promise 的异步函数
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Resolved!');
    }, 2000)
  })
}

const cachedPromiseFunction = cachedPromise(promiseFunction);

cachedPromiseFunction().then(result => {
  console.log(result); // Resolved!
});

// 因为上次调用函数的 Promise 还未 resolve，所以这里直接返回上次的 Promise
cachedPromiseFunction().then(result => {
  console.log(result); // Resolved!
});
```

在上面的代码中，我们先定义了一个 `cachedPromise` 函数，它接收一个返回 Promise 的异步函数 `promiseFunction`，并返回一个新的函数。这个新函数会维护一个 `lastPromise` 变量，用来记录上一次调用 `promiseFunction` 函数返回的 Promise。

当第一次调用 `cachedPromiseFunction` 时，`lastPromise` 变量还没有值，因此会调用 `promiseFunction`，并将返回的 Promise 赋值给 `lastPromise` 变量。同时，返回这个 Promise。

当第二次调用 `cachedPromiseFunction` 时，由于 `lastPromise` 变量已经被赋值，表示上一次调用 `promiseFunction` 返回的 Promise 还没有返回，因此直接返回 `lastPromise` 变量，而不再调用 `promiseFunction`。

当第一个 Promise 返回时，会将 `lastPromise` 重置为空，这样下一次调用 `cachedPromiseFunction` 就会重新执行 `promiseFunction`。

通过这种方式，我们就实现了 promise 缓存的功能，即如果上一次调用的 Promise 没有返回，那么下一次调用函数依然会返回上一个 Promise。

### 如果上一次的函数调用 promise 已经返回，下一次调用就是一个新的 promise

修改上述的代码，让 `cachedPromise` 函数可以检测上一次的 Promise 是否已经完成，如果已经完成，则返回新的 Promise 对象。

下面是修改后的代码：

```
function cachedPromise(promiseFunction) {
  let lastPromise = null;
  
  return function() {
    if (lastPromise !== null) {
      if (lastPromise.isFulfilled()) { // 如果上一次 Promise 已经完成
        lastPromise = null; // 重置上一次 Promise
      } else {
        return lastPromise; // 直接返回上一次 Promise
      }
    }
    
    lastPromise = promiseFunction();
    return lastPromise;
  }
}

const promiseFunction = () => {
  // 这里可以是任何一个返回 Promise 的异步函数
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Resolved!');
    }, 2000)
  })
}

const cachedPromiseFunction = cachedPromise(promiseFunction);

cachedPromiseFunction().then(result => {
  console.log(result); // Resolved!
});

// 因为上次调用函数的 Promise 还未 resolve，所以这里直接返回上次的 Promise
cachedPromiseFunction().then(result => {
  console.log(result); // Resolved!
});

setTimeout(() => {
  // 上一次 Promise 已经完成，这里会返回新的 Promise 对象
  cachedPromiseFunction().then(result => {
    console.log(result); // Resolved!
  });
}, 3000);
```

在这段代码中，我们在闭包函数中判断上一次的 Promise 是否已经完成，如果已经完成，则将其重置为空，在下一次调用时会再次执行 `promiseFunction`，并返回新的 Promise 对象。

请注意，由于 `lastPromise` 变量被修改了，我们使用了一个名为 `isFulfilled()` 的方法来检测 Promise 是否已经完成。这个方法可以使用任何一个符合 Promises/A+ 规范的 Promise 库（如 bluebird.js）来实现。如果你使用的是原生的 Promise 对象，可以使用 `then()` 方法代替 `isFulfilled()`，如下所示：

```
if (typeof lastPromise.then !== 'function') {
  lastPromise = null; // 重置上一次 Promise
} else {
  return lastPromise; // 直接返回上一次 Promise
}
```

这样，我们就实现了一个可以检测 Promise 完成状态的 promise 缓存函数。


