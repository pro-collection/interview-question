**关键词**：react16 架构、react Reconciler、react commit 阶段、react 协调器

commitRoot方法是commit阶段工作的起点。fiberRootNode会作为传参。 `commitRoot(root);`

如何走到 commit 阶段的， 可以参考这个文档：https://github.com/pro-collection/interview-question/issues/324

在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList，这些Fiber节点的updateQueue中保存了变化的props。

这些副作用对应的DOM操作在commit阶段执行。

除此之外，一些生命周期钩子（比如componentDidXXX）、hook（比如useEffect）需要在commit阶段执行。

commit阶段的主要工作（即Renderer的工作流程）分为三部分：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

你可以从这里看到commit阶段的完整代码： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001

在before mutation阶段之前和layout阶段之后还有一些额外工作，涉及到比如useEffect的触发、优先级相关的重置、ref的绑定/解绑。

### before mutation之前

`commitRootImpl`方法中直到第一句`if (firstEffect !== null)`之前属于`before mutation之前`。

我们大体看下他做的工作，现在你还不需要理解他们：

```ts
do {
    // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  // root指 fiberRootNode
  // root.finishedWork指当前应用的rootFiber
  const finishedWork = root.finishedWork;

  // 凡是变量名带lane的都是优先级相关
  const lanes = root.finishedLanes;
  if (finishedWork === null) {
    return null;
  }
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  // 重置Scheduler绑定的回调函数
  root.callbackNode = null;
  root.callbackId = NoLanes;

  let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
  // 重置优先级相关变量
  markRootFinished(root, remainingLanes);

  // 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
  if (rootsWithPendingDiscreteUpdates !== null) {
    if (
      !hasDiscreteLanes(remainingLanes) &&
      rootsWithPendingDiscreteUpdates.has(root)
    ) {
      rootsWithPendingDiscreteUpdates.delete(root);
    }
  }

  // 重置全局变量
  if (root === workInProgressRoot) {
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } else {
  }

  // 将effectList赋值给firstEffect
  // 由于每个fiber的effectList只包含他的子孙节点
  // 所以根节点如果有effectTag则不会被包含进来
  // 所以这里将有effectTag的根节点插入到effectList尾部
  // 这样才能保证有effect的fiber都在effectList中
  let firstEffect;
  if (finishedWork.effectTag > PerformedWork) {
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // 根节点没有effectTag
    firstEffect = finishedWork.firstEffect;
  }
```

可以看到，before mutation之前主要做一些变量赋值，状态重置的工作。

这一长串代码我们只需要关注最后赋值的firstEffect，在commit的三个子阶段都会用到他。

### layout之后
接下来让我们简单看下layout阶段执行完后的代码，现在你还不需要理解他们：

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
} else {}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
} 

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now());

// ...处理未捕获错误及老版本遗留的边界问题


// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue();

return null;
```

主要包括三点内容：

1. useEffect相关的处理。

2. 性能追踪相关。
源码里有很多和interaction相关的变量。他们都和追踪React渲染时间、性能相关，在Profiler API 和DevTools 中使用。
   
3. 在commit阶段会触发一些生命周期钩子（如 componentDidXXX）和hook（如useLayoutEffect、useEffect）。


### before mutation 阶段

Renderer工作的阶段被称为commit阶段。commit阶段可以分为三个子阶段：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

本节我们看看before mutation阶段（执行DOM操作前）都做了什么。

#### 概览
before mutation阶段的代码很短，整个过程就是遍历effectList并调用commitBeforeMutationEffects函数处理。

```ts
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority();
setCurrentUpdateLanePriority(SyncLanePriority);

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext;
executionContext |= CommitContext;

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo);
shouldFireAfterActiveInstanceBlur = false;

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork);

focusedInstanceHandle = null;
```

我们重点关注beforeMutation阶段的主函数commitBeforeMutationEffects做了什么。

#### commitBeforeMutationEffects

```ts
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

整体可以分为三部分：

- 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。

- 调用getSnapshotBeforeUpdate生命周期钩子。

- 调度useEffect。

#### 调用 getSnapshotBeforeUpdate

commitBeforeMutationEffectOnFiber是commitBeforeMutationLifeCycles的别名。

在该方法内会调用getSnapshotBeforeUpdate。

从Reactv16开始，componentWillXXX钩子前增加了UNSAFE_前缀。

究其原因，是因为Stack Reconciler重构为Fiber Reconciler后，render阶段的任务可能中断/重新开始，对应的组件在render阶段的生命周期钩子（即componentWillXXX）可能触发多次。

这种行为和Reactv15不一致，所以标记为UNSAFE_。

更详细的解释参照这里(opens new window)

为此，React提供了替代的生命周期钩子getSnapshotBeforeUpdate。

我们可以看见，getSnapshotBeforeUpdate是在commit阶段内的before mutation阶段调用的，由于commit阶段是同步的，所以不会遇到多次调用的问题。

#### 调度useEffect
在这几行代码内，scheduleCallback方法由Scheduler模块提供，用于以某个优先级异步调度一个回调函数。

```ts
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true;
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects();
      return null;
    });
  }
}
```

在此处，被异步调度的回调函数就是触发useEffect的方法flushPassiveEffects。

我们接下来讨论useEffect如何被异步调度，以及为什么要异步（而不是同步）调度。

#### 如何异步调度

在flushPassiveEffects方法内部会从全局变量rootWithPendingPassiveEffects获取effectList。

关于flushPassiveEffects的具体讲解参照useEffect与useLayoutEffect一节

在completeWork一节我们讲到，effectList中保存了需要执行副作用的Fiber节点。其中副作用包括

- 插入DOM节点（Placement）
- 更新DOM节点（Update）
- 删除DOM节点（Deletion）

除此外，当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值effectTag。

在flushPassiveEffects方法内部会遍历rootWithPendingPassiveEffects（即effectList）执行effect回调函数。

如果在此时直接执行，rootWithPendingPassiveEffects === null。

那么rootWithPendingPassiveEffects会在何时赋值呢？

在上一节layout之后的代码片段中会根据rootDoesHavePassiveEffects === true?决定是否赋值rootWithPendingPassiveEffects。

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
}
```

**所以整个useEffect异步调用分为三步**：

- `before mutation`阶段在`scheduleCallback`中调度`flushPassiveEffects`
- `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
- `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`

#### 为什么需要异步调用

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

可见，useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染。

### mutation阶段

终于到了执行DOM操作的mutation阶段。

#### 概览
类似before mutation阶段，mutation阶段也是遍历effectList，执行函数。这里执行的是commitMutationEffects。

```ts
nextEffect = firstEffect;
do {
  try {
      commitMutationEffects(root, renderPriorityLevel);
    } catch (error) {
      invariant(nextEffect !== null, 'Should be working on an effect.');
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    }
} while (nextEffect !== null);
```

#### commitMutationEffects
代码如下：
```ts
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect);

        nextEffect.effectTag &= ~Placement;

        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```


commitMutationEffects会遍历effectList，对每个Fiber节点执行如下三个操作：

- 根据ContentReset effectTag重置文字节点
- 更新ref
- 根据effectTag分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)

我们关注步骤三中的`Placement | Update | Deletion`。Hydrating作为服务端渲染相关，我们先不关注。

#### Placement effect
当Fiber节点含有Placement effectTag，意味着该Fiber节点对应的DOM节点需要插入到页面中。

调用的方法为commitPlacement。

该方法所做的工作分为三步：

1. 获取父级DOM节点。其中finishedWork为传入的Fiber节点。
```ts
const parentFiber = getHostParentFiber(finishedWork);
// 父级DOM节点
const parentStateNode = parentFiber.stateNode;
```

2. 获取Fiber节点的DOM兄弟节点
```ts
获取Fiber节点的DOM兄弟节点
```

3. 根据DOM兄弟节点是否存在决定调用parentNode.insertBefore或parentNode.appendChild执行DOM插入操作。
```ts
// parentStateNode是否是rootFiber
if (isContainer) {
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent);
}
```

值得注意的是，getHostSibling（获取兄弟DOM节点）的执行很耗时，当在同一个父Fiber节点下依次执行多个插入操作，getHostSibling算法的复杂度为指数级。

这是由于Fiber节点不只包括HostComponent，所以Fiber树和渲染的DOM树节点并不是一一对应的。要从Fiber节点找到DOM节点很可能跨层级遍历。

```tsx
function Item() {
  return <li><li>;
}

function App() {
  return (
    <div>
      <Item/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

对应的Fiber树和DOM树结构为：
```
// Fiber树
          child      child      child       child
rootFiber -----> App -----> div -----> Item -----> li

// DOM树
#root ---> div ---> li
```

当在div的子节点Item前插入一个新节点p，即App变为：

```tsx
function App() {
  return (
    <div>
      <p></p>
      <Item/>
    </div>
  )
}
```

对应的Fiber树和DOM树结构为：

```
// Fiber树
          child      child      child
rootFiber -----> App -----> div -----> p 
                                       | sibling       child
                                       | -------> Item -----> li 
// DOM树
#root ---> div ---> p
             |
               ---> li
```

此时DOM节点 p的兄弟节点为li，而Fiber节点 p对应的兄弟DOM节点为： `fiberP.sibling.child`

即fiber p的兄弟fiber Item的子fiber li

#### Update effect

当Fiber节点含有Update effectTag，意味着该Fiber节点需要更新。调用的方法为commitWork，他会根据Fiber.tag分别处理。

这里我们主要关注FunctionComponent和HostComponent。

#### FunctionComponent mutation

当fiber.tag为FunctionComponent，会调用commitHookEffectListUnmount。该方法会遍历effectList，执行所有useLayoutEffect hook的销毁函数。

所谓“销毁函数”，见如下例子
```ts
useLayoutEffect(() => {
  // ...一些副作用逻辑

  return () => {
    // ...这就是销毁函数
  }
})
```

你不需要很了解useLayoutEffect，我们会在下一节详细介绍。你只需要知道在mutation阶段会执行useLayoutEffect的销毁函数。

#### HostComponent mutation

当fiber.tag为HostComponent，会调用commitUpdate。

最终会在updateDOMProperties (opens new window)中将render阶段 completeWork (opens new window)中为Fiber节点赋值的updateQueue对应的内容渲染在页面上。

```ts
for (let i = 0; i < updatePayload.length; i += 2) {
  const propKey = updatePayload[i];
  const propValue = updatePayload[i + 1];

  // 处理 style
  if (propKey === STYLE) {
    setValueForStyles(domElement, propValue);
  // 处理 DANGEROUSLY_SET_INNER_HTML
  } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    setInnerHTML(domElement, propValue);
  // 处理 children
  } else if (propKey === CHILDREN) {
    setTextContent(domElement, propValue);
  } else {
  // 处理剩余 props
    setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
  }
}
```

#### Deletion effect

当Fiber节点含有Deletion effectTag，意味着该Fiber节点对应的DOM节点需要从页面中删除。调用的方法为commitDeletion。

该方法会执行如下操作：

- 递归调用Fiber节点及其子孙Fiber节点中fiber.tag为ClassComponent的componentWillUnmount (opens new window)生命周期钩子，从页面移除Fiber节点对应DOM节点
- 解绑ref
- 调度useEffect的销毁函数

### layout阶段

该阶段之所以称为layout，因为该阶段的代码都是在DOM渲染完成（mutation阶段完成）后执行的。

该阶段触发的生命周期钩子和hook可以直接访问到已经改变后的DOM，即该阶段是可以参与DOM layout的阶段。

与前两个阶段类似，layout阶段也是遍历effectList，执行函数。

具体执行的函数是commitLayoutEffects。


#### commitLayoutEffects

commitLayoutEffects一共做了两件事：

1. commitLayoutEffectOnFiber（调用生命周期钩子和hook相关操作）

2. commitAttachRef（赋值 ref）

#### commitLayoutEffectOnFiber

commitLayoutEffectOnFiber方法会根据fiber.tag对不同类型的节点分别处理。

- 对于ClassComponent，他会通过current === null?区分是mount还是update，调用componentDidMount (opens new window)或componentDidUpdate

触发状态更新的this.setState如果赋值了第二个参数回调函数，也会在此时调用。

- 对于FunctionComponent及相关类型，他会调用useLayoutEffect hook的回调函数，调度useEffect的销毁与回调函数

相关类型指特殊处理后的FunctionComponent，比如ForwardRef、React.memo包裹的FunctionComponent

mutation阶段会执行useLayoutEffect hook的销毁函数。

结合这里我们可以发现，useLayoutEffect hook从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的。

而useEffect则需要先调度，在Layout阶段完成后再异步执行。

这就是useLayoutEffect与useEffect的区别。

- 对于HostRoot，即rootFiber，如果赋值了第三个参数回调函数，也会在此时调用。

#### commitAttachRef

commitLayoutEffects会做的第二件事是commitAttachRef。

代码逻辑很简单：获取DOM实例，更新ref。

#### current Fiber树切换

至此，整个layout阶段就结束了。




