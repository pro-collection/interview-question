**关键词**：react16 架构、react Reconciler、react fiber、react 渲染器、react 协调器

### 双缓存Fiber树

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题， 就有了图像处理中的**双缓存技术**。               

双缓存是一种技术，用于在图像处理中减少闪烁和图像模糊等视觉问题。在使用双缓存时，图像处理器会将图像绘制到一个“后台缓存”中，而不是直接绘制到屏幕上。一旦绘制完成，新的图像将与当前显示的图像交换，使得新图像无缝地显示在屏幕上，避免了闪烁和模糊的问题。因此，双缓存有助于提高图像处理的质量和可靠性，特别是在高速显示和实时处理应用中。

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。


在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

React Fiber 的双缓存机制是一种优化技术，用于在 UI 更新过程中避免视觉问题，如闪烁、撕裂和卡顿等。React Double Buffer 在 React Fiber 内部实现了两个缓存区域：当前显示的缓存（Current Buffer）和等待显示的缓存（Work Buffer）。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```


当应用程序状态发生更改，并需要更新 UI 时，React Fiber 首先在 Work Buffer 中执行所有渲染操作，以避免将中间状态呈现在屏幕上。一旦 Work Buffer 中的所有渲染操作完成，React Fiber 将当前缓存与工作缓存进行切换，即将 Work Buffer 设置为当前缓存，以此来更新屏幕上的 UI。

这样一来，React Fiber 就可以确保在任何时候，所有呈现在屏幕上的内容都是完整和稳定的。

### mount与update 场景

当组件第一次被挂载时：

```jsx
class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        Click me: {this.state.count}
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

当我们将 `<MyComponent />` 挂载到页面上时，React Fiber 首先会在内存中创建一个空的 Fiber 树，然后根据组件的定义，为组件创建一个初始的“工作单元”（Work In Progress）。

在这个工作单元内部，React Fiber 会为状态和 props 建立初始的 Fiber 对象，并在之后的更新过程中使用这些 Fiber 对象来跟踪组件的状态和变化。这样可以确保任何时候都可以根据状态和 props 的变化来更新 UI，而不会出现任何问题。

接下来，React Fiber 开始在工作单元中执行所有的渲染操作，生成一棵虚拟 DOM 树，并将其添加到 Work Buffer 中。然后，React Fiber 会检查 Work Buffer 是否有更改，如果有更改，就将 Work Buffer 与 Current Buffer 进行对比，以查找差异并更新到 DOM 上。

这个初次渲染的过程不太会涉及到双缓存树，因为当前缓存是空的，所有的操作都是在 Work Buffer 中进行的。但是，一旦初次渲染完成，并且组件状态发生变化时，双缓存树就开始发挥作用了。

当我们通过点击按钮更新组件状态时，React Fiber 将启动一个新的渲染周期，并为更新创建一个新的工作单元。React Fiber 会在新的工作单元中更新状态、生成新的虚拟 DOM 树，并将其添加到 Work Buffer 中。

然后，React Fiber 会将 Work Buffer 与 Current Buffer 进行对比，找出差异并将其更新到 DOM 上。但是，由于双缓存树的存在，React Fiber 不会立即将 Work Buffer 切换到 Current Buffer，以避免将中间状态显示在屏幕上。

### 执行流程
好的，下面是 React Fiber 在页面初次更新时的工作过程的流程图：

1. 应用程序启动，ReactDOM 调用 `ReactDOM.render()` 方法，并将组件渲染到 DOM 中，React Fiber 创建一个空的 Fiber 树。
2. React Fiber 为组件创建初始的“工作单元”，并在其中创建状态和 props 的 Fiber 对象。
3. React Fiber 执行组件的 `render()` 方法，生成虚拟 DOM 树并添加到工作单元中。
4. React Fiber 将工作单元中的虚拟 DOM 树添加到 Work Buffer 中。
5. React Fiber 检查 Work Buffer 是否有更改，如果有更改，则将其与 Current Buffer 进行对比，并将差异更新到 DOM 上。
6. 由于这是初次渲染，Current Buffer 为空，所有更新操作都在 Work Buffer 中完成，然后将 Work Buffer 设置为 Current Buffer。
7. React Fiber 在内存中保留 Fiber 树的副本，并用于后续的更新操作。此时，组件初次渲染流程结束。


