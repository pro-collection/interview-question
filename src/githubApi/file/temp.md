`@babel/plugin-transform-react-jsx` 是 Babel 的一个插件，它的作用是将 JSX 语法转换成普通的 JavaScript 函数调用。这个插件专门针对使用 React 库开发的项目，因为 JSX 是 React 提出的一个语法扩展，允许在 JavaScript 代码中写类似于 HTML 的标记语言。

JSX 语法不能直接被浏览器解析和运行，因此需要这个插件来转换语法，使之能够在浏览器或任何 JavaScript 环境中执行。具体来说，它会将 JSX 转换为 `React.createElement` 调用，因为这是 React 使用的标准格式来创建和返回虚拟 DOM 元素。

以下是这个转换过程的一个例子：

假设你的 JSX 代码如下：

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```

使用 `@babel/plugin-transform-react-jsx` 插件后，上面的 JSX 代码会被转换成普通的 JavaScript 代码：

```javascript
const element = React.createElement("h1", { className: "greeting" }, "Hello, world!");
```

在这个转换过程中，`React.createElement` 函数接受三个参数：

1. 要创建的元素类型，如 `'h1'`。
2. 一个包含属性的对象，例如 `{ className: 'greeting' }`。
3. 子元素列表，这可以是更多的 `React.createElement` 调用，或如 `'Hello, world!'` 这样的字符串文字。

由于有了这个插件，开发者可以在编写 React 组件时使用声明性的 JSX 语法，而无需担心底层的 `React.createElement` 调用，这不仅提高了开发效率，而且使得代码更加直观易读。

在 Babel 7.0 版本之后，`@babel/plugin-transform-react-jsx` 插件还支持一个自动模式，它可以自动引入 JSX 转换所需的`React`包，无需手动在每个文件中添加 `import React from 'react'`。

注意，随着 React 17 的新 JSX 变换，它们引入了一个新的 JSX 转换方式，这在新的 Babel 插件 `@babel/plugin-transform-react-jsx` 和 `@babel/preset-react` 中得到了支持。这意味着在写 JSX 时，你不再需要导入 React。这个插件现在接收一个 `{ runtime: 'automatic' }` 选项来启用这一特性。

---

React 组件需要引入`React`的一个主要原因是：在组件中使用 JSX 时，JSX 语法最终会被 Babel 编译成使用`React.createElement`方法的 JavaScript 代码。也就是说，任何使用 JSX 的 React 组件的背后都隐含了`React.createElement`的调用。

例如，当你编写如下的 JSX 代码：

```jsx
const MyComponent = () => {
  return <div>Hello, World!</div>;
};
```

Babel 会将这段 JSX 编译为如下的 JavaScript 代码：

```javascript
const MyComponent = () => {
  return React.createElement("div", null, "Hello, World!");
};
```

由于编译后的代码调用了`React.createElement`，因此你需要在文件顶部导入`React`对象才能使用它。即使你在组件中并没有直接使用`React`对象，编译后的代码依赖于`React`的运行时。

然而，从 React 17 开始，一个新的 JSX 转换被引入。新的转换默认会自动导入 JSX 运行时而不需要显示地写`import React from 'react'`。这被称为 "新的 JSX 转换"。假如你使用的是 React 17 或以上版本，并且你的构建工具支持新的 JSX 转换，你的代码就可以不导入`React`对象了。

新的 JSX 转换是向后兼容的，所以老的代码不需要改变；但是对于新代码，你可以选择省略`import React`的声明（如果你的工具链已经更新以支持这一变化）。为了启用新的 JSX 转换，你可能需要更新你的 babel 配置并将`@babel/preset-react`插件的`runtime`选项设置为`automatic`。

举个例子，在使用新的 JSX 转换之后，编译器将会自动引入 JSX 的运行时库，而不是 React，例如对于一个使用了新转换的`MyComponent`的组件:

```jsx
// React 17+ 及支持新JSX转换的环境，可以不需要显式写这行
// import React from 'react';

const MyComponent = () => {
  return <div>Hello, World!</div>;
};
```

在新的转换下，你会看到类似`import { jsx as _jsx } from 'react/jsx-runtime'`的东西或者类似的别名，被自动插入到转译后的文件中，而不再是直接的`React.createElement`调用。这就是为什么在新版本的 React 中，你可能不再需要手动导入 React 了。
