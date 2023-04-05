一个网页获取新的数据通常需要发送一个请求到服务器，也就是向服务器请求的页面。使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。这些被推送进来的信息可以在这个页面上作为 Events + data 的形式来处理。

### 从服务器接受事件
服务器发送事件 API 也就是 EventSource 接口，在你创建一个新的 EventSource 对象的同时，你可以指定一个接受事件的 URI。例如：

```js
const evtSource = new EventSource("ssedemo.php");
```

如果发送事件的脚本不同源，应该创建一个新的包含 URL 和 options 参数的EventSource对象。例如，假设客户端脚本在 example.com 上：

```js
const evtSource = new EventSource("//api.example.com/ssedemo.php", { withCredentials: true } );
```

一旦你成功初始化了一个事件源，就可以对 message 事件添加一个处理函数开始监听从服务器发出的消息了：

```js
evtSource.onmessage = function(event) {
  const newElement = document.createElement("li");
  const eventList = document.getElementById("list");

  newElement.innerHTML = "message: " + event.data;
  eventList.appendChild(newElement);
}
```

你也可以使用addEventListener()方法来监听其他类型的事件：

```js
evtSource.addEventListener("ping", function(event) {
  const newElement = document.createElement("li");
  const time = JSON.parse(event.data).time;
  newElement.innerHTML = "ping at " + time;
  eventList.appendChild(newElement);
});
```

> 警告： 当不通过 HTTP / 2 使用时，SSE（server-sent events）会受到最大连接数的限制，这在打开各种选项卡时特别麻烦，因为该限制是针对每个浏览器的，并且被设置为一个非常低的数字（6）。该问题在 Chrome 和 Firefox中被标记为“无法解决”。此限制是针对每个浏览器 + 域的，因此这意味着您可以跨所有选项卡打开 6 个 SSE 连接到 www.example1.com，并打开 6 个 SSE 连接到 www.example2.com。（来自 Stackoverflow）。使用 HTTP / 2 时，HTTP 同一时间内的最大连接数由服务器和客户端之间协商（默认为 100）。

### SSE 的 API

**属性（只读）**

|名称|作用|类型|备注|
|:---|:---|:---|:---|
|readyState|当前状态|Number|`0` — connecting`1` — open`2` — closed|
|url|当前连接的地址|String||
|withCredentials|是否开启凭据收集|Boolean||

**方法**

|名称|作用|返回值|
|:---|:---|:---|
|close|客户端主动关闭连接|\-|

**事件**

|名称|作用|返回值|
|:---|:---|:---|
|onclose|连接关闭触发|event|
|onopen|连接开启触发|event|
|onmessage|服务端消息推动消息触发|event|


### 服务端 API

|名称|作用|类型|备注|
|:---|:---|:---|:---|
|data|传输的文本|String（默认）. 可以传输JSON|可以多行累加|
|event|事件名称|String|可自定义|
|id|当前推送 id|String|作为消息的标识|
|retry|超时重试时间|Number|客户端在感知 server 连接异常后。会通过 retry 设定时间进行重新连接|




### 补充： SSE 与 WS 有什么区别？

|方式|协议|交互通道|内容编码|重连|事件类型|总结|
|:---|:---|:---|:---|:---|:---|:---|
|SSE|HTTP|服务端单向推送|默认文本|默认支持断线重连|支持自定义消息类型|轻量级|
|WebSocket|WS（基于 TCP 传输层的应用层协议，[RFC6455](https://link.juejin.cn?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc6455 "https://tools.ietf.org/html/rfc6455") `[1]` 对于它的定义标准）|双向推送|默认二进制|手动实现|NO|扩展性、功能性强大|


### 参考文档
- https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events
- https://juejin.cn/post/7148762958470381575

