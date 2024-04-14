**关键词**：babel 编译 react

首先要知道一个事情： **JSX 是无法直接运行在浏览器环境**。

### 原因

JSX 语法不能直接被浏览器解析和运行，因此需要插件 `@babel/plugin-transform-react-jsx` 来转换语法，使之能够在浏览器或任何 JavaScript 环境中执行。

所以 React 组件需要引入`React`的一个主要原因是：在组件中使用 JSX 时，JSX 语法最终会被 Babel 编译成使用`React.createElement`方法的 JavaScript 代码。也就是说，任何使用 JSX 的 React 组件的背后都隐含了`React.createElement`的调用。

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

### Babel 7.0+ / React 17+ ， 可以不再需要 import React

在 Babel 7.0 版本之后，`@babel/plugin-transform-react-jsx` 插件还支持一个自动模式，它可以自动引入 JSX 转换所需的`React`包，无需手动在每个文件中添加 `import React from 'react'`。

注意，随着 React 17 的新 JSX 变换，它们引入了一个新的 JSX 转换方式，这在新的 Babel 插件 `@babel/plugin-transform-react-jsx` 和 `@babel/preset-react` 中得到了支持。这意味着在写 JSX 时，你不再需要导入 React。这个插件现在接收一个 `{ runtime: 'automatic' }` 选项来启用这一特性。

举个例子，在使用新的 JSX 转换之后，编译器将会自动引入 JSX 的运行时库，而不是 React，例如对于一个使用了新转换的`MyComponent`的组件:

```jsx
// React 17+ 及支持新JSX转换的环境，可以不需要显式写这行
// import React from 'react';

const MyComponent = () => {
  return <div>Hello, World!</div>;
};
```

在新的转换下，你会看到类似`import { jsx as _jsx } from 'react/jsx-runtime'`的东西或者类似的别名，被自动插入到转译后的文件中，而不再是直接的`React.createElement`调用。这就是为什么在新版本的 React 中，你可能不再需要手动导入 React 了。

### 补充一个细节知识点： plugin-transform-react-jsx`和`@babel/preset-react` 是啥关系

**它们是包含关系**： `@babel/preset-react` 包括了 `@babel/plugin-transform-react-jsx`

`@babel/plugin-transform-react-jsx` 和 `@babel/preset-react` 都是 Babel 插件，它们在处理 React 项目中的 JSX 代码方面有关联，但它们的用途和包含的内容有所不同。

1. **@babel/plugin-transform-react-jsx**:
   这是一个特定的 Babel 插件，它的功能就是将 JSX 语法转换为`React.createElement` 调用。随着 React 17 的更新，它还允许使用新的 JSX 转换，无需导入 React 就可以使用 JSX。这意味着，在文件中不再需要 `import React from 'react'` 语句了，就可以使用 JSX。

   这个插件通常用于开发者想要精细控制某个具体转换功能时。如果你只需要转换 JSX 语法，但不需要处理其他与 React 相关的转换或优化，你可能会单独使用这个插件。

2. **@babel/preset-react**:
   这是一个 Babel 预设，它是一组 Babel 插件的集合，旨在为 React 项目提供所需的全部 Babel 插件。`@babel/preset-react` 包括了 `@babel/plugin-transform-react-jsx`，但它还包含了其他一些插件，如处理 React 的显示名称的 `@babel/plugin-transform-react-display-name`，以及为开发模式和生产模式添加/删除某些代码的插件。

   预设的好处是简化了配置过程。开发者可以在 Babel 的配置中一次性添加 `@babel/preset-react`，而不是单独添加每一个与 React 相关的 Babel 插件。此外，预设将维护这些插件的正确版本和顺序，这有助于避免潜在的配置错误。

在实践中，大多数开发 React 应用的开发者会使用 `@babel/preset-react` 因为它提供了一个即插即用的 Babel 环境，无需担心各个插件的具体细节。但是也有些情况下，为了更细致的优化和控制，开发者可能会选择手动添加特定的插件，包括 `@babel/plugin-transform-react-jsx`。
