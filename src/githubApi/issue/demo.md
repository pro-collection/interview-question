`forwardRef` 是 React 提供的一个高阶函数，它可以让你在函数组件中访问子组件的 ref，并把该 ref 传递给子组件。

使用 `forwardRef` 的主要场景是，当你需要访问子组件的 DOM 节点或实例时，比如要操作子组件的滚动条、聚焦输入框等等。在这些场景下，需要用到 `ref`，而 `ref` 又不能直接在函数组件中使用。

下面是 `forwardRef` 的基本使用方式：

```jsx
jsxCopy codeimport React, { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

function App() {
  const inputRef = React.createRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <MyComponent ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

在上面的例子中，我们创建了一个 `MyComponent` 组件，并通过 `forwardRef` 来包裹它。这样，`MyComponent` 就可以在 props 中接收一个 `ref` 属性，而 `forwardRef` 将会将该属性转发到子组件中。

在 `App` 组件中，我们创建了一个 `inputRef` 对象，并将它作为 `MyComponent` 的 `ref` 属性传递给了 `MyComponent` 组件。然后，我们在 `handleClick` 函数中使用 `inputRef` 来聚焦输入框。

需要注意的是，`forwardRef` 的回调函数接收两个参数：`props` 和 `ref`。其中，`props` 是组件的属性对象，`ref` 是回调函数中定义的 ref 对象。在函数组件中，我们必须将 `ref` 传递给要访问的子组件，否则 `ref` 将无法访问到子组件的 DOM 节点或实例。