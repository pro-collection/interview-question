**关键词**：CSS  隐藏元素

在 CSS 中，隐藏元素可以通过多种方式实现，每种方式有其特定的使用场景。这里列出了一些常用的方法：

### 1. `display: none;`

完全移除元素，使其不占据任何空间，也不会在文档流中占位。元素及其所有子元素都不会显示。

```css
.element {
  display: none;
}
```

### 2. `visibility: hidden;`

使元素不可见，但它仍然占据原来的空间和位置。与 `display: none;` 不同，`visibility: hidden;` 不会影响文档流的布局。

```css
.element {
  visibility: hidden;
}
```

### 3. `opacity: 0;`

设置元素透明度为 `0`，使其完全透明。元素仍然占据空间，并且可以与之互动（例如，点击），除非你另外禁用了元素的互动能力。

```css
.element {
  opacity: 0;
}
```

### 4. 使用绝对定位

将元素移出视图区域，例如设置一个非常大的负边距。

```css
.element {
  position: absolute;
  left: -9999px;
}
```

或者使用 `top` 或 `bottom`，将其定位到视窗外部。

### 5. `clip` 或 `clip-path`

通过剪裁，使元素的某些部分不可见。`clip-path` 可以更灵活地定义哪些部分可见。

```css
.element {
  clip-path: circle(0);
}
```

### 6. `overflow: hidden;` 与尺寸设置

设置元素宽高为 0，并设置 `overflow` 为 `hidden`，这将隐藏元素内容。

```css
.element {
  width: 0;
  height: 0;
  overflow: hidden;
}
```

### 7. 将元素的 `height` 或 `width` 设置为 `0` 并结合 `overflow: hidden`

如果你还想保留某些边框或轮廓的样式，可能希望使用 `width` 和 `height` 为 `0` 的方法，加上 `overflow: hidden` 防止内容外泄。

```css
.element {
  width: 0;
  height: 0;
  overflow: hidden;
}
```

### 应用场景和选择

- **从 DOM 中完全移除元素**：`display: none;` 适合完全从文档流中移除元素的场景。
- **仍需要保留位置**：`visibility: hidden;` 适合需要隐藏元素但保留其占位的场景。
- **逐渐隐藏**：`opacity: 0;` 适合需要渐变动画效果的场景。
- **临时移除视野或隐藏内容的特定部分**：使用定位或 `clip-path` 方法。
