**关键词**：请求缓存

手写一个 axios 中间件， 支持缓存返回到本地内存， 下次同样的请求路径和参数， 直接返回上一次的缓存内容即可， 不需再请求， 同时支持设置自动清除缓存数据的时间。

创建一个简单的 Axios 中间件来支持内存缓存可以大致分为以下步骤：

1. 实现一个缓存管理器，可以存储、检索和删除缓存数据。
2. 在发送请求前，检查是否存在对应的缓存数据，如果存在，则直接返回缓存数据，而不是发起新的请求。
3. 在接收到新的请求响应后，将响应数据存储到缓存中，并设置一个定时器来自动清除过期的缓存数据。

下面是一个简单的实现示例：

```javascript
import axios from "axios";

class CacheManager {
  constructor() {
    this.cache = {};
  }

  // 生成缓存键
  _generateCacheKey(url, params) {
    const paramString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return `${url}?${paramString}`;
  }

  // 设置缓存
  set(url, params, data, ttl) {
    const cacheKey = this._generateCacheKey(url, params);

    // 清除可能存在的旧缓存
    if (this.cache[cacheKey]) {
      clearTimeout(this.cache[cacheKey].timeout);
    }

    // 设置新的缓存
    const timeout = setTimeout(() => {
      delete this.cache[cacheKey];
    }, ttl);

    this.cache[cacheKey] = { data, timeout };
  }

  // 获取缓存
  get(url, params) {
    const cacheKey = this._generateCacheKey(url, params);
    return this.cache[cacheKey] ? this.cache[cacheKey].data : null;
  }
}

// 创建缓存管理器实例
const cacheManager = new CacheManager();

// 自定义请求拦截器
axios.interceptors.request.use((config) => {
  // 检查缓存
  const cachedResponse = cacheManager.get(config.url, config.params || {});

  if (cachedResponse) {
    // 如果找到缓存，将缓存数据作为Promise直接返回
    return Promise.reject({
      config,
      response: cachedResponse,
      isCached: true, // 自定义属性，标记这是一个缓存的结果
    });
  }

  return config;
});

// 自定义响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 存储新的响应数据到缓存。假设 TTL（生存时间）为 1 分钟（60000 毫秒）
    cacheManager.set(response.config.url, response.config.params || {}, response, 60000);
    return response;
  },
  (error) => {
    // 检查错误对象中是否包含缓存响应
    if (error.isCached) {
      // 直接返回缓存响应
      return Promise.resolve(error.response);
    }
    // 对于其他类型的错误，继续抛出
    return Promise.reject(error);
  }
);

// 使用自定义的 Axios 实例发送请求
// 随后的请求（在缓存未过期之前），会直接返回缓存的数据
axios
  .get("https://example.com/data", { params: { userId: "123" } })
  .then((response) => console.log("Response:", response))
  .catch((error) => console.log("Error:", error));
```

这个简单的实现展示了如何在 Axios 请求级别添加缓存逻辑。你可以根据你的实际需求调整和扩展这个实现，比如添加错误处理逻辑、支持更复杂的缓存失效策略等。
