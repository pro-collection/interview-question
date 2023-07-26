**关键词**：JS 管道函数、JS 管道函数实现

管道函数是一种函数编程的概念，它可以将多个函数串联起来，将前一个函数的输出作为后一个函数的输入。以下是一个简单的实现示例：

```javascript
// 简化版的管道函数实现
function pipe(...fns) {
  return function(input) {
    return fns.reduce((output, fn) => fn(output), input);
  };
}

// 示例函数
function addOne(num) {
  return num + 1;
}

function double(num) {
  return num * 2;
}

function square(num) {
  return num ** 2;
}

// 创建一个管道函数
const myPipe = pipe(addOne, double, square);

// 使用管道函数进行计算
const result = myPipe(2); // 2 -> addOne -> 3 -> double -> 6 -> square -> 36

console.log(result); // 输出 36
```

在上述示例中，我们首先定义了三个简单的示例函数：addOne、double和square。然后，通过调用pipe函数，将这三个函数串联起来创建了一个管道函数myPipe。最后，我们可以通过调用myPipe函数并传入初始值2，得到最终的计算结果36。

在管道函数的实现中，使用了ES6的扩展运算符（...）和Array的reduce方法。reduce方法接受一个累加器函数和初始值，并将累加器函数应用于数组的每个元素，返回最终的累积结果。在这里，累加器函数将前一个函数的输出作为后一个函数的输入，从而实现了函数的串联。
