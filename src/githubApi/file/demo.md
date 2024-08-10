**关键词**：日志监控 - 还原现场、日志监控 - 前端录制用户行为技术方案

### 需求

一种手段来获取用户某一时段连续的操作行为，也就是录制用户行为，包括整个会话中的每一个点击、滑动、输入等行为，同时支持回放录制的操作行为，完整且真实地重现用户行为以帮助我们回溯或分析某些使用场景。

### 实现方式

**方案对比**

| 对比内容   | 视频录制             | 页面截图                 | Dom 快照录制              |
| ---------- | -------------------- | ------------------------ | ------------------------- |
| 开源库     | WebRTC 原生支持      | html2canvas              | rrweb                     |
| 用户感知   | 录制有感             | 录制无感                 | 录制无感                  |
| 产物大小   | 大                   | 大                       | 相对较小                  |
| 兼容性     | 详见相关 API 兼容性  | 部分场景内容截图无法显示 | 兼容性相对较好            |
| 信息安全   | 无法脱敏             | 无法脱敏                 | 可以脱敏                  |
| 可操作性   | 弱                   | 弱                       | 强（支持数据脱敏/加密等） |
| 回放清晰度 | 录制时决定，有损录制 | 录制时决定，有损录制     | 高保真                    |

### 实操

#### 视频录制

录制用户行为最容易想到的就是将屏幕操作通过视频的方式录制下来，目前浏览器本身已经提供了一套基于音视轨的实时数据流传输方案 [WebRTC](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)（Web Real-Time Communications），在我们的录屏使用场景主要关注以下几个 API：

- [getDisplayMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) - 提示用户给予使用媒体输入的许可从而获取屏幕的流；
- [MediaRecorder()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/MediaRecorder) - 生成对指定的媒体流进行录制的 MediaRecorder 对象；
- [ondataavailable](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/dataavailable_event) - 当 MediaRecorder 将媒体数据传递到应用程序以供使用时将触发该事件；

整体录制流程如下：

1. 调用`mediaDevices.getDisplayMedia()`由用户授权选择屏幕进行录制，获取到数据流；
2. 生成一个`new MediaRecorder()`对象录制获取的屏幕的数据流；
3. 在 MediaRecorder 对象上设置`ondataavailable`监听事件用于获取录制的 Blob 数据。

```html
代码解读<template>
  <video ref="playerRef"></video>
  <button @click="handleStart">开启录制</button>
  <button @click="handlePause">暂停录制</button>
  <button @click="handleResume">继续录制</button>
  <button @click="handleStop">结束录制</button>
  <button @click="handleReplay">播放录制</button>
  <button @click="handleReset">重置内容</button>
</template>

<script lang="ts" setup>
  import { ref, reactive } from "vue";

  const playerRef = ref();
  const state = reactive({
    mediaRecorder: null as null | MediaRecorder,
    blobs: [] as Blob[],
  });

  // 开始录制
  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia();
    state.mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    state.mediaRecorder.addEventListener("dataavailable", (e: BlobEvent) => {
      state.blobs.push(e.data);
    });
    state.mediaRecorder?.start();
  };
  // canvas录制(特殊处理)
  const handleCanvasRecord = () => {
    const stream = canvas.captureStream(60); // 60 FPS recording
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });
    recorder.ondataavailable = (e) => {
      state.blobs.push(e.data);
    };
  };
  // 暂停录制
  const handlePause = () => {
    state.mediaRecorder?.pause();
  };
  // 继续录制
  const handleResume = () => {
    state.mediaRecorder?.resume();
  };
  // 停止录制
  const handleStop = () => {
    state.mediaRecorder?.stop();
  };
  // 播放录制
  const handleReplay = () => {
    if (state.blobs.length === 0 || !playerRef.value) return;
    const blob = new Blob(state.blobs, { type: "video/webm" });
    playerRef.value.src = URL.createObjectURL(blob);
    playerRef.value.play();
  };

  const handleReset = () => {
    state.blobs = [];
    state.mediaRecorder = null;
    playerRef.value.src = null;
  };
  const handleDownload = () => {
    if (state.blobs.length === 0) return;
    const blob = new Blob(state.blobs, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.style.display = "none";
    a.download = "record.webm";
    a.click();
  };
</script>
```

![Untitled 1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4204442dc649d8af7027d85652bbcd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3582&h=2118&s=1544515&e=png&b=fcfcfc)

#### 页面截图

众所周知，视频是由一帧帧的画面组合而成的，因此我们可以按照一定时间间隔来截图的方式保存当前页面快照，然后将快照按照相同的截取速度播放形成视频就能实现用户行为录制了。最常用的截图方法就是以 [html2canvas](https://www.npmjs.com/package/html2canvas) 库为代表的 canvas 截图，我们在使用过程中也发现了较多问题：

1. canvas 截图有较多局限之处，例如无法绘制动画、样式错位、[不支持部分 CSS 样式](https://html2canvas.hertzen.com/features)等；
2. 截图性能开销较大，可能会导致掉帧，例如我们在尝试中 css 动画有非常明显的卡顿等；
3. 截图资源体积大，我们尝试中截图时单张图片体积为 200k 左右，以 24 帧来算一分钟录制的图片体积将近 300MB，对带宽和资源存储都是浪费；
4. 在需要忽略的元素上增加 data-html2canvas-ignore 属性或者设置 ignoreElements 属性删除特定元素可以对某些特定数据或内容进行脱敏，但会直接删除元素无法做到“有占位但无内容”效果，影响页面布局。

```html
代码解读<template>
  <el-button @click="handleStart">开启录制</el-button>
  <el-button @click="handleStop">停止录制</el-button>
  <el-button @click="handleReplay">播放录制</el-button>
  <img :src="state.imgs[state.num ?? 0]" />
</template>

<script lang="ts" setup>
  import { reactive } from "vue";
  import html2canvas from "html2canvas";

  const state = reactive({
    visible: false,
    imgs: [] as string[],
    num: 0,
    recordInterval: null as any,
    replayInterval: null as any,
  });

  const FPS = 30;
  const interval = 1000 / FPS;
  const handleStart = async () => {
    handleReset();
    state.recordInterval = setInterval(() => {
      if (state.imgs.length > 100) {
        handleStop();
        return;
      }
      html2canvas(document.body).then((canvas: any) => {
        const img = canvas.toDataURL();
        state.imgs.push(img);
      });
    }, interval);
  };

  const handleStop = () => {
    state.recordInterval && clearInterval(state.recordInterval);
  };

  const handleReplay = async () => {
    state.recordInterval && clearInterval(state.recordInterval);
    state.num = 0;
    state.visible = true;
    state.replayInterval = setInterval(() => {
      if (state.num >= state.imgs.length - 1) {
        clearInterval(state.replayInterval);
        return;
      }
      state.num++;
    }, interval);
  };

  const handleReset = () => {
    state.imgs = [];
    state.recordInterval = null;
    state.replayInterval = null;
    state.num = 0;
  };
</script>
```

#### Dom 快照录制

> 💡 **Dom 快照录制 - rrweb 库** 是目前最为流行的解决方案，一些商业化平台解决方案也都主要基于 rrweb 库来进行录制与回放的功能开发。

rrweb 主要由 3 部分组成：

1. [rrweb-snapshot](https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-snapshot/)，包含 snapshot 和 rebuild 两部分，snapshot 用于将 DOM 及其状态转化为可序列化的数据结构并添加唯一标识，rebuild 是将 snapshot 记录的数据结构重建为对应 DOM。
2. [rrweb](https://github.com/rrweb-io/rrweb)，包含 record 和 replay 两个功能，record 用于记录 DOM 中的所有变更，replay 则是将记录的变更按照对应的时间一一重放。
3. [rrweb-player](https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/)，为 rrweb 提供一套 UI 控件，提供基于 GUI 的暂停、快进、拖拽至任意时间点播放等功能。

![Untitled 4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c837f24b84d444db31b8941d2df4021~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1822&h=602&s=18559&e=png&a=1&b=fdf2f2)

**分别设计到了【录制】和【回访】两个场景**

细节可以参考官网文档即可

### 参考文档

https://juejin.cn/post/7280429214607769658
