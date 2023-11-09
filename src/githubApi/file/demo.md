**关键词**：路由守卫

在 React 中，虽然没有内置的路由守卫（Route Guards）功能，但可以使用第三方库来实现类似的功能。最常用的第三方路由库是 React Router。

React Router 提供了一些组件和钩子函数，可以用于在路由导航过程中进行拦截和控制。

1. `<Route>` 组件：可以在路由配置中定义特定路由的守卫逻辑。例如，可以设置 `render` 属性或者 `component` 属性来渲染组件，并在渲染前进行守卫逻辑的判断。

2. `useHistory` 钩子：可以获取当前路由的历史记录，并通过 `history` 对象进行路由导航的控制。可以使用 `history` 对象的 `push`、`replace` 方法来切换路由，并在切换前进行守卫逻辑的判断。

3. `useLocation` 钩子：可以获取当前的路由位置信息，包括路径、查询参数等。可以根据这些信息进行守卫逻辑的判断。

下面是一个使用 React Router 实现路由守卫的示例：

```javascript
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  const isAuthenticated = () => {
    // 判断用户是否已登录
    return true;
  };

  const requireAuth = (Component) => {
    return () => {
      if (isAuthenticated()) {
        return <Component />;
      } else {
        history.push("/login");
        return null;
      }
    };
  };

  return (
    <Router>
      <Route path="/home" render={requireAuth(Home)} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" render={requireAuth(Dashboard)} />
    </Router>
  );
}
```

在上述示例中，`requireAuth` 是一个自定义的函数，用于判断是否需要进行权限校验。在 `render` 属性中，我们调用 `requireAuth` 函数包裹组件，根据用户是否已登录来判断是否渲染该组件。如果用户未登录，则使用 `history.push` 方法进行路由跳转到登录页面。

通过使用 React Router 提供的组件和钩子函数，我们可以实现类似于路由守卫的功能，进行路由的拦截和控制。

**参考文档**
- https://juejin.cn/post/7177374176141901861
- https://juejin.cn/post/7253001747542720567
