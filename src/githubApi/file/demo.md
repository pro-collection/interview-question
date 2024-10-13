**关键词**：禁止文本复制

可以通过 CSS 和 JavaScript 结合的方式实现页面文本不可选中和不可复制。

**一、使用 CSS**

可以通过设置 CSS 属性来禁止用户选中页面文本：

```css
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

这将禁止在整个页面上进行文本选择。

**二、使用 JavaScript**

如果仅使用 CSS 不能满足需求，可以结合 JavaScript 进一步增强禁止复制的功能。以下是一个示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>

  <body>
    <p>这是一些不可选中和不可复制的文本。</p>
    <script>
      document.addEventListener("copy", function (e) {
        e.preventDefault();
      });
    </script>
  </body>
</html>
```

在这个例子中，通过监听`copy`事件并调用`preventDefault()`方法来阻止复制操作。
