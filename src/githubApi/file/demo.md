**关键词**：typescript void、typescript never、void 和 never 区别

在 TypeScript 中，`void`和`never`类型都代表没有值，但用途和含义却有所不同。以下是它们之间的主要区别：

1. **void**：

   `void`类型用于标记函数没有任何返回值。这意呑着函数可能执行了一些操作但是没有返回任何内容。这不同于返回`undefined`或`null`，尽管在没有明确返回值时，JavaScript 函数默认返回`undefined`。

   如果一个函数的返回类型是`void`，它可能有一个`return`语句，但`return`语句不能返回任何值（或者根本就没有`return`语句）。

   例子：

   ```typescript
   function greet(): void {
     console.log("Hello, World!");
   }
   ```

   这个函数打印一个字符串到控制台，但不返回任何值。

2. **never**：

   `never`类型表示永远不会返回任何值。它通常用于两种情况：函数总是抛出一个错误，这样就不会有返回值；或者函数有一个无法达到的终点，比如无限循环。

   例子：

   ```typescript
   function throwError(errorMsg: string): never {
     throw new Error(errorMsg);
   }

   function infiniteLoop(): never {
     while (true) {}
   }
   ```

   这两个函数都不会正常结束：`throwError`函数会抛出异常，而`infiniteLoop`函数会永远循环。在这两种情况中，返回类型`never`正确地表明函数不会有任何返回执行路径。

总结来说，`void`用于没有返回值的函数，这意味着函数的执行结束后不会给调用者任何值；而`never`表示函数永远不会有一个正常的结束，因此不会给调用者任何机会获得它的返回值。它们在类型系统中表达了不同的概念和意图。
