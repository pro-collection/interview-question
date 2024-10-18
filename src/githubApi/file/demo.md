**关键词**：DOMContentLoaded 和 onload 事件

如果期望在页面加载和解析完成之后触发事件，可以通过以下几种方式实现：

**一、使用`DOMContentLoaded`事件**

1. 传统方式：

   - 使用`addEventListener`方法来监听`DOMContentLoaded`事件。当页面的 DOM 结构加载和解析完成后，该事件会被触发。

   ```javascript
   document.addEventListener("DOMContentLoaded", function () {
     // 这里的代码会在页面 DOM 加载和解析完成后执行
     console.log("DOM 加载和解析完成");
   });
   ```

   - 在这个回调函数中，可以执行任何需要在 DOM 准备好后执行的操作，如获取 DOM 元素、设置事件监听器等。

2. 现代方式（异步函数）：

   - 在支持 ES6 及以上版本的环境中，可以使用异步函数和`await`来等待`DOMContentLoaded`事件。这种方式使代码更加简洁和易读。

   ```javascript
   async function onDOMLoaded() {
     await new Promise((resolve) => {
       if (document.readyState === "loading") {
         document.addEventListener("DOMContentLoaded", resolve);
       } else {
         resolve();
       }
     });
     // 这里的代码会在页面 DOM 加载和解析完成后执行
     console.log("DOM 加载和解析完成");
   }

   onDOMLoaded();
   ```

   - 这种方式使用了异步函数和 Promise，确保在`DOMContentLoaded`事件触发后才执行后续的代码。

**二、使用`jQuery`（如果项目中使用了 jQuery）**

1. `$(document).ready()`方法：
   - jQuery 提供了`$(document).ready()`方法，它在 DOM 加载和解析完成后执行。这个方法与原生的`DOMContentLoaded`事件类似，但在不同的浏览器中有更好的兼容性。
   ```javascript
   $(document).ready(function () {
     // 这里的代码会在页面 DOM 加载和解析完成后执行
     console.log("DOM 加载和解析完成（使用 jQuery）");
   });
   ```
   - 在这个回调函数中，可以使用 jQuery 的选择器和方法来操作 DOM 元素。

**三、使用`load`事件（但不推荐作为首选）**

1. `window.onload`方法：
   - `window.onload`事件在整个页面（包括所有的资源如图片、样式表等）完全加载后触发。虽然它也能确保页面加载完成后执行代码，但通常比`DOMContentLoaded`事件触发得更晚。
   ```javascript
   window.onload = function () {
     // 这里的代码会在页面完全加载后执行
     console.log("页面完全加载完成");
   };
   ```
   - 如果只需要在 DOM 加载和解析完成后执行代码，使用`DOMContentLoaded`事件会更快，因为它不需要等待所有资源的加载。
