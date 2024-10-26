**关键词**：等值判断

`Object.is()`与全等运算符（`===`）都用于比较两个值是否相等，但它们之间存在一些区别：

**一、对特殊值的处理**

1. `NaN`的比较：
   - `===`认为`NaN`不等于任何值，包括它自身。
   - `Object.is()`认为`NaN`只等于`NaN`。
   - 例如：

```javascript
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

2. `-0`和`+0`的比较：
   - `===`认为`-0`和`+0`是相等的。
   - `Object.is()`可以区分`-0`和`+0`。
   - 例如：

```javascript
console.log(-0 === +0); // true
console.log(Object.is(-0, +0)); // false
```

**二、一般值的比较**

1. 对于其他值的比较，`Object.is()`和`===`的行为类似：
   - 比较两个数字、字符串、布尔值、对象等，如果它们的值和类型都相同，则认为它们相等。
   - 例如：

```javascript
console.log(5 === 5); // true
console.log(Object.is(5, 5)); // true

const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj1); // true
console.log(obj1 === obj2); // false
console.log(Object.is(obj1, obj1)); // true
console.log(Object.is(obj1, obj2)); // false
```
