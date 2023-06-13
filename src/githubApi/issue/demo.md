`requestAnimationFrame` 是一种优化动画性能的方法，它会在浏览器重绘之前执行指定的回调函数。相比于传统的 `setInterval` 或 `setTimeout` 方法，`requestAnimationFrame` 会在浏览器的下一次重绘之前执行回调函数，能够更好地与浏览器的渲染机制结合，减少页面的卡顿和闪烁。

`requestAnimationFrame` 的使用方法如下：

```javascript
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);
  // 在这里执行动画代码
}

animate(); // 启动动画
```

在上面的代码中，`requestAnimationFrame` 方法返回一个唯一的标识符，可以用来取消动画，如下所示：

```javascript
cancelAnimationFrame(animationId); // 取消动画
```

需要注意的是，`requestAnimationFrame` 并不一定每秒都会执行 60 次，它会根据浏览器的刷新频率来自动调整执行次数，保证动画的流畅性。同时，由于 `requestAnimationFrame` 是在浏览器的主线程中执行，如果动画计算量过大，会占用过多的 CPU 资源，导致页面的卡顿和性能问题。因此，需要合理使用 `requestAnimationFrame`，避免在单个动画中进行复杂的计算。
