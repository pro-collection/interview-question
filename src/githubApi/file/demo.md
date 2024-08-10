**关键词**：setState 做了哪些事儿

在 React 的类组件中，`setState` 方法主要做了以下几件事情：

1. 触发组件的重新渲染：当调用 `setState` 时，React 会标记该组件为“脏”状态，在下一个渲染周期中重新渲染组件。

2. 合并状态更新：`setState` 接受一个对象或函数作为参数。如果是对象，它会与当前组件的状态进行合并。如果是函数，该函数会接收当前的状态作为参数，并返回一个新的状态对象，然后与当前状态合并。

3. 异步更新：在大多数情况下，`setState` 是异步执行的，这是为了优化性能，避免不必要的频繁渲染。但在某些特殊情况下，如在事件处理函数中，可以通过给 `setState` 传递一个函数作为第二个参数来在状态更新完成后执行一些操作。

例如：

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick = () => {
    // 方式一：对象形式
    this.setState({ count: this.state.count + 1 });
    // 方式二：函数形式
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };
}
```
