**关键词**：is 谓词语法、is 语法作用

在 TypeScript 中，`is` 是一种类型谓词（type predicate）语法。它用于在运行时对一个值的类型进行检查，并返回一个布尔值。

`is` 通常与条件类型和类型保护（type guards）一起使用。条件类型可以基于类型谓词 `is` 的结果来进行类型细化，从而在编译时获取更准确的类型推断。

以下是一个示例，展示了如何使用 `is` 进行类型谓词检查：

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log('Value is not a string.');
  }
}

processValue('hello'); // 输出: HELLO
processValue(42); // 输出: Value is not a string.
```

在上述示例中，我们定义了一个 `isString` 函数，它接受一个 `unknown` 类型的值，并使用 `typeof` 运算符检查该值是否为字符串类型。函数返回一个布尔值，指示值是否为字符串类型。

然后，我们定义了一个 `processValue` 函数，它接受一个 `unknown` 类型的值，并通过调用 `isString` 函数进行类型谓词检查。如果值是字符串类型，就将其转换为大写并打印出来；否则，打印出值不是字符串类型的消息。

最后，我们调用 `processValue` 函数两次，一次传入字符串 `'hello'`，一次传入数值 `42`。第一次调用输出 `HELLO`，表示字符串类型的值通过了类型谓词检查；第二次调用输出 `Value is not a string.`，表示数值类型的值未通过类型谓词检查。

因此，`is` 是 TypeScript 中用于类型谓词检查的关键字，用于在运行时对一个值的类型进行判断，并返回一个布尔值。
