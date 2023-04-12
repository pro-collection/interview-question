洋葱模型是一种常用的中间件模型，例如在 Koa 框架中就广泛应用了这种模型。这种模型的特点是请求被传递到下一个中间件之前，需要先经过当前中间件处理，然后再逐层返回。

下面是一个简单的洋葱模型的示例代码：

```javascript
function middleware1(next) {
  return function(ctx) {
    console.log('middleware1 before');
    next(ctx);
    console.log('middleware1 after');
  }
}

function middleware2(next) {
  return function(ctx) {
    console.log('middleware2 before');
    next(ctx);
    console.log('middleware2 after');
  }
}

function middleware3(next) {
  return function(ctx) {
    console.log('middleware3 before');
    next(ctx);
    console.log('middleware3 after');
  }
}

function compose(middlewares) {
  return function(ctx) {
    function dispatch(i) {
      if (i === middlewares.length) {
        return;
      }
      const middleware = middlewares[i];
      const next = dispatch.bind(null, i + 1);
      middleware(next)(ctx);
    }
    dispatch(0);
  }
}

const middlewares = [middleware1, middleware2, middleware3];
const composed = compose(middlewares);
composed({});
```

这个示例中有三个中间件函数 `middleware1`、`middleware2` 和 `middleware3`，它们都是接受一个 `next` 函数作为参数的高阶函数。当这个中间件被执行时，它将接受一个 `ctx` 对象作为参数，并且调用 `next(ctx)` 将请求传递给下一个中间件。

`compose` 函数接受一个中间件函数数组作为参数，返回一个新的函数，这个函数可以将请求传递给第一个中间件函数。每个中间件函数都将接收一个 `next` 函数作为参数，并返回一个新的函数，这个新的函数将接收 `ctx` 对象作为参数，并且在调用 `next(ctx)` 之前和之后都会执行一些操作。当 `next(ctx)` 被调用时，请求将被传递到下一个中间件函数。

在 `composed` 函数中，我们将一个空的 `ctx` 对象作为参数传递给第一个中间件函数。`dispatch` 函数递归地调用中间件数组中的每一个中间件函数，并将 `ctx` 对象和下一个中间件函数作为参数传递。当最后一个中间件函数完成处理时，递归调用结束，请求处理完成。
