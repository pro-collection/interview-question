**关键词**：JS数组降维、reduce数组降维

原生Array.prototype.flat方法接受一个depth参数，默认值为1，depth表示要降维的维数：

输出结果：

```js
const arr = [1, [2, 3], [4, [5, 6]]]
console.log(arr.flat(1))         // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(Infinity))  // [1, 2, 3, 4, 5, 6]
```

reduce + 递归实现方案

```js
// MDN: 可查看更多flat实现方法
function flat(arr = [], depth = 1) {
  if (arr.length === 0) {
    return []
  }
  let result = []
  if (depth > 0) {
    result = arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val)
    }, [])
  } else {
    result = arr.slice()
  }
  return result
}

const arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
const myResult1 = flat(arr, 1)
const originResult1 = arr.flat(1)
const myResult2 = flat(arr, Infinity)
const originResult2 = arr.flat(Infinity)
console.log(myResult1)      // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(originResult1)  // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(myResult2)     // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
console.log(originResult2) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

