订阅-发布模式是一种常用的设计模式，它可以实现对象间的解耦，让它们不需要相互知道对方的存在，只需要关注自己需要订阅的事件即可。当一个对象的状态发生变化时，它可以发布一个事件通知其他对象，其他对象可以订阅该事件，当事件发生时得到通知并执行相应的处理。

在 JavaScript 中，订阅-发布模式也被称为事件模型。事件模型由两个主要组件组成：事件触发器和事件监听器。事件触发器负责触发事件，而事件监听器则负责监听事件并执行相应的回调函数。

下面是一个简单的实现订阅-发布模式的例子：

```javascript
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  }

  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((listener) => listener(...args));
    }
  }

  off(event, listener) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter((l) => l !== listener);
    }
  }
}
```

这个实现包括三个方法：

* `on(event, listener)`：订阅事件，当事件被触发时执行监听器 `listener`；
* `emit(event, ...args)`：触发事件，并将参数 `...args` 传递给监听器；
* `off(event, listener)`：取消订阅事件，不再执行监听器 `listener`。

使用方法如下：

```javascript
const emitter = new EventEmitter();

// 订阅事件
emitter.on("event", (arg1, arg2) => {
  console.log(`event: ${arg1}, ${arg2}`);
});

// 触发事件
emitter.emit("event", "hello", "world");

// 取消订阅事件
emitter.off("event");
```

以上代码将输出：

```csharp
csharpCopy codeevent: hello, world
```

订阅-发布模式在事件驱动的系统中非常常见，例如浏览器中的 DOM 事件、Node.js 中的异步 IO 事件等。