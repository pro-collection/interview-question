### 问题
```js
var a = 10;
(function () {
  console.log(a)
  a = 5
  console.log(window.a)
  var a = 20;
  console.log(a)
})()
```

### 回答
输出结果：
```js
undefined
10
20
```
