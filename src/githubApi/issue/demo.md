**关键词**：arguments 参数、arguments 参数遍历

在 JavaScript 中，函数的 `arguments` 参数被设计为类数组对象，而不是真正的数组。这是因为 `arguments` 对象包含了函数调用时传入的所有参数，包括未命名的参数。它提供了一种方便的方式来访问和操作这些参数。

要遍历类数组对象，可以使用以下方法：

1. 使用 for 循环和索引：通过使用普通的 for 循环和索引来遍历类数组对象。
```javascript
function sum() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

sum(1, 2, 3);  // 输出：1 2 3
```

2. 使用 for...of 循环：从 ES6 开始，可以使用 for...of 循环来遍历可迭代对象，包括类数组对象。
```javascript
function sum() {
  for (let arg of arguments) {
    console.log(arg);
  }
}

sum(1, 2, 3);  // 输出：1 2 3
```

3. 将类数组对象转换为真正的数组后遍历：可以使用上述提到的类数组转换方法将类数组对象转换为真正的数组，然后使用数组的遍历方法进行遍历，如 `forEach()`、`map()` 等。
```javascript
function sum() {
  const args = Array.from(arguments);
  args.forEach(arg => {
    console.log(arg);
  });
}

sum(1, 2, 3);  // 输出：1 2 3
```

这些方法都可以用于遍历类数组对象，根据需求选择适合的方式进行操作。
