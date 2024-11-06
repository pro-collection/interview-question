**关键词**：事件委托应用场景

> 比如我将事件绑定在 body 上面， 后来这个 body 人为移除掉了， 然后又重新创建了一个 body 标签， 那么之前绑定在 body 上面的事件还会生效吗？

如果将事件绑定在 `body` 上，然后移除了这个 `body` 标签并重新创建一个 `body` 标签，之前绑定在旧 `body` 上的事件不会生效在新的 `body` 上。

原因如下：

当你使用传统的事件绑定方式（如 `addEventListener`）将事件绑定到一个特定的 DOM 元素上时，这个绑定是针对特定的实例。一旦该元素被移除，与之相关的事件处理程序也会与该元素一起被销毁。当重新创建一个新的 `body` 标签时，它是一个全新的 DOM 元素，没有与之前被移除的 `body` 上的事件处理程序相关联。

例如：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>

  <body>
    <script>
      document.body.addEventListener("click", function () {
        console.log("body clicked");
      });
      // 假设这里有一些代码移除了 body 并重新创建一个新的 body
      const oldBody = document.body;
      oldBody.parentNode.removeChild(oldBody);
      const newBody = document.createElement("body");
      document.documentElement.appendChild(newBody);
    </script>
  </body>
</html>
```

在这个例子中，点击新创建的 `body` 不会触发之前绑定的点击事件处理程序。
