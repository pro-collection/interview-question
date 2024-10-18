**关键词**：数组随机打乱

在 JavaScript 中，可以使用以下几种方法来随机打乱一个数组：

**一、使用`sort`方法结合随机函数**

1. **基本原理**：

   - JavaScript 的数组`sort`方法可以接受一个比较函数作为参数。通过提供一个随机的比较函数，可以实现对数组的随机排序，从而打乱数组的顺序。

2. **示例代码**：

```javascript
const array = [1, 2, 3, 4, 5];

array.sort(() => Math.random() - 0.5);

console.log(array);
```

在这个例子中，`sort`方法的比较函数每次都会返回一个随机的正负值，使得数组元素的排序顺序完全随机，从而实现数组的随机打乱。

**二、Fisher-Yates 洗牌算法**

1. **基本原理**：

   - Fisher-Yates 洗牌算法是一种经典的随机打乱数组的算法。它的基本思想是从数组的最后一个元素开始，随机选择一个位置与当前元素交换，然后逐步向前移动，重复这个过程，直到处理完第一个元素。

2. **示例代码**：

```javascript
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const array = [1, 2, 3, 4, 5];

const shuffledArray = shuffleArray(array);

console.log(shuffledArray);
```

在这个例子中，定义了一个`shuffleArray`函数，该函数使用 Fisher-Yates 洗牌算法随机打乱输入的数组，并返回打乱后的数组。
