### hooks 的实现原理

流程图如下：renderWithHooks 根据current来判断当前是首次渲染还是更新。 hooks加载时调用对应的mount函数，更新时调用对应的update函数。
hooks生成单向链表，通过next连接，最后一个next指向null。 state hooks会生成update循环链表， effects会生成另外一个effectList循环链表。

![1](https://foruda.gitee.com/images/1681657264167974980/cc160847_7819612.png)

### renderWithHooks

react-reconciler/src/ReactFiberHooks.js

```jsx
// renderWithHooks中判断是否是首次渲染
function renderWithHooks(current, workInProgress, Component, props, nextRenderLanes) {

  //当前正在渲染的车道
  renderLanes = nextRenderLanes
  currentlyRenderingFiber = workInProgress;
  //函数组件更新队列里存的effect
  workInProgress.updateQueue = null;
  //函数组件状态存的hooks的链表
  workInProgress.memoizedState = null;
  //如果有老的fiber,并且有老的hook链表
  if (current !== null && current.memoizedState !== null) {
    ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
  } else {
    ReactCurrentDispatcher.current = HooksDispatcherOnMount;
  }

//需要要函数组件执行前给ReactCurrentDispatcher.current赋值

  const children = Component(props);
  currentlyRenderingFiber = null;
  workInProgressHook = null;
  currentHook = null;
  renderLanes = NoLanes;
  return children;
}
```

`HooksDispatcherOnMount和HooksDispatcherOnUpdate`对象分别存放hooks的挂载函数和更新函数

### hooks的注册

```typescript jsx

function resolveDispatcher() {
  return ReactCurrentDispatcher.current;
}

/**
 *
 * @param {*} reducer 处理函数，用于根据老状态和动作计算新状态
 * @param {*} initialArg 初始状态
 */

export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

![2](https://foruda.gitee.com/images/1681657383246656482/6dc99736_7819612.png)

```typescript jsx


/**
 * 构建新的hooks， 其主要作用是在 Fiber 树中遍历到某个组件时，
 * 根据该组件的类型和当前处理阶段（mount 或 update），处理该组件的 Hook 状态。
 */
function updateWorkInProgressHook() {
  //获取将要构建的新的hook的老hook
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    currentHook = current.memoizedState;
  } else {
    currentHook = currentHook.next;
  }
  //根据老hook创建新hook
  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue,
    next: null,
    baseState: currentHook.baseState,
    baseQueue: currentHook.baseQueue
  }
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
  } else {
    workInProgressHook = workInProgressHook.next = newHook;
  }
  return workInProgressHook;
}

```

### useState 实现

接收一个初始状态值，返回一个数组，包含当前状态值和更新状态值的方法。可以通过调用更新方法来改变状态值，并触发组件的重新渲染

```typescript
//useState其实就是一个内置了reducer的useReducer

/**
 * hook的属性
 * hook.memoizedState 当前 hook真正显示出来的状态
 * hook.baseState 第一个跳过的更新之前的老状态
 * hook.queue.lastRenderedState 上一个计算的状态
 */

function mountState(initialState) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = hook.baseState = initialState;
  const queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: baseStateReducer,//上一个reducer
    lastRenderedState: initialState//上一个state
  }
  hook.queue = queue;
  const dispatch = (queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue));
  return [hook.memoizedState, dispatch];
}

function dispatchSetState(fiber, queue, action) {
  // 获取当前的更新赛道 1
  const lane = requestUpdateLane();
  const update = {
    lane,//本次更新优先级就是1
    action,
    hasEagerState: false,//是否有急切的更新
    eagerState: null,//急切的更新状态
    next: null
  }
  const alternate = fiber.alternate;

  //当你派发动作后，我立刻用上一次的状态和上一次的reducer计算新状态
  //只要第一个更新都能进行此项优化
  if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes == NoLanes)) {
    //先获取队列上的老的状态和老的reducer
    const { lastRenderedReducer, lastRenderedState } = queue;
    //使用上次的状态和上次的reducer结合本次action进行计算新状态
    const eagerState = lastRenderedReducer(lastRenderedState, action);
    update.hasEagerState = true;
    update.eagerState = eagerState;
    if (Object.is(eagerState, lastRenderedState)) {
      return;
    }
  }
  //下面是真正的入队更新，并调度更新逻辑
  const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
  const eventTime = requestEventTime();
  scheduleUpdateOnFiber(root, fiber, lane, eventTime);
}

//useState其实就是一个内置了reducer的useReducer
function baseStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}

function updateState(initialState) {
  return updateReducer(baseStateReducer, initialState);
}

function updateReducer(reducer) {
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  queue.lastRenderedReducer = reducer;
  const current = currentHook;
  let baseQueue = current.baseQueue;
  const pendingQueue = queue.pending;

  //把新旧更新链表合并
  if (pendingQueue !== null) {
    if (baseQueue !== null) {
      const baseFirst = baseQueue.next;
      const pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  if (baseQueue !== null) {
    const first = baseQueue.next;
    let newState = current.baseState;
    let newBaseState = null;
    let newBaseQueueFirst = null;
    let newBaseQueueLast = null;
    let update = first;
    do {
      const updateLane = update.lane;
      const shouldSkipUpdate = !isSubsetOfLanes(renderLanes, updateLane);
      if (shouldSkipUpdate) {
        const clone = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null,
        };

        //  省略部分代码

        hook.memoizedState = newState;
        hook.baseState = newBaseState;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = newState;
      }
      if (baseQueue === null) {
        queue.lanes = NoLanes;
      }
      const dispatch = queue.dispatch;
      return [hook.memoizedState, dispatch];
    }
```
