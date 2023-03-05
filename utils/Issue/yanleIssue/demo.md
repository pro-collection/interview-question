
## 常见的几种方式

**JSONP**
JSONP是通过动态创建script标签的方式，利用script标签可以跨域请求资源的特性来实现的，本质是利用了script标签没有跨域限制的特性，可以在请求的url后加一个callback参数，后端接收到请求后，将需要传递的数据作为参数传递到callback函数中，前端定义该函数来接收数据，从而实现跨域通信。

**CORS**
CORS是一种现代浏览器支持的跨域解决方案，CORS全称为跨域资源共享（Cross-Origin Resource Sharing），其本质是在服务端设置允许跨域访问的响应头，浏览器通过判断响应头中是否允许跨域访问来决定是否允许跨域访问。

**postMessage**
postMessage是HTML5引入的一种新的跨域通信方式，主要是用于在不同窗口之间进行通信，包括不同域名、协议、端口等情况，通过调用window.postMessage()方法，在两个窗口之间发送消息，接收方通过监听message事件来接收消息，从而实现跨域通信。

**WebSocket**
WebSocket是一种新的网络协议，可以实现客户端和服务器之间的实时双向通信，同时也可以跨域通信，WebSocket协议建立在TCP协议之上，通过HTTP协议发起握手请求，握手成功后，客户端和服务器就可以通过WebSocket协议进行实时通信了。

**代理转发**
代理转发是一种常用的跨域通信方式，主要是通过在同一域名下设置代理服务器，在代理服务器上实现跨域访问，再将结果返回给前端页面，从而实现跨域通信。


## JSONP

JSONP 的实现原理是通过添加一个 script 标签，指定 src 属性为跨域请求的 URL，而这个 URL 返回的不是 JSON 数据，而是一段可执行的 JavaScript 代码，这段代码会调用一个指定的函数，并且将 JSON 数据作为参数传入函数中。

例如，假设我们从 http://example.com 域名下请求数据，我们可以通过在 http://example.com 中添加如下代码实现 JSONP 请求：

```js
function handleData(data) {
  // 处理获取到的数据
}

const script = document.createElement('script');
script.src = 'http://example.org/api/data?callback=handleData';
document.head.appendChild(script);
```

其中，我们指定了一个名为 `handleData` 的回调函数，并将这个函数名作为参数传递给了跨域请求的 URL 中的 callback 参数。服务器端返回的数据将会被包装在这个回调函数中，例如：
```js
handleData({"name": "John", "age": 30});
```

在这个例子中，我们可以在 handleData 函数中处理获取到的数据。需要注意的是，在使用 JSONP 时，**需要保证服务器端返回的数据是一个可执行的 JavaScript 代码，并且必须使用指定的回调函数名来包装数据，否则无法正确处理数据。**

### 如何获取 jsonp 的相应参数

获取 JSONP 响应结果的方法有两种，**一种是通过回调函数参数获取**，**另一种是通过 script 标签加载完成后解析全局变量获取**。

假设服务器返回以下 JSONP 响应：

```js
callback({"name": "Alice", "age": 20});
```

其中 callback 是客户端定义的回调函数名，用于指定返回数据的处理方式。

我们可以使用以下两种方式获取响应结果：

**1. 通过回调函数参数获取**
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为回调函数的参数传入，这个参数可以在回调函数中处理。
```js
function handleResponse(data) {
  console.log(data.name); // Alice
  console.log(data.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);
```

**2. 通过全局变量获取**
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为一个全局变量赋值给该函数所在的对象，我们可以在 script 标签加载完成后解析全局变量获取响应结果。
```js
function handleResponse() {
  console.log(myData.name); // Alice
  console.log(myData.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);

// script 标签加载完成后解析全局变量
window.myData = {};
script.onload = () => {
  delete window.myData; // 删除全局变量
};
```

注意，使用 JSONP 时要注意安全问题，应该对返回的数据进行验证，避免接收到恶意代码。此外，JSONP **只能发送 GET 请求**，无法发送 POST 请求，**也无法使用 HTTP 请求头和请求体传递数据**。

