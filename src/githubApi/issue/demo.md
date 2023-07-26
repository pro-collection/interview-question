**关键词**：defer函数、请求结果缓存在JS内存

最优解： **使用deferred思想来实现请求的等待队列，可以借助Promise和async/await语法**。

下面是使用`deferred`思想来实现的代码示例：

```javascript
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

// 创建一个全局的锁标识
let lock = false;

// 创建一个缓存对象
const cache = {};

// 创建一个等待队列数组
const waitingRequests = [];

// 封装请求函数
async function request(url, params) {
  const cacheKey = `${url}-${JSON.stringify(params)}`;

  // 判断锁的状态
  if (lock) {
    const deferred = new Deferred();
    // 如果锁已经被占用，将请求添加到等待队列中
    waitingRequests.push({
      deferred,
      cacheKey
    });
    await deferred.promise;
    return cache[cacheKey];
  }

  // 设置锁的状态为true，表示当前请求正在执行
  lock = true;

  try {
    // 发起实际的请求
    const response = await fetch(url, params);
    const data = await response.json();
    // 将结果存入缓存对象
    cache[cacheKey] = data;
    return data;
  } finally {
    // 释放锁，将锁的状态设置为false
    lock = false;

    // 处理等待队列中的请求
    if (waitingRequests.length > 0) {
      const request = waitingRequests.shift();
      request.deferred.resolve(cache[request.cacheKey]);
    }
  }
}

// 调用请求函数
request('https://api.example.com/data', { method: 'GET' })
  .then(data => {
    // 处理请求结果
    console.log(data);
  });

// 同时发起另一个请求
request('https://api.example.com/data', { method: 'GET' })
  .then(data => {
    // 直接从缓存中获取结果，而不发起实际的请求
    console.log(data);
  });
```

在上述代码中，`Deferred`类用于创建一个延迟对象，其中`promise`属性是一个`Promise`对象，`resolve`和`reject`方法分别用于解决和拒绝该延迟对象的`promise`。通过`await`关键字等待延迟对象的`promise`完成，当锁被占用时，将请求添加到等待队列中，并使用`await`等待对应的延迟对象的`promise`完成后再返回结果。当请求完成后，解锁并处理等待队列中的请求。
