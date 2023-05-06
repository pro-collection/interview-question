**关键词**：react createPortal

`createPortal` 是 React 中一个用于将子元素渲染到指定 DOM 元素下的 API。

在 React 应用中，通常会通过组件树传递 props、状态等数据来渲染 UI，并由 React 自动管理 DOM 元素的创建、更新和销毁等操作。不过，有时我们需要将某些 UI 元素渲染到根节点之外的 DOM 元素下，例如弹出框、模态框等。这时，`createPortal` 就能派上用场了。

`createPortal` 的用法如下：

```jsx
ReactDOM.createPortal(child, container)
```

其中，`child` 是指要渲染的子元素，可以是任何有效的 React 元素，包括组件、HTML 元素等等；`container` 是指要将子元素渲染到的 DOM 元素，可以是一个有效的 DOM 元素对象，例如通过 `document.getElementById` 获取到的 DOM 元素。`createPortal` 会将 `child` 渲染到 `container` 中，但仍然能够受到 React 生命周期的管理，例如 `componentDidMount` 和 `componentWillUnmount` 等方法。

下面是一个例子，它展示了如何使用 `createPortal` 来将一个弹出框渲染到根节点之外的 DOM 元素下：

```jsx
function Dialog(props) {
  return ReactDOM.createPortal(
    <div className="dialog">
      <h2>{props.title}</h2>
      <div>{props.content}</div>
    </div>,
    document.getElementById('dialog-container')
  );
}

function App() {
  return (
    <div>
      <p>这是一个文本内容。</p>
      <Dialog title="提示" content="这是一个弹出框。" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

在这个例子中，`Dialog` 组件使用 `createPortal` 将其子元素渲染到 `#dialog-container` 这个元素下，而不是直接渲染到 `#root` 下。这个功能使得我们可以在 React 应用中方便地处理弹出框等类似需求。
