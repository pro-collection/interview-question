**关键词**：react 和 react-dom 关系

`react` 和 `react-dom` 是两个与 React 生态系统密切相关的 npm 包，它们在使用 React 构建用户界面时扮演不同的角色：

### `react`

- `react` 包含了构建 React 组件所必需的核心功能，例如创建组件类（如 `React.Component`），创建元素（如使用 `React.createElement`），还有新的 React 16+ 特性中的 Hooks（如 `useState` 和 `useEffect`）。
- 它提供了组件生命周期管理、组件状态管理以及 React 元素（用于描述 UI 长相的对象）的创建。
- `react` 实现了 React 的核心算法，包括对组件状态的更新以及虚拟 DOM 的概念。
- 简而言之，`react` 包对于任何使用 React 的应用程序都是一个必需的依赖，无论该应用程序是运行在浏览器还是其他环境中。

### `react-dom`

- `react-dom` 提供了一些让 React 能够与 DOM 互动的方法。在浏览器中，它把 React 组件渲染到真实的 DOM 节点上，并且处理用户的交互（如点击、输入等事件）。
- 主要的方法是 `ReactDOM.render()`，它将 React 组件或者元素渲染到指定的 DOM 容器中。在 React 18+ 中，这个角色由 `ReactDOM.createRoot().render()` 接手。
- 如果你在使用服务端渲染（Server-Side Rendering, SSR），那么你会使用 `react-dom/server` 中的方法，如 `ReactDOMServer.renderToString()` 或 `ReactDOMServer.renderToStaticMarkup()`。这些方法允许你把 React 组件渲染成初始的 HTML 字符串。
- 当 React 组件需要被集成到现有的非 React 应用中，或者需要执行如测试和服务端渲染等操作时，通常需要使用 `react-dom` 包。

### 它们之间的关系

React 使用了所谓的“适配器模式”（Adapter Pattern），`react` 包提供平台独立的解决方案，而像 `react-dom` 这样的包则提供针对特定平台的方法。这允许 React 的核心能够被跨平台使用，例如在浏览器（通过 `react-dom`）、移动设备（通过 React Native 的 `react-native`）、VR 设备（通过 `react-vr`）等。

当你在浏览器中构建 React 应用程序时，你通常会同时安装并使用这两个包。在引导你的应用程序时，你将使用 `react` 包来定义你的组件，然后用 `react-dom` 包将你的顶层组件渲染到页面中的 DOM 元素上。这样的分离也为服务器端渲染或在其他渲染目标上使用 React 打下了基础。
