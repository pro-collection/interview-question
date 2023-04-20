### 18 的新特性

#### 新功能：自动批量处理

批量处理是指 React 将多个状态更新分组到一个重新渲染中，以获得更好的性能。如果没有自动批量处理，我们只对 React 事件处理程序中的更新进行批量处理。默认情况下，React 不会对 Promise、setTimeout、原生事件处理程序或任何其它事件中的更新进行批量处理。有了自动批量处理，这些更新将被自动的批量处理。

```typescript jsx
// 之前：只对 React 事件执行批量处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 将渲染两次，每次状态更新一次（无批量处理）
}, 1000);

// 之后：超时、Promises、本机事件处理程序
// 或任何其他事件内的更新是批处理的。

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会在最终重新渲染一次（这就是批量处理！）
}, 1000);
```

#### 新功能：过渡
过渡是 React 中的一个新概念，用以区分紧急和非紧急更新。

- 紧急更新 反映了直接的交互，如输入、点击、按压等。
- 过渡更新 将 UI 从一个视图过渡到另一个。

像输入、点击或按压这样的紧急更新，需要立即响应，以符合我们对物理对象行为方式的直觉。否则他们就会感到“不对劲儿”。然而，过渡是不同的，因为用户并不期望在屏幕上看到每个中间值。

例如，当你在一个下拉菜单中选择一个过滤器时，你希望过滤器按钮本身在你点击时能立即做出反应。然而，实际结果可能会单独过渡。一个小的延迟将是难以察觉的，而且往往是预期的。并且，如果你在结果渲染完成之前再次改变过滤器，你只关心看到最新的结果。

通常情况下，为了获得最佳的用户体验，一个用户输入应该同时导致一个紧急更新和一个非紧急更新。你可以在输入事件中使用 startTransition API 来告知 React 哪些是紧急更新，哪些是“过渡”：

```typescript jsx
import {startTransition} from 'react';

// 紧急：显示输入的内容
setInputValue(input);

// 将内部的任何状态更新都标记为过渡
startTransition(() => {
  // 过渡：显示结果
  setSearchQuery(input);
});
```

被 startTransition 包裹的更新被当作非紧急事件处理，如有更紧急更新，如点击或按键，则会被中断。如果一个过渡被用户中断（例如，连续输入多个字符），React 会丢弃未完成的无效的渲染，而只渲染最新的更新。

- useTransition：一个启动过渡的 Hook，包括一个值以跟踪待定状态。
- startTransition：当 Hook 不能使用时，一个启动过渡的方法。

过渡将选择并发渲染，这允许更新被中断。如果内容重新挂起，过渡也会告诉 React 继续显示当前内容，同时在后台渲染过渡内容。

#### 新的 Suspense 特性
如果组件树的某一部分还没有准备好被显示，Suspense 可以让你声明式地指定加载状态：

```typescript jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

Suspense 使“UI 加载状态”成为 React 编程模型中的第一类声明式概念。这让我们可以在它上面建立更高层次的功能。

几年前，我们推出了一个有限的 Suspense 版本。然而，唯一支持的用例是用 React.lazy 拆分代码，且在服务端渲染时根本不支持。

在 React 18 中，我们增加了对服务端的 Suspense 支持，并使用并发渲染特性扩展了其功能。

React 18 中的 Suspense 在与过渡 API 结合时效果最好。如果你在过渡期间挂起，React 将防止已经可见的内容被回退取代。相反，React 会延迟渲染，直到有足够的数据加载，以防止出现糟糕的加载状态。


#### 新的客户端、服务端渲染 API
在这个版本中，我们借此机会重新设计了我们为在客户端和服务端渲染所暴露的 API。这些更改允许用户在升级到 React 18 中的新 API 时继续使用 React 17 模式下的旧 API。

**React DOM Client**

这些新的 API 现在从 react-dom/client 导出：

- createRoot：新的创建根的方法，以进行 render 或 unmount。使用它替代 ReactDOM.render。没有它，React 18 的新功能就不能工作。
- hydrateRoot：新的方法用以创建服务端渲染应用。使用它替代 ReactDOM.hydrate 与新的 React DOM 服务端 API 一起使用。没有它，React 18 的新功能就不能工作。

createRoot 和 hydrateRoot 都接受一个新的选项，叫做 onRecoverableError，以防你想在 React render 或 hydrate 从错误恢复时得到通知，以便记录。默认情况下，React会使用 reportError，或在较旧的浏览器中使用 console.error。

**React DOM Server**

这些新的 API 现在从 react-dom/server 导出，并且完全支持服务端的流式 Suspense：

- renderToPipeableStream：用于 Node 环境下的 Stream。
- renderToReadableStream：用于现代边缘运行环境，如 Deno 和 Cloudflare workers。

现有的 renderToString 方法仍然可用，但不鼓励使用。

#### 新的严格模式行为

在未来，我们希望增加一个功能，允许 React 在保留状态的同时增加和删除部分的 UI。例如，当用户从一个屏幕切出并切回时，React 应该能够立即显示之前的屏幕。要做到这一点，React 将使用与之前相同的组件状态来卸载和重新装载树。

这个功能将给 React 应用带来更好的开箱即用的性能，但需要组件对 effect 被多次装载和销毁具有弹性。大多数 effect 会正常工作而无需任何更改，但有些 effect 假设它们只被装载或销毁一次。

为了帮助浮现这些问题，React 18 为严格模式引入了一个新的仅用于开发的检查。每当组件第一次装载时，此检查将自动卸载并重新装载每个组件，并在第二次装载时恢复先前的状态。

在这个变化之前，React 会装载组件并创建 effect：

```
* React 装载组件
  * layout effect 创建
  * effect 创建
```

在 React 18 的严格模式下，React 会在开发模式下模拟卸载和重新装载组件：

```
* React 装载组件
  * layout effect 创建
  * effect 创建
* React 模拟卸载组件
  * layout effect 销毁
  * effect 销毁
* React 模拟装载组件（使用之前的状态）
  * layout effect 创建
  * effect 创建
```

#### 新的 Hook

**useId**

useId 是一个新的 Hook，用于在客户端和服务端上生成唯一 ID，避免 hydrate 不匹配。它主要用于组件库，这些库集成了需要唯一 ID 的可访问性 API。这解决了 React 17 及更低版本中已经存在的问题，但在 React 18 中更为重要，因为新的流式服务端渲染器对 HTML 的无序交付方式。


**useTransition**

useTransition 和 startTransition 让你把一些状态更新标记为不紧急。其他状态更新在默认情况下被认为是紧急的。React 将允许紧急的状态更新（例如，更新一个文本输入）中断非紧急的状态更新（例如，渲染一个搜索结果列表）。


**useDeferredValue**

useDeferredValue 让你推迟重新渲染树的非紧急部分。它类似于 debounce，但与之相比有一些优势。它没有固定的时间延迟，React 会在第一次渲染反映在屏幕后立即尝试延迟渲染。延迟渲染是可中断的，它不会阻塞用户输入。


**useSyncExternalStore**

useSyncExternalStore 是一个新的 Hook，它允许外部存储支持并发读取，通过强制更新到 store 以同步。在实现对外部数据源的订阅时，它消除了对 useEffect 的需求，并被推荐给任何与 React 外部状态集成的库。


**useInsertionEffect**

useInsertionEffect 是一个新的 Hook ，允许 CSS-in-JS 库解决在渲染中注入样式的性能问题。除非你已经建立了一个 CSS-in-JS 库，否则我们不希望你使用它。这个 Hook 将在 DOM 被变更后运行，但在 layout effect 读取新布局之前。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更加重要，因为 React 在并发渲染时向浏览器让步，给它一个重新计算布局的机会。

