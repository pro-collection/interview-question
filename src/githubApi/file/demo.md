**关键词**：sum 函数实现

举例：

```js
console.log(sum(1,2,3)(4)) => 输出 10
```

以下是使用 JavaScript 实现满足要求的`sum`函数的代码：

```javascript
function sum(...args) {
  let total = 0;
  for (let arg of args) {
    if (Array.isArray(arg)) {
      for (let num of arg) {
        total += num;
      }
    } else {
      total += arg;
    }
  }

  function innerSum(...innerArgs) {
    for (let innerArg of innerArgs) {
      if (Array.isArray(innerArg)) {
        for (let num of innerArg) {
          total += num;
        }
      } else {
        total += innerArg;
      }
    }
    return innerSum;
  }

  innerSum.toString = function () {
    return total;
  };

  return innerSum;
}
```

在上述代码中：

1. 首先定义了外部的`sum`函数，它接受任意数量的参数（可以是单个数字或数字数组），并将这些参数的值累加到`total`变量中。
2. 然后在`sum`函数内部定义了一个名为`innerSum`的内部函数，它同样接受任意数量的参数，并将这些参数的值累加到`total`变量中。每次调用`innerSum`都会继续累加新传入的参数值。
3. 最后，为`innerSum`函数添加了一个`toString`方法，当在`console.log`等需要将函数转换为字符串的场景下，会返回累加得到的`total`值，这样就能得到正确的输出结果。

例如：

```javascript
console.log(sum(1, 2, 3)(4));
// 输出 10

console.log(sum(1)(2)(3, 4)(5, 6, 7));
// 输出 28
```
