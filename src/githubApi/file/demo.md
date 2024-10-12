**关键词**：once 函数

以下是使用 JavaScript 实现一个`once`函数的方法：

```javascript
function once(func) {
  let hasRun = false;
  let result;
  return function () {
    if (!hasRun) {
      result = func.apply(this, arguments);
      hasRun = true;
    }
    return result;
  };
}
```

你可以这样使用这个函数：

```javascript
function expensiveOperation() {
  console.log("执行了昂贵的操作");
  return 42;
}

const memoizedOperation = once(expensiveOperation);

console.log(memoizedOperation()); // 执行了昂贵的操作，返回 42
console.log(memoizedOperation()); // 直接返回上次的结果 42，不再执行昂贵的操作
```

在这个实现中，`once`函数接收一个函数作为参数，并返回一个新的函数。新函数会记住第一次调用时的结果，后续调用直接返回这个结果，而不会再次执行传入的函数。
