**关键词**：cloneElement、children 添加额外属性

在 React 中，可以使用` React.cloneElement()` 方法来给 children 添加额外的属性。

`React.cloneElement(element, props, ...children)`

其中，element 是需要克隆的 React 元素，props 是要添加的属性，children 是要传递给克隆元素的子元素。

以下是一个示例：

```jsx
import React from "react";

function ParentComponent() {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { additionalProp: "value" })
      )}
    </div>
  );
}

function ChildComponent(props) {
  return <div>{props.additionalProp}</div>;
}

function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}

export default App;
```

在上面的示例中，ParentComponent 是一个父组件，它接收了一些 children，并使用 React.Children.map() 方法遍历每个 child，然后使用 React.cloneElement() 方法给每个 child 添加了一个名为 additionalProp 的属性。

ChildComponent 是一个子组件，它通过 props.additionalProp 获取到了父组件传递的 additionalProp 属性值。

这样，通过 React.cloneElement() 方法，我们可以给 children 添加额外的属性。
