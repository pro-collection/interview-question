### webpack 如何做 tree shaking

`Webpack`通过`tree shaking`技术实现了JavaScript代码的优化和精简。`Tree shaking`是指通过静态代码分析，识别和移除未被使用的代码（被称为"dead code"），从而减小最终打包后的文件大小。

下面是Webpack如何进行tree shaking的步骤：

1. 代码标记：在代码中使用ES6模块化语法（如`import`和`export`）来明确指定模块的依赖关系。

2. 代码解析：Webpack会解析整个代码，并构建一个依赖图谱，记录模块之间的依赖关系。

3. 标记未使用代码：在构建依赖图谱的过程中，Webpack会标记那些未被使用的模块，以及这些模块中的未被使用的函数、类、变量等。

4. 无副作用标记：Webpack还会检查模块的副作用（例如对全局变量的修改、网络请求等），并将没有副作用的代码视为可安全移除的。

5. 未使用代码移除：在代码打包阶段，Webpack会根据标记的未使用代码信息，从最终的打包结果中移除这些未被使用的代码。

通过tree shaking，Webpack可以减小打包后的文件大小，提高应用的加载速度和性能。但要注意的是，tree shaking只对ES6模块化的代码有效，对于CommonJS模块化的代码则无法进行优化。另外，有些代码可能由于复杂的依赖关系无法被正确地标记为未使用，这就需要开发者自己进行配置或使用其他工具进行优化。


### webpack 处理 tree shaking 配置

要在Webpack中配置tree shaking，需要进行以下步骤：

1. 在`webpack.config.js`文件中，将`mode`设置为`production`，这会启用Webpack的优化功能，包括tree shaking。

```javascript
module.exports = {
  mode: 'production',
  // 其他配置...
};
```

2. 确保你的代码使用了ES6模块化语法（使用`import`和`export`），以便Webpack能够正确地进行静态代码分析。

3. 确保你的代码库中没有副作用。Webpack会假设没有副作用的代码可以安全地移除。如果你的代码确实有副作用，可以在webpack配置文件中的`optimization`选项中设置`sideEffects`为`false`来告诉Webpack可以安全地进行tree shaking。

```javascript
module.exports = {
  mode: 'production',
  optimization: {
    sideEffects: false,
  },
  // 其他配置...
};
```


### 了解一下副作用

在计算机科学中，副作用是指函数或代码的执行对除了返回一个值之外的程序状态产生了可观察的变化。换句话说，副作用是指对外部环境产生了影响或产生了可观察的行为。

以下是一些常见的副作用示例：

- 修改全局变量或外部状态：函数修改了全局变量或外部状态，例如修改了一个共享的数组、对象或文件等。

- 发送网络请求：函数通过网络发送了一个HTTP请求，这会触发网络交互并产生副作用。

- 修改函数参数：函数修改了传入的参数值，这会影响函数外部的变量。

- 控制台打印：函数在执行过程中使用了`console.log()`或其他打印语句，这会在控制台中产生可观察到的输出。

- 异步操作：函数中包含了异步操作，例如定时器、Promise或通过回调函数实现的异步操作。


### 如何申明代码是有副作用

某一些代码是是需要禁止被清理掉， 这个时候该如何处理呢？

有几个办法：

**方法一：在配置文件中指定副作用**

在Webpack配置文件中，可以使用`sideEffects`选项来指定哪些文件或模块具有副作用，不允许清理。`sideEffects`接受一个正则表达式、一个文件名或一个数组。例如：

```javascript
module.exports = {
  //...
  optimization: {
    usedExports: true
  },
  mode: 'production',
  sideEffects: ["./src/some-module.js"]
};
```

在上面的例子中，`sideEffects`数组中的`./src/some-module.js`文件将会被标记为具有副作用，不会被清理。

请注意，为了使`sideEffects`选项生效，你需要在配置文件中启用`optimization.usedExports`选项，并将`mode`设置为`production`。

**方法二：package.json 中配置 sideEffects 属性**

可以在`package.json`文件中使用`sideEffects`字段来申明哪些文件或模块具有副作用，不允许被清理。

1. 如果将`sideEffects`设置为布尔值`false`，表示所有导入的文件都被认为没有副作用，可以被tree shaking清理。这在大多数情况下是默认的行为。

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": false
}
```

2. 如果设置为布尔值`true`，表示所有导入的文件都被认为有副作用，不会被tree shaking清理。

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": true
}
```

3. 如果将`sideEffects`设置为一个数组，数组中的每个元素可以是一个字符串或一个正则表达式，表示具有副作用的文件或模块。

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": [
    "./src/some-module.js",
    "/\.css$/"
  ]
}
```

在上述示例中，`./src/some-module.js`文件和所有以`.css`结尾的文件都被认为有副作用，不会被tree shaking清理。


### 如果我某一个文件配置了 sideEffects 申明该文件有副作用， 但是我又想清理其中的某个函数

魔法中的魔法注释: `/*#__PURE__*/`

通过上面的知识， 我们知道了， 如果是有如果被 sideEffects 申明了副作用的文件， 是不会被 tree shaking 清理掉的，但是也有例外。

`/*#__PURE__*/`这个注释的作用是告诉Webpack或Babel等构建工具，这一行代码是纯粹的，没有副作用，并且可以安全地进行tree shaking（摇树优化）。

对于一些库或框架，可能会有一些函数或类被导出，但实际上很少被使用，为了让构建工具知道这些代码可以被删除，可以在导出语句上添加`/*#__PURE__*/`注释。

例如，假设 `src/myModule.js` 文件有下面的代码：

```javascript
export /*#__PURE__*/ function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

且 webpack 已经将 `src/myModule.js` 申明为了有副作用文件
```js
module.exports = {
  // ...
  optimization: {
    sideEffects: ["./src/myModule.js"],
  },
};
```
虽然通过 `sideEffects` 配置申明了 `./src/myModule.js` 文件是有副作用的，但是由于 `add` 方法前面有 `/*#__PURE__*/` 注释标记，意味着这个方法被标记为纯函数，该方法是没有副作用。

因此最终通过 `/*#__PURE__*/` 注释标记的 `add` 方法依然可以被 Webpack 的 Tree Shaking 清理。


### commonjs 模块就真的不能被 tree shaking 了？

> 下面这段来自于 webpack 官网
> 参考文档： https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#commonjs-tree-shaking

Webpack 曾经不进行对 CommonJs 导出和 require() 调用时的导出使用分析。

Webpack 5 增加了对一些 CommonJs 构造的支持，允许消除未使用的 CommonJs 导出，并从 require() 调用中跟踪引用的导出名称。

支持以下构造：

- `exports|this|module.exports.xxx = ...`
- `exports|this|module.exports = require("...") (reexport)`
- `exports|this|module.exports.xxx = require("...").xxx (reexport)`
- `Object.defineProperty(exports|this|module.exports, "xxx", ...)`
- `require("abc").xxx`
- `require("abc").xxx()`
- 从 ESM 导入
- `require()` 一个 ESM 模块
- 被标记的导出类型 (对非严格 ESM 导入做特殊处理):
    - `Object.defineProperty(exports|this|module.exports, "__esModule", { value: true|!0 })`
    - `exports|this|module.exports.__esModule = true|!0`

当检测到不可分析的代码时，webpack 会放弃，并且完全不跟踪这些模块的导出信息（出于性能考虑）。


### 终极必杀问：webpack tree-shaking 在什么情况下会失效

- 动态导入：如果你使用了动态导入（例如使用了 import() 或 require.ensure()），webpack 无法静态分析模块的导入和导出，因此无法进行 tree-shaking。

- 未使用 ES6 模块语法：tree-shaking 只能对 ES6 模块语法进行优化，如果你的代码中没有使用 ES6 模块语法，webpack 将无法进行 tree-shaking。

- 模块被动态引用或条件引用：如果模块的引用方式是动态的（例如在循环或条件语句中引用），或者通过字符串拼接来引用模块，webpack 无法确定哪些模块会被引用，因此无法进行 tree-shaking。

- 使用了副作用的代码：如果你的代码中包含有副作用的代码（例如在模块的顶级作用域中执行了一些操作），webpack 无法确定哪些代码是无用的，因此无法进行 tree-shaking。

可以参考这个回答：https://github.com/pro-collection/interview-question/issues/523

