**关键词**：函数声明、函数表达式

JavaScript中有两种主要的方式来定义函数：函数声明（Function Declaration）和函数表达式（Function Expression）。

1. 函数声明（Function Declaration）：
    - 函数声明是通过使用 `function` 关键字后面跟着函数名称来创建的，通常位于作用域的顶部。
    - 函数声明会被提升（Hoisting），即在执行代码之前就可以使用。这意味着可以在函数声明之前调用该函数。
    - 函数声明创建的函数可以在整个作用域内部访问。

示例：

```javascript
function sayHello() {
  console.log("Hello!");
}

sayHello(); // 可以在函数声明之后调用
```

2. 函数表达式（Function Expression）：
    - 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的。
    - 函数表达式通常是匿名函数，即没有指定函数名称。但也可以使用具名函数表达式，为函数表达式指定一个名称。
    - 函数表达式不会被提升，必须在定义之后才能使用。
    - 函数表达式创建的函数只能在其所在的变量或表达式作用域内访问。

示例：

```javascript
// 匿名函数表达式
const sayHello = function() {
  console.log("Hello!");
};

sayHello(); // 必须在函数表达式之后调用

// 具名函数表达式
const add = function sum(a, b) {
  return a + b;
};

console.log(add(2, 3)); // 输出: 5
// console.log(sum(2, 3)); // 错误，无法在外部访问具名函数表达式的名称
```

总结：

- 函数声明是使用 `function` 关键字创建的函数，会被提升，可以在声明之前调用，而且在整个作用域内都可访问。
- 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的，不会被提升，必须在定义之后才能使用，且只能在其所在的变量或表达式作用域内访问。
