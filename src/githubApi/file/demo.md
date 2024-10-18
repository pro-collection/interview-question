**关键词**：首屏时间

页面首屏时间是指从浏览器开始请求页面到页面的首屏内容完全显示的时间。以下是几种计算首屏时间的方法：

**一、使用浏览器性能 API 和自定义事件**

1. 具体步骤：
   - 在页面的`<head>`标签中插入一段 JavaScript 代码，在页面加载时记录浏览器开始导航的时间戳，即`performance.timing.navigationStart`。
   - 当页面的首屏内容加载完成时，触发一个自定义事件。可以通过监听特定元素的加载完成或者使用特定的标志来判断首屏内容是否加载完成。
   - 在自定义事件的处理函数中，获取当前时间戳，并减去开始导航的时间戳，得到首屏时间。

例如：

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      const timing = performance.timing;
      let firstScreenLoaded = false;
      function onFirstScreenLoaded() {
        if (!firstScreenLoaded) {
          const firstScreenTime = performance.now() - timing.navigationStart;
          console.log(`首屏时间为：${firstScreenTime}ms`);
          firstScreenLoaded = true;
        }
      }
      window.addEventListener("load", function () {
        // 假设首屏内容加载完成的标志是某个特定元素的出现
        const firstScreenElement = document.getElementById("first-screen-element");
        if (firstScreenElement) {
          onFirstScreenLoaded();
        }
      });
    </script>
  </head>

  <body>
    <!-- 页面内容 -->
    <div id="first-screen-element">首屏关键内容元素</div>
  </body>
</html>
```

2. 注意事项：
   - 需要准确确定首屏内容加载完成的标志，这可能因页面结构和内容而异。
   - 不同浏览器对于性能时间戳的定义和准确性可能略有不同，需要在多种浏览器上进行测试。

**二、使用可视化工具和浏览器插件**

1. 一些可视化性能分析工具，如 Lighthouse、WebPageTest 等，可以测量页面的首屏时间。

   - Lighthouse 是一个由 Google 开发的开源工具，可以在 Chrome 浏览器的开发者工具中运行。它会生成一个详细的性能报告，其中包括首屏时间等指标。
   - WebPageTest 是一个在线性能测试工具，可以从不同的地理位置和设备类型进行测试，并提供详细的性能数据，包括首屏时间。

2. 一些浏览器插件，如 PageSpeed Insights、YSlow 等，也可以提供页面性能指标，包括首屏时间的估算。

3. 注意事项：
   - 这些工具和插件的测量结果可能会受到网络环境、测试设备等因素的影响。
   - 需要结合实际情况进行分析和优化，不能完全依赖工具的测量结果。

**三、手动计时和标记**

1. 步骤：
   - 在页面的 JavaScript 代码中，在浏览器开始请求页面时手动记录一个时间戳。
   - 在页面的首屏内容加载完成时，再次记录一个时间戳。
   - 首屏时间 = 第二个时间戳 - 第一个时间戳。

例如：

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      let startTime;
      window.addEventListener("load", function () {
        if (!startTime) {
          startTime = performance.now();
        }
        // 假设首屏内容加载完成的标志是某个特定元素的出现
        const firstScreenElement = document.getElementById("first-screen-element");
        if (firstScreenElement) {
          const endTime = performance.now();
          const firstScreenTime = endTime - startTime;
          console.log(`首屏时间为：${firstScreenTime}ms`);
        }
      });
    </script>
  </head>

  <body>
    <!-- 页面内容 -->
    <div id="first-screen-element">首屏关键内容元素</div>
  </body>
</html>
```

2. 注意事项：
   - 这种方法需要手动在代码中插入计时逻辑，可能会比较繁琐。
   - 同样需要准确确定首屏内容加载完成的标志。
