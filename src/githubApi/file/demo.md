**关键词**：babel 核心库

Babel 是一个 JavaScript 编译器，主要用于将 ES6 及以上版本的代码转换为向后兼容的 JavaScript 语法，以便在当前和旧版浏览器或环境中执行。核心的 Babel 库主要包括：

1. **@babel/core**:
   这是 Babel 编译器的核心包，提供了 Babel 的主要转换引擎。它包含了解析、转换和生成代码的主要功能。几乎所有的 Babel 操作都需要这个模块作为基础。

2. **@babel/cli**:
   这是 Babel 的命令行接口，通过它可以在终端或命令提示符中运行 Babel。它允许你执行转编译操作，如将 ES6 代码转换为 ES5。

3. **@babel/preset-env**:
   这是一个智能预设，允许你使用最新的 JavaScript，而不必管理语法转换。`@babel/preset-env`会根据你的目标环境（比如特定版本的浏览器或 Node.js），自动决定使用哪些 Babel 插件和 polyfills。

4. **@babel/polyfill** (现在已经被废弃，推荐使用 `core-js` 和 `regenerator-runtime`):
   早期 Babel 版本中用于模拟完整的 ES2015+环境的包。它的目的是在全局范围内添加填充以模拟较新的环境。从 Babel 7.4.0 开始，建议直接包括 `core-js` 和 `regenerator-runtime`，因为这提供了更好的模块化和按需加载功能。

5. **babel-loader**:
   这是 Babel 的一个 webpack 插件，可以将 Babel 集成到 webpack 构建过程中，使得你可以使用 webpack 来处理和打包使用了新版 JavaScript 语法的文件。

6. **@babel/plugin-transform-runtime**:
   这个插件用于复用 Babel 注入的辅助代码，以节省代码大小，并能够在不污染全局环境的情况下使用新语言特性的 polyfills。

除了这些核心库外，还有许多可用的 Babel 插件，以支持各种 JavaScript 语法和特性（比如装饰器、类属性等）。这些插件可以按需引入，配置在 Babel 的配置文件（通常是`.babelrc`或`babel.config.js`）中。这些插件的命名通常遵循 `@babel/plugin-` 的格式。
