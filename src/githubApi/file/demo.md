**关键词**：websocket 断联数据不丢失

实现 WebSocket 的自动重连并保证断连期间数据不丢失，通常需要在客户端实现一些机制来管理连接状态、定时重试以及缓存未成功发送的消息。以下是一个简单的步骤和策略指南：

### 1. 监听连接状态

首先，你需要监听 WebSocket 连接的各种事件，以便知道何时发生了断连，并根据这些事件来触发重连逻辑。

- `onclose`: 当 WebSocket 连接关闭时，触发重连逻辑。
- `onerror`: 出现错误时，也可视为一个触发重连的信号。
- `onopen`: 连接成功时，清除重试计数器和缓存的数据（如果之前成功发送了）。

### 2. 实现重连逻辑

- **使用指数退避算法**来延迟重连尝试，避免短时间内频繁重连。
  - 例如，第一次重连延迟 1 秒，第二次 2 秒，然后 4 秒，最大延迟设置为 1 分钟。
- 在每次重连时，重置 WebSocket 对象并重新发起连接。

### 3. 缓存数据

- **发送数据前检查连接状态**：如果 WebSocket 处于非开放状态，将数据缓存起来，待连接恢复后再发送。
- **使用队列存储待发送数据**：便于按顺序发送，保证数据的完整性和顺序。

### 4. 发送缓存数据

- 在连接成功的回调（`onopen`事件）中，检查是否有缓存的数据，如果有，则遍历队列发送。

### 示例代码

下面是一个示范代码片段：

```javascript
var ws;
var retryInterval = 1000; // 初始重连间隔为 1 秒
const maxInterval = 60000; // 最大间隔为 1 分钟
var messageQueue = []; // 数据缓存队列

function connect() {
  ws = new WebSocket("wss://your-websocket-url");

  ws.onopen = function () {
    console.log("WebSocket connected");
    retryInterval = 1000; // 重置重连间隔
    sendMessageQueue(); // 尝试发送缓存中的数据
  };

  ws.onclose = function () {
    console.log("WebSocket disconnected, attempting to reconnect...");
    setTimeout(connect, retryInterval);
    retryInterval = Math.min(retryInterval * 2, maxInterval); // 指数退避
  };

  ws.onerror = function (error) {
    console.error("WebSocket error:", error);
    ws.close(); // 确保触发 onclose 事件
  };

  ws.onmessage = function (message) {
    // 处理接收到的数据
  };
}

function sendMessage(data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data);
  } else {
    console.log("WebSocket is not open. Queuing message.");
    messageQueue.push(data); // 缓存待发送数据
  }
}

function sendMessageQueue() {
  while (messageQueue.length > 0) {
    const data = messageQueue.shift(); // 获取并移除队列中的第一个元素
    sendMessage(data); // 尝试再次发送
  }
}

connect(); // 初始化连接
```

这个示例实现了基本的重连逻辑和数据缓存策略。在实际应用中，根据实际需求对这些逻辑进行扩展和定制化是很有必要的，尤其是数据缓存和发送逻辑，可能需要结合业务特点进行更复杂的处理。

特别是数据缓存这个场景， 如果有多个 webscoket 数据， 建议使用 `indexedDB` 做一个系统级别的数据管理。
