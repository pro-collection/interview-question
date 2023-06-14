可以通过传入一个深度参数来限制 flat 方法的递归深度。实现如下：

```
function flat(arr, depth = 1) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      res = res.concat(flat(arr[i], depth - 1));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
```

这里在原有的 flat 方法基础上增加了一个 depth 参数，每递归一层，深度就减一，当深度为 0 时就不再递归。
