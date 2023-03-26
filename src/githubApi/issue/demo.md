**思路**

* 首先调用 `use` 方法收集中间件，调用 `listen` 方法执行中间件。
* 每一个中间件都有一个`next`参数（暂时不考虑ctx参数），`next`参数可以控制进入下一个中间件的时机。

**需要解决的问题**
- 最后一个中间件调用next如何处理
- 如何解决同一个中间件多次调用next


**完整代码**

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


**使用**

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

