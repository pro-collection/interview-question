**关键词**：React 路由、React 路由监听

在 React 中，你可以使用 React Router 库来进行路由变化的监听。React Router 是 React 的一个常用路由库，它提供了一组组件和 API 来帮助你在应用中管理路由。

下面是一个示例代码，演示如何使用 React Router 监听路由的变化：

然后，在你的 React 组件中，使用 BrowserRouter 或 HashRouter 组件包裹你的应用：

```jsx
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
  return (
    // 使用 BrowserRouter 或 HashRouter 包裹你的应用
    <BrowserRouter>
      {/* 在这里编写你的应用内容 */}
    </BrowserRouter>
  );
}

export default App;
```

当使用函数组件时，可以使用 `useEffect` 钩子函数来监听路由变化。下面是修改后的示例代码：

```jsx
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function MyComponent(props) {
  useEffect(() => {
    const handleRouteChange = (location, action) => {
      // 路由发生变化时执行的处理逻辑
      console.log('路由发生了变化', location, action);
    };

    // 在组件挂载后，添加路由变化的监听器
    const unlisten = props.history.listen(handleRouteChange);

    // 在组件卸载前，移除监听器
    return () => {
      unlisten();
    };
  }, [props.history]);

  return (
    <div>
      {/* 在这里编写组件的内容 */}
    </div>
  );
}

// 使用 withRouter 高阶组件将路由信息传递给组件
export default withRouter(MyComponent);
```

在上面的代码中，我们使用了 `useEffect` 钩子函数来添加路由变化的监听器。在 `useEffect` 的回调函数中，我们定义了 `handleRouteChange` 方法来处理路由变化的逻辑。然后，通过 `props.history.listen` 方法来添加监听器，并将返回的取消监听函数赋值给 `unlisten` 变量。

同时，我们还在 `useEffect` 返回的清理函数中调用了 `unlisten` 函数，以确保在组件卸载时移除监听器。

需要注意的是，由于 `useEffect` 的依赖数组中包含了 `props.history`，所以每当 `props.history` 发生变化时（即路由发生变化时），`useEffect` 的回调函数会被调用，从而更新路由变化的监听器。

总结起来，通过使用 `useEffect` 钩子函数和 `props.history.listen` 方法，可以在函数组件中监听和响应路由的变化。
