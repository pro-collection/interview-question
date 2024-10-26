**关键词**：flex 布局属性

在 Flex 布局中，`align-content`和`align-items`都是用于控制 Flex 容器内项目在交叉轴（垂直于主轴的方向）上的对齐方式，但它们有以下区别：

**一、作用范围不同**

1. `align-items`：

   - 作用于 Flex 容器内的单行项目。
   - 它决定了每个单独的项目在交叉轴上的对齐方式。
   - 例如，如果`align-items: center`，则容器内的所有项目将在交叉轴上居中对齐。

2. `align-content`：
   - 作用于整个 Flex 容器的多行项目。
   - 当 Flex 容器有多行项目时，它决定了这些行在交叉轴上的对齐方式。
   - 例如，如果`align-content: space-between`，则多行项目之间在交叉轴上会均匀分布，第一行与容器顶部对齐，最后一行与容器底部对齐。

**二、适用场景不同**

1. `align-items`：

   - 适用于单行的 Flex 布局，或者即使容器有多行，但只需要统一控制所有项目的对齐方式时。
   - 比如，创建一个简单的导航栏，其中的项目在垂直方向上需要保持一致的对齐方式。

2. `align-content`：
   - 适用于多行的 Flex 布局，且需要对多行进行整体的对齐控制。
   - 例如，一个包含大量卡片的网格布局，当卡片数量较多导致出现多行时，可以使用`align-content`来调整行与行之间在垂直方向上的间距和对齐方式。

**三、示例对比**

1. `align-items`示例：

   ```html
   <div style="display: flex; align-items: center; height: 200px;">
     <div style="background-color: lightblue; width: 50px; height: 50px;">Item 1</div>
     <div style="background-color: lightgreen; width: 50px; height: 50px;">Item 2</div>
     <div style="background-color: lightyellow; width: 50px; height: 50px;">Item 3</div>
   </div>
   ```

   - 在这个例子中，三个项目在垂直方向上居中对齐，因为设置了`align-items: center`。

2. `align-content`示例：
   ```html
   <div style="display: flex; flex-wrap: wrap; align-content: space-between; height: 300px;">
     <div style="background-color: lightblue; width: 50px; height: 50px;">Item 1</div>
     <div style="background-color: lightgreen; width: 50px; height: 50px;">Item 2</div>
     <div style="background-color: lightyellow; width: 50px; height: 50px;">Item 3</div>
     <div style="background-color: lightcoral; width: 50px; height: 50px;">Item 4</div>
     <div style="background-color: lightskyblue; width: 50px; height: 50px;">Item 5</div>
     <div style="background-color: lightpink; width: 50px; height: 50px;">Item 6</div>
   </div>
   ```
   - 这里由于项目数量较多，容器出现了多行。设置了`align-content: space-between`后，行与行之间在垂直方向上均匀分布，第一行靠近容器顶部，最后一行靠近容器底部。

综上所述，`align-items`主要用于控制单行项目在交叉轴上的对齐方式，而`align-content`则用于控制多行项目整体在交叉轴上的对齐方式。
