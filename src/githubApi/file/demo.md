**关键词**：React Portals API

React Portals 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的方式。通常，组件的渲染输出会被插入到其在组件树中的父组件下，但是 Portals 提供了一种穿透组件层次结构直接渲染到任意 DOM 节点的方法。

### React Portals 的作用：

1. **父子结构逃逸**：React Portals 允许你将子组件渲染到其父组件 DOM 结构之外的地方，这在视觉和位置上「逃逸」了它们的父组件。
2. **样式继承独立**：使用 Portal 的组件通常可以避免父组件样式的影响，易于控制和自定义样式。

3. **事件冒泡正常**：尽管 Portal 可以渲染到 DOM 树中的任何位置，但是事件冒泡会按照 React 组件树而不是 DOM 树来进行。所以，尽管组件可能被渲染到 DOM 树的不同部分，它的行为仍然像常规的 React 子组件一样。

### React Portals 的使用场景：

1. **模态框**：最常见的场景之一就是模态对话框，这时候对话框需要覆盖应用程序的其余部分（包括可能存在的其他元素如遮罩层），而且往往模态框的样式不应该受到其它 DOM 元素的影响。

2. **浮动菜单**：对于那些需要覆盖其它元素的浮动菜单或下拉式组件，React Portal 可以使这些组件渲染在最外层，避免被其他 DOM 元素的样式或结构干扰。

3. **提示/通知**：用于在界面上创建提示信息，如 Toasts 或 Snackbars，这些通常会浮动在内容之上并在固定位置显示。

4. **全屏组件**：对于需要全屏显示而不受现有 DOM 层级影响的组件（如图片库的全屏视图、视频播放或者游戏界面）。

5. **第三方库的集成**：有时候需要将 React 组件嵌入由非 React 库管理的 DOM 结构中，此时 Portal 可以非常有用。

总之，Portals 提供了一种灵活的方式来逃离父组件的限制，帮助开发者更加自由和方便地进行 UI 布局，同时也有助于维护组件结构的整洁和一致性。

### 代码使用举例

假设我们想创建一个模态框（Modal）组件，我们会希望这个模态框在 DOM 中是在最顶层的，但在 React 组件树中它应该在逻辑上保持在其父组件下。使用 React Portals 可以很容易地实现这一点。

首先，我们在 `public/index.html` 中，添加一个新的 DOM 节点，作为 Portal 的容器：

```html
<!-- index.html -->
<div id="app-root"></div>
<!-- React App 将会挂载在这里 -->
<div id="modal-root"></div>
<!-- Modal 元素将会挂载在这里 -->
```

接着，我们创建一个 `Modal` 组件，它会使用 `ReactDOM.createPortal` 来渲染其子元素到 `#modal-root`：

```javascript
// Modal.js
import React from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
  render() {
    // 使用 ReactDOM.createPortal 将子元素渲染到 modal-root 中
    return ReactDOM.createPortal(
      // 任何有效的 React 孩子元素
      this.props.children,
      // 一个 DOM 元素
      document.getElementById("modal-root")
    );
  }
}

export default Modal;
```

现在，我们可以在应用程序的任何其他组件中使用这个 `Modal` 组件了，不论它们在 DOM 树中的位置如何：

```javascript
// App.js
import React from "react";
import Modal from "./Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleShow}>显示模态框</button>

        {this.state.showModal ? (
          <Modal>
            <div className="modal">
              <div className="modal-content">
                <h2>我是一个模态框!</h2>
                <button onClick={this.handleClose}>关闭</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default App;
```

在以上代码中，无论 `Modal` 组件在 `App` 组件中的位置如何，模态框的渲染位置总是在 `#modal-root` 中，这是一个典型的使用 React Portals 的例子。上述代码中的模态框在视觉上会覆盖整个应用程序的位置，但在组件层次结构中它仍然是 `App` 组件的子组件。
