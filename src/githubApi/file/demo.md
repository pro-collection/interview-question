**关键词**：随机取数函数

以下是使用 JavaScript 实现从数组中随机取一个元素的函数：

```javascript
function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
```

你可以这样使用这个函数：

```javascript
const array = [1, 2, 3, 4, 5];
const randomElement = getRandomElement(array);
console.log(randomElement);
```
