### 路由数据

React Router 是一个用于管理前端路由的库，它与 React 应用程序集成在一起，提供了一种在单页面应用中处理路由的方式。React Router 并没有直接提供数据存储的功能，它主要负责路由的匹配和导航。

在 React Router 中，路由相关的数据主要存储在组件的 props 和组件的状态中。以下是一些常见的数据存储方式：

1. 路由参数（Route Parameters）：
   React Router 允许通过路径参数（如 `/users/:id`）传递参数给路由组件。这些参数可以通过 `props.match.params` 对象在路由组件中获取。路由参数通常用于标识唯一资源的ID或其他需要动态变化的数据。

2. 查询参数（Query Parameters）：
   查询参数是通过 URL 查询字符串传递的键值对数据，如 `/users?id=123&name=John`。React Router 可以通过 `props.location.search` 属性获取查询字符串，并通过解析库（如 `query-string`）将其转换为 JavaScript 对象。查询参数通常用于筛选、分页或其他需要传递额外数据的场景。

3. 路由状态（Route State）：
   在某些情况下，可能需要将一些状态信息传递给路由组件，例如从一个页面跳转到另一个页面时需要携带一些额外的状态。React Router 提供了 `props.location.state` 属性，可以用于存储和传递路由状态。

4. 上下文（Context）：
   React Router 提供了一个 `Router` 组件，可以使用 React 的上下文功能共享路由相关的数据。通过在 `Router` 组件的上下文中提供数据，可以在路由组件中访问该数据，而无需通过 props 层层传递。这在需要在多个嵌套层级中访问路由数据时非常方便。

总的来说，React Router 并没有专门的数据存储机制，它主要利用 React 组件的 props 和状态来传递和存储路由相关的数据。这些数据可以通过路由参数、查询参数、路由状态以及上下文等方式来传递和获取。根据具体的需求和场景，可以选择适合的方式来存储和管理路由相关的数据。


### 路由状态是如何存储的

在 React Router 中，路由状态可以通过 `props.location.state` 属性来存储和获取。

当使用 React Router 进行页面导航时，可以通过 `history.push` 或 `history.replace` 方法传递一个包含状态数据的对象作为第二个参数。例如：

```jsx
history.push('/dashboard', { isLoggedIn: true, username: 'John' });
```

这个对象会被存储在新页面的 `props.location.state` 中，可以在目标页面的组件中通过 `props.location.state` 来访问它。例如：

```jsx
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { isLoggedIn, username } = location.state;

  // 使用路由状态数据
  // ...
}
```

需要注意的是，路由状态仅在通过 `history.push` 或 `history.replace` 导航到新页面时才可用。如果用户通过浏览器的前进/后退按钮进行导航，或者直接输入 URL 地址访问页面，路由状态将不会被保留。

另外，路由状态也可以在类组件中通过 `this.props.location.state` 进行访问，或者在函数组件中使用 `props.location.state`。


### props.location.state 数据是如何存储的

在 React Router 中，路由状态数据实际上是存储在客户端的内存中。

当使用 `history.push` 或 `history.replace` 方法导航到一个新页面时，React Router 将路由状态数据作为对象附加到浏览器历史记录中的对应路由条目。这个对象会存储在浏览器的会话历史中，并在新页面加载时被 React Router 读取并提供给组件。

具体地说，React Router 使用 HTML5 的 History API（`pushState` 或 `replaceState` 方法）来实现路由导航，并将路由状态数据作为一个特殊的字段存储在历史记录中。这个字段通常被称为 `state` 字段，用于存储路由状态数据。

在浏览器中，历史记录和相应的状态数据会被保存在内存中。当用户进行前进、后退或直接访问某个 URL 时，浏览器会根据历史记录加载对应的页面，并将相关的状态数据提供给 React Router。这样，组件就能够通过 `props.location.state` 来访问之前存储的路由状态数据。

需要注意的是，路由状态数据仅在客户端内存中存在，每个用户的路由状态是独立的。如果用户刷新页面或关闭浏览器，路由状态数据将丢失，并需要重新通过导航操作来设置。因此，路由状态适合存储短期或临时的数据，而对于长期或持久化的数据，应该考虑其他的数据存储方式，如服务器端存储或状态管理库。
