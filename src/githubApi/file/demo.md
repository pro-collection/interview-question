**关键词**：长文本溢出

长文本溢出展开/收起功能通常需要使用一些 JavaScript 来动态控制文本的显示状态，及 CSS 来处理文本的默认显示样式。以下是一个基本实现示例，展示了如何结合 HTML、CSS 和 JavaScript 来实现这个功能。

### HTML 结构

我们定义一个容器来显示文本，并添加一个用于触发展开/收起操作的按钮。

```html
<div id="textContainer" class="text-overflow">
  这是一段可能很长的文本，我们希望在一开始时只显示部分，点击“展开”按钮后显示全部内容，再次点击则“收起”文本。
</div>
<button id="toggleButton">展开</button>
```

### CSS 样式

使用 CSS 设置文本的默认显示状态为隐藏超出部分，并且用省略号表示溢出。

```css
.text-overflow {
  /* 设置一个高度限制，模拟文本“收起”时的状态 */
  max-height: 60px; /* 这个值根据需要调整 */
  overflow: hidden;
  position: relative;
  line-height: 20px; /* 根据实际情况调整 */
  padding-right: 20px;
}
```

### JavaScript 代码

使用 JavaScript 来控制文本的“展开”和“收起”状态。我们监听按钮的点击事件来切换文本的显示状态。

```javascript
document.getElementById("toggleButton").addEventListener("click", function () {
  var textContainer = document.getElementById("textContainer");
  var button = document.getElementById("toggleButton");

  // 检查当前是展开还是收起状态
  if (button.textContent === "展开") {
    // 修改文本容器的最大高度以显示全部文本
    textContainer.style.maxHeight = "none";
    button.textContent = "收起";
  } else {
    // 重新设置最大高度以隐藏文本
    textContainer.style.maxHeight = "60px"; // 与CSS中定义的相同
    button.textContent = "展开";
  }
});
```

这只是实现长文本溢出展开/收起的一种基本方法。根据具体需求，这个示例可以进一步扩展或修改，比如添加动画效果使展开/收起操作更平滑，或者根据文本长度动态决定是否显示“展开/收起”按钮等。

还有其他方法可以实现这一功能，包括使用纯 CSS 的技巧（虽然可能不那么灵活），或者利用现成的 JavaScript 库和框架来简化实现过程。

### 更有多实现细节， 可以参考以下文档

https://juejin.cn/post/7407259487193399333
