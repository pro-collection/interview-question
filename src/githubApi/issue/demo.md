### 函数柯里化是什么？ 

函数柯里化（Currying）是一种在函数式编程中使用的技术，其主要目的是将一个接受多个参数的函数转换成一系列使用一个参数的函数。
这样做的好处是允许你创建一些部分应用的函数，预先固定一些参数，使得代码更简洁，便于复用和组合。

以下是一个简单的柯里化函数的例子：

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 使用 curry 函数的例子
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1, 2, 3)); // 6
```

在这个例子中，我们创建了一个 `curry` 函数，该函数接受一个普通的多参数函数（如 `sum`）作为输入，并返回一个新的柯里化函数。 这个柯里化函数可以用多种方式调用，其参数可以一次性传递，也可以分批传递。


### 柯里化有哪些应用场景和优势

