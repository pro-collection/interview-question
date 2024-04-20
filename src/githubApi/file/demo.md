**关键词**：不同页签信息主动推送

在不借助服务器端的帮助下，实现不同标签页或窗口间的主动推送消息机制，可以使用以下客户端技术：

> 作者备注：  
> 这里要注意一下， 这里讨论的不是跨页签通信，而是**跨页签主动推送信息** 。如果仅仅是跨页签通信， 那么浏览器的本地存储都可以都可以使用了。 所以排除了本地存储类 API 的介绍

### **BroadcastChannel API**:

> 作者备注  
> 这个很有意思， 有一个文章， 国内某大佬复刻了《跨窗口量子纠缠粒子效果》就是用的 这个 API  
> https://juejin.cn/post/7307057492059471899

`BroadcastChannel API` 是一种在相同源的不同浏览器上下文之间实现简单高效通信的方法。这意味着它可以在同一网站的多个标签页或窗口之间发送消息。这是由 HTML5 规范引入的，用于改进 Web Workers 中的通信方法。

下面是如何使用 `BroadcastChannel API` 的基本指南及几个示例。

**创建与发送消息**

```javascript
// 在任何一个 tab 或 iframe 中创建一个广播频道
const channel = new BroadcastChannel("my-channel-name");

// 发送一个消息到频道
channel.postMessage("Hello from a tab!");
```

**监听消息**

```javascript
// 监听这个频道的消息
channel.addEventListener("message", function (event) {
  if (event.data === "Hello from a tab!") {
    console.log("Message received: ", event.data);
  }
});
```

**实现频道消息通信**

假设你有两个标签页，并且你想更新每个标签页来显示另一个标签页中发生的事情，比如用户数量计数器：

```javascript
// 在第一个标签页中
self.addEventListener("load", () => {
  const channel = new BroadcastChannel("visitor-channel");
  let visitorCount = 0;

  // 定时发送随机的用户活动消息
  setInterval(function () {
    visitorCount++;
    channel.postMessage(`Visitor count increased to: ${visitorCount}`);
  }, 5000);
});

// 在另一个标签页中
self.addEventListener("load", () => {
  const channel = new BroadcastChannel("visitor-channel");

  // 监听消息来更新用户数量
  channel.addEventListener("message", function (event) {
    if (event.data.startsWith("Visitor count")) {
      // 用接收到的用户数量更新显示
      updateVisitorCountDisplay(event.data);
    }
  });

  // 这个方法将设置标签页上的用户计数显示
  function updateVisitorCountDisplay(message) {
    // 这里写用于更新显示的代码
    console.log(message);
  }
});
```

在这个例子中，一个标签页通过定期发送新的消息来模拟用户活动的增加，这个消息在所有监听该频道的上下文中传递。另一个或多个标签页将监听这个频道来接收和响应这些更新。

**注意事项：**

- 频道内的通信 **仅在同源浏览器上下文**（具有相同的协议、域名和端口号）之间有效，也就是说，不同的网站之间的通信是不被允许的，以保护每个网站的安全性。
- 频道中的通信是 **单向的**，你可以通过频道向所有连接

### **Service Workers**:

利用 Service Workers，各个标签页可以通过 `clients.matchAll()` 方法找到所有其他客户端（如打开的标签页），然后使用 `postMessage` 发送消息。

这个方法相比 `BroadcastChannel` 更加灵活，因为 Service Workers 可以通过 `Focus` 和 `Navigate` 事件来控制页面的焦点和导航等。

`ServiceWorkers` 提供了在后台运行脚本的能力，这些脚本可以在网络受限或没有网络的情况下运行。当你用 `ServiceWorkers` 进行页面间的通信，你可以利用它们来推送消息到打开的 `Clients`（如浏览器标签页）。

要使用 `ServiceWorkers` 实现从不同 Tab 中主动推送信息，可以通过以下几个步骤：

**1. 编写 ServiceWorker 文件**

首先，创建名为 `sw.js` 的 ServiceWorker 文件。这个文件在你的网站目录下，会在用户访问网站时注册并激活。

```javascript
// sw.js

self.addEventListener("message", (event) => {
  if (event.data === "New message from another tab") {
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        windowClients.forEach((client) => {
          client.postMessage("New message for " + client.id);
        });
      });
  }
});
```

**2. 在主页面注册 ServiceWorker**

在主页面（index.html）通过 JavaScript 注册这个 ServiceWorker 文件。

```javascript
// index.html

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}
```

**3. 监听 `message` 事件**

在主页面使用 `navigator.serviceWorker.controller` 来检查是否已经有 ServiceWorker 主动控制。

```javascript
if (navigator.serviceWorker.controller) {
  // Post a message to the ServiceWorker
  navigator.serviceWorker.controller.postMessage("This is from main page");
}
```

**4. 从其他 Tab 推送消息**

在其他 Tab 上，一旦 ServiceWorker 被该页面控制后，可以通过同样的 `postMessage` 方法发送消息。

### **SharedWorker**:

SharedWorker 提供了一种更传统的跨文档通信机制，在不同文档间共享状态和数据。你需要创建一个 `SharedWorker` 对象，并在所有的文档里监听来自该 worker 的消息。

简单场景的 SharedWorker 的使用步骤：

1. **创建和连接**:

```javascript
// 创建一个 SharedWorker，并指定要加载的脚本
var myWorker = new SharedWorker("worker.js");
// 开启端口通信
myWorker.port.start();
```

2. **端口通信**: 使用端口接收和发送消息

```javascript
// 发送数据给worker
myWorker.port.postMessage({ command: "start", data: [1, 2, 3] });

// 监听来自worker的消息
myWorker.port.onmessage = function (event) {
  if (event.data) {
    console.log("Result from worker:", event.data);
  }
};
```

3. **实现 worker 逻辑**:

在 `worker.js` 内，通过 `onconnect` 事件监听端口连接，并在使用 `postMessage` 发送数据的页面之间转发消息。

```javascript
// worker.js

// 自身的事件监听器
self.onconnect = function (event) {
  var port = event.ports[0];

  // 监听端口的消息
  port.onmessage = function (e) {
    if (e.data.command === "start") {
      var result = someHeavyComputation(e.data.data);
      port.postMessage({ result: result });
    }
  };
};

// 在这里执行一些开销较大的计算逻辑
function someHeavyComputation(data) {
  // 在这里进行计算...
  return data.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, 0);
}
```

4. **通知其他页面更新**:

当你希望基于上文提到的 SharedWorker 执行的计算结果通知其他所有的页面更新时，可以利用 `SharedWorkerGlobalScope` 中的 `clients` 对象。

```javascript
// 在 worker.js 中

self.addEventListener("message", (e) => {
  if (e.data === "Update all clients") {
    // 遍历所有客户端
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        // 发送消息更新它们
        client.postMessage("Please update your state");
      });
    });
  }
});
```

### 使用 localStorage 的变更监听

虽然 `localStorage` 没有直接提供跨标签页推送机制，但是可以使用 `window.addEventListener('storage', listener)` 监听 `storage` 事件，实现不同标签页间的通信。

```javascript
// 标签页1修改了 localStorage
localStorage.setItem("someKey", "someValue");

// 其他标签页监听 storage 事件
window.addEventListener("storage", function (event) {
  if (event.storageArea === localStorage && event.key === "someKey") {
    console.log(event.newValue);
  }
});
```

### 使用 iframe 的 message 事件

如果排他性不是问题（所有标签页都属于同一客户端），可以使用 iframe 来传递消息，父窗口和 iframe 可以使用 DOM 中的 `message` 事件系统相互通信。

要使用 `iframe` 的 `message` 事件实现不同页签之间的通信，你需要两个关键项的配合：父页面和 `iframe` 页面之间的协调工作。这种通信非常灵活，因为你可以根据自己需要进行信息的发送和监听。

**示例步骤：**

**1. 创建一个父页面**

在父页面中，我们创建一个 `iframe` 并监听 `message` 事件。

```html
<!-- parent.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Parent Page</title>
  </head>
  <body>
    <iframe src="iframe.html" style="display:none;"></iframe>

    <script>
      // 监听 iframe 发送的 message 事件
      window.addEventListener("message", function (event) {
        if (event.origin !== "http://example.com") {
          // 确保消息源是可信的
          return;
        }
        if (event.data && event.data.greeting) {
          console.log("Message received from iframe:", event.data);
          // 如果iframe向父页面问好（向父页面发送了一条消息）
          // 假设我们还想再向iframe发送一些信息
          document.querySelector("iframe").contentWindow.postMessage(
            {
              response: "Hello iframe! This is the parent window speaking.",
            },
            "http://example.com"
          );
        }
      });
    </script>
  </body>
</html>
```

**2. 创建一个 iframe 页面**

在 `iframe.html` 页面中，我们需要发送消息到父页面并监听父页面的消息。

```html
<!-- iframe.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Iframe Page</title>
  </head>
  <body>
    <script>
      // 假设我们有一些需要发送到父页面的信息
      function sendMessageToParent() {
        parent.postMessage({ greeting: "Hello, I am the iframe!" }, "http://example.com");
      }

      // 当页面加载完成后，发送消息
      window.onload = function () {
        sendMessageToParent();
      };

      // 监听来自父页面的消息
      window.addEventListener("message", function (event) {
        if (event.origin !== "http://example.com") {
          // 反向验证消息源的可信度
          return;
        }
        if (event.data && event.data.response) {
          console.log("Message received from parent:", event.data);
          // 可根据消息实现特定的逻辑
        }
      });
    </script>
  </body>
</html>
```
