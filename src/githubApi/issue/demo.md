在原生的 XMLHttpRequest 对象中，没有提供直接取消请求的方法。一旦发送了请求，就无法中途取消。但是，可以通过一些手段模拟实现请求的取消效果。

一种常见的方式是通过设置一个标志位来控制请求的发送和响应处理。在发送请求前，设置一个标志位，当需要取消请求时，将标志位设为 true。在请求的响应处理函数中，根据标志位的状态来判断是否继续处理响应结果。

下面是一个示例代码，展示了如何使用标志位实现取消请求的效果：

```javascript
let isRequestCanceled = false;

function sendGetRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && !isRequestCanceled) {
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

  // 取消请求
  function cancelRequest() {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      xhr.abort();
      isRequestCanceled = true;
      callback(new Error('Request canceled'), null);
    }
  }

  // 返回取消请求的函数
  return cancelRequest;
}

// 使用示例
const apiUrl = 'https://api.example.com/data';
const cancelRequest = sendGetRequest(apiUrl, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
  }
});

// 取消请求
cancelRequest();
```

在上述示例代码中，添加了一个 `cancelRequest` 函数用于取消请求。该函数会在请求发送后立即返回，并中止请求的发送。同时，将标志位 `isRequestCanceled` 设为 true，并通过回调函数返回一个错误对象，表示请求被取消。

需要注意的是，虽然通过标志位模拟了请求的取消，但实际上请求已经发送到服务器并得到了响应。只是在客户端这边忽略了响应结果。在真实的网络请求中，服务器仍然会继续处理请求并返回响应，但客户端会忽略该响应。
