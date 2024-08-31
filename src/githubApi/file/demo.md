**关键词**：resize 事件应用

要实时统计用户浏览器窗口大小，可以利用 JavaScript 中的 `resize` 事件。当浏览器窗口尺寸变化时，此事件会被触发。通过侦听此事件，可以实时获取并处理浏览器窗口的宽度和高度。

### 基础示例

下面是一个简单的示例，展示如何使用 `resize` 事件来获取并打印当前浏览器窗口的宽度和高度：

```javascript
// 定义一个函数来处理窗口大小变化
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(`当前窗口大小：宽度 = ${width}, 高度 = ${height}`);
}

// 在窗口 resize 事件上添加监听器
window.addEventListener("resize", handleResize);

// 初始化时执行一次，确保获取初始窗口大小
handleResize();
```

### 节流优化

如果你担心 `resize` 事件触发得太频繁，可能会影响页面性能，可以引入“节流”（throttle）机制来限制事件处理函数的执行频率。节流确保了即使事件持续触发，事件处理函数也只在每隔一段时间执行一次。

以下是如何应用节流优化的示例：

```javascript
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
}

// 使用节流函数包装我们的处理器
const throttledHandleResize = throttle(handleResize, 100);

// 添加节流化的事件监听
window.addEventListener("resize", throttledHandleResize);
```

这个 `throttle` 函数通过确保被包装的 `handleResize` 函数在指定的时间间隔（本例中为 100 毫秒）内最多只执行一次，来减少 `resize` 事件处理函数的调用频率。

### 应用场景

这样实时统计用户浏览器窗口大小的方法可以用于多种应用场景，如响应式布局调整、基于窗口大小动态加载资源、或者其他需要根据视窗大小变化进行调整的交互效果实现。

使用这种方法时，重要的是平衡事件处理函数的执行频率和页面的性能，特别是当你的窗口大小调整处理函数中包含复杂操作时。通过合理利用“节流”或“防抖”（debounce）技术，可以有效地解决这个问题。
