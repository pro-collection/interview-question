**关键词**：卡顿、性能、用户体验

1. **使用浏览器性能指标 - FPS（每秒帧数）**

   - **基本原理**：FPS 是衡量页面流畅度的重要指标。在浏览器中，动画和交互的流畅呈现通常依赖于较高的 FPS。一般来说，当 FPS 达到 60 时，用户体验会比较流畅，因为这意味着每秒有 60 帧画面更新，人眼很难察觉到卡顿。如果 FPS 低于 30，用户就可能明显感觉到页面卡顿。
   - **如何获取 FPS 数据**：可以使用`requestAnimationFrame`函数来计算 FPS。以下是一个简单的 JavaScript 示例，用于监测页面的 FPS：
     ```javascript
     let frameCount = 0;
     let lastTime = 0;
     const fpsArray = [];
     function calculateFps() {
       const now = performance.now();
       frameCount++;
       if (now - lastTime >= 1000) {
         const fps = frameCount;
         fpsArray.push(fps);
         frameCount = 0;
         lastTime = now;
       }
       requestAnimationFrame(calculateFps);
     }
     calculateFps();
     ```
     - 这个代码片段定义了一个函数`calculateFps`，它使用`performance.now`函数获取当前时间戳。每执行一次`requestAnimationFrame`回调函数（通常每秒执行约 60 次），`frameCount`就加 1。当时间间隔达到 1000 毫秒（1 秒）时，计算出 FPS 并存储在`fpsArray`中。通过分析`fpsArray`中的数据，可以了解页面在一段时间内的 FPS 情况，从而判断是否卡顿。

2. **监测 Long Tasks（长任务）**

   - **基本原理**：当浏览器执行 JavaScript 任务的时间过长时，就会导致页面卡顿。Long Tasks 是指那些执行时间超过 50 毫秒的任务，因为浏览器在执行这些任务时，无法及时响应用户的其他操作，如滚动、点击等。
   - **如何监测 Long Tasks**：可以使用浏览器的`PerformanceObserver`来监测 Long Tasks。以下是一个示例：
     ```javascript
     const observer = new PerformanceObserver((list) => {
       for (const entry of list.getEntries()) {
         if (entry.duration > 50) {
           console.log("发现长任务:", entry);
         }
       }
     });
     observer.observe({ entryTypes: ["longtask"] });
     ```
     - 这段代码创建了一个`PerformanceObserver`对象，它会监听`longtask`类型的性能条目。当发现执行时间超过 50 毫秒的任务时，会在控制台打印相关信息，包括任务的开始时间、持续时间等，通过这些信息可以定位导致卡顿的代码部分。

3. **分析 First Input Delay（首次输入延迟 - FID）**

   - **基本原理**：FID 衡量的是用户首次与页面交互（如点击、按键等）到浏览器开始响应这个交互的时间间隔。一个较低的 FID 表示页面能够快速响应用户操作，而较高的 FID 则可能导致用户感觉到卡顿。
   - **如何获取 FID 数据**：可以使用浏览器的`PerformanceObserver`和相关的性能 API 来测量 FID。以下是一个示例：
     ```javascript
     let startTime;
     const observer = new PerformanceObserver((list) => {
       for (const entry of list.getEntries()) {
         if (entry.name === "first - input") {
           const delay = entry.startTime - startTime;
           console.log("首次输入延迟:", delay);
         }
       }
     });
     observer.observe({ entryTypes: ["first - input"] });
     document.addEventListener("click", (event) => {
       startTime = performance.now();
       // 模拟一个任务，可能导致延迟
       setTimeout(() => {
         console.log("任务完成");
       }, 100);
     });
     ```
     - 在这个示例中，当用户点击页面时，记录开始时间`startTime`，然后通过`PerformanceObserver`监听`first - input`类型的性能条目。当监听到这个条目时，计算并打印出 FID。通过这种方式，可以评估用户操作后的响应延迟情况。
