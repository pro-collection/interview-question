原理其实就是 通过 `requestAnimationFrame` 实现分块儿加载。

### requestAnimationFrame + fragment（时间分片）

既然定时器的执行时间和浏览器的刷新率不一致，那么我就可以用`requestAnimationFrame`来解决

`requestAnimationFrame`也是个定时器，不同于`setTimeout`，它的时间不需要我们人为指定，这个时间取决于当前电脑的刷新率，如果是 60Hz ，那么就是 16.7ms 执行一次，如果是 120Hz 那就是 8.3ms 执行一次

> 因此`requestAnimationFrame`也是个宏任务，前阵子面试就被问到过这个

这么一来，每次电脑屏幕 16.7ms 后刷新一下，定时器就会产生 20 个`li`，`dom`结构的出现和屏幕的刷新保持了一致

```js
const total = 100000;
let ul = document.getElementById("container");
let once = 20;
let page = total / once;

function loop(curTotal) {
  if (curTotal <= 0) return;

  let pageCount = Math.min(curTotal, once);

  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerHTML = ~~(Math.random() * total);
      ul.appendChild(li);
    }
    loop(curTotal - pageCount);
  });
}

loop(total);
```

其实目前这个代码还可以优化一下，每一次`appendChild`都是新增一个新的`li`，也就意味着需要回流一次，总共十万条数据就需要回流十万次

此前讲回流的时候提出过虚拟片段`fragment`来解决这个问题

`fragment`是虚拟文档碎片，我们一次`for`循环产生 20 个`li`的过程中可以全部把真实`dom`挂载到`fragment`上，然后再把`fragment`挂载到真实`dom`上，这样原来需要回流十万次，现在只需要回流`100000 / 20`次

```js
const total = 100000;
let ul = document.getElementById("container");
let once = 20;
let page = total / once;

function loop(curTotal) {
  if (curTotal <= 0) return;

  let pageCount = Math.min(curTotal, once);

  window.requestAnimationFrame(() => {
    let fragment = document.createDocumentFragment(); // 创建一个虚拟文档碎片
    for (let i = 0; i < pageCount; i++) {
      let li = document.createElement("li");
      li.innerHTML = ~~(Math.random() * total);
      fragment.appendChild(li); // 挂到fragment上
    }
    ul.appendChild(fragment); // 现在才回流
    loop(curTotal - pageCount);
  });
}

loop(total);
```

进阶： 如果做到极致的话， 可以考虑通过动态计算渲染的量， 一次性渲染多少。 会涉及到一些 长任务 等相关知识。
这部分可以参考：https://juejin.cn/post/7328366295091380262

### 参考文档

https://juejin.cn/post/7354940230301057033
