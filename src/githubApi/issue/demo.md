**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

### 代数效应的实践

React中做的就是践行代数效应（Algebraic Effects）。

简单点儿来说就是： **用于将副作用从函数调用中分离。**

举例子：                    
比如我们要获取用户的姓名做展示：

```js
const resource = fetchProfileData();

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}
```

代码如上， 但是 resource 是通过异步获取的。 这个时候代码就要改为下面这种形式

```js
const resource = fetchProfileData();

async function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = await resource.user.read();
  return <h1>{user.name}</h1>;
}
```

但是 async/await 是具有传染性的。 这个穿践行就是副作用， 我们不希望有这样的副作用， 尽管里面有异步调用， 不希望这样的副作用传递给外部的函数， 只希望外部的函数是一个纯函数。

### 代数效应在React中的应用

在 react 代码中， 每一个函数式组件， 其实都是一个纯函数， 但是内部里面可能会有各种各样的副作用。 这些副作用就是我们使用的 hooks;

对于类似useState、useReducer、useRef这样的Hook，我们不需要关注FunctionComponent的state在Hook中是如何保存的，React会为我们处理。

我们只需要假设useState返回的是我们想要的state，并编写业务逻辑就行。

可以看官方的 Suspense demo, 可以是通过 Suspense 让内部直接可以同步的方式调用异步代码；                        
代码链接： https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/index.js:152-160
```jsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { fetchProfileData } from "./fakeApi";

const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails />
      <Suspense
        fallback={<h1>Loading posts...</h1>}
      >
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

const rootElement = document.getElementById(
  "root"
);
ReactDOM.createRoot(rootElement).render(
  <ProfilePage />
);
```

### Generator 架构

从React15到React16，协调器（Reconciler）重构的一大目的是：将老的同步更新的架构变为异步可中断更新。

异步可中断更新可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

其实，浏览器原生就支持类似的实现，这就是Generator。

但是Generator的一些缺陷使React团队放弃了他：

- 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重。
- Generator执行的中间状态是上下文关联的。

例如这样的例子：
```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}
```

但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成doExpensiveWorkA与doExpensiveWorkB计算出x与y。

此时B组件接收到一个高优更新，由于Generator执行的中间状态是上下文关联的，所以计算y时无法复用之前已经计算出的x，需要重新计算。

如果通过全局变量保存之前执行的中间状态，又会引入新的复杂度。

### fiber 架构

他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为React Element对应的Fiber节点。



