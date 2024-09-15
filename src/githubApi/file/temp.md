> 作者：小陈同学要努力呦  
> 链接：https://juejin.cn/post/7413942077639835682  
> 来源：稀土掘金  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

## 前言

喂，就你，只会懒加载的你，过来看看什么叫预加载吧

本文将讲解如何使用预加载去做页面的性能优化

本文你将学到

- 预加载基础知识
- WebWorker 基础知识

### 预加载

预加载是指在用户需要数据或资源之前，提前加载这些数据或资源的过程。

这个过程可以提高应用程序或网站的响应速度和用户体验

### 预加载的优点

- **提升加载速度**：通过提前加载资源，用户在访问页面时可以更快地看到完整内容。
- **提高用户体验**：减少页面加载时的延迟，使用户感到更流畅。
- **优化资源使用**：合理安排资源加载顺序，提高网络利用率。

### WebWorker

Web Worker 是一种在浏览器中运行的 JavaScript 线程，允许开发者在主线程（通常是用户界面线程）之外执行脚本。使用 Web Worker 可以提高网页的性能，尤其是在处理大量数据或执行耗时操作时。

### 主要特点

1. **并行处理**：

   - Web Worker 允许在主线程之外并行执行任务，避免阻塞用户界面。

2. **独立线程**：

   - 每个 Web Worker 在自己的线程中运行，不能直接访问 DOM，但可以通过消息传递与主线程通信。

3. **消息传递**：

   - 主线程和 Worker 之间通过 `postMessage` 方法进行通信。主线程发送消息到 Worker，Worker 处理后再发送消息回主线程。

4. **安全性**：

   - Web Workers 遵循同源策略，确保数据安全。Worker 不能访问 `window` 对象或 DOM。

### 使用场景

- **数据处理**：进行大量计算或数据处理，例如图像处理、数据分析等。
- **网络请求**：在后台进行 API 调用，避免阻塞用户界面。
- **文件处理**：处理上传或下载过程中的数据。

### WebWorker 实现预加载

现在我们已经知道什么是预加载以及 WebWorker 了，接下来我们就通过这个 WebWorker 去实现预加载

html 结构很简单

```html
代码解读
<div id="app">
  <h2>图片预加载</h2>
  <div class="picBox"></div>
</div>
```

接下来我们首先创建一个 WebWorker 需要去执行的 js 文件

```js
代码解读; // 子线程的过程是异步的
self.onmessage = function (event) {
  for (let i = 0; i < event.data.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", event.data[i], true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        self.postMessage(xhr.response);
      }
    };
    xhr.send();
  }
};
```

1. **onmessage 事件**：

   - Worker 通过 `self.onmessage` 监听来自主线程的消息，接收一个包含 URL 列表的数组。

2. **XMLHttpRequest 请求**：

   - 对于每个 URL，创建一个新的 `XMLHttpRequest` 实例，设置为异步请求，并指定响应类型为 `blob`，以便处理二进制数据（如图片、文件等）。

3. **状态变化处理**：

   - 在请求状态变化时检查是否完成（`readyState === 4`）并且响应成功（`status === 200`），如果满足条件则将响应数据发送回主线程。

接下来在主线程中，添加开辟新线程代码

```js
 代码解读let picBox = document.querySelector(".picBox");

      let arr = [
        "https://p6-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/f6859e1e-9944-40aa-b57e-a0735a8cf8be_1726131314975440805~tplv-a9rns2rl98-web-thumb.jpeg?rk3s=b14c611d&x-expires=1757667315&x-signature=JnrrW6JMHQtCkKc5RHirlOcemBk%3D",
        "https://p6-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/39d79826-d65d-4dc2-a37b-8aacee2d1116_1726131315319465734~tplv-a9rns2rl98-web-image.jpeg?rk3s=b14c611d&x-expires=1757667315&x-signature=235BbuRY7aw8gx%2Fgyz%2BkFGyR9WE%3D",
        "https://p6-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/b00b9687-936a-42f4-b4cd-1e1f9fff799d_1726131316325352767~tplv-a9rns2rl98-web-image.jpeg?rk3s=b14c611d&x-expires=1757667316&x-signature=IC7qFGWqCkaelWnbGk6YUYhAvYo%3D",
        "https://p6-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/d373203b-f997-4498-9fc5-cbeba8b4c920_1726131336057158808~tplv-a9rns2rl98-web-image.jpeg?rk3s=b14c611d&x-expires=1757667336&x-signature=7mskhs%2FvlxwHIG1IIcOZca2tvac%3D",
        "https://p6-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_skill/eef5d24f-8ccb-46b1-bceb-0a94662c0952_1726131335432531091~tplv-a9rns2rl98-web-image.jpeg?rk3s=b14c611d&x-expires=1757667335&x-signature=RwMW%2FvQ3VCJWr%2BuiRAwje4E2I%2FQ%3D",
      ];

      // 为image.js脚本代码开辟一个新的线程
      const worker = new Worker("./image.js");
      //
      worker.postMessage(arr);

      // 监听来自子线程的消息
      worker.onmessage = function (event) {
        console.log("主线程：", event);
        const img = new Image();
        img.src = window.URL.createObjectURL(event.data);
        picBox.appendChild(img);
      };
```

1. **选择容器**：

   - `let picBox = document.querySelector(".picBox");`：选择一个用于显示图片的 DOM 元素。

2. **图片 URL 数组**：

   - `let arr = [...];`：定义一个包含多个图片 URL 的数组。

3. **创建 Web Worker**：

   - `const worker = new Worker("./image.js");`：创建一个新的 Web Worker，指定脚本为 `image.js`。

4. **发送数据到 Worker**：

   - `worker.postMessage(arr);`：将图片 URL 数组发送给 Worker。

5. **接收来自 Worker 的消息**：

   - `worker.onmessage = function (event) {...}`：设置一个监听器来处理来自 Worker 的消息。
   - 当 Worker 发送消息时，创建一个新的 `Image` 对象，并将其源设置为通过 `createObjectURL` 方法生成的 Blob URL，然后将其添加到 `picBox` 中。

实现效果

![动画.gif](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ba79a4ad11a0424c8f5be701c7072623~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP6ZmI5ZCM5a2m6KaB5Yqq5Yqb5ZGm:q75.awebp?rk3s=f64ab15b&x-expires=1726829987&x-signature=w7SmtvmKujxg46NgMtdq%2Bg71MM4%3D)
