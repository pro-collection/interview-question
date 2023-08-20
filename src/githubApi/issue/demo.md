**关键词**：web性能指标获取

### 常见性能指标获取方式

相关性能指标问题， 可以看这个文章：[https://github.com/pro-collection/interview-question/issues/515](https://github.com/pro-collection/interview-question/issues/515)

**指标所反映的用户体验**
下表概述了我们的性能指标如何对应到我们的问题之上：

**开始了吗？**

- 首次绘制、首次内容绘制 First Paint (FP) / First Contentful Paint (FCP)

**有用吗？**

- 首次有效绘制、主要元素时间点 First Meaningful Paint (FMP) / Hero Element Timing

**能用吗？**

- 可交互时间点 Time to Interactive (TTI)

**好用吗？**

- 慢会话 Long Tasks (从技术上来讲应该是：没有慢会话)


#### 页面何时开始渲染 - FP & FCP

这两个指标，我们可以通过 performance.getEntry、performance.getEntriesByName、performanceObserver 来获取。

```ts
performance.getEntries().filter(item => item.name === 'first-paint')[0];  // 获取 FP 时间

performance.getEntries().filter(item => item.name === 'first-contentful-paint')[0];  // 获取 FCP 时间

performance.getEntriesByName('first-paint'); // 获取 FP 时间

performance.getEntriesByName('first-contentful-paint');  // 获取 FCP 时间

// 也可以通过 performanceObserver 的方式获取
var observer = new PerformanceObserver(function(list, obj) {
    var entries = list.getEntries();
    entries.forEach(item => {
        if (item.name === 'first-paint') {
            ...
        }
        if (item.name === 'first-contentful-paint') {
            ...
        }
    })
});
observer.observe({type: 'paint'});
```

#### 页面何时渲染主要内容 - FMP & SI & LCP

`FMP`, 是一个已经废弃的性能指标。在实践过程中，由于 FMP 对页面加载的微小差异过于敏感，经常会出现结果不一致的情况。此外，该指标的定义依赖于特定于浏览器的实现细节，这意味着它不能标准化，也不能在所有 Web 浏览器中实现。目前，官方并没有提供有效的获取 FMP 的接口，因此性能分析的时候不再使用这个指标。

`SI` 和 FMP 一样，官方也没有提供有效的获取接口，只能通过 lighthouse 面板来查看，不作为 Sentry 等工具做性能分析的指标。

`LCP`，和 FMP 类似，但只聚焦页面首次加载时最大元素的绘制时间点，计算相对简单一些。通过 performanceObserver 这个接口，我们可以获取到 LCP 指标数据。

```ts
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('LCP candidate:', entry.startTime, entry);
    }
}).observe({type: 'largest-contentful-paint', buffered: true});
```

#### 何时可以交互 - TTI & TBT

`TTI`, `time to ineractive`, 可交互时间， `lighthouse` 面板中的六大指标之一, 用于测量页面从开始加载到主要资源完成渲染，并能够快速、可靠地响应用户输入所需的时间, 值越小约好。 
官方资料: [TTI](https://web.dev/i18n/zh/tti/) 。

和 FMP、SI 一样，`官方并没有提供获取 TTI 的有效接口`，只能通过 lighthouse 面板来查看。

**计算方式人如下**:

1. 先进行 First Contentful Paint 首次内容绘制；

2. 沿时间轴正向搜索时长至少为 5 秒的安静窗口，其中，安静窗口的定义为：没有长任务且不超过 2 个正在处理的网络请求;

3. 沿时间轴反向搜索安静窗口之前的最后一个长任务，如果没有找到长任务，则在 FCP 步骤停止执行。

4. TTI 是安静窗口之前最后一个长任务的结束时间（如果没有找到长任务，则与 FCP 值相同）。

理解计算过程如下图：
<img width="1045" alt="image" src="https://github.com/pro-collection/interview-question/assets/22188674/7f26aa08-6360-4d4c-9aaf-d945690cd9d1">

TTI 表示的是完全可交互的时间， 每个 web 系统， 对 TTI 时间定义可能并不一定相同， 上面只是提供一个计算较为通用的 TTI 的一个方式。 

#### 交互是否有延迟 - FID & MPFID & Long Task

`FID 和 MPFID` 可用来衡量用户首次交互延迟的情况，`Long Task` 用来衡量用户在使用应用的过程中遇到的延迟、阻塞情况。

**`FID`**，`first input delay`, 首次输入延迟，测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。官方资料: FID。
FID 指标的值越小约好。通过 performanceObserver，我们可以获取到 FID 指标数据。

```ts
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    const delay = entry.processingStart - entry.startTime;
    console.log('FID candidate:', delay, entry);
  }
}).observe({type: 'first-input', buffered: true});
```

**`MPFID`**, `Max Potential First Input Delay`，最大潜在首次输入延迟，用于测量用户可能遇到的最坏情况的首次输入延迟。和 FMP 一样，这个指标已经被废弃不再使用。

**`Long Task`**，衡量用户在使用过程中遇到的交互延迟、阻塞情况。这个指标，可以告诉我们哪些任务执行耗费了 50ms 或更多时间。

```ts
new PerformanceObserver(function(list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
        ...
    }
}).observe({ type: 'longtask'});
```

#### 页面视觉是否有稳定 - CLS

**`CLS`**, `Cumulative Layout Shift`, 累积布局偏移，用于测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移情况。官方资料: CLS。

CLS, 值越小，表示页面视觉越稳定。通过 performanceObserver，我们可以获取到 CLS 指标数据。
```ts
new PerformanceObserver(function(list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
        ...
    }
}).observe({type: 'layout-shift', buffered: true});
```
