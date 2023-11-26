看过很多请求超时重试的样例， 很多都是基于 axios interceptors 实现的。 但是有没有牛逼的原生方式实现呢？

最近在看 fbjs 库里面的代码， 发现里面有一个超时重试的代码， 只有一百多行代码， 封装的极其牛逼。 直接贴代码地址：[github.com/facebook/fb…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffbjs%2Fblob%2Fmain%2Fpackages%2Ffbjs%2Fsrc%2Ffetch%2FfetchWithRetries.js "https://github.com/facebook/fbjs/blob/main/packages/fbjs/src/fetch/fetchWithRetries.js")

不过这里的代码是 Flow 类型检测的代码， 而且有一些外部小依赖， 接下来， 咱们解除依赖， 然后一步一步来实现一下这部分逻辑。

**这里简单介绍一下 fbjs 这个库**

> fbjs（Facebook JavaScript）是一个由 Facebook 开发和维护的 JavaScript 工具库。它提供了一组通用的 JavaScript 功能和实用工具，用于辅助开发大型、高性能的 JavaScript 应用程序。

### 1.先封装一个正常的请求

我们先用 fetch 封装一个非常正常的请求， 这个没有什么好说的， 直接上代码：

```ts
// 发起请求
const sendTimedRequest = (url: string, fetchConfig: RequestInit) => {
  const request = fetch(url, fetchConfig);

  return new Promise((resolve, reject) => {
    request.then(response => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        const error: any = new Error(`response error.`);
        error.response = response;
        reject(error);
      }
    }).catch(error => {
      reject(error);
    });
  });
};
```

### 2.请求超时判定

需要再次封装一个 参数 `fetchTimeout`， 这个参数的作用就是指明超时时间。 计算超时时间是从请求发起的时候开始计算， 如果超过 `fetchTimeout` 证明请求就超时了， 那么直接阻断该请求的；

要实现超时时间和阻断请求， 使用的原理也很简单， 就是 **闭包 + setTimeout + flag**

所以因为引入了闭包， 我们需要将上面的 `sendTimedRequest` 放置在一个闭包函数里面， 直接上代码：

```ts
interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
}

const DEFAULT_TIMEOUT = 1000 * 1.5;


const fetchWithRetries = (url: string, initWithRetries?: InitWithRetries): Promise<any> => {
  // fetchTimeout 请求超时时间
  // 请求
  const { fetchTimeout, ...init } = initWithRetries || {};

  // 超时时间
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;

  // 开始时间
  let requestStartTime = 0;

  return new Promise((resolve, reject) => {
    // 申明发送请求方法
    const sendTimedRequest = (): void => {
      // 发起请求时间
      requestStartTime = Date.now();

      // 是否需要处理后续请求
      let isRequestAlive = true;

      // 发起请求
      const request = fetch(url, init);

      // 请求超时情况
      const requestTimeout = setTimeout(() => {
        // 需要阻断正常的请求返回
        isRequestAlive = false;

        // 需要重新发起请求
        sendTimedRequest();
      }, _fetchTimeout);

      // 正常请求发起
      request.then(response => {
        // 正常请求返回的场景， 清空定时器
        clearTimeout(requestTimeout);

        // 如果进入了超时流程， 那么正常返回的逻辑， 就直接阻断
        if (isRequestAlive) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          } else {
            const error: any = new Error(`response error.`);
            error.response = response;
            reject(error);
          }
        }
      }).catch(error => {
        reject(error);
      });
    };

    sendTimedRequest();
  });
};
```

### 3.上面代码存在问题

上面的代码其实是存在问题的；我们设置的超时时间是 1.5s ， 那么如果接口时间过长， 会存在的情况是啥？ **无限重复请求**

就像下面这样子：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/554279a30e1048dbb31f4fad2708a1cb~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2938&h=332&s=89984&e=png&b=fdfdfd)

那么接下来要解决的问题就是， 重复请求次数问题， 我们需要把重复发起请求的次数限定在一个可控范围内；那么就需要加入重复请求次数的概念。

重复请求次数的概念， fbjs 里面的设计就非常巧妙了。因为他是一个数组，每个元素都是数字，每个数字对应的就是延迟重复请求的时间。

比如：

```ts
const DEFAULT_RETRIES = [1000, 3000];
```

上面的设置中， 表示首次请求超时之后， 会再次发起两次重复请求， 第一次重复请求延迟时间为 1000 ms 的时候发起， 第二次重复请求延迟时间为 3000ms 的时候发起。如果两次重复请求均失败， 那么最后再把最终失败结果作为 promise.reject 返回。

再例如， 如果设置时间为：

```ts
const DEFAULT_RETRIES = [0, 0];
```

那么会重复请求 2 次， 不会进行延迟请求， 第一次请求如果超时时间为 1.5 秒之后， 接口没有返回， 那么会立马进行第一次重试请求， 第一次重试请求 1.5秒 之后， 接口还是没有返回， 就进行第二次重试请求。

同时还需要一个概念就是， 如何判定是否需要再次请求， 即 `shouldRetry` 函数， 判定需要是否发起重复请求；

说到这儿了， 直接上完整代码

```ts
interface InitWithRetries extends RequestInit {
  fetchTimeout?: number | null;
  retryDelays?: number[] | null;
}

const DEFAULT_TIMEOUT = 1000 * 1.5;
const DEFAULT_RETRIES = [0, 0];

const fetchWithRetries = (url: string, initWithRetries?: InitWithRetries): Promise<any> => {
  // fetchTimeout 请求超时时间
  // 请求
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};

  // 超时时间
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;

  // 重复时间数组
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  // 开始时间
  let requestStartTime = 0;

  // 重试请求索引
  let requestsAttempted = 0;

  return new Promise((resolve, reject) => {
    // 申明发送请求方法
    const sendTimedRequest = (): void => {
      // 自增索引与请求次数
      requestsAttempted++;

      // 发起请求时间
      requestStartTime = Date.now();

      // 是否需要处理后续请求
      let isRequestAlive = true;

      // 发起请求
      const request = fetch(url, init);

      // 请求超时情况
      const requestTimeout = setTimeout(() => {
        // 需要阻断正常的请求返回
        isRequestAlive = false;

        // 需要重新发起请求
        if (shouldRetry(requestsAttempted)) {
          console.warn("fetchWithRetries: HTTP timeout, retrying.");
          retryRequest();
        } else {
          reject(new Error(
            `fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`,
          ));
        }
      }, _fetchTimeout);

      // 正常请求发起
      request.then(response => {
        // 正常请求返回的场景， 清空定时器
        clearTimeout(requestTimeout);

        // 如果进入了超时流程， 那么正常返回的逻辑， 就直接阻断
        if (isRequestAlive) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          } else if (shouldRetry(requestsAttempted)) {
            console.warn("fetchWithRetries: HTTP error, retrying.");
            retryRequest();
          } else {
            const error: any = new Error(`response error.`);
            error.response = response;
            reject(error);
          }
        }
      }).catch(error => {
        clearTimeout(requestTimeout);
        if (shouldRetry(requestsAttempted)) {
          retryRequest();
        } else {
          reject(error);
        }
      });
    };

    // 发起重复请求
    const retryRequest = (): void => {
      // 重复请求 delay 时间
      const retryDelay = _retryDelays[requestsAttempted - 1];

      // 重复请求开始时间
      const retryStartTime = requestStartTime + retryDelay;

      // 延迟时间
      const timeout = retryStartTime - Date.now() > 0 ? retryStartTime - Date.now() : 0;

      // 重复请求
      setTimeout(sendTimedRequest, timeout);
    };

    // 是否可以发起重复请求
    const shouldRetry = (attempt: number): boolean => attempt <= _retryDelays.length;

    sendTimedRequest();
  });
};

fetchWithRetries("http://127.0.0.1:3000/user/")
```

### 4.测试

测试代码就是上面的完整代码， 如果我们有一个接口， 1s 左右返回， 因为超时时间为 1.5 s 那么， 请求会直接成功， 只会请求一次即可：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/495e3bbdc24c464ebc7d604a2b2bbe63~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1930&h=748&s=154321&e=png&b=faf9f9)

那么， 如果接口时间改为 2 s 时间返回：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b00cdc0768842b89c4a31b6817aa90c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1928&h=564&s=113164&e=png&b=fcfcfc)

### 5.彩蛋

上面使用到了一个 mock 接口， 这里推荐一个非常非常非常好用的 mock 工具， 使用简单又好使： **webpro/dyson**

比如 mock 上面的 user 请求， 那么只需要下面代码就可以了: 文件 `/src/index.js`, 代码如下

```js
module.exports = {
  path: '/user/',
  method: 'GET',
  delay: 2000,
  cache: false,
  template: (params, query, body, cookies, headers) => {
    return {
      message: 'success',
      status: 200,
    }
  }
}
```

直接启动命令行即可：

```bash
dyson ./src 3000
```

更多使用文档可以访问 github 官方文档

### 源码链接

直接丢链接： [github.com/yanlele/nod…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fyanlele%2Fnode-index%2Ftree%2Fmaster%2Fbooks%2F%25E7%259F%25A5%25E8%25AF%2586%25E5%25BA%2593%2F01%25E3%2580%2581%25E5%2589%258D%25E7%25AB%25AF%25E6%258A%2580%25E6%259C%25AF%25E7%259F%25A5%25E8%25AF%2586%2F27.%25E8%25AF%25B7%25E6%25B1%2582%25E8%25B6%2585%25E6%2597%25B6%25E9%2587%258D%25E8%25AF%2595 "https://github.com/yanlele/node-index/tree/master/books/%E7%9F%A5%E8%AF%86%E5%BA%93/01%E3%80%81%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF%E7%9F%A5%E8%AF%86/27.%E8%AF%B7%E6%B1%82%E8%B6%85%E6%97%B6%E9%87%8D%E8%AF%95")