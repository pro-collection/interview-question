**关键词**：JS数组对比

在JavaScript中，可以使用递归的方式实现数组的深度对比。以下是一个示例函数，用于比较两个数组是否相等：

```javascript
function deepArrayEqual(arr1, arr2) {
  // 检查数组长度是否相同
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  for (let i = 0; i < arr1.length; i++) {
    const value1 = arr1[i];
    const value2 = arr2[i];
    
    // 递归比较每个元素的值
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (!deepArrayEqual(value1, value2)) {
        return false;
      }
    } else if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!deepEqual(value1, value2)) {
        return false;
      }
    } else {
      // 比较基本类型的值
      if (value1 !== value2) {
        return false;
      }
    }
  }
  
  return true;
}
```

使用示例：

```javascript
const arr1 = [1, [2, 3], { name: 'John' }];
const arr2 = [1, [2, 3], { name: 'John' }];
const arr3 = [1, [2, 3], { name: 'Jane' }];

console.log(deepArrayEqual(arr1, arr2)); // true
console.log(deepArrayEqual(arr1, arr3)); // false
```

在上述示例中，`deepArrayEqual`函数会递归比较两个数组的每个元素的值，包括嵌套的数组和对象。如果两个数组是相等的，则返回`true`，否则返回`false`。注意，该函数不会检查函数、正则表达式、日期等复杂类型的值。
