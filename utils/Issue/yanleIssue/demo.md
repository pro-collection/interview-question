## ajax如何获取下载进度?

要获取下载进度，可以使用 `XMLHttpRequest` 对象提供的 `onprogress` 事件。

使用 onprogress 事件，可以获取文件的下载进度信息，可以通过 loaded 和 total 属性获取当前已经下载的字节数和文件的总字节数，从而计算出当前的下载进度。

下面是一个使用 onprogress 事件获取文件下载进度的示例代码：

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'file.url', true);
xhr.responseType = 'blob';
xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log(`Downloaded ${percentComplete}%`);
  }
};
xhr.onload = function (event) {
  // 文件下载完成
  const blob = xhr.response;
};
xhr.send();
```

在上面的代码中，通过将 XMLHttpRequest 对象的 **responseType 设置为 blob**，来请求一个文件资源，然后监听 onprogress 事件，计算出当前的下载进度，并在控制台输出，最后在 onload 事件中获取到下载的文件内容。
