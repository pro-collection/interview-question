> 作者：植物系青年  
> 链接：https://juejin.cn/post/7280429214607769658  
> 来源：稀土掘金  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

# 一、问题背景

目前，在我们的项目中通常会使用各种各样的埋点和监控来收集页面访问的信息，例如点击埋点、PV 埋点等，这些埋点数据能够反应绝大部分的用户行为，但是对于一些关注上下文的使用场景而言这些埋点是不够的。

- 对于**产品**而言，通过点击或 PV 埋点来判断功能的使用情况有时候不够的，通常需要知道用户的真实使用路径以判断用户使用是否与功能设计所预想的保持一致，从而能够更好地分析用户使用情况并进一步优化和推广。
- 对于**开发**而言，当我们收到系统异常通知的时候，监控系统只能告诉你系统出现了错误，但是不能给出错误的复现路径，对于稳定复现的错误而言还好，但对于偶发错误或复现路径隐藏较深的场景我们就较难去解决问题。
- 对于**测试**而言，用户反馈线上 bug 的时候，首先需要知道的就是通过什么操作触发了这个问题，有时候用户自己可能也无法二次复现，这样的错误我们也无法通过埋点的数据去推导上下文，因此就会产生较大的沟通成本，在执行测试计划反馈 bug 时同理。
- ......

![Untitled.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da3598fe4fcb461e89634bfc8ee4d8a0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1955&h=305&s=14071&e=png&a=1&b=d5e8d4)

因此，我们需要一种手段来获取用户某一时段连续的操作行为，也就是**录制用户行为**，包括整个会话中的每一个点击、滑动、输入等行为，同时支持回放录制的操作行为，完整且真实地重现用户行为以帮助我们回溯或分析某些使用场景。

# **二、技术方案**

### **2.1 视频录制**

录制用户行为最容易想到的就是将屏幕操作通过视频的方式录制下来，目前浏览器本身已经提供了一套基于音视轨的实时数据流传输方案 [WebRTC](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWebRTC_API "https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API")（Web Real-Time Communications），在我们的录屏使用场景主要关注以下几个 API：

- [getDisplayMedia()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaDevices%2FgetUserMedia "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia") - 提示用户给予使用媒体输入的许可从而获取屏幕的流；
- [MediaRecorder()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaRecorder%2FMediaRecorder "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/MediaRecorder") - 生成对指定的媒体流进行录制的 MediaRecorder 对象；
- [ondataavailable](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaRecorder%2Fdataavailable_event "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/dataavailable_event") - 当 MediaRecorder 将媒体数据传递到应用程序以供使用时将触发该事件；

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

尽管浏览器原生提供了这样既简单又实用的屏幕录制解决方案，但在我们实际应用场景中仍旧有非常多的问题：

1. **由用户感知并控制**：通过 WebRTC 提供的 API 所实现的用户行为录制在开始录制前会通过弹窗来让用户完成对所需录制屏幕的授权，所有的录制行为均由用户自主控制，这种让用户感知到系统录制的方式对于我们预期的使用而言是不合适的，我们预期的录制行为对于用户而言应该是无感的，这种技术方案更适用于类似啄木鸟这种反馈系统由用户主动上报问题的场景或者考试系统屏幕监控、在线面试屏幕共享等等。
2. **录制数据无法脱敏**：视频录制过程中直接就将整个页面的内容录制下来，对于一些敏感的数据同样也会直接录制下来，在录制的过程中我们无法进行脱敏，这对于一些数据安全要求比较高或者涉及用户隐私的场景就不适用了。
3. **WebRTC 兼容性**：在实现录制过程中使用的几个 WebRTC API 都具有一定的兼容性要求，不同的浏览器的支持情况各不相同，具体可进行相应的[兼容性查询](https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F "https://caniuse.com/")。

### 2.2 页面截图

众所周知，视频是由一帧帧的画面组合而成的，因此我们可以按照一定时间间隔来截图的方式保存当前页面快照，然后将快照按照相同的截取速度播放形成视频就能实现用户行为录制了。最常用的截图方法就是以 [html2canvas](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml2canvas "https://www.npmjs.com/package/html2canvas") 库为代表的 canvas 截图，我们在使用过程中也发现了较多问题：

1. canvas 截图有较多局限之处，例如无法绘制动画、样式错位、[不支持部分 CSS 样式](https://link.juejin.cn?target=https%3A%2F%2Fhtml2canvas.hertzen.com%2Ffeatures "https://html2canvas.hertzen.com/features")等；
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

| 实际内容                                                                                                                                                                                  | 截图效果                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Untitled 2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5118595c95054a39aecfb443e5bf2636~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3584&h=2018&s=546007&e=png&b=ffffff) | ![Untitled 3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3f4b2c1b4284d0db03770d0bf01e62e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3584&h=2018&s=239956&e=png&b=ffffff) |

### **2.3 Dom 快照录制**

每一个瞬间我们看到的页面都是浏览器当前渲染的 DOM 节点，那么我们完全可以将 DOM 节点保存下来，并持续记录 DOM 节点的变化，然后再将记录的 DOM 节点数据通过浏览器渲染回放，这样即可实现用户行为录制的需求。整个思路非常简单，但具体实现起来是非常复杂的事情，我们需要考虑 DOM 节点数据如何保存、如何捕获用户行为并记录 DOM 节点变换和如何将记录的数据在浏览器上回放出来等。所幸当前社区已经有非常成熟的库，也就是 [rrweb](https://link.juejin.cn?target=https%3A%2F%2Fwww.rrweb.io%2F "https://www.rrweb.io/")（record and replay the web）🎉

rrweb 主要由 3 部分组成：

1. [rrweb-snapshot](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Ftree%2Fmaster%2Fpackages%2Frrweb-snapshot%2F "https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-snapshot/")，包含 snapshot 和 rebuild 两部分，snapshot 用于将 DOM 及其状态转化为可序列化的数据结构并添加唯一标识，rebuild 是将 snapshot 记录的数据结构重建为对应 DOM。
2. [rrweb](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb "https://github.com/rrweb-io/rrweb")，包含 record 和 replay 两个功能，record 用于记录 DOM 中的所有变更，replay 则是将记录的变更按照对应的时间一一重放。
3. [rrweb-player](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Ftree%2Fmaster%2Fpackages%2Frrweb-player%2F "https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/")，为 rrweb 提供一套 UI 控件，提供基于 GUI 的暂停、快进、拖拽至任意时间点播放等功能。

![Untitled 4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c837f24b84d444db31b8941d2df4021~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1822&h=602&s=18559&e=png&a=1&b=fdf2f2)

**录制过程**

rrweb 在录制时会首先进行首屏 DOM 快照，遍历整个页面的 DOM Tree 并通过 nodeType 映射转换为 JSON 结构数据。针对不同 [nodeType](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FNode%2FnodeType "https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType") 类型的节点类型的序列化操作具有非常多的细节，如想了解细节可阅读这部分[源码](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fpackages%2Frrweb-snapshot%2Fsrc%2Fsnapshot.ts%23L430 "https://github.com/rrweb-io/rrweb/blob/master/packages/rrweb-snapshot/src/snapshot.ts#L430")。全量快照数据示例如下：

![Untitled 10.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7247b8906e40538dfe72e219b43a93~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1630&h=1448&s=634306&e=png&b=fdfdfd)

在获取首屏全量快照之后，我们就需要监听各类变动以获取增量的数据，增量改变的数据也需要同步转换为 JSON 数据进行存储。对于增量数据更新，则是通过 [mutationObserver](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMutationObserver "https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver") 获取 DOM 增量变化，以及通过全局事件监听、事件（属性）代理的方式进行方法（属性）劫持，并将劫持到的增量变化数据存入 JSON 数据中。针对不同类型的变动有这不同的监听处理方式，如想了解细节可阅读这部分[源码](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fpackages%2Frrweb%2Fsrc%2Frecord%2Fobserver.ts%23L1278 "https://github.com/rrweb-io/rrweb/blob/master/packages/rrweb/src/record/observer.ts#L1278")。

**回放过程**

回放主要就是将录制过程中的全量快照和增量快照进行重建复原，那么为保证一个安全可靠的环境在回放时我们不应该执行被录制页面中的 JavaScript，在重建快照的过程中通过 script 标签改写为 noscript 标签和 dom 重建在 iframe 中并设置 [sandbox](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement%2Fiframe "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe") 属性等手段来构建安全可靠的沙盒环境。在沙盒环境中，首先需要对首屏 DOM 快照进行重建，遍历 JSON 产物的同时通过自定义 type 映射到不同的节点构建方法以重建首屏 DOM 结构，然后 rrweb 内部则根据不同的增量类型调用不同的函数在页面对增量数据进行展现。同时，播放时通过录制产生的时间戳来保证回放顺序，通过 Node id 作用至指定的 DOM 节点，通过 requestAnimationFrame 保证页面播放流畅度。

> rrweb 实现原理可参考以下相关资料以及[源码/官方文档](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Ftree%2Fmaster "https://github.com/rrweb-io/rrweb/tree/master")：
>
> - [rrweb：打开 web 页面录制与回放的黑盒子 - 知乎](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F60639266 "https://zhuanlan.zhihu.com/p/60639266")
> - [神策数据王磊：如何用 JS 实现页面录制与回放 - 掘金](https://juejin.cn/post/6963585876492288031 "https://juejin.cn/post/6963585876492288031")
> - [rrweb 录屏原理浅析 - 掘金](https://juejin.cn/post/7071925342138531853 "https://juejin.cn/post/7071925342138531853")
> - [rrweb 实现原理介绍 - 微信公众号](https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F5RUjvKOBjqX5Btrse-C3Jg "https://mp.weixin.qq.com/s/5RUjvKOBjqX5Btrse-C3Jg")
> - [rrweb 带你还原问题现场 - 云音乐大前端](https://link.juejin.cn?target=https%3A%2F%2Fmusicfe.com%2Frrweb%2F "https://musicfe.com/rrweb/")

```html
代码解读<template>
  <button @click="handleStart">开启录制</button>
  <button @click="handleStop">结束录制</button>
  <button @click="handleReplay">播放录制</button>
  <div class="replay" ref="replayRef"></div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import * as rrweb from "rrweb";
  import rrwebPlayer from "rrweb-player";
  import "rrweb-player/dist/style.css";

  const replayRef = ref();
  const state = reactive({
    events: [] as any[],
    stopFn: null as any,
  });

  const handleStart = () => {
    state.stopFn = rrweb.record({
      emit(event) {
        if (state.events.length > 100) {
          // 当事件数量大于 100 时停止录制
          handleStop();
        } else {
          state.events.push(event);
        }
      },
    });
    ElMessage("开始录制");
  };

  const handleStop = () => {
    state.stopFn?.();
    ElMessage("已停止录制");
  };

  const handleReplay = () => {
    new rrwebPlayer({
      target: replayRef.value, // 可以自定义 DOM 元素
      // 配置项
      props: {
        events: state.events,
      },
    });
  };
</script>
```

![Untitled.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/519fe2915c8f4d408baa32ed3c95b47f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2132&h=1560&s=2846938&e=gif&f=167&b=fcfcfc)

![Untitled 5.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f77862a4b5584fd9874b2ca6acbe1327~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3504&h=1950&s=1270187&e=png&b=fcfcfc)

**从效果上来讲**，rrweb 录制内容存储了完整的页面结构能够较好地还原页面的整个操作，并且 rrweb 录制无损录制具有较好的清晰度，不像视频录制和页面截图需要考虑分辨率与产物大小的问题，同时也不像 canvas 截图一样对内容和样式有较大的局限性使得部分页面内容无法录制。

**从性能上来讲**，rrweb 录制传输的内容为 JSON 数据并且只对用户操作内容作增量记录，当页面静默的时候不会有额外数据的记录，相比较视频录制和页面截图而言大大减少了最终产物的体积，减轻了数据传输的压力，同时也提高了录制的性能。

**从功能上来讲**，rrweb 除了基础的录制回放功能之外，还具有较好的可扩展性和可操作性：

- rrweb 录制得到的产物是 JSON 数据，还支持将 JSON 数据转成视频，工具[rrvideo](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Ftree%2Fmaster%2Fpackages%2Frrvideo "https://github.com/rrweb-io/rrweb/tree/master/packages/rrvideo")
- 其允许通过配置来进行数据脱敏，不录制某些元素或屏蔽某些事件，详见[链接](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fguide.zh_CN.md%23%25E9%259A%2590%25E7%25A7%2581 "https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md#%E9%9A%90%E7%A7%81")
- 其还提供了存储优化的策略以减少录制的数据量，详见[链接](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fdocs%2Frecipes%2Foptimize-storage.zh_CN.md "https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/optimize-storage.zh_CN.md")
- 其还支持自定义插件来进行扩展，详见[链接](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frrweb-io%2Frrweb%2Fblob%2Fmaster%2Fdocs%2Frecipes%2Fplugin.zh_CN.md "https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/plugin.zh_CN.md")

### **2.4 方案对比**

| 对比内容   | 视频录制             | 页面截图                 | Dom 快照录制              |
| ---------- | -------------------- | ------------------------ | ------------------------- |
| 开源库     | WebRTC 原生支持      | html2canvas              | rrweb                     |
| 用户感知   | 录制有感             | 录制无感                 | 录制无感                  |
| 产物大小   | 大                   | 大                       | 相对较小                  |
| 兼容性     | 详见相关 API 兼容性  | 部分场景内容截图无法显示 | 兼容性相对较好            |
| 可操作性   | 弱                   | 弱                       | 强（支持数据脱敏/加密等） |
| 回放清晰度 | 录制时决定，有损录制 | 录制时决定，有损录制     | 高保真                    |

> 💡 **Dom 快照录制 - rrweb 库** 是目前最为流行的解决方案，一些商业化平台解决方案也都主要基于 rrweb 库来进行录制与回放的功能开发。但是，方案的选择不是绝对的，在不同的使用场景下选择合适的方案才是最重要的哦 (^\_-)

# **三、应用场景**

在获取页面的录屏内容之后，这只是第一步，更重要的是我们能够利用这些录屏信息获取到什么信息，分析出什么内容？

| #   | 应用场景       | 说明                                                                                                                                                                                                                                                          |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 产品功能分析   | 产品在功能的上线后仅通过点击或 PV 埋点来判断使用情况是不够的，更应该关注于一些关键页面/功能的真实使用场景，通过用户行为录制将用户的操作路径记录下来，通过回放种子用户的操作进行分析或利用算法对使用路径进行分析能够更好了解功能设计的情况，并帮助进一步优化。 |
| 2   | 用户访谈记录   | 产品在对用户进行访谈时通过整理用户口述记录和回放访谈录音等方式来进行分析和研究，整体访谈的成本较高，信息利用率也较低，而通过用户行为录制记录下来访谈过程中用户真实的操作记录能够更好地帮助产品来回顾访谈用户的操作习惯。                                      |
| 3   | 问题现场复现   | 解决问题第一步就需要复现问题，但有时候问题的复现操作是极其隐蔽的或者由于用户的使用环境等因素很难定位，通过录制用户行为来保存报错时刻的上下文使得我们能够更好地了解用户报错的操作，最大程度减少沟通和内容传递的成本。                                          |
| 4   | 自动化测试用例 | 通常自动化测试用例的编写和维护都由人工手动来完成，成本相对比较高，后期维护也不方便，通过用户行为录制将录制的数据加以转换就可以更加快捷方便地进行测试用例的采集，同时也便于管理。                                                                              |
| 5   | 其他           | 还有案例复盘、行为监控/监管、业务流程质检...                                                                                                                                                                                                                  |

# 四、平台方案

[Sentry 平台](https://link.juejin.cn?target=https%3A%2F%2Fdocs.sentry.io%2Fproduct%2Fsession-replay%2F "https://docs.sentry.io/product/session-replay/") 提供了录制与回放功能用于进行分析，其应用重点在于查看错误或性能问题发生之前、期间和之后的操作情况，其录制与回放功能同样基于 **rrweb 库**进行开发。

![Untitled 6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9b655f47bb24057bd4e0dde931c7859~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1440&h=900&s=259558&e=png&b=ffffff)

[Hotjar 平台](https://link.juejin.cn?target=https%3A%2F%2Fwww.hotjar.com%2F "https://www.hotjar.com/")提供了录制与回放功能用于进行分析，其除了录制与回放功能外，其提供了页面热力图等分析能力，以帮助用户更好地了解产品的情况，官方也提供了 [Demo](https://link.juejin.cn?target=https%3A%2F%2Finsights.hotjar.com%2Fsites%2F2327305%2Foverview "https://insights.hotjar.com/sites/2327305/overview") 可体验 。

![Untitled 7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e95d23b781ed4fde945e95ef018838c8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3584&h=2018&s=1620095&e=png&b=f4f3f3)

其他相关的商业化平台还有[LogRocket](https://link.juejin.cn?target=https%3A%2F%2Flogrocket.com%2Ffeatures%2Fsession-replay-developers "https://logrocket.com/features/session-replay-developers")、[FullStory](https://link.juejin.cn?target=https%3A%2F%2Fwww.fullstory.com%2F "https://www.fullstory.com/")、[marker.io](https://link.juejin.cn?target=https%3A%2F%2Fmarker.io%2F "https://marker.io/")等等。

# **五、总结**

目前，用户行为录制已经在各个场景中广泛使用，例如用户调研、产品分析、Bug 回溯、自动化测试和行为监控等等。视频录制、页面截图和 Dom 快照录制等技术方案各有优劣，在面对不同的使用场景时要选择合适的技术方案，但总体而言，以 **rrweb 库**为代表的 Dom 快照录制技术是目前最为广泛使用也最具优势的技术方案，在各种商业化解决方案中也主要采用该技术方案或思路来实现。

# **参考资料**

- [用户行为录制技术方案 - 掘金](https://juejin.cn/post/7146776738888941575 "https://juejin.cn/post/7146776738888941575")
- [前端录制回放系统初体验 - 掘金](https://juejin.cn/post/6953533236337197070 "https://juejin.cn/post/6953533236337197070")
- [浏览器录制方案的调研和总结 - 知乎](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F505961831 "https://zhuanlan.zhihu.com/p/505961831")
- [快速入门 WebRTC：屏幕和摄像头的录制、回放、下载 - 掘金](https://juejin.cn/post/7043072338002182174 "https://juejin.cn/post/7043072338002182174")
