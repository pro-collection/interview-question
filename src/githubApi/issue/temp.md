以下是一个简单的 Babel 插件示例，用于去除代码中的 `console.log` 语句：

```javascript
// babel-plugin-remove-console.js

module.exports = function ({ types: t }) {
  return {
    visitor: {
      // 处理函数调用表达式
      CallExpression(path) {
        const { callee } = path.node;

        // 如果函数调用的名称是 console.log
        if (
          t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object, { name: 'console' }) &&
          t.isIdentifier(callee.property, { name: 'log' })
        ) {
          // 移除该函数调用
          path.remove();
        }
      }
    }
  };
};
```

该插件会遍历代码中的函数调用表达式，如果发现是 `console.log`，则会移除该函数调用。

要使用该插件，可以在项目中安装并配置它。例如，创建一个 `.babelrc` 文件，并将该插件添加到 Babel 的插件列表中：

```json
{
  "plugins": ["./path/to/babel-plugin-remove-console.js"]
}
```

然后运行 Babel 命令或构建工具，它将应用该插件，并从代码中去除所有的 `console.log` 语句。

请注意，这只是一个简单的示例插件，仅适用于演示目的。在实际开发中，你可能需要更复杂的逻辑来处理不同的情况和要求。
