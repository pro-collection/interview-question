**关键词**：script 预加载

在浏览器中，可以通过预加载 JavaScript 脚本来提高性能和用户体验。预加载是指在浏览器解析完当前页面之前，提前加载并解析相关资源（例如 JavaScript 文件、CSS 文件等）。这样可以在用户请求访问其他页面时，减少资源加载的时间和延迟，从而提高页面加载速度和用户体验。

以下是两种预加载 JavaScript 脚本的方法：

1. defer 属性

`<script>` 标签的 `defer` 属性可以告诉浏览器，让 JavaScript 文件在页面文档解析完成之后再执行。这种方式可以保证页面不会因为脚本加载和执行而被阻塞，同时又能够保证脚本能够按照正确的顺序执行（即按照在 HTML 中出现的顺序，因为 `defer` 属性会按照这个顺序依次加载和执行）。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
    <script src="script1.js" defer></script>
    <script src="script2.js" defer></script>
  </head>
  <body>
   ...
  </body>
</html>
```

2. prefetch 和 preload

预加载的另一种方法是使用 `Link` 标签的 `prefetch` 或 `preload` 属性。这种方法可以在不影响当前页面加载的情况下，预先加载需要后续页面需要的 JavaScript 文件和其他资源。

其中，`prefetch` 属性指示浏览器预先加载并缓存 JavaScript 文件，但不会立即执行文件。而 `preload` 属性则会在浏览器空闲时立即加载文件，并且可以指定文件的类型、优先级等属性。

```html
<head>
  <title>My Page</title>
  <link rel="prefetch" href="script1.js" />
  <link rel="preload" href="script2.js" as="script" />
</head>
```

需要注意的是，使用 `prefetch` 和 `preload` 属性时，应该避免将其用于太多的资源文件，否则可能会引发网络瓶颈和性能问题。可以在需要优化的资源文件上使用这些属性，并通过测试和性能分析来调整其预加载的优先级和时机，以达到最优化的预加载效果。

