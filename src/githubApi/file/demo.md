**关键词**：设置渐变色

在 CSS 中，设置渐变色可以使用`background`属性和相应的渐变函数。CSS 提供两种类型的渐变：线性渐变（`linear-gradient`）和径向渐变（`radial-gradient`）。以下是如何分别设置这两种渐变色的示例。

### 线性渐变（Linear Gradient）

线性渐变是从一个点到另一个点的颜色过渡。它可以通过以下方式设置：

```css
.element {
  background: linear-gradient(direction, color-stop1, color-stop2, ...);
}
```

- `direction`：定义渐变的方向，可以是角度（如`45deg`）或预定义的关键词（如`to bottom`, `to top`, `to right`, `to left`）。
- `color-stop1`，`color-stop2`，...：渐变中颜色停止点，至少需要两个。

**示例**：

```css
.box {
  width: 200px;
  height: 200px;
  background: linear-gradient(to right, blue, red);
}
```

这个例子创建了一个从蓝色到红色的水平渐变。

### 径向渐变（Radial Gradient）

径向渐变是从一个中心点向外的颜色过渡。它可以通过以下方式设置：

```css
.element {
  background: radial-gradient(shape size, color-stop1, color-stop2, ...);
}
```

- `shape`：定义渐变的形状，可以是`circle`或`ellipse`。
- `size`：定义渐变的大小，可以是`closest-corner`, `farthest-corner`, `closest-side`, `farthest-side`，或者具体的长度值。
- `color-stop1`，`color-stop2`，...：同样表示渐变中的颜色停止点。

**示例**：

```css
.circle {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, white, yellow, red);
}
```

这个例子创建了一个圆形的径向渐变，从白色到黄色再到红色。

### 重复渐变（Repeating Gradients）

另外，CSS 中的渐变还可以设置为重复渐变，只需在渐变函数后面添加关键词`repeating`：

```css
.gradient {
  background: repeating-linear-gradient(to bottom, blue, white 20px, white 40px);
}
```

这个例子创建了一个向下的线性渐变，颜色从蓝色开始，在 20px 处变化为白色，并在 40px 处结束，然后重复该模式。

**注意**：各种渐变效果在不同的浏览器中可能需要添加特定的浏览器前缀
