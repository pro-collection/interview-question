**关键词**：取消请求

Axios 可以取消请求。官方文档指出有两种方法可以取消请求，分别是`cancelToken`和`AbortController`，示例代码如下：

- 使用`cancelToken`的方法一：

```javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.post("/user/12345", { name: "new name" }, { cancelToken: source.token });
source.cancel("Operation canceled by the user.");
```

- 使用` cancelToken`的方法二：

```javascript
const CancelToken = axios.CancelToken;
let cancel;
axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});
cancel();
```

- 使用`AbortController`：

```javascript
const controller = new AbortController();
axios.get("/foo/bar", { signal: controller.signal }).then(function (response) {
  //...
});
controller.abort();
```

通过文档描述和示例代码，可以总结出以下功能点：

- 支持`cancelToken`取消请求，`cancelToken`可以通过工厂函数产生，也可以通过构造函数生成；
- 支持 Fetch API 的`AbortController`取消请求；
- 一个`token`/`signal`可以取消多个请求，一个请求也可同时使用`token`/`signal`；
- 如果在开始`axios request`之前执行了取消请求，则并不会发出真实的请求。
