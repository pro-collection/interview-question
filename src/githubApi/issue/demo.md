**关键词**：react16 架构、react Reconciler、react fiber、react 渲染器、react 协调器

React16架构可以分为三层：

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
Reconciler（协调器）—— 负责找出变化的组件
Renderer（渲染器）—— 负责将变化的组件渲染到页面上
可以看到，相较于React15，React16中新增了Scheduler（调度器）。

### Scheduler（调度器）

以浏览器是否有剩余时间作为任务中断的标准，那么**需要一种机制，当浏览器有剩余时间时通知我们**。

其实部分浏览器已经实现了这个API，这就是 `requestIdleCallback` (opens new window)。但是由于以下因素，React放弃使用：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的 `requestIdleCallback` 触发的频率会变得很低

基于以上原因，React实现了功能更完备的 `requestIdleCallback polyfill`，这就是`Scheduler`。除了在空闲时触发回调的功能外，`Scheduler` 还提供了多种调度优先级供任务设置。

Scheduler (opens new window) 是独立于React的库

### Reconciler（协调器）

在 React15 中 `Reconciler` 是递归处理虚拟DOM的

在 React16 中更新工作从递归变成了可以中断的循环过程。每次循环都会调用 `shouldYield` 判断当前是否有剩余时间。
```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

**那么React16是如何解决中断更新时DOM渲染不完全的问题呢？**

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记；

全部标记可以见这里： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js

整个Scheduler与 Reconciler 的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

可以看这里 react16 对 Reconciler 的解释：https://zh-hans.legacy.reactjs.org/docs/codebase-overview.html#fiber-reconciler

Reconciler 内部采用了 `Fiber` 的架构。

### Renderer（渲染器）

Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。



### 参考资料 
- https://react.iamkasong.com/preparation/newConstructure.html#react16%E6%9E%B6%E6%9E%84



```js

```
