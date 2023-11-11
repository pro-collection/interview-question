### 前端日志埋点 SDK 设计思路

既然涉及到了日志和埋点，分析一下需求是啥：

- 自动化上报 页面 PV、UV。 如果能自动化上报页面性能， 用户点击路径行为，就更好了。
- 自动上报页面异常。
- 发送埋点信息的时候， 不影响性能， 不阻碍页面主流程加载和请求发送。
- 能够自定义日志发送， 日志 scope、key、value。

### SDK 设计

sdk 的设计主要围绕以下几个话题来进行：

- SDK 初始化
- 数据发送
- 自定义错误上报
- 初始化错误监控
- 自定义日志上报

**最基本使用**

```js
import StatisticSDK from 'StatisticSDK';
// 全局初始化一次
window.insSDK = new StatisticSDK('uuid-12345');


<button onClick={() => {
  window.insSDK.event('click', 'confirm');
...// 其他业务代码
}}>确认</button>
```

### 数据发送

数据发送是一个最基础的api，后面的功能都要基于此进行。这里介绍使用 `navigator.sendBeacon` 来发送请求；具体原因如下

使用 `navigator.sendBeacon()` 方法有以下优势：

1. 异步操作：`navigator.sendBeacon()` 方法会在后台异步地发送数据，不会阻塞页面的其他操作。这意味着即使页面正在卸载或关闭，该方法也可以继续发送数据，确保数据的可靠性。

2. 高可靠性：`navigator.sendBeacon()` 方法会尽可能地保证数据的传输成功。它使用浏览器内部机制进行发送，具有更高的可靠性和稳定性。即使在网络连接不稳定或断开的情况下，该方法也会尝试发送数据，确保数据的完整性。

3. 自动化处理：`navigator.sendBeacon()` 方法会自动处理数据的发送细节，无需手动设置请求头、响应处理等。它会将数据封装成 POST 请求，并自动设置请求头和数据编码，使开发者能够更专注于业务逻辑的处理。

4. 跨域支持：`navigator.sendBeacon()` 方法支持跨域发送数据。在一些情况下，例如使用第三方统计服务等，可能需要将数据发送到其他域名下的服务器，此时使用 `navigator.sendBeacon()`
   方法可以避免跨域问题。

需要注意的是，`navigator.sendBeacon()` 方法发送的数据是以 POST 请求的形式发送到服务器，通常会将数据以表单数据或 JSON 格式进行封装。因此，后端服务器需要正确处理这些数据，并进行相应的解析和处理。

**简单介绍一下 `navigator.sendBeacon` 用法**

语法：

```js
navigator.sendBeacon(url);
navigator.sendBeacon(url, data);
```

参数

- url
    - url 参数表明 data 将要被发送到的网络地址。

- data 可选
    - data 参数是将要发送的 `ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData 或 URLSearchParams` 类型的数据。

**发送代码实现如下**

```js
class StatisticSDK {
  constructor(productID, baseURL) {
    this.productID = productID;
    this.baseURL = baseURL;
  }

  send(query = {}) {
    query.productID = this.productID;

    let data = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value);
    }
    navigator.sendBeacon(this.baseURL, data);
  }
}
```

### 用户行为与日志上报

用户行为主要涉及到的是事件上报和 pv 曝光， 借助 send 实现即可。

```js
class StatisticSDK {
  constructor(productID, baseURL) {
    this.productID = productID;
    this.baseURL = baseURL;
  }

  send(query = {}) {
    query.productID = this.productID;

    let data = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value);
    }
    navigator.sendBeacon(this.baseURL, data);
  }

  event(key, value = {}) {
    this.send({ event: key, ...value })
  }

  pv() {
    this.event('pv')
  }
}
```

### 性能上报

性能主要涉及的 api 为 performance.timing 里面的时间内容；

```js
class StatisticSDK {
  constructor(productID, baseURL) {
    this.productID = productID;
    this.baseURL = baseURL;
  }

  send(query = {}) {
    query.productID = this.productID;

    let data = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value);
    }
    navigator.sendBeacon(this.baseURL, data);
  }

  // ....
  initPerformance() {
    this.send({ event: 'performance', ...performance.timing })
  }
}
```

### 错误上报

错误上报分两类：

一个是 dom 操作错误与 JS 错误报警， 也是常说的运行时报错。 该类报错直接可以通过 `addEventListener('error')` 监控即可；

另一个是Promise内部抛出的错误是无法被error捕获到的，这时需要用`unhandledrejection`事件。

```js
class StatisticSDK {
  constructor(productID, baseURL) {
    this.productID = productID;
    this.baseURL = baseURL;
  }

  send(query = {}) {
    query.productID = this.productID;

    let data = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value);
    }
    navigator.sendBeacon(this.baseURL, data);
  }

  // ....
  error(err, errInfo = {}) {
    const { message, stack } = err;
    this.send({ event: 'error', message, stack, ...errInfo })
  }

  initErrorListenner() {
    window.addEventListener('error', event => {
      this.error(error);
    })
    window.addEventListener('unhandledrejection', event => {
      this.error(new Error(event.reason), { type: 'unhandledrejection' })
    })
  }
}
```

### React 和 vue 错误边界

错误边界是希望当应用内部发生渲染错误时，不会整个页面崩溃。我们提前给它设置一个兜底组件，并且可以细化粒度，只有发生错误的部分被替换成这个「兜底组件」，不至于整个页面都不能正常工作。

**React**

可以使用类组件错误边界来进行处理， 涉及到的生命周期为：`getDerivedStateFromError` 和 `componentDidCatch`；

```js
// 定义错误边界
class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, errorInfo) {
    // 调用我们实现的SDK实例
    insSDK.error(error, errorInfo)
  }
  render() {
    if (this.state.error) {
      return <h2>Something went wrong.</h2>
    }
    return this.props.children
  }
}
...
<ErrorBoundary>
  <BuggyCounter />
</ErrorBoundary>
```

**Vue**

vue也有一个类似的生命周期来做这件事：`errorCaptured`

```js
Vue.component('ErrorBoundary', {
  data: () => ({ error: null }),
  errorCaptured (err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    // 调用我们的SDK，上报错误信息
    insSDK.error(err,info)
    return false
  },
  render (h) {
    if (this.error) {
      return h('pre', { style: { color: 'red' }}, this.error)
    }
    return this.$slots.default[0]
  }
})
...
<error-boundary>
  <buggy-counter />
</error-boundary>
```


### 参考文档

https://juejin.cn/post/7085679511290773534



