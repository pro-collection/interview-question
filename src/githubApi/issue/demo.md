是的，如果函数在调用时某个参数被传递为 `undefined`，那么它会被默认值赋值。

当为函数的参数设置默认值时，只有当参数的值为 `undefined` 时才会生效。如果传递的参数为 `null`、空字符串 `''` 或者未提供参数，则默认值不会被应用。

以下是一个示例：

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet('John');     // 输出: Hello, John!
greet(undefined);  // 输出: Hello, Guest!
greet();           // 输出: Hello, Guest!
```

在上面的例子中，当参数 `name` 被传递为 `undefined` 或者未提供时，它会被默认值 `'Guest'` 赋值，从而在函数内部输出 `'Hello, Guest!'`。


如果传递的参数为 `null`，默认值不会被应用。当函数的参数被显式传递为 `null` 时，它将被视为有效的值，不会触发默认值的赋值。

以下是一个示例：

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet(null);  // 输出: Hello, null!
```

在上面的例子中，参数 `name` 被显式传递为 `null`，因此默认值 `'Guest'` 不会被应用，而是使用了传递的 `null` 值。所以输出结果为 `'Hello, null!'`。
