### Set 遍历

在 JavaScript 中，`Set` 对象表示值的集合，在这个集合中每个值只出现一次。`Set` 对象是可迭代的，因此你可以使用多种方法来遍历它：

1. **for...of 循环**:

可以使用 `for...of` 循环来遍历 `Set`。

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

for (let value of mySet) {
  console.log(value); // 输出: 1, 2, 3, 4, 5
}
```

2. **forEach 方法**:

`Set` 对象有一个 `forEach` 方法，就像 `Array` 一样。你可以提供一个回调函数，该函数将对 `Set` 中的每个元素执行。

```javascript
mySet.forEach((value) => {
  console.log(value); // 输出: 1, 2, 3, 4, 5
});
```

3. **扩展运算符 (...)**:

扩展运算符可以将 `Set` 对象转换为数组。

```javascript
let array = [...mySet];
// 现在可以使用数组的遍历方法
for (let i = 0; i < array.length; i++) {
  console.log(array[i]); // 输出: 1, 2, 3, 4, 5
}
```

4. **Array.from 方法**:

`Array.from` 方法可以将 `Set` 对象转化为数组。

```javascript
let array = Array.from(mySet);
// 现在可以使用数组的遍历方法
array.forEach((value) => {
  console.log(value); // 输出: 1, 2, 3, 4, 5
});
```

5. **keys(), values(), entries() 方法**:

尽管 `Set` 对象没有键名只有键值，`keys()` 和 `values()` 方法的行为事实上是一样的，它们都会返回一个新的可迭代对象。`entries()` 方法也存在于 `Set` 上，但由于 `Set` 没有键名，它返回的迭代器将会为每个值提供一个[value, value]形式的数组。

```javascript
for (let value of mySet.keys()) {
  console.log(value); // 输出: 1, 2, 3, 4, 5
}

for (let value of mySet.values()) {
  console.log(value); // 输出: 1, 2, 3, 4, 5
}

for (let entry of mySet.entries()) {
  console.log(entry); // 输出: [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
}
```

使用哪种方法取决于你的个人喜好和具体的场景。但最常用的可能是 `for...of` 循环和 `forEach` 方法。
