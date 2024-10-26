**关键词**：固定长宽比

在 CSS 中，可以通过以下几种方式实现固定长宽比的元素：

**一、使用 padding 实现**

1. 原理：

   - 利用元素的`padding`属性以百分比形式设置时是相对于父元素宽度的特点，通过设置`padding-top`或`padding-bottom`来实现固定的长宽比。

2. 示例代码：
   ```html
   <div class="aspect-ratio-box">
     <!-- 这里可以放置内容 -->
   </div>
   ```
   ```css
   .aspect-ratio-box {
     width: 100%;
     position: relative;
     padding-top: 56.25%; /* 16:9 的长宽比，9/16 = 0.5625，即 56.25% */
   }
   .aspect-ratio-box > * {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
   }
   ```
   - 在这个例子中，设置了一个容器元素，通过`padding-top`为`56.25%`实现了 16:9 的长宽比。容器内的子元素通过绝对定位填充整个容器。

**二、使用伪元素和`vw`单位实现**

1. 原理：

   - 利用伪元素`::before`或`::after`，并设置其`content`属性为空，通过设置其`height`或`width`为相对于视口宽度（`vw`单位）的百分比来实现固定长宽比。

2. 示例代码：
   ```html
   <div class="aspect-ratio-box-vw">
     <!-- 这里可以放置内容 -->
   </div>
   ```
   ```css
   .aspect-ratio-box-vw {
     width: 100%;
     position: relative;
   }
   .aspect-ratio-box-vw::before {
     content: "";
     display: block;
     padding-top: 56.25%; /* 16:9 的长宽比 */
   }
   .aspect-ratio-box-vw > * {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
   }
   ```
   - 这个方法与第一种类似，但是使用了伪元素和`padding-top`相对于视口宽度的特点来实现长宽比。

**三、使用 CSS Grid 实现**

1. 原理：

   - 通过 CSS Grid 布局，设置一个网格容器，并定义其中一个维度的大小，然后让另一个维度自动填充以实现固定长宽比。

2. 示例代码：
   ```html
   <div class="aspect-ratio-grid">
     <!-- 这里可以放置内容 -->
   </div>
   ```
   ```css
   .aspect-ratio-grid {
     width: 100%;
     height: 0;
     padding-bottom: 56.25%; /* 16:9 的长宽比 */
     display: grid;
   }
   .aspect-ratio-grid > * {
     grid-row: 1;
     grid-column: 1;
   }
   ```
   - 在这个例子中，设置容器的`padding-bottom`为`56.25%`来实现 16:9 的长宽比，然后使用 CSS Grid 布局将子元素放置在网格的第一个单元格中。
