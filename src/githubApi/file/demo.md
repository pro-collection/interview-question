**关键词**：长任务统计

在 JavaScript 中，可以使用 Performance API 中的 PerformanceObserver 来监视和统计长任务（Long Task）。长任务是指那些执行时间超过 50 毫秒的任务，这些任务可能会阻塞主线程，影响页面的交互性和流畅性。

### 使用 PerformanceObserver 监听长任务

```javascript
// 创建一个性能观察者实例来订阅长任务
let observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log("Long Task detected:");
    console.log(`Task Start Time: ${entry.startTime}, Duration: ${entry.duration}`);
  }
});

// 开始观察长任务
observer.observe({ entryTypes: ["longtask"] });

// 启动长任务统计数据的变量
let longTaskCount = 0;
let totalLongTaskTime = 0;

// 更新之前的性能观察者实例，以增加统计逻辑
observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    longTaskCount++; // 统计长任务次数
    totalLongTaskTime += entry.duration; // 累加长任务总耗时
    // 可以在这里添加其他逻辑，比如记录长任务发生的具体时间等
  });
});

// 再次开始观察长任务
observer.observe({ entryTypes: ["longtask"] });
```

在上面的代码中，我们创建了一个`PerformanceObserver`对象来订阅长任务。每当检测到长任务时，它会向回调函数传递一个包含长任务性能条目的列表。在这个回调中，我们可以统计长任务的次数和总耗时。

注意：`PerformanceObserver`需要在支持该 API 的浏览器中运行。截至到我所知道的信息（2023 年 4 月的知识截点），所有现代浏览器都支持这一 API，但在使用前你应该检查用户的浏览器是否支持这个特性。

以下是如何在实际使用中停止观察和获取当前的统计数据：

```javascript
// 停止观察能力
observer.disconnect();

// 统计数据输出
console.log(`Total number of long tasks: ${longTaskCount}`);
console.log(`Total duration of all long tasks: ${totalLongTaskTime}ms`);
```

使用这种方法，你可以监控应用程序中的性能问题，并根据长任务的发生频率和持续时间进行优化。
