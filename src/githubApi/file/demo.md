将 JavaScript 代码放在 `<head>` 标签内部和放在 `<body>` 标签内部有一些区别：
1. **加载顺序**：放在 `<head>` 里会在页面加载之前执行 JavaScript 代码，而放在 `<body>` 里会在页面加载后执行。
2. **页面渲染**：如果 JavaScript 代码影响了页面的布局或样式，放在 `<head>` 里可能会导致页面渲染延迟，而放在 `<body>` 里可以减少这种影响。
3. **代码依赖**：如果 JavaScript 代码依赖其他元素，放在 `<body>` 里可以确保这些元素已经加载。
4. **全局变量和函数**：放在 `<head>` 里的 JavaScript 代码中的全局变量和函数在整个页面生命周期内都可用。

以下是一个简单的示例代码，展示了如何在 `<head>` 和 `<body>` 中放置 JavaScript 代码：

```html
<!DOCTYPE html>
<html>

<head>
  <script>
    console.log("这是在 head 中执行的 JavaScript 代码。");
  </script>
</head>

<body>
  <script>
    console.log("这是在 body 中执行的 JavaScript 代码。");
  </script>
</body>

</html>
```
在这个示例中，分别在 `<head>` 和 `<body>` 中放置了简单的 JavaScript 代码，用于在控制台输出信息，以便观察执行顺序。
