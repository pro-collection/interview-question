**关键词**：ref 使用场景、ref 获取dom、ref 获取子组件属性和方法

React的ref用于获取组件或DOM元素的引用。它有以下几个常见的使用场景：

1. 访问子组件的方法或属性：通过ref可以获取子组件的实例，并调用其方法或访问其属性。

```jsx
import React, { useRef } from 'react';

function ChildComponent() {
  const childRef = useRef(null);

  const handleClick = () => {
    childRef.current.doSomething();
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <Child ref={childRef} />
    </div>
  );
}

const Child = React.forwardRef((props, ref) => {
  const doSomething = () => {
    console.log('Doing something...');
  }

  // 将ref引用绑定到组件的实例
  React.useImperativeHandle(ref, () => ({
    doSomething
  }));

  return <div>Child Component</div>;
});
```

2. 获取DOM元素：通过ref可以获取组件渲染后的DOM元素，并进行操作。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

3. 动态引用：通过ref可以在函数组件中动态地引用不同的组件或DOM元素。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const ref = useRef(null);
  const condition = true;

  const handleClick = () => {
    ref.current.doSomething();
  }

  return (
    <div>
      {condition ? (
        <ChildComponent ref={ref} />
      ) : (
        <OtherComponent ref={ref} />
      )}
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

这些例子展示了一些使用React的ref的常见场景，但实际上，ref的用途非常灵活，可以根据具体需求进行扩展和应用。
