**关键词**：scrollIntoView api

`scrollIntoView` 是一个 Web API，允许网页开发者控制元素如何被滚动到浏览器的可视区域。这个方法可以对任何 `Element` 使用，以改变窗口的滚动位置，以便最终元素位于屏幕可见范围内。它对于某些需要用户立即看到的表单错误、警告，或者在执行完某些操作后需要用户注意的元素比如通知提示尤为有用。

### 基本用法

```javascript
element.scrollIntoView(smoothScrollingOptions);
```

### 参数说明

`smoothScrollingOptions` 是一个可选对象。当设定为 `false`、`undefined` 或一个计算值为 `false` 的值（比如 `0`）的时候，滚动操作将以最简单的方式立即执行，而不会平滑过渡。

当为 `true` 或者一个与滚动行为不冲突的对象时，浏览器会执行一个平滑的滚动动作，逐渐将元素滚动到视野内。

### 选项

该方法接受一个可选的 `ScrollIntoViewOptions` 对象，它包含以下属性：

1. **block**: 描述元素应当在其块级方向上的对齐方式。可以是 `"start"`、`"center"`、`"end"` 或 `"nearest"` 中的一个。

   - `start` — 元素顶部与包含块的顶部对齐，只有块级元素会被滚动到这个位置。
   - `center` — 元素将尽可能被居中对齐地显示。
   - `end` — 元素底部将与包含块的底部对齐。
   - `nearest` — 元素将滚动到最近的边缘。

2. **inline**: 描述在元素行进方向的对齐方式。同样可以是 `"start"`、`"center"`、`"end"` 或 `"nearest"` 中的一个。

3. **behavior**: 描述滚动行为。设置为 `"auto"` 时将使用默认滚动，设置为 `"smooth"` 时将平滑滚动。

### 例子

```javascript
document.getElementById("myElement").scrollIntoView({
  behavior: "smooth", // 平滑滚动
  block: "start", // 元素顶部与包含块顶部对齐
});
```

请注意，`scrollIntoView` 只能够使元素完全可见，但仍需留意元素灵感中其他内容可能超出视口之外。此外，滚动的方式也可能会受到 Web 浏览器和平台的不同而有所不同，例如一些浏览器可能有最高滚动速度的限制。

**参考文档**

- https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
