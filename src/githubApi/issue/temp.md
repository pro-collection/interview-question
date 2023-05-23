当使用`createContext`和`useContext`时，以下是一个简单的代码示例：

```jsx
import React, { createContext, useContext } from 'react';

// 创建上下文对象
const MyContext = createContext();

// 父组件
function ParentComponent() {
  const value = 'Hello, World!';

  return (
    // 提供上下文的值
    <MyContext.Provider value={value}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

// 子组件
function ChildComponent() {
  // 使用 useContext 获取上下文的值
  const value = useContext(MyContext);

  return <div>{value}</div>;
}

// 使用上述组件
function App() {
  return <ParentComponent />;
}
```

在上述示例中，我们首先使用`createContext`创建一个上下文对象`MyContext`。然后，在`ParentComponent`组件中，我们通过`MyContext.Provider`组件提供了上下文的值，值为`'Hello, World!'`。在`ChildComponent`组件中，我们使用`useContext`钩子获取了上下文的值，并将其显示在页面上。

最终，我们在`App`组件中使用`ParentComponent`组件作为根组件。当渲染应用程序时，`ChildComponent`将获取到上下文的值并显示在页面上。

通过这种方式，`ParentComponent`提供了上下文的值，`ChildComponent`通过`useContext`钩子获取并使用该值，实现了组件之间的数据共享。
