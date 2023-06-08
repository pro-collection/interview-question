**关键词**：类数组对象转换为真正的数组

有几种常见的方法可以将类数组对象转换为真正的数组：

1. Array.from()：使用 Array.from() 方法可以将可迭代对象或类数组对象转换为数组。
```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 };
const array = Array.from(arrayLike);
console.log(array);  // ['apple', 'banana']
```

2. Array.prototype.slice.call()：通过调用 Array.prototype.slice() 方法，并将类数组对象作为参数传入，可以将其转换为数组。
```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 };
const array = Array.prototype.slice.call(arrayLike);
console.log(array);  // ['apple', 'banana']
```

3. Spread Operator（展开运算符）：使用展开运算符 `...` 可以将可迭代对象或类数组对象展开为数组。
```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 };
const array = [...arrayLike];
console.log(array);  // ['apple', 'banana']
```

这些方法都可以将类数组对象转换为真正的数组，使其具备数组的方法和属性。需要注意的是，类数组对象必须具有 length 属性和通过索引访问元素的能力才能成功转换为数组。
