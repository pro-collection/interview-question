### 在 Webpack 中，可以通过以下方式进行分包

1. 通过 `entry` 属性指定入口文件，在打包时，Webpack 会按照入口文件生成一个 chunk，每个 chunk 包含了一组代码块，最终生成一个或多个 bundle。

2. 通过 `SplitChunksPlugin` 插件对公共依赖进行分割。该插件会把公共依赖提取出来，形成一个或多个独立的 chunk，以便在多个 bundle 中共享。

3. 使用动态导入（Dynamic Import）技术进行按需加载。在代码中使用 `import()` 或 `require.ensure()`，Webpack 会将这些代码块按照配置的策略进行分割，生成一个或多个独立的 chunk。

4. 使用 `DllPlugin` 插件将一些不经常变化的代码提取出来，形成一个动态链接库（DLL）。在打包时，可以直接引用这个 DLL，而不必重复打包。

5. 通过 `externals` 属性将一些模块声明为外部依赖。在打包时，Webpack 会跳过这些模块的打包过程，而是在运行时从外部环境中加载。

### SplitChunksPlugin 是怎么对公共依赖进行分割的 ?

Webpack的SplitChunksPlugin插件是用来对公共依赖进行分割的，其原理是将公共模块提取出来，形成一个或多个共享块，并在需要时动态加载。这个插件会分析模块之间的依赖关系，将具有相同引用模块的代码块进行提取，以便于实现缓存和更快的加载。

SplitChunksPlugin的默认配置包括以下三个块：

1. 通过异步加载（异步块）生成的代码块
2. 与初始块（即入口点）共享的代码块
3. 在两个或更多块之间共享的代码块

其中，第二个块是最常见的，它包括从多个入口点引用的公共模块。我们可以通过以下示例来说明：

```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/main.js',
    other: './src/other.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

在上面的配置中，我们定义了两个入口点`main`和`other`，并将`SplitChunksPlugin`配置为将从`node_modules`目录中引用的代码提取到名为`vendors`的代码块中。这个代码块将被引用到我们的入口点中，以便于减少加载时间和提高性能。

当我们打包时，Webpack将分析这两个入口点，并发现它们都引用了`node_modules`目录下的依赖，于是将这些依赖提取到`vendors`代码块中。我们可以在`main.js`和`other.js`中看到这样的代码：

```javascript
import 'lodash'; // 公共模块被引用
```

通过这种方式，Webpack能够将公共代码提取到单独的代码块中，以便于更高效地加载和缓存。


### webpack DllPlugin 是如何提取依赖的？
Webpack DllPlugin 是用于将某些库（例如第三方库）提前编译和打包，以便在开发和生产构建过程中减少依赖项的分析时间，提高打包速度的插件。

具体来说，DllPlugin 分为两个步骤：第一步是生成一个包含库的映射文件（manifest.json），第二步是在开发或生产构建中使用该映射文件来引入预编译的库。

DllPlugin 的基本原理是将库单独编译成一个或多个 dll 文件（动态链接库），同时生成一个 manifest.json 文件记录这些库文件的名称、路径等信息。在开发或生产构建过程中，通过引用 manifest.json 文件，将已经预编译好的库文件引入到项目中。这样可以避免在每次打包时都去分析和打包第三方库，提高构建速度。

下面是一个简单的例子：

在 webpack.config.dll.js 中定义打包的库：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'lodash']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'dist', '[name].manifest.json')
    })
  ]
};
```

然后运行 `webpack --config webpack.config.dll.js`，会生成 `vendor.dll.js` 和 `vendor.manifest.json` 文件。

在开发或生产环境中，通过引入生成的 manifest.json 文件，将预编译好的库文件引入项目中：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dist/vendor.manifest.json')
    })
  ]
};
```

这样，在打包过程中，webpack 会自动将 `vendor.dll.js` 中包含的第三方库从项目中分离出来，而不需要重复打包和分析这些库。
