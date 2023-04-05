### 什么是 Long Tasks
主线程一次只能处理一个任务（任务按照队列执行）。**当任务超过某个确定的点时，准确的说是50毫秒，就会被称为长任务(Long Task)**。当长任务在执行时，如果用户想要尝试与页面交互或者一个重要的渲染更新需要重新发生，那么浏览器会等到Long Task执行完之后，才会处理它们。结果就会导致交互和渲染的延迟

所以从以上信息可以得知，如果存在Long Task，那么对于我们Load（加载时）和Runtime（运行时）的性能都有影响

阻塞主线程达 50 毫秒或以上的任务会导致以下问题：            
- 可交互时间 延迟
- 严重不稳定的交互行为 (轻击、单击、滚动、滚轮等) 延迟（High/variable input latency）
- 严重不稳定的事件回调延迟（High/variable event handling latency）
- 紊乱的动画和滚动（Janky animations and scrolling）


任何连续不间断的且主 UI 线程繁忙 50 毫秒及以上的时间区间。比如以下常规场景：
- 长耗时的事件回调（long running event handlers）
- 代价高昂的回流和其他重绘（expensive reflows and other re-renders）
- 浏览器在超过 50 毫秒的事件循环的相邻循环之间所做的工作（work the browser does between different turns of the event loop that exceeds 50 ms）


### 任务管理策略
软件架构中有时候会将一个任务拆分成多个函数，这不仅能增强代码可读性，也让项目更容易维护，当然这样也更容易写测试。
```js
function saveSettings () {
  validateForm();
  showSpinner();
  saveToDatabase();
  updateUI();
  sendAnalytics();
}
```

在上面的例子中，该函数saveSettings调用了另外5个函数，包括验证表单、展示加载的动画、发送数据到后端等。理论上讲，这是很合理的架构。如果需调试这些功能，也只需要在项目中查找每个函数即可。
然而，这样也有问题，就是js并不是为每个方法开辟一个单独的任务，因为这些方法都包含在saveSetting这个函数中，**也就是说这五个方法在一个任务中执行**          
saveSetting这个函数调用5个函数，这个函数的执行看起来就像一个特别长的长的任务。

### 如何解决 Long Tasks
那解决Long Task的方式有如下几种：

- 使用setTimeout分割任务
- 使用async/await分割任务
- isInputPending
- 专门编排优先级的api: Scheduler.postTask()
- 使用 web worker，处理逻辑复杂的计算


#### SetTimeout
setTimeout本身就是个Task。假如我们给某个函数加上setTimeout，是不是就可以将某个任务分离出去，成为单独的Task了。
延迟了回调的执行，而且使用该方法，即便是将delay时间设定成0，也是有效的。
```js
function saveSettings () {
  // Do critical work that is user-visible:
  validateForm();
  showSpinner();
  updateUI();

  // Defer work that isn't user-visible to a separate task:
  setTimeout(() => {
    saveToDatabase();
    sendAnalytics();
  }, 0);
}
```

并不是所有场景都能使用这个方法。比如，如需要在循环中处理大数据量的数据，这个任务的耗时可能就会非常长（假设有数百万的数据量）


#### 使用async、await来创造让步点
分解任务后，按照浏览器内部的优先级别划分，其他的任务可能优先级别调整的会更高。一种让步于主线程的方式是配合用了setTimeout的promise。

```js
function yieldToMain () {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}
```

在saveSettings的函数中，可以在每次await函数yieldToMain后让步于主线程：

```js
async function saveSettings () {
  // Create an array of functions to run:
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ]

  // Loop over the tasks:
  while (tasks.length > 0) {
    // Shift the first task off the tasks array:
    const task = tasks.shift();

    // Run the task:
    task();

    // Yield to the main thread:
    await yieldToMain();
  }
}
```

#### isInputPending
假如有一堆的任务，但是只想在用户交互的时候才让步，该怎么办？正好有这种api--`isInputPending`

isInputPending这个函数可以在任何时候调用，它能判断用户是否要与页面元素进行交互。调用isInputPending会返回布尔值，true代表要与页面元素交互，false则不交互。

比如说，任务队列中有很多任务，但是不想阻挡用户输入，使用isInputPending和自定义方法yieldToMain方法，就能够保证用户交互时的input不会延迟。

```js
async function saveSettings () {
  // 函数队列
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ];
  
  while (tasks.length > 0) {
    // 让步于用户输入
    if (navigator.scheduling.isInputPending()) {
      // 如果有用户输入在等待，则让步
      await yieldToMain();
    } else {
      // Shift the the task out of the queue:
      const task = tasks.shift();

      // Run the task:
      task();
    }
  }
}
```
使用isInputPending配合让步的策略，能让浏览器有机会响应用户的重要交互，这在很多情况下，尤其是很多执行很多任务时，能够提高页面对用户的响应能力。

另一种使用isInputPending的方式，特别是担心浏览器不支持该策略，就可以使用另一种结合时间的方式。
```js
async function saveSettings () {
  // A task queue of functions
  const tasks = [    validateForm,    showSpinner,    saveToDatabase,    updateUI,    sendAnalytics  ];
  
  let deadline = performance.now() + 50;

  while (tasks.length > 0) {
    // Optional chaining operator used here helps to avoid
    // errors in browsers that don't support `isInputPending`:
    if (navigator.scheduling?.isInputPending() || performance.now() >= deadline) {
      // There's a pending user input, or the
      // deadline has been reached. Yield here:
      await yieldToMain();

      // Extend the deadline:
      deadline += 50;

      // Stop the execution of the current loop and
      // move onto the next iteration:
      continue;
    }

    // Shift the the task out of the queue:
    const task = tasks.shift();

    // Run the task:
    task();
  }
}
```

#### 专门编排优先级的api: Scheduler.postTask()
可以参考文档： https://developer.mozilla.org/en-US/docs/Web/API/Scheduler

postTask允许更细粒度的编排任务，该方法能让浏览器编排任务的优先级，以便地优先级别的任务能够让步于主线程。目前postTask使用promise，接受优先级这个参数设定。

postTask方法有三个优先级别：

- `background级`，适用于优先级别最低的任务
- `user-visible级`，适用于优先级别中等的任务，如果没有入参，也是该函数的默认参数。
- `user-blocking级`，适用于优先级别最高的任务。

拿下面的代码来举例，postTask在三处分别都是最高优先级别，其他的另外两个任务优先级别都是最低。

```js
function saveSettings () {
  // Validate the form at high priority
  scheduler.postTask(validateForm, {priority: 'user-blocking'});

  // Show the spinner at high priority:
  scheduler.postTask(showSpinner, {priority: 'user-blocking'});

  // Update the database in the background:
  scheduler.postTask(saveToDatabase, {priority: 'background'});

  // Update the user interface at high priority:
  scheduler.postTask(updateUI, {priority: 'user-blocking'});

  // Send analytics data in the background:
  scheduler.postTask(sendAnalytics, {priority: 'background'});
};
```
在上面例子中，通过这些任务的优先级的编排方式，能让高浏览器级别的任务，比如用户交互等得以触发。

提醒：                 
postTask 并不是所有浏览器都支持。可以检测是否空，或者考虑使用polyfill。


#### web worker
web worker是运行在Main线程之外的一个线程，叫做worker线程。我们可以把一些计算量大的任务放到worker中去处理

主线程上的所有Long Task都消失了，复杂的计算都到单独的worker线程去处理了。但是workder线程仍然存在Long Task，不过没有关系，只要主线程没有Long Task，那就不影响构建、渲染了。



### 参考文档
- https://zhuanlan.zhihu.com/p/606276325
- https://juejin.cn/post/7159807927908302884
- https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceLongTaskTiming

