**关键词**：flex 子元素不压缩

在 Flex 布局中，如果你想要子元素在容器内不被压缩，即保持其原始尺寸或指定尺寸，不受容器大小变化的影响，可以通过设置子元素的`flex-shrink`属性来实现。`flex-shrink`属性决定了当父容器大小小于其所有 flex 项总大小时，各 flex 项的缩小比例。默认值是 1，表示 flex 项会等比例缩小，以适应父容器的大小。

要阻止子元素压缩，你应该将它的`flex-shrink`属性设置为 0。这样，无论容器大小如何变化，子元素都不会缩小。

示例如下：

HTML:

```html
<div class="flex-container">
  <div class="flex-item">不压缩的项目</div>
  <!-- 其他的flex-item -->
</div>
```

CSS:

```css
.flex-container {
  display: flex;
  /* 添加其他需要的flex布局属性 */
}

.flex-item {
  flex-shrink: 0; /* 这使得该flex项目不会被压缩 */
  /* 设置宽度或其他样式 */
}
```

在这个例子中，任何带有`flex-item`类的元素都不会在容器空间不足时被压缩。

此外，`flex`属性是`flex-grow`、`flex-shrink`和`flex-basis`这三个属性的简写。如果你想在保证元素不被压缩的同时，具体控制元素的放大行为或基础大小，也可以直接使用`flex`属性进行设置。例如，如果你还希望元素不放大，并且有一个固定的基础大小，可以这样设置：

```css
.flex-item {
  flex: 0 0 auto; /* 不放大，不缩小，基础大小为auto */
}
```

这种方式提供了更细致的控制，`0 0 auto`分别对应`flex-grow`、`flex-shrink`和`flex-basis`的值。这告诉浏览器该项目即不应放大，也不应缩小，并且以其默认大小作为基础大小。
