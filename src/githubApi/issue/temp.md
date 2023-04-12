Webpack Tapable 是基于发布-订阅模式的一个插件系统，它提供了一组钩子函数，让插件可以在相应的时机执行自己的逻辑。

下面是一个简单的自定义 Tapable 的实现：

```javascript
class Tapable {
  constructor() {
    this.hooks = {};
  }

  // 注册事件监听函数
  tap(name, callback) {
    if (!this.hooks[name]) {
      this.hooks[name] = [];
    }
    this.hooks[name].push(callback);
  }

  // 触发事件
  call(name, ...args) {
    const callbacks = this.hooks[name];
    if (callbacks && callbacks.length) {
      callbacks.forEach((callback) => callback(...args));
    }
  }
}
```

在这个例子中，我们定义了一个 `Tapable` 类，它有一个 `hooks` 对象属性，用于存储各个事件对应的监听函数。然后我们定义了 `tap` 方法，用于注册事件监听函数，以及 `call` 方法，用于触发事件。

下面是一个使用自定义 Tapable 的例子：

```javascript
const tapable = new Tapable();

tapable.tap('event1', (arg1, arg2) => {
  console.log('event1 is triggered with arguments:', arg1, arg2);
});

tapable.tap('event2', (arg1, arg2) => {
  console.log('event2 is triggered with arguments:', arg1, arg2);
});

tapable.call('event1', 'hello', 'world');
tapable.call('event2', 'foo', 'bar');
```

在这个例子中，我们定义了两个事件 `event1` 和 `event2`，并为它们注册了监听函数。当我们调用 `call` 方法触发事件时，注册的监听函数就会依次执行。

这个自定义 Tapable 的实现虽然简单，但它体现了 Tapable 的设计思路和核心功能。在实际使用中，Webpack 的 Tapable 提供了更多的功能和钩子，可以满足不同场景的需求。
