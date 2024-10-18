**关键词**：白屏时间

白屏时间是指从浏览器开始请求页面到页面开始显示内容的时间。可以通过以下方法计算白屏时间：

**一、使用浏览器的性能 API**

现代浏览器提供了`performance`对象，可以用来获取页面加载过程中的各种时间戳。通过这些时间戳的差值可以计算出白屏时间。

1. 具体步骤：
   - 在页面的`<head>`标签中插入一段 JavaScript 代码，在页面加载时记录关键时间点。
   - 使用`performance.timing.navigationStart`表示浏览器开始导航的时间戳。
   - 寻找一个表示页面开始有内容显示的时间点，通常可以使用`performance.timing.domInteractive`（文档被解析完成，开始加载外部资源时的时间戳）或者`performance.timing.domContentLoadedEventStart`（`DOMContentLoaded`事件开始的时间戳）作为近似的白屏结束时间点。
   - 白屏时间 = 白屏结束时间点 - `performance.timing.navigationStart`。

例如：

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      const timing = performance.timing;
      const whiteScreenTime = timing.domInteractive - timing.navigationStart;
      console.log(`白屏时间为：${whiteScreenTime}ms`);
    </script>
  </head>

  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

2. 注意事项：
   - 不同的浏览器对于性能时间戳的定义可能略有不同，需要在多种浏览器上进行测试以确保准确性。
   - 这种方法计算的白屏时间是一个近似值，因为很难精确地确定页面开始显示内容的瞬间。

**二、使用自定义标记和日志**

1. 步骤：
   - 在页面的 HTML 结构中，在`<head>`标签之后插入一个不可见的元素，例如一个空的`<div>`元素，并给它一个特定的 ID。
   - 在页面的 CSS 中，将这个元素的背景颜色设置为与页面背景相同的颜色，使其在页面加载初期不可见。
   - 在页面的 JavaScript 代码中，当页面开始有内容显示时，通过修改这个元素的样式使其变为可见，并记录当前时间。
   - 白屏时间 = 元素变为可见的时间 - 浏览器开始导航的时间。

例如：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #whiteScreenMarker {
        display: none;
      }
    </style>
    <script>
      const timing = performance.timing;
      document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("whiteScreenMarker").style.display = "block";
        const whiteScreenTime = performance.now() - timing.navigationStart;
        console.log(`白屏时间为：${whiteScreenTime}ms`);
      });
    </script>
  </head>

  <body>
    <div id="whiteScreenMarker"></div>
    <!-- 页面内容 -->
  </body>
</html>
```

2. 注意事项：
   - 这种方法需要手动在页面中插入标记元素和相应的 JavaScript 代码，可能会增加一些开发工作量。
   - 同样需要考虑在不同浏览器上的兼容性和准确性。
