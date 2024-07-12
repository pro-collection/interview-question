**关键词**：flex 布局相关属性问题

在 CSS 的弹性盒模型（Flexbox）中，`flex: 1`表示子项（flex 子项）的伸缩性。

具体来说，`flex: 1`是`flex-grow`、`flex-shrink`和`flex-basis`三个属性的简写。其默认值等同于`flex: 1 1 0%`，分别代表以下含义：

- `flex-grow: 1`：定义项目的放大比例为 1。这意味着当弹性容器有剩余空间时，该子项将按照比例伸展以填充剩余空间。如果存在多个`flex-grow: 1`的子项，它们将等分剩余空间。
- `flex-shrink: 1`：定义项目的缩小比例为 1。即如果空间不足，该项目将缩小。
- `flex-basis: 0%`：在分配多余空间之前，计算项目是否有多余空间，这里的`0%`表示不考虑项目本身的大小。

`flex: 1`经常用于自适应布局。例如，将父容器的`display`设置为`flex`，侧边栏大小固定后，将内容区设置为`flex: 1`，内容区则会自动放大占满剩余空间。

以下是一个简单的示例代码，展示了`flex: 1`的效果：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        display: flex;
        width: 300px;
        height: 200px;
        background-color: lightblue;
      }

      .item1 {
        background-color: lightcoral;
        flex: 1;
      }

      .item2 {
        background-color: lightgreen;
        flex: 1;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="item1">item1</div>
      <div class="item2">item2</div>
    </div>
  </body>
</html>
```

在上述代码中，`.container`是一个 flex 容器，它包含两个子元素`.item1`和`.item2`，并且都将`flex`属性设置为`1`。当调整`.container`的宽度时，`.item1`和`.item2`会等比例地增大或缩小，以占满剩余空间。
