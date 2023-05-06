**关键词**：Grid 布局、Grid 属性

### 什么是 grid 布局

CSS Grid 布局是 CSS 中的一种新的布局系统，旨在通过 网格（grid）和 行（row）、列（column）的概念来创建灵活的、高效的、响应式网页布局。CSS Grid 布局可以将一个元素的内容划分为多个网格，根据需要，可以在这些网格中定位元素。与传统的基于盒子模型的布局方式不同，CSS Grid 布局以一种更直观、更高效的方式来处理布局问题。

可以通过 CSS Grid 属性来定义网格和元素的位置，包括大小、间距、对齐方式等等。CSS Grid 布局还支持类似 Flexbox 的弹性布局，例如自适应尺寸、重叠和层叠等特性。最重要的是，因为 CSS Grid 布局与内容的结构分离，所以它能够为设计响应式布局提供出色的支持，而不需要在内容标记中添加过多的 CSS 或者 JavaScript。


### grid 布局有哪些 api

CSS Grid 布局提供了一系列的 API 来实现网格布局，以下是常用的几个属性：

1. `display: grid;`：设置一个元素为网格容器
2. `grid-template-columns`：定义网格中每一列的大小和数量
3. `grid-template-rows`：定义网格中每一行的大小和数量
4. `grid-template-areas`：为网格中的区域命名，以便将子元素分配到特定的区域
5. `grid-column-gap` 和 `grid-row-gap`：定义网格中行和列之间的间距
6. `grid-area`：定义元素应该在网格中的哪个区域，比如指定其所在的行、列和跨越的行列数量
7. `grid-column-start` 和 `grid-column-end`：定义元素开始和结束的列位置，类似地，`grid-row-start` 和 `grid-row-end` 定义元素开始和结束的行位置
8. `grid-column` 和 `grid-row`：简写属性，组合了 `grid-column-start` 、`grid-column-end` 、`grid-row-start` 和 `grid-row-end`，用于同时设置元素在网格中的列和行位置。

这些属性可以帮助我们在网格容器中定义网格，并指定子元素在网格中的位置和大小。还有其他的属性可以进一步调整子元素的位置和大小，如 `justify-self` 和 `align-self` 用于调整子元素的水平和垂直对齐方式，`grid-auto-columns` 和 `grid-auto-rows` 用于指定未被显式指定的网格单元格的大小等等。


### 如何使用 grid 布局

CSS Grid 布局可以通过以下步骤来使用：

1. 在父级元素上声明 `display: grid` 属性，将其转换为网格容器。
2. 使用 `grid-template-columns` 和 `grid-template-rows` 属性来定义行和列的网格大小和数量，或者使用 `grid-template-areas` 属性来定义网格中的区域。
3. 使用 `gap` 属性来定义行和列之间的间距。
4. 将子元素放到网格容器中，并使用 `grid-column` 和 `grid-row` 属性来指定子元素在网格中的位置，也可以通过 `grid-area` 属性来指定子元素在网格中的区域。
5. 可以使用其他属性来进一步改变子元素的位置和大小，比如 `justify-self` 和 `align-self` 等属性来设置元素的对齐方式和位置。

下面是一个简单的使用 Grid 布局的示例，创建一个 3x3 网格：

```html
<div class="grid-container">
  <div class="grid-item item1">1</div>
  <div class="grid-item item2">2</div>
  <div class="grid-item item3">3</div>
  <div class="grid-item item4">4</div>
  <div class="grid-item item5">5</div>
  <div class="grid-item item6">6</div>
  <div class="grid-item item7">7</div>
  <div class="grid-item item8">8</div>
  <div class="grid-item item9">9</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.grid-item {
  background-color: #ddd;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.item1 {
  grid-column: 1 / span 2;
  grid-row: 1;
}

.item2 {
  grid-column: 3;
  grid-row: 1 / span 2;
}

.item3 {
  grid-column: 1;
  grid-row: 2 / span 2;
}

.item4 {
  grid-column: 2;
  grid-row: 2;
}

.item5 {
  grid-column: 3;
  grid-row: 3;
}

.item6 {
  grid-column: 2 / span 2;
  grid-row: 4;
}

.item7 {
  grid-column: 1;
  grid-row: 5;
}

.item8 {
  grid-column: 2;
  grid-row: 5;
}

.item9 {
  grid-column: 3;
  grid-row: 5;
}
```

在这个示例中，我们创建了一个包含 9 个子元素的网格容器。通过设置网格容器的 `grid-template-columns` 和 `grid-template-rows` 属性，我们定义了一个 3x3 的网格，并通过 `gap` 属性设置了行和列的间距。然后，我们使用 `grid-column` 和 `grid-row` 属性来指定每个子元素在网格中的位置，或使用 `grid-area` 属性来指定子元素在网格中的区域。通过这些属性的值，我们可以指定每个子元素跨越多少行和多少列，或者指定一个子元素占据网格中的多个区域。
