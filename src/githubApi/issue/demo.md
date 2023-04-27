**关键词**：react15 架构、react 架构、react Reconciler、react 渲染器、react 协调器

React15 架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Reconciler（协调器）

我们知道，在React中可以通过 `this.setState、this.forceUpdate、ReactDOM.render` 等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

- 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知Renderer将变化的虚拟DOM渲染到页面上

### Renderer（渲染器）
由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— `ReactDOM`

除此之外，还有：

- ReactNative 渲染器，渲染App原生组件
- ReactTest 渲染器，渲染出纯Js对象用于测试
- ReactArt 渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，Renderer接到 `Reconciler` 通知，将变化的组件渲染在当前宿主环境。

### React15 架构的缺点
**react15 是通过递归去更新组件的**

在 Reconciler 中，mount的组件会调用 mountComponent (opens new window)，update 的组件会调用 updateComponent (opens new window)。这两个方法都会递归更新子组件。

**由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。**

本质上说是因为 递归 的架构， 是不允许中断的， 因为 react 希望有更好的渲染性能，那么面对大规模 dom diff 更新渲染的时候， 就不能让每一递归时间超过 16 ms。
递归是做不到这个功能的。 所以只有重写 react15 架构。引入了 react16 fiber 架构。



