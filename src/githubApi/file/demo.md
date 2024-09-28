**关键词**：循环中的异步

在 JavaScript 中，处理异步函数时，`for` 循环和 `forEach` 方法之间的行为有显著差异，尤其是当你试图在循环体中使用 `async/await` 时。理解这些差异对于编写正确且高效的异步代码是很重要的。

### 使用 `forEach` 调用异步函数

`Array.prototype.forEach` 方法用于对数组的每个元素执行一次提供的函数，但它不会等待异步操作完成。换句话说，即便是在 `forEach` 循环里使用了 `async` 函数，这个 `async` 函数依旧会立即执行，但 `forEach` 不会等待它完成。

```javascript
const array = [1, 2, 3];

array.forEach(async (item) => {
  await doAsyncOperation(item); // 将立即开始但不会等待完成
});

console.log("Finished"); // 这行代码不会等待上面的异步操作完成就执行
```

上面的代码中，`doAsyncOperation` 会对数组中的每个元素立即开始执行，但 `forEach` 不会等待它们完成。因此，`console.log('Finished')` 会在所有异步操作完成之前执行。

### 使用 `for` 循环调用异步函数

与 `forEach` 方法不同，`for` 循环允许在每次迭代时使用 `await` 关键字等待异步操作的完成。因此，如果你需要按顺序等待每个异步操作完成，`for` 循环是更好的选择。

```javascript
const array = [1, 2, 3];

(async () => {
  for (let item of array) {
    await doAsyncOperation(item); // 将等待异步操作完成后再继续下一次迭代
  }

  console.log("Finished"); // 仅在所有异步操作完成后执行
})();
```

这里，每个 `doAsyncOperation` 调用会在下一个开始之前完成。`console.log('Finished')` 等到所有异步操作完成后才执行，这样就能保证异步操作的完成顺序。

### 总结

- 当你不关心异步操作完成的顺序，或不需要等待所有异步操作完成时，可以使用 `forEach`。
- 如果你需要按顺序等待每个异步操作完成，使用 `for` 循环（或其他支持 `await` 的循环，如 `for...of` 或传统的 `for` 循环）是一个更好的选择。
- 一般而言，当涉及到异步函数时，使用 `for` 循环（允许 `await`）比 `forEach` 方法（不等待异步调用完成） 提供了更大的灵活性和控制力。

### 参考

可以参考下面的文档： https://github.com/lgwebdream/FE-Interview/issues/934
