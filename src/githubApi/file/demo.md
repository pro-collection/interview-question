**关键词**：dom.contains 方法

以下是在您给出的折叠面板示例基础上添加动画效果的版本：

**HTML 结构**（与您之前给出的相同）

```html
<div class="accordion">
  <div class="accordion-item">
    <div class="accordion-header">标题 1</div>
    <div class="accordion-content">
      <p>这是内容 1</p>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header">标题 2</div>
    <div class="accordion-content">
      <p>这是内容 2</p>
    </div>
  </div>
  <!-- 可以添加更多的折叠项 -->
</div>
```

**CSS 样式**

```css
.accordion {
  width: 300px;
}

.accordion-item {
  border: 1px solid #ccc;
  margin-bottom: 5px;
}

.accordion-header {
  background-color: #f1f1f1;
  padding: 10px;
  cursor: pointer;
}

.accordion-content {
  padding: 10px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
}

.accordion-item.open.accordion-content {
  max-height: 500px; /* 您可以根据内容的实际高度进行调整 */
}
```

**JavaScript 功能**

```javascript
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.classList.toggle("open");
  });
});
```

这样，当点击折叠面板的标题时，内容会以平滑的动画效果展开或收起。您可以根据实际需求调整动画的时长和内容展开的最大高度等参数。
