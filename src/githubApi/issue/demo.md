**关键词**：伪数组、类数组

伪数组（Array-like）和类数组（Array-like Object）都是描述一种类似数组的对象结构，它们在外观和行为上类似于数组，但实际上不是真正的数组。

伪数组（Array-like）：
- 伪数组是指具有类似数组的结构，但不具备数组的方法和属性的对象。
- 伪数组对象通常拥有一个 length 属性，用于表示其元素的个数。
- 伪数组对象可以通过索引访问元素，类似于数组的下标访问。
- 伪数组对象不具备数组的方法，如 push、pop、slice 等。

类数组（Array-like Object）：
- 类数组是指具有类似数组的结构，但不是由 Array 构造函数创建的对象。
- 类数组对象通常拥有一个 length 属性，用于表示其元素的个数。
- 类数组对象可以通过索引访问元素，类似于数组的下标访问。
- 类数组对象不具备数组的方法，如 push、pop、slice 等。

示例：
```javascript
// 伪数组
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 };
console.log(arrayLike[0]);  // 'apple'
console.log(arrayLike.length);  // 2
console.log(arrayLike.push);  // undefined

// 类数组
const arrayLikeObject = document.querySelectorAll('div');
console.log(arrayLikeObject[0]);  // DOM元素
console.log(arrayLikeObject.length);  // 元素数量
console.log(arrayLikeObject.push);  // undefined
```

需要注意的是，伪数组和类数组虽然具有类似数组的结构，但它们没有继承自 Array 的方法和属性，因此无法直接使用数组的方法。如果需要使用数组的方法，可以将伪数组或类数组对象转换为真正的数组，例如通过 `Array.from()`、`Array.prototype.slice.call()` 或展开运算符 `...` 等方法进行转换。
