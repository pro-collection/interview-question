**关键词**：翻转数组

在 JavaScript 中，可以通过以下几种方法来翻转一个数组：

**一、使用循环和数组拼接**

1. 原理：

   - 通过从数组的末尾开始遍历每个元素，并将其依次添加到一个新的数组中，实现数组的翻转。
   - 首先确定数组的长度，然后从最后一个元素开始，逐个将元素添加到新数组中。

2. 代码示例：

```javascript
function reverseArray(arr) {
  const reversedArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr.push(arr[i]);
  }
  return reversedArr;
}

const originalArray = [1, 2, 3, 4, 5];
const reversedArray = reverseArray(originalArray);
console.log(reversedArray); // [5, 4, 3, 2, 1]
```

**二、使用数组的`reverse`方法**

1. 原理：

   - JavaScript 的数组对象提供了一个`reverse`方法，可以直接原地翻转数组，即修改原始数组。
   - 这个方法会改变原始数组的顺序，将第一个元素变为最后一个，第二个元素变为倒数第二个，以此类推。

2. 代码示例：

```javascript
const originalArray = [1, 2, 3, 4, 5];
const reversedArray = originalArray.reverse();
console.log(reversedArray); // [5, 4, 3, 2, 1]
```

**三、使用扩展运算符和`reverse`方法（不修改原始数组）**

1. 原理：

   - 首先使用扩展运算符（`...`）将原始数组展开为一个新的数组，然后对这个新数组调用`reverse`方法，这样可以在不修改原始数组的情况下得到一个翻转后的数组。

2. 代码示例：

```javascript
const originalArray = [1, 2, 3, 4, 5];
const reversedArray = [...originalArray].reverse();
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(originalArray); // [1, 2, 3, 4, 5]（原始数组未被修改）
```

这些方法可以根据具体的需求选择使用，如果你希望修改原始数组，可以直接使用`reverse`方法；如果你希望保留原始数组并得到一个翻转后的新数组，可以使用循环或者扩展运算符结合`reverse`方法。
