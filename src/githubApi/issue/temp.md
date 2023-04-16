通过 Less 实现网页换肤可以使用 CSS 变量和 Less 变量。CSS 变量的语法如下：

```css
:root {
  --primary-color: #007bff;
}

.btn {
  background-color: var(--primary-color);
}
```

而 Less 变量则是通过 Less 预编译器提供的变量语法来实现的，如下所示：

```less
lessCopy code@primary-color: #007bff;

.btn {
  background-color: @primary-color;
}
```

通过 Less 变量来实现网页换肤的方式可以在运行时使用 JavaScript 来修改 Less 变量的值，从而实现换肤效果。具体步骤如下：

1. 使用 Less 预编译器来编译 Less 文件为 CSS 文件。
2. 在 HTML 文件中引入编译后的 CSS 文件。
3. 在 JavaScript 中动态修改 Less 变量的值。
4. 使用 JavaScript 将新的 Less 变量值注入到编译后的 CSS 文件中。
5. 将注入后的 CSS 样式应用到页面上。

以下是一段实现通过 Less 变量来实现网页换肤的示例代码：

```less
lessCopy code// base.less 文件
@primary-color: #007bff;

.btn {
  background-color: @primary-color;
}

// dark.less 文件
@primary-color: #343a40;
```

```html
<!-- index.html 文件 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>网页换肤示例</title>
  <link rel="stylesheet/less" type="text/css" href="base.less">
  <link rel="stylesheet/less" type="text/css" href="dark.less">
</head>
<body>
  <button class="btn">按钮</button>
  <script src="less.min.js"></script>
  <script>
    function changeSkin() {
      // 修改 Less 变量的值
      less.modifyVars({
        '@primary-color': '#28a745'
      }).then(() => {
        console.log('换肤成功');
      }).catch(() => {
        console.error('换肤失败');
      });
    }
  </script>
</body>
</html>
```

在上面的示例代码中，我们引入了两个 Less 文件，一个是 `base.less`，一个是 `dark.less`。其中 `base.less` 定义了一些基础的样式，而 `dark.less` 则是定义了一个暗黑色的主题样式。在 JavaScript 中，我们使用 `less.modifyVars` 方法来修改 Less 变量的值，从而实现了换肤的效果。当然，这只是一个简单的示例代码，实际的换肤功能还需要根据实际需求来进行设计和实现。
