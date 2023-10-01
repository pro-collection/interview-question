**关键词**：XHR 取消请求、Fetch 取消请求

**XHR 支持取消请求**

是的，XHR（XMLHttpRequest）对象支持取消请求。你可以使用 `xhr.abort()` 方法来取消正在进行的请求。

下面是一个使用 XHR 取消请求的示例代码：

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.send();

// 取消请求
xhr.abort();
```

使用 `xhr.abort()` 方法会导致 XHR 请求被中止，并触发 `abort` 事件。

需要注意的是，取消请求后，XHR 对象将不再可用，不能再使用已经取消的 XHR 对象发送新的请求。


**Fetch API 原生不提供直接的方法来取消请求。然而，你可以使用 AbortController 来实现取消 fetch 请求的功能。**

AbortController 是一个用于控制和取消异步操作的 API，它可以与 fetch 一起使用来取消网络请求。下面是一个使用 AbortController 来取消 fetch 请求的示例代码：

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('请求被取消');
    } else {
      console.log('发生错误', error);
    }
  });

// 取消请求
controller.abort();
```

在上面的代码中，我们创建了一个 AbortController 对象，并从中获取一个 signal 信号。然后，将 signal 信号传递给 fetch 请求的 options 参数中。当调用 `controller.abort()` 方法时，fetch 请求会被取消，并且会触发一个 `AbortError` 错误。

需要注意的是，AbortController 是一个较新的 API，不是所有浏览器都完全支持。为了确保在不支持 AbortController 的情况下仍能取消 fetch 请求，你可以使用 polyfill 或使用第三方库（如 Axios）来实现取消功能。
