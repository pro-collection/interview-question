**关键词**：web性能指标

### 性能的核心问题

- 什么样的性能指标最能度量人的感觉？
- 怎样才能从我们的真实用户中获取这些指标？
- 如何用我们所获取的指标来确定一个页面表现得是否「快」？
- 当我们得知用户所感知的真实性能表现后，我们应该如何做才能避免重蹈覆辙，并在未来提高性能表现？

### 以用户为中心的性能指标

**开始了吗？**
页面开始加载了吗？得到了服务端的回应吗？

**有用吗？**
有足够用户期望看到的内容被渲染出来了吗？

**能用吗？**
用户能够与我们的页面交互了吗？还是依然在加载？

**好用吗？**
交互是否流畅、自然、没有延迟与其他的干扰？

#### 首次绘制（First Paint）和首次内容绘制（First Contentful Paint）

首次绘制（FP）和首次内容绘制（FCP）。在浏览器导航并渲染出像素点后，这些指标点立即被标记。 这些点对于用户而言十分重要，因为它回答了我们的第一个问题问题：**开始了吗**？

FP与FCP的主要区别在于，FP标记浏览器所渲染的任何与导航前内容不同的点，而FCP所标记的是来自于DOM中的内容，可能是文本、图片、SVG，甚至是canvas元素。


#### 首次有效绘制（First Meaningful Pain）和主要元素时间点（Hero Element Timing）

首次有效绘制（FMP）回答了我们的问题：**有用吗**？对于现存的所有网页而言，我们不能去清晰地界定哪些元素的加载是「有用」的（因此目前尚无规范），
但是对于开发者他们自己而言，他们很容易知道页面的哪些部分对于用户而言是最为有用的。

![image](https://github.com/pro-collection/interview-question/assets/22188674/613b9446-c386-47c9-84fd-ce53e9e2f2b2)

这些页面中「最重要的部分」通常被称为**主要元素**。举一些例子，在YouTube的播放页面，播放器就是主要元素。在Twitter中可能是通知的图标，或者是第一条推文。在 天气应用中，主要元素应是指定位置的预测信息。在一个新闻站点中，它可能是摘要，或者是第一张插图。

网页中总有一部分内容的重要性大于其余的部分。如果这部分的内容能够很快地被加载出来，用户甚至都不会在意其余部分的加载情况。


#### 可交互时间（TTI）

可交互时间（TTI）标记了你的页面已经呈现了画面，并且能够响应用户输入的时间点。页面不能响应用户输入有以下常见的原因：

- 将被JavaScript所操作的元素还未被加载出来；
- 一些慢会话阻塞了浏览器的主线程（如我们在上一部分所描述的）

TTI所记录实际上是页面的JavaScript完成了初始化，主线程处于空闲的时间点。


#### long tasks

浏览器像是单线程的。 某些情况下，一些任务将可能会花费很长的时间来执行，如果这种情况发生了，主线程阻塞，剩下的任务只能在队列中等待。

用户所感知到的可能是输入的延迟，或者是哐当一下全部出现。这些是当今网页糟糕体验的主要来源。

Long Tasks API认为任何超过50毫秒的任务都可能存在潜在的问题，并将这些任务揭露给开发者。既然能够满足50毫秒内完成任务，也就能够符合RAIL在100毫秒内相应用户输入的要求。


#### 指标所反映的用户体验

下表概述了我们的性能指标如何对应到我们的问题之上：

**开始了吗**？
- 首次绘制、首次内容绘制 First Paint (FP) / First Contentful Paint (FCP)

**有用吗**？
- 首次有效绘制、主要元素时间点 First Meaningful Paint (FMP) / Hero Element Timing

**能用吗**？
- 可交互时间点 Time to Interactive (TTI)

**好用吗**？
- 慢会话 Long Tasks (从技术上来讲应该是：没有慢会话)


### 获取指标

主要依赖浏览器提供的 api 
- [PerformanceObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)
- [PerformanceEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry)
- [DOMHighResTimeStamp](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp)


#### PerformanceObserver 使用示范

要使用 PerformanceObserver，首先需要创建一个 PerformanceObserver 实例，并指定一个回调函数作为参数。回调函数将在性能事件触发时被调用。然后，通过 PerformanceObserver 的 observe() 方法去监听所关注的性能事件类型。

以下是一个使用 PerformanceObserver 的示例代码：

```javascript
// 创建回调函数
function performanceCallback(list, observer) {
  list.getEntries().forEach(entry => {
    console.log(entry.name + "：" + entry.startTime);
  });
}

// 创建 PerformanceObserver 实例
const observer = new PerformanceObserver(performanceCallback);

// 监听性能事件类型
observer.observe({ entryTypes: ["measure", "paint"] });
```

在上面的代码中，定义了一个名为 `performanceCallback` 的回调函数，它接收两个参数：`list` 和 `observer`。`list` 参数是一个 PerformanceEntryList 对象，包含了所有触发的性能事件，可以通过 `getEntries()` 方法获取详细信息。`observer` 参数表示 PerformanceObserver 实例本身。

然后，通过 `new PerformanceObserver(performanceCallback)` 创建了一个 PerformanceObserver 实例，并将 `performanceCallback` 作为回调函数传递进去。

最后，通过 `observer.observe({ entryTypes: ["measure", "paint"] })` 方法，指定了要监听的性能事件类型，这里监听了 "measure" 和 "paint" 两种类型的事件。

当指定的性能事件类型发生时，回调函数将被调用，并传递触发事件的 PerformanceEntry 对象作为参数。开发者可以在回调函数中进一步处理和分析这些对象，以获取性能数据并进行优化。

需要注意的是，观察者模式是异步的，因此回调函数可能不会立即执行。另外，一旦创建了 PerformanceObserver 实例，需要调用其 `disconnect()` 方法来停止监听性能事件，避免内存泄漏。

以上是 PerformanceObserver 的基本用法，开发者可以根据实际需求和业务场景来灵活运用。


### PerformanceObserver 如何统计FP、FCP

要使用 PerformanceObserver 统计 FP（First Paint）和 FCP（First Contentful Paint），可以按照以下步骤进行：

1. 创建 PerformanceObserver 实例，并指定一个回调函数作为参数。

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.name === 'first-paint') {
      console.log('FP:', entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  });
});
```

2. 使用 PerformanceObserver 的 observe() 方法监听 'paint' 类型的性能事件。

```javascript
observer.observe({ entryTypes: ['paint'] });
```

3. 在回调函数中，通过遍历 PerformanceEntryList 对象的 getEntries() 方法获取所有触发的性能事件，然后根据 entry.name 来判断是否是 FP 或 FCP。

4. 如果是 FP，可以通过 entry.startTime 获取其开始的时间戳，进行相应的处理。同样，如果是 FCP，也可以通过 entry.startTime 获取其开始的时间戳。

完整的示例代码如下：

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.name === 'first-paint') {
      console.log('FP:', entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  });
});

observer.observe({ entryTypes: ['paint'] });
```

在上述代码中，创建了一个 PerformanceObserver 实例，并指定一个回调函数。在回调函数中，根据 entry.name 的值判断是否是 FP 或 FCP，并打印出对应的开始时间戳。然后通过调用 observer.observe() 方法监听 'paint' 类型的性能事件。

通过以上步骤，就可以使用 PerformanceObserver 统计 FP 和 FCP，并对这些性能指标进行进一步的处理和分析。

#### PerformanceObserver 如何统计 long tasks

要使用 PerformanceObserver 统计长任务（Long Tasks），可以按照以下步骤进行：

1. 创建 PerformanceObserver 实例，并指定一个回调函数作为参数。

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log('Long Task:', entry);
  });
});
```

2. 使用 PerformanceObserver 的 observe() 方法监听 'longtask' 类型的性能事件。

```javascript
observer.observe({ entryTypes: ['longtask'] });
```

3. 在回调函数中，通过遍历 PerformanceEntryList 对象的 getEntries() 方法获取所有触发的长任务事件。

4. 可以通过遍历获得的长任务事件数据，并进行进一步的处理和分析。

完整的示例代码如下：

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log('Long Task:', entry);
  });
});

observer.observe({ entryTypes: ['longtask'] });
```

在上述代码中，创建了一个 PerformanceObserver 实例，并指定一个回调函数。在回调函数中，遍历 PerformanceEntryList 对象的 getEntries() 方法获取所有长任务事件，并打印出相关的长任务数据。

通过以上步骤，就可以使用 PerformanceObserver 统计长任务，并对这些长任务进行进一步的处理和分析。

### 补充： 页面性能指标有哪些？

以下是常见的页面性能指标，按照阶段顺序进行表述：

| 阶段              | 指标名称                       | 描述                                                                                         |
|------------------|--------------------------------|----------------------------------------------------------------------------------------------|
| 导航阶段          | DNS 解析时间                   | 浏览器解析域名并获取目标服务器IP地址所花费的时间                                            |
| 导航阶段          | TCP 连接时间                   | 浏览器与服务器建立 TCP 连接所花费的时间                                                     |
| 导航阶段          | SSL/TLS 握手时间                | 如果网站启用了 HTTPS，浏览器与服务器进行 SSL/TLS 握手所花费的时间                          |
| 导航阶段          | 请求时间                       | 浏览器发送 HTTP 请求并等待服务器响应的时间                                                  |
| 导航阶段          | 首字节时间（TTFB）              | 浏览器收到服务器响应的第一个字节所花费的时间                                                |
| 渲染阶段          | DOM 解析时间                   | 浏览器将 HTML 文档解析为 DOM 树的时间                                                      |
| 渲染阶段          | CSS 解析时间                   | 浏览器将 CSS 样式表解析为 CSSOM 树的时间                                                    |
| 渲染阶段          | 首次渲染时间（FP）              | 浏览器将 DOM 树和 CSSOM 树合并，开始绘制页面的时间                                          |
| 渲染阶段          | 首次内容绘制时间（FCP）         | 页面首次有可见内容被绘制的时间                                                              |
| 渲染阶段          | 首次有意义绘制时间（FMP）       | 页面首次有有意义的内容被绘制的时间                                                          |
| 交互阶段          | 首次输入延迟时间（FID）         | 用户首次与页面进行交互（点击按钮、输入框等）后，页面响应交互的时间                           |
| 交互阶段          | 首次可交互时间（TTI）           | 页面变得完全可交互（用户可以进行大部分常规操作）所花费的时间                                 |
| 交互阶段          | 页面完全加载时间（Page Load）  | 页面所有资源（包括图片、CSS、JavaScript等）加载完成、渲染完毕并且可交互的时间                  |
| 用户体验阶段      | 页面响应时间                   | 用户发起请求后，页面完成响应所花费的时间                                                    |
| 用户体验阶段      | 页面加载时间                   | 用户打开页面到页面加载完成所花费的时间                                                      |
| 用户体验阶段      | 页面交互性能                   | 页面响应用户交互（点击、滚动等）的流畅程度                                                  |

请注意，以上仅为常见的页面性能指标，并非所有指标都适用于每个网站。具体的指标选择取决于你的应用的特点和需求。
