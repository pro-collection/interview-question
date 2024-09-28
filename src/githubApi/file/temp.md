> 作者备注
>
> 新版本已经废弃使用 cancelToken ，改为使用 signal

### 取消请求

`timeout`在 axios 调用中设置属性**可处理响应**相关的超时。

在某些情况下（例如网络连接不可用），提前取消连接对 axios**调用**大有裨益。如果不取消连接，axios 调用可能会挂起，直到父代码/堆栈超时（在服务器端应用程序中可能需要几分钟）。

要终止 axios 调用，您可以使用以下方法：

- `signal`
- `cancelToken`（已弃用）

组合`timeout`和取消方法（例如`signal`）应该涵盖**响应**相关的超时和**连接**相关的超时。

### `signal`：中止控制器

从`v0.22.0`Axios 开始支持[`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)以 fetch API 方式取消请求：

```js
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then(function (response) {
    //...
  });
// cancel the request
controller.abort();
```

使用最新 API `nodejs 17.3+`. 的超时示例[`AbortSignal.timeout()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout)：

```js
axios
  .get("/foo/bar", {
    signal: AbortSignal.timeout(5000), //Aborts request after 5 seconds
  })
  .then(function (response) {
    //...
  });
```

具有超时辅助函数的示例：

```js
function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

axios
  .get("/foo/bar", {
    signal: newAbortSignal(5000), //Aborts request after 5 seconds
  })
  .then(function (response) {
    //...
  });
```

### 取消令牌`deprecated`

还可以使用 CancelToken\_取消请求。

> Axios 取消令牌 API 基于已撤回的[可取消承诺提案](https://github.com/tc39/proposal-cancelable-promises)。

> 此 API 已弃用`v0.22.0`，不应在新项目中使用

您可以使用工厂创建取消令牌`CancelToken.source`，如下所示：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
```

您还可以通过将执行器函数传递给构造函数来创建取消令牌`CancelToken`：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

> 注意：您可以使用相同的取消令牌/信号取消多个请求。

在过渡期间，你可以使用这两个取消 API，即使对于同一个请求也是如此：

```js
const controller = new AbortController();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
    signal: controller.signal,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
// OR
controller.abort(); // the message parameter is not supported
```
