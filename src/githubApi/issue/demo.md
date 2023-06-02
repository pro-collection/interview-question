**关键词**：XMLHTTPRequest 对象、XMLHTTPRequest 特点、XMLHTTPRequest 属性、封装发送 GET 请求

### 介绍

XMLHttpRequest 是一个在浏览器中用于发送 HTTP 请求的 JavaScript 对象。它提供了一种在客户端与服务器之间进行数据交互的方式，可以异步地发送请求并获取服务器的响应。

XMLHttpRequest 对象的特点和功能包括：

1. 异步请求：XMLHttpRequest 支持异步请求，可以在后台发送请求并在请求完成后执行回调函数，而不会阻塞浏览器的主线程。
2. 支持多种 HTTP 请求方法：XMLHttpRequest 可以发送多种类型的 HTTP 请求，包括 GET、POST、PUT、DELETE 等。
3. 发送和接收数据：XMLHttpRequest 可以发送数据到服务器并接收服务器的响应数据，支持发送请求时携带的数据和接收到的响应数据的处理。
4. 监听请求状态：XMLHttpRequest 提供了一些事件和方法来监听请求的不同状态，如请求开始、请求完成、请求成功等。
5. 设置请求头：XMLHttpRequest 允许设置请求的头部信息，如 Content-Type、Authorization 等。
6. 处理跨域请求：XMLHttpRequest 支持处理跨域请求，可以通过设置 CORS（跨域资源共享）相关的头部信息来实现跨域请求。
7. 支持上传和下载：XMLHttpRequest 可以用于上传文件到服务器或下载服务器上的文件。

使用 XMLHttpRequest 对象可以实现与服务器的数据交互，发送请求并处理响应数据。通过设置回调函数来处理异步请求的结果，可以根据请求的状态码和响应数据进行相应的处理和展示。

### 示范

下面是一个简单的示例代码，展示如何基于 XMLHttpRequest 封装一个发送 GET 请求的函数：

```javascript
function sendGetRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // 请求成功
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
      } else {
        // 请求失败
        const error = new Error(`Request failed with status ${xhr.status}`);
        callback(error, null);
      }
    }
  };

  xhr.send();
}

// 使用示例
const apiUrl = 'https://api.example.com/data';
sendGetRequest(apiUrl, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
  }
});
```

上述代码定义了一个 `sendGetRequest` 函数，接受一个 URL 和一个回调函数作为参数。在函数内部，创建了一个 XMLHttpRequest 对象，使用 `open` 方法设置请求的类型（GET）、URL 和是否异步。然后，通过监听 `readystatechange` 事件来处理请求的状态变化。

当请求的状态为 `XMLHttpRequest.DONE`（值为 4）时，判断响应的状态码。如果状态码为 200，表示请求成功，将响应数据解析为 JSON 格式并通过回调函数返回。如果状态码不是 200，表示请求失败，将错误信息封装为 Error 对象并通过回调函数返回。

使用示例中，调用了 `sendGetRequest` 函数并传入一个 API 的 URL 和一个回调函数。在回调函数中，根据是否存在错误来处理请求结果。如果有错误，输出错误信息；如果没有错误，输出响应数据。

