**关键词**：lodash.flattenDeep 实现

以下是用 JavaScript 手写实现类似于 `lodash.flattenDeep` 的函数来将数组递归展平为一维数组：

```javascript
function flattenDeep(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenDeep(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
```

你可以使用以下方式测试这个函数：

```javascript
const nestedArray = [1, [2, [3, [4]]]];
const flattenedArray = flattenDeep(nestedArray);
console.log(flattenedArray); // [1, 2, 3, 4]
```
