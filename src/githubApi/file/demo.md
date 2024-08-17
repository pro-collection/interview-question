**关键词**：JS 延迟加载、JS 异步加载

JavaScript 脚本的延迟加载是一种优化网页加载时间的技术，可以提高页面的加载速度，提升用户体验。以下是常见的几种 JS 脚本延迟加载的方式：

### 1. 使用 `<script>` 标签的 `defer` 属性

在 `<script>` 标签中使用 `defer` 属性可以使得脚本在文档解析完成后，但在 `DOMContentLoaded` 事件触发之前执行。`defer` 属性仅适用于外部脚本。

```html
<script src="path/to/your-script.js" defer></script>
```

### 2. 使用 `<script>` 标签的 `async` 属性

与 `defer` 类似，`async` 属性使得脚本在加载时不会阻塞 HTML 文档的解析，但它与 `defer` 的区别在于，脚本一旦下载完成就会立即执行，而不是等到整个页面都解析完毕。这意味着 `async` 脚本的执行顺序是不确定的。

```html
<script src="path/to/your-script.js" async></script>
```

### 3. 动态创建 `<script>` 标签

可以通过 JavaScript 动态创建 `<script>` 标签并插入到文档中，以此来延迟加载脚本。

```javascript
var script = document.createElement("script");
script.src = "path/to/your-script.js";
document.body.appendChild(script);
```

### 4. 使用加载器库（如 RequireJS、SystemJS）

现代 JavaScript 项目中，可以使用模块加载器（如 RequireJS 或 SystemJS）来实现对脚本及其依赖的异步加载。

```javascript
require(["path/to/your-module"], function (module) {
  // 使用模块
});
```

### 5. 利用 `IntersectionObserver`

`IntersectionObserver` API 允许你配置一个回调，当监测到指定元素进入或离开视口时触发。通过这种方式，可以在元素即将出现在视图中时，动态加载相应的脚本。

```javascript
let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素现在可见，加载脚本
        var script = document.createElement("script");
        script.src = "path/to/your-script.js";
        document.head.appendChild(script);
      }
    });
  },
  { rootMargin: "0px 0px 0px 0px" }
);

observer.observe(document.querySelector(".some-element"));
```

### 6. 使用服务端的延迟加载技术

服务端渲染 (SSR) 或服务器端动态渲染技术（如用 Node.js 配合框架 Next.js、Nuxt.js 等）也可以实现对特定条件下的脚本延迟加载。

各个技术方案适用的场景不同，选择合适的延迟加载方式可以大幅改善网页的性能和用户体验。
