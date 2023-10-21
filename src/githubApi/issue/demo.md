**关键词**：实现setInterval、requestAnimationFrame实现setInterval、setTimeout实现setInterval

如果不使用 `setTimeout` 来实现 `setInterval`，可以使用 `requestAnimationFrame` 函数和时间戳来实现定时循环。下面是实现的代码示例：

**实现方式1**

```javascript
function mySetInterval(callback, interval) {
  let startTime = Date.now();
  let elapsedTime = 0;

  function loop() {
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;

    if (deltaTime >= interval) {
      callback();
      startTime = currentTime;
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  return {
    clear: function() {
      startTime = 0;
      elapsedTime = 0;
    }
  };
}
```

这个实现中，我们通过 `requestAnimationFrame` 函数来循环执行 `loop` 函数。在 `loop` 函数中，我们获取当前时间戳 `currentTime`，并计算与上一次执行的时间间隔 `deltaTime`
。如果 `deltaTime` 大于等于指定的间隔时间 `interval`，则执行回调函数 `callback`，并更新 `startTime` 为当前时间，以便下一次判断。

最后，返回一个具有 `clear` 方法的对象，用于清除定时器。调用 `clear` 方法时，将 `startTime` 和 `elapsedTime` 重置为初始值。

**实现方式2**

```js
const obj = {
  timer: null,
  setInterval: function(callback, interval) {
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const self = this
    const loop = function() {
      self.timer = requestAnimationFrame(loop)
      endTime = now()
      if (endTime - startTime >= interval) {
        startTime = endTime = now()
        callback && callback()
      }
    }
    this.timer = requestAnimationFrame(loop)
    return this.timer
  },
  clearInterval: function() {
    cancelAnimationFrame(this.timer)
  }
}

let count = 0
const timer = obj.setInterval(() => {
  console.log('interval...')
  count++
  if (count >= 3) {
    obj.clearInterval()
  }
}, 500)
```

**实现方式3**

使用 `setTimeout` 来实现

```ts
/**
 * setTimeout 版本
 */
function _setIntervalUseTimeout(
  fn: () => void,
  millisec: number,
  count?: number
) {
  let timer: number;
  function interval() {
    if (typeof count === 'undefined' || count-- > 0) {
      timer = setTimeout(interval, millisec);
      try {
        fn();
      } catch (e: any) {
        count = 0;
        throw e.toString();
      }
    }
  }
  timer = setTimeout(interval, millisec);
  return {
    clear: () => clearTimeout(timer),
  };
}
```
