**关键词**：移动端下拉加载

> 有现成的文档可以直接参考， 讲得非常的全面
> 文章链接： https://juejin.cn/post/7340836136208859174
> 一下是作者对于改文章的总结

### 原理

![prinple.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506932c16c034452b90ae01decabf62c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=825&h=359&s=455756&e=png&b=ffffff)

如图所示，蓝色框代表视口，绿色框代表容器，橙色框代表加载动画。最开始时，加载动画处于视口外；开始下拉之后，容器向下移动，加载动画从上方进入视口；结束下拉后，容器又开始向上移动，加载动画也从上方退出视口。

### 核心逻辑

看完布局代码，我们再看逻辑代码。逻辑代码中，我们要监听用户的手指滑动、实现下拉手势。我们需要用到三个事件：

- [touchstart](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event) 代表触摸开始;
- [touchmove](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchmove_event) 代表触摸移动;
- [touchend](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchend_event) 代表触摸结束。

从 `touchstart` 和 `touchmove` 事件中我们可以获取手指的坐标，比如 `event.touches[0].clientX` 是手指相对视口左边缘的 X 坐标，`event.touches[0].clientY` 是手指相对视口上边缘的 Y 坐标；从 `touchend` 事件中我们则无法获得 `clientX` 和 `clientY`。

我们可以先记录用户手指 touchstart 的 clientY 作为开始坐标，记录用户最后一次触发 touchmove 的 clientY 作为结束坐标，二者相减就得到手指移动的距离 distanceY。

设置手指移动多少距离，容器就移动多少距离，就得到了我们的逻辑代码：

```js
 代码解读const box = document.getElementById('box')
const loader = document.getElementById('loader')
let startY = 0, endY = 0, distanceY = 0

function start(e) {
  startY = e.touches[0].clientY
}

function move(e) {
  endY =  e.touches[0].clientY
  distanceY = endY - startY
  box.style = `
    transform: translateY(${distanceY}px);
    transition: all 0.3s linear;
  `
}

function end() {
  setTimeout(() => {
    box.style = `
      transform: translateY(0);
      transition: all 0.3s linear;
    `
    loader.className = 'loading'
  }, 1000)
}

box.addEventListener('touchstart', start)
box.addEventListener('touchmove', move)
box.addEventListener('touchend', end)
```

逻辑代码实现一个简陋的下拉效果，当然现在还有很多缺陷。

![pull-down-basic.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fdc67efc50947e8bceb590b1e4d3df5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=375&h=400&s=204176&e=gif&f=48&b=efefef)

### 存在的 6 个个缺陷

- 没有最小、最大距离限制
- 加载动画没有停留在视口顶部
- 重复触发
- 没有限制方向
- 没有阻止原生滚动
- 没有阻止 iOS 橡皮筋效果

### 修复上面缺陷

请看原文
