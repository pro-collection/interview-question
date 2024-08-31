**关键词**：统计资源加载耗时、PerformanceObserver PerformanceResourceTiming api 使用

要统计全站每一个静态资源（如图片、JS 脚本、CSS 样式表等）的加载耗时，你可以借助浏览器的 Performance API，特别是利用 `PerformanceResourceTiming` 接口来获取资源加载的详细时间信息。以下是一个基本的步骤指导和示例代码，展示如何实现这一功能：

### 步骤

1. **使用 `PerformanceObserver`：** 创建一个 `PerformanceObserver` 实例来监听资源加载事件，能够实时收集性能数据，而且对性能影响较小。

2. **过滤静态资源类型：** 通过检查 `initiatorType` 属性，筛选出静态资源（例如 `img`、`script`、`css` 等）的加载事件。

3. **计算和展示耗时：** 对每个静态资源的加载耗时进行计算并展示。资源的耗时可以通过 `duration` 属性直接获取。

### 示例代码

以下是一个简单的 JavaScript 代码示例，展示了如何使用 `PerformanceObserver` 来统计全站静态资源的加载耗时：

```javascript
// 创建性能观察者实例来监听资源加载事件
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (const entry of entries) {
    // 过滤静态资源类型
    if (["img", "script", "css", "link"].includes(entry.initiatorType)) {
      console.log(`资源 ${entry.name} 类型 ${entry.initiatorType} 耗时：${entry.duration.toFixed(2)} 毫秒`);
    }
  }
});

// 开始观察 Resource Timing 类型的性能条目
observer.observe({ entryTypes: ["resource"] });
```

### 注意事项

- **性能数据的准确性：** 确保性能数据的准确性和实时性，你应该在页面加载的早期就开始监听资源加载事件，例如在 `<head>` 标签中就引入或嵌入这段脚本。
- **跨域资源的时间信息：** 如果你需要获取跨域资源的详细时间信息（如第三方字体或脚本），那么这些资源的服务器需要在响应头中包含 `Timing-Allow-Origin` 头。
- **大量数据的处理：** 如果页面包含大量静态资源，考虑如何存储、传输和分析这些数据，避免对性能和用户体验造成影响。
