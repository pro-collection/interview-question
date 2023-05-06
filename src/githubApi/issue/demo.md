**关键词**：memo useMemo

`React.memo` 和 `useMemo` 是在 React 中处理性能优化的两个工具，虽然它们名称相似，但是它们的作用和使用方法是不同的。

`React.memo` 是高阶组件，它可以用来优化函数组件的渲染性能。它会比较当前组件的 `props` 和 `state` 是否发生了变化，如果都没有变化，就不会重新渲染该组件，而是直接使用之前的结果。例如：

```jsx
import React from 'react';
 
const MyComponent = React.memo(props => {
  return <div>{props.value}</div>;
});
```

在上面的代码中，`React.memo` 包装了一个简单的函数组件 `MyComponent`。如果该组件的 `value` prop 和 `state` 没有发生变化，那么就会直接使用之前的结果不会重新渲染。

`useMemo` 是 `React` 中一个 hooks，它可以用来缓存计算结果，从而优化组件渲染性能。它接受两个参数：要缓存的计算函数和依赖项数组。每当依赖项发生变化时，该计算函数就会重新计算，并返回一个新的结果。例如：

```jsx
import React, { useMemo } from 'react';
 
const MyComponent = props => {
  const result = useMemo(() => expensiveComputation(props.value), [props.value]);
  return <div>{result}</div>;
};
```

在上面的代码中，我们传递了一个计算函数 `expensiveComputation`，以及一个依赖项数组 `[props.value]`。如果依赖项没有发生变化，`myValue` 就会被缓存起来，不会重新计算。

总的来说：

`React.memo` 的作用是优化函数组件的渲染性能，它可以比较组件的 `props` 和 `state` 是否发生变化，如果没有变化，就不会重新渲染。

`useMemo` 的作用是缓存计算结果，从而避免重复计算，它接受一个计算函数和一个依赖项数组，当依赖项发生变化时，计算函数就会重新计算，返回一个新的结果，否则就会使用之前的缓存结果。
