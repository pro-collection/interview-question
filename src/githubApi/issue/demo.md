**关键词**：jsx渲染、react渲染过程

在 React 中，JSX 最终被转换为真实的 DOM 经历了以下步骤：

### 1. 解析 JSX：在编译阶段，React 会使用 Babel 等工具将 JSX 转换为 JavaScript 对象。

在编译阶段，React 使用 Babel 等工具将 JSX 转换为 JavaScript 对象的过程可以使用以下代码示例来说明：

原始的 JSX 代码：
```jsx
const element = <h1>Hello, world!</h1>;
```

经过编译后，会被转换为类似的 JavaScript 对象：
```javascript
const element = React.createElement("h1", null, "Hello, world!");
```

上述代码中，`React.createElement` 是一个由 React 提供的方法，它接收三个参数：元素的类型、元素的属性（可以是一个对象或 null）、元素的子元素。这样，通过调用 `React.createElement`，JSX 元素就被转换成了一个 JavaScript 对象。

在 React 项目中，Babel 是一个常用的工具，用于将 JSX 代码转换为 JavaScript 代码。Babel 实际上是一个 JavaScript 编译器，可以根据配置和插件，将代码从一种语法转换为另一种语法。

当 Babel 遇到 JSX 代码时，它会使用一个名为 `@babel/preset-react` 的 preset（预设）来进行转换。这个 preset 包含了一系列的插件，用于处理 JSX 语法。

**具体的工作流程如下**：

1. Babel 解析代码：Babel 会将代码解析成抽象语法树（AST），以便于之后的处理。

2. JSX 转换：Babel 使用 `@babel/preset-react` 预设来处理 JSX 代码。这个预设包含了一个插件 `@babel/plugin-transform-react-jsx`，用于将 JSX 转换为函数调用。

   例如，将 `<h1>Hello, world!</h1>` 转换成 `React.createElement("h1", null, "Hello, world!")`。

3. 生成 JavaScript 代码：Babel 使用转换后的 AST，将其重新生成为 JavaScript 代码。

   例如，将 `React.createElement("h1", null, "Hello, world!")` 转换成实际的 JavaScript 代码。

总结起来，Babel 的作用就是将 JSX 代码转换为 JavaScript 代码，使其能够在浏览器中执行。这样，React 就可以理解和处理 JSX 语法，并通过转换后的 JavaScript 代码来创建虚拟 DOM 和进行后续的更新操作。


### 2. 创建虚拟 DOM：React 使用解析后的 JSX 对象来创建虚拟 DOM（Virtual DOM）。虚拟 DOM 是一个轻量级的、以 JavaScript 对象表示的 DOM 树的副本。

**createElement 创建虚拟dom**

在 React 中，`React.createElement` 函数用于创建虚拟 DOM 元素。它接受三个参数：元素类型、属性对象以及子元素。

```javascript
const element = React.createElement(type, props, children);
```

`React.createElement` 函数会返回一个描述虚拟 DOM 元素的 JavaScript 对象。这个对象包含了元素的类型、属性和子元素等信息。例如，对于 `<div className="container">Hello, React!</div>` 这个 JSX 语法，它被转换为以下形式：

```javascript
React.createElement("div", { className: "container" }, "Hello, React!");
```

这样就创建了一个描述 `<div>` 元素的虚拟 DOM 对象。虚拟 DOM 对象可以通过 `ReactDOM.render` 方法渲染到实际的 DOM 中。当虚拟 DOM 发生变化时，React 会通过比较新旧虚拟 DOM，找出差异并进行局部更新，从而最小化对实际 DOM 的操作。

**createElement 原理**

以下是 React 源码中 `React.createElement` 函数的简化版本：

```javascript
function createElement(type, props, ...children) {
  const element = {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
  
  return element;
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}
```

在上面的源码中，`createElement` 函数接收一个 `type` 参数（元素类型）、一个 `props` 参数（元素的属性对象）以及可选的 `children` 参数（子元素）。

首先，通过创建一个名为 `element` 的对象，我们存储了虚拟 DOM 元素的信息。`element` 对象中的 `type` 属性保存了元素的类型，而 `props` 属性则是一个对象，用来存储元素的属性和子元素。我们使用了 ES6 中的扩展运算符将 `props` 参数中的属性分配给 `element.props`，同时也将 `children` 参数中的子元素映射为虚拟 DOM 对象。

对于 `children` 参数的处理，通过 `children.map` 方法遍历 `children` 数组，并对每个子元素执行以下操作：

- 如果子元素是对象类型，即已经是一个虚拟 DOM 对象，直接将其添加到 `element.props.children` 中。
- 如果子元素是字符串或数字类型，即文本节点，那么我们调用 `createTextElement` 函数来创建一个描述该文本节点的虚拟 DOM 对象，并将其添加到 `element.props.children` 中。

`createTextElement` 函数用于创建文本节点的虚拟 DOM 对象。它返回一个包含 `type` 为 `'TEXT_ELEMENT'` 的对象，且 `props` 对象中的 `nodeValue` 属性保存了文本节点的内容，`children` 属性为空数组。

最后，我们将 `element` 对象作为结果返回，这样就创建了一个描述虚拟 DOM 元素的 JavaScript 对象。

总结起来，`createElement` 函数通过创建一个对象来描述虚拟 DOM 元素，其中包含了元素的类型、属性和子元素等信息。对于子元素，会根据其类型进行判断，如果是对象类型，则直接添加到 `props.children` 中；如果是文本类型，则通过 `createTextElement` 函数创建对应的虚拟 DOM 对象。这样就生成了一个虚拟 DOM 元素，可以用于进行后续的渲染和更新操作。


### 3. Diff 算法比较变化：在每次组件更新时，React 使用 Diff 算法对比前后两个虚拟 DOM 树的差异。Diff 算法能够高效地找出需要进行更新的部分。

React中通过diff算法来比较两个虚拟DOM树的差异，以确定需要更新的最小操作集合。

首先，React会比较两个根节点的类型，如果不同，它们代表不同的组件，React会将原来的组件树完全替换为新的组件树。

如果类型相同，React会比较两个根节点的属性，检查它们是否有任何更改。如果有更改，React会更新已有的DOM元素的属性。

接下来，React会递归地比较和更新子节点。React会通过遍历子节点的方式找到相同位置上的子节点，并进行递归比较。

对于子节点，React使用一种称为"key"的特殊属性来判断它们是否是相同的元素。如果两个子节点的key相同，React会认为它们是相同的元素，并只更新它们的属性和子节点。如果key不同，React会将旧的子节点完全替换为新的子节点。

最后，React会将所有需要更新的操作记录下来，并将其发送到浏览器的渲染引擎中执行。这些操作可能包括添加、移动或删除DOM节点。

通过使用diff算法，React可以最小化对真实DOM的操作，提高性能和效率。同时，React还会使用一些启发式策略和优化算法，如批处理和异步更新，来进一步提升性能。


### 4. 生成 DOM 更新操作：根据 Diff 算法的比较结果，React 会生成一系列的 DOM 更新操作，包括添加、移除和修改节点等。这些操作被存储在更新队列中。

在React中，生成DOM更新操作的过程可以概括为以下几个步骤：

- 通过diff算法比较新旧虚拟DOM树的差异，得到需要更新的最小操作集合。

- 对于每个需要更新的操作，React会将其转化为一个待执行的DOM更新任务。

- React将这些待执行的DOM更新任务放入一个队列中，等待执行。

- 当React准备执行DOM更新时，会将队列中的任务按照特定的顺序进行执行。这个顺序通常是根据DOM节点的层级和位置来确定的，以保证DOM更新的正确性。

- 执行DOM更新时，React会根据操作的类型，比如添加、移动或删除DOM节点，调用浏览器提供的DOM API来执行相应的操作。

- 在执行DOM更新的过程中，React会尽量优化操作，避免一些不必要的DOM操作。例如，将多个连续的DOM插入操作合并为一次操作，或者将多个DOM删除操作合并为一次操作。

- 执行完所有的DOM更新任务后，React会通知浏览器进行重新渲染，将更新后的DOM树呈现给用户。

总的来说，React通过将虚拟DOM树转化为真实DOM树，并通过diff算法生成DOM更新操作，然后按照特定顺序执行这些操作，最终完成DOM的更新和渲染。这样的设计可以提高性能，减少不必要的DOM操作，并保证DOM的一致性。


### 5. 批量进行 DOM 更新：React 会将更新队列中的 DOM 更新操作批量进行，以减少浏览器的重绘和回流操作。React 会通过批量更新来优化性能。

React通过批量更新的方式来优化DOM操作，以减少不必要的性能开销。

在React中，当需要更新组件状态或属性时，不会立即执行DOM更新操作，而是将更新请求加入到一个待处理的队列中。React会在适当的时机，比如在事件处理函数执行完毕或在生命周期方法结束时，对队列中的更新请求进行批量处理。

具体的批量更新过程如下：

- 在React中，每个组件都有一个内部的pending state队列，用于存储待处理的更新请求。

- 当需要更新组件的状态或属性时，React会将更新请求添加到该组件的pending state队列中。

- 在React的更新过程中，会遍历组件的pending state队列，将其中的所有更新请求合并为一个批量更新。

- React会根据合并后的批量更新，生成最小化的DOM操作集合。

- 最后，React会通过执行这个批量更新的DOM操作集合，将更新应用到真实的DOM树中。

通过批量更新的方式，React可以减少不必要的DOM操作次数，提高性能。同时，React也提供了一些API，让开发者可以手动控制更新的时机，比如使用`setState`的回调函数、使用`ReactDom.unstable_batchedUpdates`方法等。

需要注意的是，React并不保证所有的更新都会批量处理。在一些特殊情况下，比如在事件处理函数中手动调用`setState`，或者使用`ReactDOM.unstable_batchedUpdates`方法，可以强制进行批量更新。但在某些情况下，React可能会选择立即更新，以保证更新的时机和结果的一致性。

### 6. 应用 DOM 更新：最后，React 将批量的 DOM 更新操作应用到实际的浏览器 DOM 中，从而更新用户界面。这个过程中，React 会尽量最小化对真实 DOM 的操作，以提高性能。

原理同上， 只是进行了重复操作；


### 总结

一图带千言

![image](https://github.com/pro-collection/interview-question/assets/22188674/f24dad99-66fe-4206-9d05-6f7194dcc5b5)

