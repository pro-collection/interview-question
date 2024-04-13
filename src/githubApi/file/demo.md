**关键词**：浏览器渲染阻塞、JS 阻塞浏览器渲染

JavaScript 的加载、解析和执行默认情况下会阻塞浏览器的渲染过程。这是因为浏览器渲染引擎和 JavaScript 引擎是单线程的，并且二者共享同一个线程。JavaScript 在执行时会阻止 DOM 构建，因为 JavaScript 可能会修改 DOM 结构（例如添加、修改或删除节点）。出于这个原因，浏览器必须暂停 DOM 的解析和渲染，直到 JavaScript 执行完成。

默认情况下，当浏览器遇到一个`<script>`标签时，会立即停止解析 HTML，转而下载和执行脚本，然后再继续 HTML 的解析和渲染。这意味着在 HTML 文档中的 JavaScript 脚本的下载和执行过程中，页面的渲染是被阻塞的。

不过，你可以用下面几种方法调整脚本的加载和执行行为，以减少对浏览器渲染过程的阻塞：

1. **异步脚本（async）**：
   在`<script>`标签中使用`async`属性可以使得脚本的加载变成异步操作。当使用`async`属性时，浏览器会在后台进行下载，但脚本的执行还是会阻塞 DOM 渲染。

   ```html
   <script async src="script.js"></script>
   ```

   使用`async`时，脚本会在下载完成后尽快执行，这可能会在文档解析完成之前或之后。

2. **延迟脚本（defer）**：
   `defer`属性使得脚本在 HTML 解析完成之后、DOMContentLoaded 事件触发之前执行，不阻塞 HTML 的解析。

   ```html
   <script defer src="script.js"></script>
   ```

   使用`defer`，脚本的执行顺序将按照它们在 DOM 中出现的顺序执行。

3. **动态脚本加载**：
   你可以使用 JavaScript 动态创建`<script>`元素并添加到 DOM 中，这允许你控制脚本的加载和执行时机。

   ```javascript
   var script = document.createElement("script");
   script.src = "script.js";
   document.body.appendChild(script);
   ```

4. **移动脚本位置**：
   将脚本放在 HTML 的底部，即`<body>`标签关闭之前，而不是放在`<head>`中，可以让页面内容先加载显示，从而减少用户对加载过程的可感知时间。

现代 Web 开发中通常推荐使用`async`或`defer`属性，提高页面加载性能，尤其是对于那些需要从外部服务器加载的大型 JavaScript 库来说尤为关键。
