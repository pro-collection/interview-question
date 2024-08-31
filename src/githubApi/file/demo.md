**关键词**：flex 属性

Flex 布局（即 Flexible Box 布局）提供了一种更有效的方式来布置、对齐和分布容器内项目的空间，即使它们的大小是未知或者动态变化的。以下是 Flex 布局中一些常用属性及其作用的简介：

### 容器属性（应用于 flex 容器）

1. **`display`**：

   - 设置为`flex`或`inline-flex`以启用 flex 布局。
   - `flex`使容器成为块级元素；
   - `inline-flex`使容器成为行内元素。

2. **`flex-direction`**：

   - 确定主轴的方向（即项目的排列方向）。
   - 可选值包括`row`（默认，水平方向）、`row-reverse`（水平方向，反向）、`column`（垂直方向）、`column-reverse`（垂直方向，反向）。

3. **`flex-wrap`**：

   - 控制容器是单行还是多行，以及如何换行。
   - 可选值包括`nowrap`（默认，不换行）、`wrap`（换行，第一行在上方）、`wrap-reverse`（换行，第一行在下方）。

4. **`flex-flow`**：

   - 是`flex-direction`和`flex-wrap`两个属性的简写形式。
   - 默认值为`row nowrap`。

5. **`justify-content`**：

   - 定义了项目在主轴上的对齐方式。
   - 可选值包括`flex-start`（默认，起点对齐）、`flex-end`（终点对齐）、`center`（居中对齐）、`space-between`（两端对齐，项目之间的间隔相等）、`space-around`（每个项目两侧的间隔相等）、`space-evenly`（所有项目之间及周围的空间完全相等）。

6. **`align-items`**：

   - 定义项目在交叉轴上如何对齐。
   - 可选值包括`flex-start`（交叉轴的起点对齐）、`flex-end`（交叉轴的终点对齐）、`center`（交叉轴的中点对齐）、`baseline`（项目的第一行文字的基线对齐）、`stretch`（默认，如果项目未设置高度或设为 auto，将占满整个容器的高度）。

7. **`align-content`**：
   - 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
   - 可选值和`justify-content`类似，包括：`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`stretch`（默认值）。

### 项目属性（应用于 flex 项目）

1. **`order`**：

   - 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

2. **`flex-grow`**：

   - 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

3. **`flex-shrink`**：

   - 定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

4. **`flex-basis`**：

   - 设置或检索弹性盒伸缩基准值，默认值为`auto`，即项目本来的大小。

5. **`flex`**：

   - 是`flex-grow`、`flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

6. **`align-self`**：
   - 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。
   - 默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。
   - 可选的值除了`auto`，还有`flex-start`、`flex-end`、`center`、`baseline`和`stretch`。
