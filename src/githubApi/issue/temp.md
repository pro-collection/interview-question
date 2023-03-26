### 什么是洋葱模型

说到洋葱模型，就必须聊一聊中间件，中间件这个概念，我们并不陌生，比如平时我们用的 `redux`、`express` 、`koa` 这些库里，都离不开中间件。

那 `koa` 里面的中间件是什么样的呢？其本质上是一个函数，这个函数有着特定，单一的功能，`koa`将一个个中间件注册进来，通过**组合**实现强大的功能。

先看 `demo` ：

```js
// index.js
const Koa = require("koa")
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
    console.log("1")
    await next()
    console.log("2")
});
// 中间件2
app.use(async (ctx, next) => {
    console.log("3")
    await next()
    console.log("4")
});
// 中间件3
app.use(async (ctx, next) => {
    console.log("5")
    await next()
    console.log("6")
});
app.listen(8002);


```

先后注册了三个中间件，运行一下`index.js` ，可以看到输出结果为：

```js
1
3
5
6
4
2

```

没接触过洋葱模型的人第一眼可能会疑惑，为什么调用了一个 `next` 之后，直接从`1` 跳到了 `3` ，而不是先输出`1` ，再输出`2`呢。 其实这就是洋葱模型特点，下图是它的执行过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80798be002944d67a46c456d4af3c03c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 一开始我们先后注册了三个中间件，分别是中间件1，中间件2，中间件3，调用`listen`方法，打开对应端口的页面，触发了中间件的执行。

首先会先执行第一个中间件的 `next` 的前置语句，相当于 `demo` 里面的 `console.log('1')` ，当调用 `next()` 之后，会直接进入第二个中间件，继续重复上述逻辑，直至最后一个中间件，就会执行 `next` 的后置语句，然后继续上一个中间件的后置语句，继续重复上述逻辑，直至执行第一个中间件的后置语句，最后输出。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935675e49480426eb517a68c224673c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 正是因为它这种执行机制，才被称为**洋葱模型**。

### 如何实现koa洋葱模型

我们已经知道它为什么叫洋葱模型，以及它的执行过程，但是它到底是如何实现的呢？换句话说，koa内部是如何把这些中间件 **`组合`** 在一起的？

先简单分析一下思路：

* 首先调用 `use` 方法收集中间件，调用 `listen` 方法执行中间件。
* 每一个中间件都有一个`next`参数（暂时不考虑ctx参数），`next`参数可以控制进入下一个中间件的时机。

简易实现如下：

```javascript
function Koa () {
  // ...
  this.middleares = [];
}

Koa.prototype.use = function (middleare) {
    // 此时 middleare 其实就是 (ctx, next) => ()
    this.middleares.push(middleare); // 发布订阅，先收集中间件
    reutrn this;
}
Koa.prototype.listen = function () {
   const fn = compose(this.middleares); // 组合中间件
}

// 核心函数
function compose (middleares) {
    // 准备递归
    function dispatch(i) {
        const middleare = middleares[i]; // 别忘记中间件的格式 (ctx, next) => ()
        return middleare('ctx', dispatch.bind(null, i + 1)); // 每次调用next，都用调用一次dispatch方法，并且i+1
    }
    return dispatch(0)
}
const app = new Koa();

// 中间件1
app.use((ctx, next) => {
  console.log("1");
  next();
  console.log('2');
})
// 中间件2
app.use((ctx, next) => {
  console.log("3");
  console.log('4');
})

app.listen();
// 打印 1342

```

### 最后一个中间件调用next如何处理？

最简单的版本就已经实现了，但是还是有点问题，当最后一个中间件继续调用`next`时，会发现如下报错信息：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df004d2b10904f348ac81713c7e3a3dd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 原因就是当最后一个中间件调用`next`的时候，`i+1` 之后已经超出了`middeares`的最大下标，找不到对应的`middeare`了，具体实现如下：

```diff
...

// 核心函数
function compose (middleares) {
  // 准备遍历
  function dispatch(i) {
+   if(i === middleares.length) return; // 没有找到直接跳出递归
    const middleare = middleares[i]; // 别忘记中间件的格式 (ctx, next) => ()
    return middleare('ctx', dispatch.bind(null, i + 1)); // 每次调用next，都用调用一次dispatch方法，并且i+1，
  }
  return dispatch(0);
}

...

app.use((ctx, next) => {
  console.log("1");
  next();
  console.log('2');
})
app.use((ctx, next) => {
  console.log("3");
+ next()
  console.log('4');
})

app.listen(3000);

```

### 如何解决同一个中间件多次调用next？

乍一看似乎是没有问题，但是如果在一个中间件里面连续调两次`next`，会发生什么结果呢？ 先来看看 `koa` ：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3febbc59cc14b6eb92f6aa70b5fed43~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 报错信息说 `next()` 被调用多次，那这个又是如何实现的呢？

思路： 创建一个`index`（指针），记录已递归的`middleare`的最新下标，当一个中间件第二次调用`next`的时候，说明它正在走后置语句部分，也就是说所有的中间件都调用过`next`了，那此时只需要比较一下`i`跟`index`的值即可。

```diff

...

// 核心函数
function compose (middleares) {
+ let index = -1; 创建指针
  // 准备遍历
  function dispatch(i) {
+   if(i <= index) throw new Error('next() called multiple times');
+   index = i;
    if(i === middleares.length) return;
    const middleare = middleares[i]; // 别忘记中间件的格式 (ctx, next) => ()
    return middleare('ctx', dispatch.bind(null, i + 1)); // 每次调用next，都用调用一次dispatch方法，并且i+1，
  }
  return dispatch(0)
}

...

app.use((ctx, next) => {
  console.log("1");
  next();
+ next();
  console.log('2');
})
app.use((ctx, next) => {
  console.log("3");
  next();
  console.log('4');
})

app.listen(3000);


```

### 完整代码

其中最精华的部分就是`compose`函数，细数一下，只有`11`行代码，1比1还原了`koa`的`compose`函数（去除了不影响主逻辑判断）。

> koa是利用koa-compose这个库进行组合中间件的，在koa-compose里面，next返回的都是一个promise函数。

```js
function Koa () {
  this.middleares = [];
}
Koa.prototype.use = function (middleare) {
  this.middleares.push(middleare);
  return this;
}
Koa.prototype.listen = function () {
  const fn = compose(this.middleares);
}
function compose(middleares) {
  let index = -1;
  const dispatch = (i) => {
    if(i <= index) throw new Error('next（） 不能调用多次');
    index = i;
    if(i >= middleares.length) return;
    const middleare = middleares[i];
    return middleare('ctx', dispatch.bind(null, i + 1));
  }
  return dispatch(0);
}

const app = new Koa();
app.use(async (ctx, next) => {
  console.log('1');
  next();
  console.log('2');
});
app.use(async (ctx, next) => {
  console.log('3');
  next();
  console.log('4');
});
app.use(async (ctx, next) => {
  console.log('5');
  next();
  console.log('6');
});

app.listen();

```

### 如何编写中间件

使用中间件好处是可以解耦代码，提高可利用性，方便复用，比如`logger中间件`，或者是说 `跨域中间件`， 下面简易实现一个`cors()`中间件。

不使用中间件版本：

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
  console.log('第一个中间件', ctx.request.method,ctx.request.url);
  await next();
  ctx.body = 'hello world'
});
app.listen(8020);

```

本地可以搭建一个前端项目，然后`fetch('http://localhost:8020')`上面是不使用中间件的版本，可以看到我们想要实现跨域，只能把跨域逻辑写在你的中间件里面，但同时这个中间件也还有你的业务逻辑代码，所以需要解耦出来。

改造之后的版本：

```js
const Koa = require('koa');
const app = new Koa();

// 中间件过多，可以创建一个middleares文件夹，将cors函数放到middleares/cors.js文件里面
const cors = () => {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    await next();
  }
};

app.use(cors());
app.use(async (ctx, next) => {
  console.log('第一个中间件', ctx.request.method,ctx.request.url);
  await next();
  ctx.body = 'hello world'
});

```

`koa`的中间件都是有固定模板的，首先是一个函数，并且返回一个`async`函数（闭包的应用），这个`async`函数有两个参数，一个是`koa`的`context`，一个是`next`函数。

### 总结

本文实现了`koa`洋葱模型简易功能，虽然`koa`中间件注册的时候是一个个注册进去的，但是其内部利用组合函数（`compose`），按照注册的先后顺序，将中间件都包裹起来（有点类似于套娃hahaha），关键点就是`compose`函数妙用，值得学习。
