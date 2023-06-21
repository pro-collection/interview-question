**关键词**：react constructor 作用、react getInitialState 作用、初始化 state

在 React 中，constructor 是一个类的构造函数，用于初始化类的成员变量和方法，这个函数不仅会在组件实例化时调用，还会在后续的组件更新时调用。而 getInitialState 是一个组件的声明周期函数，用于初始化组件的状态，该函数只会在组件实例化时调用一次，后续的更新不会再调用。

具体来说，constructor 用于初始化类成员变量和方法，如下面的示例代码所示：

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

在上面的代码中，constructor 用于初始化组件的状态 count 和绑定 handleClick 方法的 this 指向。每次组件更新时，constructor 函数都会被调用。

而 getInitialState 则是用于初始化组件的状态，如下面的示例代码所示：

```
class MyComponent extends React.Component {
  getInitialState() {
    return {
      count: 0
    };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

在上面的代码中，getInitialState 用于初始化组件的状态 count，该函数只会在组件实例化时调用一次。后续的更新不会再调用。需要注意的是，在 React 16.3 之后，getInitialState 已经不再被支持，需要使用 constructor 来初始化 state。
