### 如何判断页面是否空闲

首先，我们要知道什么是空闲？用户一定时间内，没有对网页进行任何操作，则当前网页为空闲状态。

用户操作网页，无非就是通过`鼠标`、`键盘`两个输入设备(暂不考虑手柄等设备)。因而我们可以监听相应的输入事件，来判断网页是否空闲(用户是否有操作网页)。

1. 监听鼠标移动事件`mousemove`；
2. 监听键盘按下事件`mousedown`；
3. 在用户进入网页后，设置延时跳转，如果触发以上事件，则移除延时器，并重新开始。

### 网页空闲检测实现

实现点：
1. 需要使用防抖方式实现，避免性能问题
2. 监听`visibilitychange`事件，在页面隐藏时移除延时器，然后页面显示时继续计时，从而解决这个问题。

实现：
```js
/**
 * 网页空闲检测
 * @param {() => void} callback 空闲时执行，即一定时长无操作时触发
 * @param {number} [timeout=15] 时长，默认15s，单位：秒
 * @param {boolean} [immediate=false] 是否立即开始，默认 false
 * @returns
 */
const onIdleDetection = (callback, timeout = 15, immediate = false) => {
  let pageTimer;
  let beginTime = 0;
  const onClearTimer = () => {
    pageTimer && clearTimeout(pageTimer);
    pageTimer = undefined;
  };
  const onStartTimer = () => {
    const currentTime = Date.now();
    if (pageTimer && currentTime - beginTime < 100) {
      return;
    }

    onClearTimer();
    beginTime = currentTime;
    pageTimer = setTimeout(() => {
      callback();
    }, timeout * 1000);
  };

  const onPageVisibility = () => {
     // 页面显示状态改变时，移除延时器
     onClearTimer();

     if (document.visibilityState === 'visible') {
       const currentTime = Date.now();
       // 页面显示时，计算时间，如果超出限制时间则直接执行回调函数
       if (currentTime - beginTime >= timeout * 1000) {
         callback();
         return;
       }
       // 继续计时
       pageTimer = setTimeout(() => {
         callback();
       }, timeout * 1000 - (currentTime - beginTime));
     }
  };

  const startDetection = () => {
    onStartTimer();
    document.addEventListener('mousedown', onStartTimer);
    document.addEventListener('mousemove', onStartTimer);
    document.addEventListener('visibilitychange', onPageVisibility);
  };

  const stopDetection = () => {
    onClearTimer();
    document.removeEventListener('mousedown', onStartTimer);
    document.removeEventListener('mousemove', onStartTimer);
    document.removeEventListener('visibilitychange', onPageVisibility);
  };
  
  const restartDetection = () => {
      onClearTimer();
      onStartTimer();
  };

  if (immediate) {
    startDetection();
  }

  return {
    startDetection,
    stopDetection,
    restartDetection
  };
};
```

### 扩展
chrome浏览器其实提供了一个`Idle Detection`API，来实现网页空闲状态的检测，但是这个API还是一个实验性特性，并且Firefox与Safari不支持。

### 参考文档
- https://juejin.cn/post/7344670957405405223