**关键词**：forwardsRef 作用、forwardsRef 使用场景

在 React 中，`forwardRef` 是一个用来传递 `ref` 引用给子组件的技术。通常情况下，refs 是不会透传给子组件的，因为 refs 并不是像 `props` 那样的属性。`forwardRef` 提供了一种机制，可以将 `ref` 自动地通过组件传递到它的子组件。

### `forwardRef` 的作用：

- **访问子组件的 DOM 节点：** 当需要直接访问子组件中的 DOM 元素（例如，需要管理焦点或测量尺寸）时，可以使用 `forwardRef`。
- **在高阶组件（HOC）中转发 refs:** 封装组件时，通过 `forwardRef` 可以将 ref 属性透传给被封装的组件，这样父组件就能够通过 ref 访问到实际的子组件实例或 DOM 节点。
- **在函数组件中使用 refs(React 16.8+）：** 在引入 Hook 之前，函数组件不能直接与 refs 交互。但是，引入了 `forwardRef` 和 `useRef` 之后，函数组件可以接受 ref 并将它透传给子节点。

### 使用场景举例：

#### 1. 访问子组件的 DOM 节点

假设你有一个 `FancyButton` 组件，你想从父组件中直接访问这个按钮的 DOM 节点。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 现在你可以从父组件中直接获取DOM引用
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

#### 2. 在高阶组件中转发 refs

一个常见的模式是为了抽象或修改子组件行为的高阶组件（HOC）。`forwardRef`可以用来确保 ref 可以传递给包装组件：

```jsx
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // 将自定义的 prop 属性 "forwardedRef" 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意：React.forwardRef 回调的第二个参数 "ref" 传递给了LogProps组件的props.forwardedRef
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

#### 3. 在函数组件中使用 ref

在 Hook 出现之前，函数组件不能够直接与 `ref` 交云。现在可以这样做：

```jsx
const MyFunctionalComponent = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

const ref = React.createRef();
<MyFunctionalComponent ref={ref} />;
```

当你需要在父组件中控制子组件中的 DOM 元素或组件实例的行为时，`forwardRef` 是非常有用的工具。不过，如果可行的话，通常最好通过状态提升或使用 context 来管理行为，只在没有其他替代的情况下才选择使用 refs。
