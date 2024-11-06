**关键词**：请求耗时统计

在前端业务中，可以通过以下几种方法统计请求耗时：

### 初级手段

**一、使用`fetch`结合时间戳**

1. 在发送请求前记录当前时间戳：
   - `const startTime = performance.now();`
2. 使用`fetch`发送请求：
   - `fetch('your-api-url')`
3. 在请求的`.then()`或`.catch()`中记录结束时间戳并计算耗时：

```javascript
.then(response => {
   const endTime = performance.now();
   const duration = endTime - startTime;
   console.log(`Request took ${duration} milliseconds.`);
   return response;
   })
.catch(error => {
   const endTime = performance.now();
   const duration = endTime - startTime;
   console.log(`Request took ${duration} milliseconds with error: ${error}`);
   });
```

**二、使用`XMLHttpRequest`结合时间戳**

1. 创建`XMLHttpRequest`对象并记录开始时间：

```javascript
const xhr = new XMLHttpRequest();
const startTime = performance.now();
```

2. 配置请求并发送：

- `xhr.open('GET', 'your-api-url'); xhr.send();`

3. 在请求的`onload`、`onerror`等事件处理函数中记录结束时间并计算耗时：

```javascript
xhr.onload = function () {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Request took ${duration} milliseconds.`);
};
xhr.onerror = function () {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Request took ${duration} milliseconds with error.`);
};
```

**三、利用拦截器（`axios`）**

1. 如果使用`axios`或类似的库，可以设置请求拦截器和响应拦截器：

- 在请求拦截器中记录开始时间，在响应拦截器中记录结束时间并计算耗时。

```javascript
axios.interceptors.request.use((config) => {
  config.startTime = performance.now();
  return config;
});
axios.interceptors.response.use(
  (response) => {
    const endTime = performance.now();
    const duration = endTime - response.config.startTime;
    console.log(`Request to ${response.config.url} took ${duration} milliseconds.`);
    return response;
  },
  (error) => {
    const endTime = performance.now();
    const duration = endTime - error.config.startTime;
    console.log(`Request to ${error.config.url} took ${duration} milliseconds with error.`);
    return Promise.reject(error);
  }
);
```

**总结**

上面都属于一些初级手段，因为还是在浏览器进程里面， 一旦出现长任务阻塞了浏览器， 这个统计就不太准确了。

### 进阶手段 - Performance API

Performance API 可以用来统计请求耗时。

Performance API 提供了一系列的性能测量工具，可以测量网页加载和运行过程中的各种性能指标。其中，可以通过以下方式来统计网络请求的耗时：

1. 使用`performance.timing`：

   - `performance.timing`对象包含了网页加载过程中的各个时间点信息。可以通过计算不同时间点之间的差值来得到特定阶段的耗时。
   - 例如，可以计算`responseEnd`（服务器响应结束的时间）和`requestStart`（开始请求的时间）之间的差值来得到请求的耗时。

2. 使用`performance.getEntriesByType('resource')`：
   - 这个方法可以获取所有资源加载的性能条目。对于每个资源条目，可以获取其`duration` 等属性，从而计算出资源加载的耗时。
   - 可以遍历这些条目，找到特定的网络请求资源，并计算其耗时。
     ![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/59f66d382dd847c49a3546f913e1719a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pm05bCP56-G:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDEyNTAyMzM1Nzg5OTM2NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1730336010&x-orig-sign=pEMLNQgONe3yTNzoxRaYqwTVRAY%3D)

以下是一个示例代码：

```javascript
// 遍历所有资源加载条目，找到特定请求并计算耗时
const resources = performance.getEntriesByType("resource");
for (const resource of resources) {
  // 指定请求连接诶
  if (resource.name === "https://example.com/specific-resource") {
    console.log(`Specific resource request took ${resource.duration} milliseconds.`);
    break;
  }
}
```

### 高级手段 - Web Worker

Web Worker 可以用于统计请求耗时。

以下是一种使用 Web Worker 统计请求耗时的方法：

1. 创建一个 Web Worker 文件，例如`worker.js`：

```javascript
self.onmessage = function (event) {
  const url = event.data.url;
  const startTime = performance.now();
  fetch(url)
    .then((response) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      self.postMessage({ duration });
    })
    .catch((error) => {
      self.postMessage({ error: `Error fetching ${url}: ${error}` });
    });
};
```

2. 在主页面中使用 Web Worker：

```javascript
const worker = new Worker("worker.js");
const url = "your-api-url";
worker.postMessage({ url });
worker.onmessage = function (event) {
  if (event.data.duration) {
    console.log(`Request to ${url} took ${event.data.duration} milliseconds.`);
  } else {
    console.error(event.data.error);
  }
};
```

在这个例子中，Web Worker 负责发送请求并计算耗时，然后将结果发送回主页面。这样可以在不阻塞主页面 UI 线程的情况下进行请求耗时统计。
