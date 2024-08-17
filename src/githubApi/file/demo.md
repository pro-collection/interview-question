**关键词**：请求缓存

**Axios 本身没有内置的请求缓存机制**，但你可以通过一些策略手动实现，或者使用第三方库来帮助你实现请求缓存。以下是实现 Axios 请求缓存的两种方法：

### 方法 1: 手动实现缓存逻辑

你可以通过创建一个缓存对象和一个自定义的 Axios 实例来实现请求的缓存。每次发起请求前，检查缓存对象中是否已经存在该请求的数据；如果存在，则直接返回缓存数据，否则发起真实的请求，并将请求结果存入缓存对象中。

```javascript
import axios from "axios";

// 创建一个简单的缓存对象
const cache = {};

const fetchWithCache = async (url, config = {}) => {
  // 检查缓存对象中是否已存在请求结果
  const cacheKey = JSON.stringify({ url, ...config });
  if (cache[cacheKey]) {
    return Promise.resolve(cache[cacheKey]);
  }

  // 发起真实请求
  try {
    const response = await axios.get(url, config);
    // 将请求结果存入缓存
    cache[cacheKey] = response;
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 使用 fetchWithCache 函数
fetchWithCache("https://example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

### 方法 2: 使用第三方库

有些第三方库如 `axios-cache-adapter` 可以为 Axios 添加缓存功能，这样你就不需要手动实现缓存逻辑。

```javascript
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

// 创建 cache adapter 实例
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 设置缓存有效期为 15 分钟
});

// 创建一个带有缓存能力的 axios 实例
const axiosWithCache = axios.create({
  adapter: cache.adapter,
});

// 使用带有缓存能力的 axios 实例发起请求
axiosWithCache
  .get("https://example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```
