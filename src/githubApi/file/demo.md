**关键词**：babel-runtime 作用

`babel-runtime` 是一个包含 `babel` 模块化运行时助手的库。

在使用 `babel` 进行代码转换时，有时会注入一些在多个文件中相同且可能被重复使用的代码。例如，使用类转换（无松散模式）时，每个包含类的文件都会重复出现类似 `_classcallcheck` 这样的函数。

`babel-runtime` 的主要作用就是将这些可能被重用的代码抽取成单独的模块，以避免在每个文件中重复出现相同的代码。它通过模块导入的方式引入这些功能，从而避免了对全局作用域的修改或污染。

具体来说，`babel-runtime` 包含了诸如 `core-js`（提供 JavaScript 内置库的垫片，如 `array`、`json`、`math`、`promise`、`symbol` 等）、`regenerator-runtime`（实现了 `generator/yield`、`async/await`）以及一些语法转换的辅助函数（如 `es5` 与 `es6` 的继承转换等）。

使用 `babel-runtime` 通常需要配合 `babel-plugin-transform-runtime` 插件一起使用。`babel-plugin-transform-runtime` 插件会进行一些处理，例如自动导入 `babel-runtime/core-js`，并将全局静态方法、全局内置对象映射到对应的模块；将内联的工具函数移除，改成通过 `babel-runtime/helpers` 模块进行导入；如果使用了 `async/generator` 函数，则自动导入 `babel-runtime/regenerator` 模块等。

这样，在代码中如果需要使用特定的功能，只需从 `babel-runtime` 相应的模块中导入即可，而不是直接使用全局的对象或函数。

例如，如果代码中使用了 `promise`，可以这样导入：

```javascript
import promise from "babel-runtime/core-js/promise";
```

总的来说，`babel-runtime` 更像是一种按需加载的实现方式，适用于开发库、工具等场景，可避免对全局作用域的污染，同时减少重复代码。
