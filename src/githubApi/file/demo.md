**关键词**：大批量执行任务不卡顿

**Web Workers**

要确保浏览器在执行100万个任务时不会卡顿，你可以考虑使用Web Workers来将这些任务从主线程中分离出来。Web Workers允许在后台线程中运行脚本，从而避免阻塞主线程，保持页面的响应性。

以下是一个使用Web Workers的简单示例：

```javascript
// 主线程代码
const worker = new Worker('worker.js'); // 创建一个新的Web Worker

worker.postMessage({ start: 0, end: 1000000 }); // 向Web Worker发送消息

worker.onmessage = function(event) {
  const result = event.data;
  console.log('任务完成：', result);
};

// worker.js - Web Worker代码
onmessage = function(event) {
  const start = event.data.start;
  const end = event.data.end;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  postMessage(sum); // 向主线程发送消息
};
```

在这个示例中，主线程创建了一个新的Web Worker，并向其发送了一个包含任务范围的消息。Web Worker在后台线程中执行任务，并将结果发送回主线程。

**requestAnimationFrame 来实现任务分割**

使用`requestAnimationFrame`来实现任务分割是一种常见的方式，它可以确保任务在浏览器的每一帧之间执行，从而避免卡顿。以下是一个使用`requestAnimationFrame`来分割任务的简单例子：

```javascript
// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

// 定义一个处理函数，例如对数组中的每个元素进行平方操作
function processChunk(chunk) {
  return chunk.map(num => num * num);
}

// 分割任务并使用requestAnimationFrame
const chunkSize = 1000; // 每个小块的大小
let index = 0;

function processArrayWithRAF() {
  function processChunkWithRAF() {
    const chunk = bigArray.slice(index, index + chunkSize); // 从大数组中取出一个小块
    const result = processChunk(chunk); // 处理小块任务
    console.log('处理完成：', result);
    index += chunkSize;

    if (index < bigArray.length) {
      requestAnimationFrame(processChunkWithRAF); // 继续处理下一个小块
    }
  }

  requestAnimationFrame(processChunkWithRAF); // 开始处理大数组
}

processArrayWithRAF();
```

在这个例子中，我们使用`requestAnimationFrame`来循环执行处理小块任务的函数`processChunkWithRAF`，从而实现对大数组的任务分割。这样可以确保任务在每一帧之间执行，避免卡顿。

**针对上面的改进一下**

`const chunkSize = 1000; // 每个小块的大小` 是不能保证不卡的， 那么久需要动态调整 `chunkSize` 的大小， 代码可以参考下面的示范：

```javascript
  const $result = document.getElementById("result");

// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

// 定义一个处理函数，对数组中的每个元素执行一次
function processChunk(chunk) {
  return `chunk: ${chunk}`;
}

// 动态调整 chunkSize 的优化方式
let chunkSize = 1000; // 初始的 chunkSize
let index = 0;

function processArrayWithDynamicChunkSize() {
  function processChunkWithRAF() {
    let startTime = performance.now(); // 记录结束时间
    for (let i = 0; i < chunkSize; i++) {
      if (index < bigArray.length) {
        const result = processChunk(bigArray[index]); // 对每个元素执行处理函数
        $result.innerText = result;
        index++;
      }
    }
    let endTime = performance.now();
    let timeTaken = endTime - startTime; // 计算处理时间

    // 根据处理时间动态调整 chunkSize
    if (timeTaken > 16) { // 如果处理时间超过一帧的时间（16毫秒），则减小 chunkSize
      chunkSize = Math.floor(chunkSize * 0.9); // 减小10%
    } else if (timeTaken < 16) { // 如果处理时间远小于一帧的时间（8毫秒），则增加 chunkSize
      chunkSize = Math.floor(chunkSize * 1.1); // 增加10%
    }

    if (index < bigArray.length) {
      requestAnimationFrame(processChunkWithRAF); // 继续处理下一个小块
    }
  }

  requestAnimationFrame(processChunkWithRAF); // 开始处理大数组
}

processArrayWithDynamicChunkSize();
```

在这个例子中，我们动态调整`chunkSize`的大小，根据处理时间来优化任务分割。根据处理时间的表现，动态调整`chunkSize`的大小，以确保在处理大量任务时，浏览器能够保持流畅，避免卡顿。


参考文档： [100万个函数执行保证浏览器不卡](https://github.com/yanlele/node-index/tree/master/books/%E7%9F%A5%E8%AF%86%E5%BA%93/01%E3%80%81%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF%E7%9F%A5%E8%AF%86/29.100%E4%B8%87%E4%B8%AA%E5%87%BD%E6%95%B0%E6%89%A7%E8%A1%8C%E4%BF%9D%E8%AF%81%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8D%E5%8D%A1)
