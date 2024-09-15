**关键词**：治理请求数量

> 作者备注  
> 很多同学我有 http2 ， 可以多路复用， 所以请求再多都不会影响页面性能。 实际上是错误的。
> 在作者知道的很多超大型项目（千万行级别的项目）里面， 太多的网络并发（首屏可能就有好大几百的请求发出去）， 会因为 IO 问题到时吃掉很多的 CUP 与网络带宽， 用户依然会觉得非常的卡顿。
> 所以这个话题是非常有意义的。 但是实际中遇到请求过多的问题， 场景是非常少的。
> 目前作者暂定 该问题级别为 「资深」
> 而且该问题没有一个准确的答案， 作者在这里知识提供干一些思路。

**1. 常量请求做本地内存存储**

不是使用 https 缓存， 而是直接存一个 promise 在浏览器内存里面。 保证整个系统里面， 请求只调用一次。

对于一些数据不经常变化的请求，例如用户信息、配置数据等，可以将请求的结果缓存起来。下一次请求相同的资源时，先从缓存中读取数据，如果缓存有效，则无需再发起新的网络请求。

思路类似于下面这张图
![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6ce7486c01f451684160a7738c6417e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1103&h=401&s=57837&e=png&b=fdfdfd)

要达到这样的效果，可以设计一个请求缓存管理器，来管理并发的请求。如果有相同的请求（URL、参数、方法相同）时，只发起一次网络调用，然后将结果分发给所有等待的请求。这种模式通常可以通过一个简单的缓存对象来实现，该对象将请求的唯一标识作为键，对应的 Promise 作为值。

以下是一个基本实现的示例：

```javascript
class RequestCache {
  constructor() {
    this.cache = new Map();
  }

  // 生成请求的唯一标识符，这里仅以 URL 和 Method 为例，实际可能需要包括请求体等
  generateKey(url, method) {
    return `${method}:${url}`;
  }

  // 执行请求的方法，接受 fetch 的所有参数
  request(url, options = {}) {
    const { method = "GET" } = options;
    const key = this.generateKey(url, method);

    // 检查缓存中是否有相同的请求
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    // 没有相同的请求，发起新的请求
    const requestPromise = fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        // 请求成功后，将其从缓存中移除
        this.cache.delete(key);
        return data;
      })
      .catch((error) => {
        // 请求失败也应该从缓存中移除
        this.cache.delete(key);
        throw error;
      });

    // 将新的请求 Promise 保存在缓存中
    this.cache.set(key, requestPromise);

    return requestPromise;
  }
}

// 使用示例
const cache = new RequestCache();
const URL = "https://api.example.com/data";

// 假设这三个请求几乎同时发起
cache.request(URL).then((data) => console.log("请求1:", data));
cache.request(URL).then((data) => console.log("请求2:", data));
cache.request(URL).then((data) => console.log("请求3:", data));
```

这个简单的 `RequestCache` 类通过一个内部的 `Map` 对象管理缓存的请求。当一个新的请求发起时，它会首先检查是否已经有相同的请求存在。如果已存在，那么它只返回先前请求的 Promise；如果不存在，它会发起一个新的网络请求，并将请求的 Promise 存储在缓存中，直到请求完成（无论是成功还是失败）之后，再将其从缓存中移除。

请注意，这里的示例非常基础，且主要用于说明如何缓存并复用请求的结果。在实际应用中，你可能还需要考虑更多细节，比如如何更精细地处理 POST 请求的请求体内容、如何设置缓存的过期时间、错误处理策略、缓存大小限制等。

**推荐参考文档**： https://juejin.cn/post/7341840038964363283

**2. 合并请求**

对于多个小请求，特别是对同一个服务器或 API 的调用，考虑将它们合并为一个较大的请求。例如，如果有多个 API 分别获取用户信息、用户订单、用户地址等，可以考虑后端提供一个合并接口，一次性返回所有所需数据。

**3. 使用 Web 缓存**

- **浏览器缓存**：利用 HTTP 缓存头控制静态资源（CSS、JS、图片）的缓存策略，减少重复请求。
- **数据缓存**：对于 AJAX 请求的响应，可以在前端进行数据缓存，避免短时间内对相同资源的重复请求。

**4. 延迟加载（懒加载）**

对于非首屏必须的资源（如图片、视频、长列表等），可以采用延迟加载或懒加载的方式，只有当用户滚动到相应位置时才加载这些内容，减少初次加载时的请求数量。

**5. 使用服务工作线程（Service Workers）**

通过 Service Workers 可以拦截和缓存网络请求，实现离线体验，减少对服务器的请求。此外，Service Workers 还可以用于请求合并、请求失败的重试策略等。

**6. 避免重复请求**

在某些情况下，为了保证数据的实时性，前端可能会频繁地轮询服务器。可以通过设置合理的轮询间隔或采用基于 WebSocket 的实时数据推送方案，以减少请求次数。

**7. 使用 GraphQL**

对于 REST API 可能导致的过度取数据（over-fetching）或取少数据（under-fetching）问题，可以考虑使用 GraphQL。GraphQL 允许客户端准确指定所需数据的结构，一次请求准确获取所需信息，减少无效数据的传输。

**8. 防抖和节流**

在处理连续的事件触发对后端的请求（如输入框实时搜索、窗口大小调整等）时，使用防抖（debouncing）和节流（throttling）技术可以限制触发请求的频率，减少不必要的请求量。
