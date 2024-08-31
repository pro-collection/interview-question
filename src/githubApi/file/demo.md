**关键词**：重复请求问题

防止前端页面的重复请求是提升用户体验和减轻服务器压力的重要策略之一。下面是一些实用的方法来减少或防止重复请求：

### 1. 使用锁或标志位

设置一个锁（flag）或状态标志位来控制请求的发送。在首次点击或请求发起时设置该标志位，直到请求完成后再清除该标志，以阻止在请求未完成前再次发起相同的请求。

#### 示例：

```javascript
let isRequestPending = false;

function fetchData() {
  if (isRequestPending) {
    return; // 如果请求已经在进行中，则不再发起新的请求
  }

  isRequestPending = true; // 设置请求标志

  fetch("your-api-endpoint")
    .then((response) => response.json())
    .then((data) => {
      console.log("请求成功:", data);
    })
    .catch((error) => {
      console.error("请求失败:", error);
    })
    .finally(() => {
      isRequestPending = false; // 请求结束，无论成功或失败，都清除请求标志
    });
}

// 模拟用户多次点击
fetchData();
fetchData(); // 这个请求将不会被执行
```

### 2. 使用防抖（Debounce）和节流（Throttle）

防抖和节流是限制函数执行频率的两种常见技术，它们可以有效防止重复请求。

- **防抖**：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
- **节流**：在规定的时间内只能触发一次函数。如果这个时间内触发多次函数，只有一次生效。

#### 示例：

使用 lodash 的 `_.debounce` 和 `_.throttle` 方法：

```javascript
import _ from "lodash";

// 防抖函数
const fetchDataDebounced = _.debounce(fetchData, 300);

// 节流函数
const fetchDataThrottled = _.throttle(fetchData, 300);

// 使用防抖或节流方法来减少函数执行频率
button.addEventListener("click", fetchDataDebounced);
```

### 3. 使用缓存结果（最佳办法）

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
