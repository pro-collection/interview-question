**关键词**：corejs 和 Polyfill

1. **CoreJs 的作用**

   - **提供标准的 JavaScript 功能支持**：CoreJs 是一个 JavaScript 标准库，它提供了许多在现代 JavaScript 环境中被认为是标准的功能。这些功能包括但不限于对 ES6 + 语法的支持，如`Promise`、`Symbol`、`Map`、`Set`等。例如，在一些较旧的浏览器中可能没有原生的`Promise`支持，CoreJs 可以提供一个兼容的`Promise`实现，使得代码能够在这些浏览器中正确运行。
   - **跨浏览器兼容性支持**：它能够填补不同浏览器之间的 JavaScript 功能差距。由于不同浏览器对 JavaScript 标准的实现进度不同，CoreJs 可以确保在各种浏览器环境下都能提供一致的功能。比如，某些浏览器可能没有完全实现`Array.prototype.includes`方法，CoreJs 可以添加这个方法的实现，使得应用程序在这些浏览器中也能使用该功能。
   - **模块化的功能提供**：CoreJs 是模块化的，这意味着可以根据具体的需求选择引入特定的模块。例如，如果只需要在项目中添加`Promise`和`Map`的支持，而不需要其他功能，可以只引入 CoreJs 相关的模块，避免不必要的代码体积增加。

2. **CoreJs 与 Polyfill 的关系**
   - **CoreJs 是 Polyfill 的一种实现方式**：Polyfill 是一个术语，用于描述一段代码，它提供了浏览器中缺失的功能。CoreJs 可以看作是一种全面的 Polyfill 库。当浏览器不支持某个 JavaScript 特性时，CoreJs 可以通过添加相应的代码来模拟该特性，就像填充了浏览器功能的空缺一样。例如，对于`Object.assign`方法，如果浏览器不支持，CoreJs 可以提供一个自定义的函数来实现相同的功能，这个自定义函数就是一种 Polyfill。
   - **Polyfill 可以有多种来源，CoreJs 是常用的一种**：除了 CoreJs 之外，开发人员也可以自己编写 Polyfill 或者使用其他库来提供类似的功能。但是 CoreJs 是经过广泛测试和优化的，它涵盖了大量的 JavaScript 特性，并且能够很好地与 Babel 等工具配合使用。例如，在 Babel 的`@babel/preset - env`配置中，使用`useBuiltIns: 'usage'`选项时，Babel 会根据目标浏览器的情况，自动引入 CoreJs 中的相关 Polyfill，以确保代码在目标浏览器中能够正确运行。这样就能够高效地为项目添加必要的 Polyfill，而不是无差别地引入所有可能的 Polyfill，从而减小代码体积。
