### 摘要

当使用 Hook 特性编写组件的时候时候，总能感觉到它的简洁和方便。当然，「天下没有免费的午餐」，它牺牲了可读性并且存在内存泄漏风险（最后有提到）。但这并不妨碍探索它的魔力。

在正式开始前，希望您读过 Hook 的文档或者在项目使用过它。但如果只对函数编程感兴趣，也可能有所收获。

为了让行文更流畅，我打算先抛出几个问题，这些问题会在源码实现的过程中，逐步解决：

*  useState 的实现原理
*  为什么不能在循环、判断内部使用 Hook
*  useEffect 的实现原理
*  useEffect 的应用场景
*  `Class` vs `Hooks`

### useState 的实现原理

当调用 useState 的时候，会返回形如 `(变量, 函数)` 的一个元祖。并且 state 的初始值就是外部调用 useState 的时候，传入的参数。

理清楚了传参和返回值，再来看下 useState 还做了些什么。正如下面代码所示，当点击按钮的时候，执行`setNum`，状态 num 被更新，**并且 UI 视图更新**。显然，useState 返回的用于更改状态的函数，自动调用了`render`方法来触发视图更新。

```javascript
function App() {
  const [num, setNum] = useState < number > 0;

  return (
    <div>
      <div>num: {num}</div>
      <button onClick={() => setNum(num + 1)}>加 1</button>
    </div>
  );
}

```

有了上面的探索，借助闭包，封装一个 `setState` 如下：

```javascript
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

let state: any;

function useState<T>(initialState: T): [T, (newState: T) => void] {
  state = state || initialState;

  function setState(newState: T) {
    state = newState;
    render();
  }

  return [state, setState];
}

render(); // 首次渲染

```

这是一个简易能用的`useState`雏形了。它也解决了文章开始提到的「useState 的实现原理」这个问题。但如果在函数内声明多个 state，在当前代码中，只有第一个 state 是生效的(请看`state = state || initialState;`))。

### 为什么不能在循环、判断内部使用 Hook

先不要考虑题目提及的问题。思路还是回到如何让 useState 支持多个 state。React Hook 看起来非常 Magic 的实现，本质上还是通过 Array 来实现的。

前面 useState 的简单实现里，初始的状态是保存在一个全局变量中的。以此类推，多个状态，应该是保存在一个专门的全局容器中。这个容器，就是一个朴实无华的 Array 对象。具体过程如下：

* 第一次渲染时候，根据 useState 顺序，逐个声明 state 并且将其放入全局 Array 中。每次声明 state，都要将 cursor 增加 1。
* 更新 state，触发再次渲染的时候。**cursor 被重置为 0**。按照 useState 的声明顺序，依次拿出最新的 state 的值，视图更新。

请看下面这张图，每次使用 useState，都会向 STATE 容器中添加新的状态。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/22/16df33d45b7c0214~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

实现的代码如下：

```typescript
import React from "react";
import ReactDOM from "react-dom";

const states: any[] = [];
let cursor: number = 0;

function useState<T>(initialState: T): [T, (newState: T) => void] {
  const currenCursor = cursor;
  states[currenCursor] = states[currenCursor] || initialState; // 检查是否渲染过

  function setState(newState: T) {
    states[currenCursor] = newState;
    render();
  }

  ++cursor; // update: cursor
  return [states[currenCursor], setState];
}

function App() {
  const [num, setNum] = useState < number > 0;
  const [num2, setNum2] = useState < number > 1;

  return (
    <div>
      <div>num: {num}</div>
      <div>
        <button onClick={() => setNum(num + 1)}>加 1</button>
        <button onClick={() => setNum(num - 1)}>减 1</button>
      </div>
      <hr />
      <div>num2: {num2}</div>
      <div>
        <button onClick={() => setNum2(num2 * 2)}>扩大一倍</button>
        <button onClick={() => setNum2(num2 / 2)}>缩小一倍</button>
      </div>
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  cursor = 0; // 重置cursor
}

render(); // 首次渲染

```

此时，如果想在循环、判断等不在函数组件顶部的地方使用 Hook，如下所示：

```typescript
let tag = true;

function App() {
  const [num, setNum] = useState < number > 0;

  // 只有初次渲染，才执行
  if (tag) {
    const [unusedNum] = useState < number > 1;
    tag = false;
  }

  const [num2, setNum2] = useState < number > 2;

  return (
    <div>
      <div>num: {num}</div>
      <div>
        <button onClick={() => setNum(num + 1)}>加 1</button>
        <button onClick={() => setNum(num - 1)}>减 1</button>
      </div>
      <hr />
      <div>num2: {num2}</div>
      <div>
        <button onClick={() => setNum2(num2 * 2)}>扩大一倍</button>
        <button onClick={() => setNum2(num2 / 2)}>缩小一倍</button>
      </div>
    </div>
  );
}

```

由于在条件判断的逻辑中，重置了`tag=false`，因此此后的渲染不会再进入条件判断语句。看起来好像没有问题？但是，由于 useState 是基于 Array+Cursor 来实现的，第一次渲染时候，state 和 cursor 的对应关系如下表：

|变量名|cursor|
|---|---|
|num|0|
|unusedNum|1|
|num2|2|


当点击事件触发再次渲染，并不会进入条件判断中的 useState。所以，cursor=2 的时候对应的变量是 num2。而其实 num2 对应的 cursor 应该是 3。就会导致`setNum2`并不起作用。

到此，解决了文章开头提出的「🤔️ 为什么不能在循环、判断内部使用 Hook」。在使用 Hook 的时候，请在函数组件顶部使用！


在这一小节中，尝试解答了 「🤔️ useEffect 的实现原理」和 「🤔️ useEffect 的应用场景」这两个问题。

### Class VS Hooks

虽然 Hooks 看起来更酷炫，更简洁。但是在实际开发中我更倾向于使用 Class 来声明组件。两种方法的对比如下：

|Class|Hooks|
|---|---|
|代码逻辑清晰（构造函数、componentDidMount 等）|需要配合变量名和注释|
|不容易内存泄漏|容易发生内存泄漏|


总的来说，Hooks 对代码编写的要求较高，在没有有效机制保证代码可读性、规避风险的情况下，Class 依然是我的首选。关于内存泄漏，下面是一个例子（目前还没找到方法规避这种向全局传递状态更新函数的做法）：

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";

let func: any;
setInterval(() => {
  typeof func === "function" && func(Date.now());
  console.log("interval");
}, 1000);

function App() {
  const [num, setNum] = useState < number > 0;
  if (typeof func !== "function") {
    func = setNum;
  }
  return <div>{num}</div>;
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();

```

### 参考链接

* [React hooks: not magic, just arrays](https://link.juejin.cn?target=https%3A%2F%2Fmedium.com%2F%40ryardley%2Freact-hooks-not-magic-just-arrays-cd4f1857236e "https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e")
* [A Complete Guide to useEffect](https://link.juejin.cn?target=https%3A%2F%2Foverreacted.io%2Fzh-hans%2Fa-complete-guide-to-useeffect%2F "https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/")
* [useEffect 完整指南](https://link.juejin.cn?target=https%3A%2F%2Foverreacted.io%2Fzh-hans%2Fa-complete-guide-to-useeffect%2F "https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/")
* [React Hooks 原理](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbrickspert%2Fblog%2Fissues%2F26 "https://github.com/brickspert/blog/issues/26"): `useEffect`实现有问题，回调函数调用 state 的更新函数，会爆栈

文章中多有见解不到当之处，欢迎讨论和指正。
