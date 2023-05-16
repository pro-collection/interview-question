**关键词**：css 绘制、css 三角形

在CSS中，你可以使用多种方法来实现三角形。以下是几种常用的方法和相应的代码示例：

1. 使用边框：

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

这个方法通过设置元素的边框来创建三角形，其中左右边框设为透明，底边框设置为你想要的颜色。

2. 使用伪元素：

```css
.triangle {
  position: relative;
  width: 100px;
  height: 100px;
}

.triangle:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-width: 0 100px 100px 0;
  border-style: solid;
  border-color: red;
}
```

这个方法使用伪元素 `::before` 来创建三角形，通过设置其边框的宽度和样式来实现。

3. 使用旋转：

```css
.triangle {
  width: 100px;
  height: 100px;
  background-color: red;
  transform: rotate(45deg);
}
```

这个方法创建一个正方形元素，然后通过使用 `transform` 属性的 `rotate` 函数将其旋转45度，从而形成一个三角形。
