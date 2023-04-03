### 首先我们要知道有哪些方式可以统计前端请求耗时

从代码层面上统计全站所有请求的耗时方式主要有以下几种：

1. Performance API：Performance API 是浏览器提供的一组 API，可以用于测量网页性能。通过 Performance API，可以获取页面各个阶段的时间、资源加载时间等。其中，Performance Timing API 可以获取到每个资源的加载时间，从而计算出所有请求的耗时。

2. XMLHttpRequest 的 load 事件：在发送 XMLHttpRequest 请求时，可以为其添加 load 事件，在请求完成时执行回调函数，从而记录请求的耗时。

3. fetch 的 Performance API：类似 XMLHttpRequest，fetch 也提供了 Performance API，可以通过 Performance API 获取请求耗时。

4. 自定义封装的请求函数：可以自己封装一个请求函数，在请求开始和结束时记录时间，从而计算请求耗时。



### 设计一套前端全站请求耗时统计工具

可以遵循以下步骤：

1. 实现一个性能监控模块，用于记录每个请求的开始时间和结束时间，并计算耗时。

2. 在应用入口处引入该模块，将每个请求的开始时间记录下来。

3. 在每个请求的响应拦截器中，记录响应结束时间，并计算请求耗时。

4. 将每个请求的耗时信息发送到服务端，以便进行进一步的统计和分析。

5. 在服务端实现数据存储和展示，可以使用图表等方式展示请求耗时情况。

6. 对于请求耗时较长的接口，可以进行优化和分析，如使用缓存、使用异步加载、优化查询语句等。

7. 在前端应用中可以提供开关，允许用户自主开启和关闭全站请求耗时统计功能。

以下是一个简单的实现示例：

```js
// performance.js

const performance = {
  timings: {},
  config: {
    reportUrl: '/report',
  },
  init() {
    // 监听所有请求的开始时间
    window.addEventListener('fetchStart', (event) => {
      this.timings[event.detail.id] = {
        startTime: Date.now(),
      };
    });

    // 监听所有请求的结束时间，并计算请求耗时
    window.addEventListener('fetchEnd', (event) => {
      const id = event.detail.id;
      if (this.timings[id]) {
        const timing = this.timings[id];
        timing.endTime = Date.now();
        timing.duration = timing.endTime - timing.startTime;

        // 将耗时信息发送到服务端
        const reportData = {
          url: event.detail.url,
          method: event.detail.method,
          duration: timing.duration,
        };
        this.report(reportData);
      }
    });
  },
  report(data) {
    // 将耗时信息发送到服务端
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.config.reportUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  },
};

export default performance;
```

在应用入口处引入该模块：

```js
// main.js

import performance from './performance';

performance.init();
```

在每个请求的响应拦截器中触发 `fetchEnd` 事件：

```js
// fetch.js

import EventBus from './EventBus';

const fetch = (url, options) => {
  const id = Math.random().toString(36).slice(2);
  const fetchStartEvent = new CustomEvent('fetchStart', {
    detail: {
      id,
      url,
      method: options.method || 'GET',
    },
  });
  EventBus.dispatchEvent(fetchStartEvent);

  return window.fetch(url, options)
    .then((response) => {
      const fetchEndEvent = new CustomEvent('fetchEnd', {
        detail: {
          id,
          url,
          method: options.method || 'GET',
        },
      });
      EventBus.dispatchEvent(fetchEndEvent);

      return response;
    });
};

export default fetch;
```

在服务端实现数据存储和展示，可以使用图表等方式展示请求耗
