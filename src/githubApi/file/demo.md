**关键词**：动态计算文本是否溢出

> 作者备注
>
> 主要考核 JS 动态计算文本是否溢出

以下是一种使用 HTML、CSS 和 JavaScript 来实现当文本一行展示不下时通过`popover`展示全部内容的基本方法。假设你在一个网页环境中操作。

1. **HTML 结构**

   - 首先，创建一个包含文本的元素，例如一个`span`标签。为这个元素添加一个自定义属性（比如`data-full-text`）来存储完整的文本内容。

   ```html
   <span
     id="textElement"
     data-full-text="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本"
   >
     这是一段很长很长很长的文本
   </span>
   ```

2. **CSS 样式**

   - 为`span`元素设置样式，使其在一行内显示文本，并在文本溢出时隐藏溢出部分。

   ```css
   #textElement {
       white - space: nowrap;
       overflow: hidden;
       text - overflow: ellipsis;
       cursor: pointer;
   }
   ```

- 这里设置`cursor: pointer`是为了让用户知道这个元素是可以点击的，当文本溢出时可以触发`popover`显示完整内容。

3. **JavaScript 功能实现**
   - 使用 JavaScript 来检测文本是否溢出。可以通过比较元素的`offsetWidth`和`scrollWidth`来实现。如果`scrollWidth`大于`offsetWidth`，说明文本溢出了。
   - 当文本溢出时，创建一个`popover`来显示完整内容。可以使用一些现成的 JavaScript 库（如 Bootstrap 的`popover`插件）或者自己编写简单的`popover`功能。以下是一个使用自定义 JavaScript 实现简单`popover`功能的示例（不依赖第三方库）：
   ```javascript
   document.addEventListener("DOMContentLoaded", function () {
     const textElement = document.getElementById("textElement");
     if (textElement.scrollWidth > textElement.offsetWidth) {
       textElement.addEventListener("click", function () {
         const fullText = this.getAttribute("data-full-text");
         const popover = document.createElement("div");
         popover.className = "popover";
         popover.textContent = fullText;
         document.body.appendChild(popover);
         // 简单的定位，将popover放在被点击元素的下方
         const rect = this.getBoundingClientRect();
         popover.style.left = rect.left + "px";
         popover.style.top = rect.bottom + 5 + "px";
       });
     }
   });
   ```
   - 同时，你还需要添加一些 CSS 样式来美化`popover`：
   ```css
   .popover {
       position: absolute;
       background - color: white;
       border: 1px solid gray;
       padding: 10px;
       border - radius: 5px;
       z - index: 100;
   }
   ```

上述代码首先检查文本是否溢出。如果溢出，当用户点击该文本元素时，会创建一个`popover`元素并将完整文本内容放入其中，然后将`popover`添加到文档中，并简单地定位在被点击元素的下方。

请注意，这只是一个简单的示例，在实际应用中，你可能需要根据具体的设计要求和项目框架（如使用 Vue.js、React.js 等）来进行更复杂的实现，并且可能需要考虑浏览器兼容性等问题。如果使用像 Bootstrap 这样的框架，实现`popover`功能会更加方便和具有更好的样式一致性。
