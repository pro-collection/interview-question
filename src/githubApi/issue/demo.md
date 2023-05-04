
**关键词**：react16 架构、react Reconciler、fiber 时间切片、fiber 时间、react 协调器

### 基本原理

本质上来说就是将渲染任务拆分成多个小任务，以便提高应用程序的响应性和性能。React Fiber 实现时间切片主要依赖于两个核心功能：**任务分割和任务优先级**。

任务分割是指将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。React Fiber 使用 Fiber 节点之间的父子关系，将一个组件树分割成多个”片段“，每个“片段”内部是一颗 Fiber 子树，多个“片段”之间可以交错执行，实现时间切片。

任务优先级是指 React Fiber 提供了一套基于优先级的算法来决定哪些任务应该先执行，哪些任务可以放到后面执行。React Fiber 将任务分成多个优先级级别，较高优先级的任务在进行渲染时会优先进行，从而确保应用程序的响应性和性能。

React Fiber 实现时间切片的基本原理如下：

1. React Fiber 会将渲染任务划分成多个小任务，每个小任务一般只负责一小部分 DOM 更新。
2. React Fiber 将这些小任务保存到任务队列中，并按照优先级进行排序和调度。
3. 当浏览器处于空闲状态时，React Fiber 会从任务队列中取出一个高优先级的任务并执行，直到任务完成或者时间片用完。
4. 如果任务完成，则将结果提交到 DOM 树上并开始下一个任务。如果时间片用完，则将任务挂起，并将未完成的工作保存到 Fiber 树中，返回控制权给浏览器。
5. 当浏览器再次处于空闲状态时，React Fiber 会再次从任务队列中取出未完成的任务并继续执行，直到所有任务完成。

通过使用任务分割和任务优先级算法，React Fiber 实现了时间切片功能，保证了应用程序的响应性和性能，提高了用户的使用体验。

### 是如何实现任务分割的？伪代码实现一下

React Fiber 实现任务分割的过程十分复杂，需要涉及到 Fiber 数据结构、调度器、DOM 操作等多个部分。以下是一个简单的示例代码，演示了 React Fiber 任务分割的基本工作原理。

```jsx
const workInProgressFiber = {};

const performUnitOfWork = () => {
  // 执行当前 Fiber 对应的组件
  const isFunctionComponent = workInProgressFiber.type instanceof Function; 
  if (isFunctionComponent) {
    updateFunctionComponent(workInProgressFiber);
  } else {
    updateHostComponent(workInProgressFiber);
  }

  // 返回下一个待处理的 Fiber 节点
  if (workInProgressFiber.child) {
    return workInProgressFiber.child;
  }

  let nextFiber = workInProgressFiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
};

const render = (element, container) => {
  const rootFiber = {
    dom: container,
    props: {
      children: [element],
    },
  };

  workInProgressFiber = rootFiber;
  nextUnitOfWork = rootFiber;

  requestIdleCallback(workLoop);
};

const workLoop = (deadline) => {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
};

const updateFunctionComponent = (fiber) => {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (fiber, children) => {
  let index = 0;
  let oldFiber = fiber.alternate ? fiber.alternate.child : null;
  let prevSibling = null;

  while (index < children.length || oldFiber) {
    const child = children[index];
    let newFiber = null;
    const sameType = oldFiber && child && child.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        dom: oldFiber.dom,
        parent: fiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }

    if (child && !sameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        dom: null,
        parent: fiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else if (child) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;

    index++;
  }
};
```

在这个示例中，我们定义了一个名为 `performUnitOfWork` 的函数，用于执行一个 Fiber 节点上的任务。这个函数会根据 Fiber 节点的类型，执行不同的操作，并返回下一个待处理的 Fiber 节点。

在 `updateFunctionComponent` 和 `updateHostComponent` 函数中，我们分别根据 Fiber 节点的类型执行函数组件和普通组件的更新操作。通过 `reconcileChildren` 函数，我们可以将一个组件的子节点拆分成多个 Fiber 节点，并在 `performUnitOfWork` 函数中进行遍历和处理。

React Fiber 实现任务分割的核心思想是将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。通过在 Fiber 树上进行遍历和操作，我们可以实现任务分割，提高应用程序的响应性和性能。


### react fiber 是如何实现任务优先级的？用代码简单示范一下

React Fiber 的任务优先级是通过创建多个优先级队列，并使用一个时间片策略来调度任务的。以下是一个简单的示例代码，用于演示 React Fiber 的优先级队列和任务优先级机制。

```jsx
const MAX_PRIORITY_LEVEL = 5;

const NoWork = 0;
const Sync = 1;
const DefaultPriority = 3;
const IdlePriority = 4;
const AnimationPriority = 5;

const initialScheduler = {
  didTimeout: false,
  enqueuedTasks: [],
  scheduledCallback: null,
  scheduledCallbackTimeout: null,
  taskQueue: [],
  currentTime: 0,
};

let currentScheduler = initialScheduler;

const enableScheduler = () => {
  // ...初始化 scheduler 的代码...
};

const requestCallback = (callback, options) => {
  const currentTime = getCurrentTime();
  const timeout = options != null && options.timeout != null ? options.timeout : -1;
  const expirationTime =
    timeout > 0 ? currentTime + timeout : currentTime + 5 * 1000;
  const newTask = {
    callback,
    priorityLevel: DefaultPriority,
    startTime: currentTime,
    expirationTime,
  };

  currentScheduler.taskQueue.push(newTask);
  ensureHostCallbackIsScheduled();
};

const ensureHostCallbackIsScheduled = () => {
  if (currentScheduler.scheduledCallback === null) {
    currentScheduler.scheduledCallback = performSchedulerWork;
    currentScheduler.scheduledCallbackTimeout = setTimeout(() => {
      performSchedulerWork(currentTime);
    }, 0);
  }
};

const performSchedulerWork = (currentTime) => {
  performConcurrentWorkOnRoots();

  if (currentScheduler.taskQueue.length > 0) {
    const firstTask = currentScheduler.taskQueue[0];
    if (firstTask.startTime <= currentTime) {
      currentScheduler.taskQueue.shift();
      firstTask.callback({ didTimeout: false });
      return;
    }
  }
};

const performConcurrentWorkOnRoots = () => {
  const priorityLevel = AnimationPriority;
  const deadline = {
    timeRemaining() {
      return Infinity;
    },
  };
  while (currentScheduler.taskQueue.length > 0) {
    const task = findHighestPriorityTask();
    if (task.priorityLevel > priorityLevel || task.expirationTime <= currentScheduler.currentTime) {
      break;
    }
    const root = task.callback(deadline);

    if (root !== null) {
      // ...执行任务更新...
    }
  }
};

const findHighestPriorityTask = () => {
  let highestPriorityTask = null;
  let highestPriorityLevel = NoWork;

  for (let i = 0; i < currentScheduler.taskQueue.length; i++) {
    const task = currentScheduler.taskQueue[i];
    const priorityLevel = task.priorityLevel;
    if (priorityLevel > highestPriorityLevel) {
      highestPriorityLevel = priorityLevel;
      highestPriorityTask = task;
    }
  }

  return highestPriorityTask;
};
```

在这个示例中，我们定义了多个优先级常量和优先级队列，以及与之相关的一些变量和函数。我们通过 `requestCallback` 函数，将任务以优先级的方式插入到任务队列中。在 `performConcurrentWorkOnRoots` 函数中，我们按照优先级顺序遍历任务队列，并将任务的回调函数传递给 `callback` 函数执行更新操作。

通过在任务队列和调度器中使用优先级的方式来调度和执行任务，我们可以在保证页面响应性的同时，最大化利用浏览器的空闲时间，提高应用程序整体的性能和用户体验。

