## 基本概念

WebSocket 是一种基于 TCP 协议的网络通信协议，可以在客户端和服务器之间进行双向通信。相比传统的 HTTP 请求，WebSocket 具有更低的延迟和更高的效率。但是，由于同源策略的限制，**WebSocket 也会受到跨域问题的影响。**

WebSocket 通过在客户端和服务器之间建立持久连接来解决跨域问题。WebSocket 的握手过程与 HTTP 协议相似，客户端首先通过 HTTP 请求与服务器建立连接，然后服务器返回一个握手响应，表示连接已经建立成功。**在握手完成后，客户端和服务器之间就可以通过该连接进行双向通信，不受同源策略的限制。**

需要注意的是，WebSocket 协议本身并没有限制跨域请求，**但是在实际使用中，服务器通常会限制 WebSocket 连接的来源**。这是出于安全性考虑，避免恶意网站通过 WebSocket 连接获取敏感信息。因此，在使用 WebSocket 进行跨域通信时，需要确保服务器允许来自指定域名或 IP 地址的连接。


## WebSocket 同源限制是啥？

WebSocket 通信协议本身不受同源策略限制，因为 WebSocket 是一个独立的协议。但是在建立 WebSocket 连接时，需要进行握手，握手时会发送 HTTP 请求头，因此受到同源策略的限制。需要满足以下条件才能建立 WebSocket 连接：

- 协议头必须为 "ws://" 或 "wss://"（安全的 WebSocket）

- 域名和端口必须与当前网页完全一致

如果以上条件不满足，浏览器将不允许建立 WebSocket 连接。


## 关于请求头的问题
在建立WebSocket连接时，需要添加`Upgrade`头和`Connection`头，其中Upgrade头指明这是一个WebSocket请求，Connection头指明连接方式为升级连接（upgrade）。
服务器如果同意升级，则会返回 101 状态码，表示升级成功，此时 WebSocket 连接建立成功，双方就可以通过该连接进行双向通信。这个过程与同源策略无关，因此 WebSocket 不会受到同源策略的限制。

new WebSocket(url) 创建 WebSocket 对象时，会自动添加 Upgrade 头和 Connection 头。这是因为在 WebSocket 协议中，这两个头部是必需的，用于告知服务器客户端希望建立 WebSocket 连接。
示例代码如下：
```js
const socket = new WebSocket('ws://localhost:8080');
```

此外，在WebSocket请求中也可以添加一些自定义的请求头，例如：
```js
const socket = new WebSocket('ws://localhost:8080', {
  headers: {
    'X-Custom-Header': 'hello',
    'Y-Custom-Header': 'world'
  }
});
```


## 建立一个 WebSocket 连接需要以下步骤：
**1. 创建一个 WebSocket 对象**
```js
const socket = new WebSocket('ws://localhost:8080');
```

**2. 监听 WebSocket 事件**
WebSocket 对象是一个 EventTarget 对象，它可以监听多个事件。常见的事件有 open、message、error 和 close。

- open 事件：WebSocket 连接建立成功时触发。
```js
socket.addEventListener('open', event => {
  console.log('WebSocket 连接已建立');
});
```

- message 事件：WebSocket 收到消息时触发。
```js
socket.addEventListener('message', event => {
  console.log(`收到消息：${event.data}`);
});
```

- error 事件：WebSocket 连接出错时触发。
```js
socket.addEventListener('error', event => {
  console.error('WebSocket 连接出错', event);
});
```

- close 事件：WebSocket 连接关闭时触发。
```js
socket.addEventListener('close', event => {
  console.log('WebSocket 连接已关闭');
});
```

以上是建立 WebSocket 连接的基本步骤。需要注意的是，在使用 WebSocket 协议时，服务器端也需要提供相应的支持。

## 服务端支持
要支持 WebSocket，服务器需要在接收到客户端 WebSocket 握手请求时，返回符合 WebSocket 协议规范的响应。在 Node.js 中，我们可以使用 ws 模块来实现 WebSocket 服务器。以下是一个简单的 WebSocket 服务器的示例代码：
```js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Echo the message back to the client
    socket.send(`Echo: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
```

需要注意的是，在生产环境中，我们需要使用 HTTPS 协议来保证 WebSocket 的安全性。同时，我们还需要注意处理异常情况，例如客户端断开连接等。

其中 `ws` 不是 Node.js 的内置模块，它是一个第三方模块，可以使用 npm 安装。在 Node.js 应用中使用 WebSocket 时，需要先安装 ws 模块。可以使用以下命令进行安装：
```
npm install ws
```

## 服务端如何限制链接源？
在 WebSocket 建立连接的时候，可以通过检查请求的 Origin 头部信息来限制访问源。下面是一个简单的 Node.js 示例代码：
```js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws, req) => {
  const { origin } = req.headers;
  // 判断请求的 origin 是否允许连接
  if (origin === 'https://www.example.com') {
    // 允许连接
    console.log('Connection allowed from', origin);
    ws.send('Connection allowed');
  } else {
    // 拒绝连接
    console.log('Connection refused from', origin);
    ws.close();
  }
});
```

## "ws://" 与 "wss://" 有啥区别？
"ws://" 和 "wss://" 都是 WebSocket 协议的 URL 前缀，它们之间的区别在于传输层协议的不同。

"ws://" 使用的是普通的 HTTP 协议作为传输层协议，在传输过程中数据是明文的，容易被中间人攻击篡改数据，存在安全风险。

"wss://" 使用的是加密的 SSL/TLS 协议作为传输层协议，在传输过程中数据是加密的，更加安全。但是因为要进行 SSL/TLS 握手等复杂过程，所以 "wss://" 的连接建立时间和数据传输速度会比 "ws://" 慢一些。

因此，如果数据传输需要保密性，建议使用 "wss://"，否则可以使用 "ws://"。

