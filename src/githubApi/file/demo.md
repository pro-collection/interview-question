**关键词**：打包优化

围绕 `webpack` 做性能优化，分为两个方面：`构建时间优化`、`构建体积优化`

### 构建时间优化

<!-- toc -->

  * [缩小范围](#%E7%BC%A9%E5%B0%8F%E8%8C%83%E5%9B%B4)
  * [文件后缀](#%E6%96%87%E4%BB%B6%E5%90%8E%E7%BC%80)
  * [别名](#%E5%88%AB%E5%90%8D)
  * [缓存](#%E7%BC%93%E5%AD%98)
  * [并行构建](#%E5%B9%B6%E8%A1%8C%E6%9E%84%E5%BB%BA)
  * [定向查找第三方模块](#%E5%AE%9A%E5%90%91%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%89%E6%96%B9%E6%A8%A1%E5%9D%97)
- [构建结果优化](#%E6%9E%84%E5%BB%BA%E7%BB%93%E6%9E%9C%E4%BC%98%E5%8C%96)
  * [压缩 js](#%E5%8E%8B%E7%BC%A9-js)
  * [压缩 css](#%E5%8E%8B%E7%BC%A9-css)
  * [压缩 html](#%E5%8E%8B%E7%BC%A9-html)
  * [压缩图片](#%E5%8E%8B%E7%BC%A9%E5%9B%BE%E7%89%87)
  * [按需加载](#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
  * [prload、prefetch](#prloadprefetch)
  * [代码分割](#%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2)
  * [tree shaking](#tree-shaking)
  * [gzip](#gzip)
  * [作用域提升](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%90%E5%8D%87)

<!-- tocstop -->

#### 缩小范围

我们在使用 loader 时，可以配置 `include`、`exclude`缩小 loader 对文件的搜索范围，以此来提高构建速率。

像 `/node_moudles` 目录下的体积辣么大，又是第三方包的存储目录，直接 `exclude` 掉可以节省一定的时间的。

当然 `exclude` 和 `include` 可以一起配置，大部分情况下都是只需要使用 loader 编译 src 目录下的代码

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(|ts|tsx|js|jsx)$/,
                // 只解析 src 文件夹下的 ts、tsx、js、jsx 文件
                // include 可以是数组，表示多个文件夹下的模块都要解析
                include: path.resolve(__dirname, '../src'), 
                use: [ 'thread-loader', 'babel-loader'],
                
                //当然也可以配置 exclude，表示 loader 解析时不会编译这部分文件
                //同样 exclude 也可以是数组
                exclude: /node_modules/,
            }
        ]
    }
}
```

还需注意一个点就是要确保 loader 的`准确性`，**比如不要使用 less-loader 去解析 css 文件**

#### 文件后缀

`resolve.extensions` 是我们常用的一个配置，他可以在导入语句没有带文件后缀时，可以按照配置的列表，自动补上后缀。**我们应该根据我们项目中文件的实际使用情况设置后缀列表，将使用频率高的放在前面、同时后缀列表也要尽可能的少，减少没有必要的匹配**。同时，我们在源码中写导入语句的时候，尽量带上后缀，避免查找匹配浪费时间。

```js
module.export = {
  resolve: {
    // 按照 tsx、ts、jsx、js 的顺序匹配，若没匹配到则报错
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  }
}
```

#### 别名

通过配置 `resolve.alias` 别名的方式，减少引用文件的路径复杂度

```js
module.exports = {
    resolve: {
        alias: {
            //把 src 文件夹别名为 @
            //引入 src 下的文件就可以 import xxx from '@/xxx'
            '@': path.join(__dirname, '../src')
        }
    }
}

// 引入 src 下的某个模块时
import XXX from '@/xxx/xxx.tsx'
```

#### 缓存

在优化的方案中，缓存也是其中重要的一环。在构建过程中，开启缓存提升二次打包速度。

在项目中，js 文件是占大头的，当项目越来越大时，如果每次都需要去编译 JS 代码，那么构建的速度肯定会很慢的，所以我们可以配置 `babel-loader` 的缓存配置项 `cacheDirectory` 来缓存没有变过的 js 代码

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          }
        ]
      }
    ]
  }
}
```

上面的缓存优化只是针对像 `babel-loader` 这样可以配置缓存的 loader，那没有缓存配置的 loader 该怎么使用缓存呢，此时需要 `cache-loader`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          'cache-loader', 
          "babel-loader"
        ],
      }
    ]
  }
}
```

编译后同样多一个 `/node_modules/.cache/cache-loader` 缓存目录

当然还有一种方式，`webpack5`直接提供了 `cache` 配置项，开启后即可缓存

```js
module.exports = {
  cache: {
    type: 'filesystem'
  }
}
```

编译后会多出 `/node_modules/.cache/webpack` 缓存目录

#### 并行构建

首先，运行在`Node`里的`webpack`是单线程的，所以一次性只能干一件事，那如果利用电脑的多核优势，也能提高构建速度 ？[thread-loader](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fthread-loader "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fthread-loader")可以开启多进程打包

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          // 开启多进程打包。 
          {
            loader: 'thread-loader', 
            options: {
              workers: 3 // 开启 3个 进程
            }
          },
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  }
}
```

放置在这个 `thread-loader` 之后的 loader 就会在一个单独的 worker 池(worker pool) 中运行。

每个 worker 都是一个单独的有 600ms 限制的 `node.js` 进程。同时跨进程的数据交换也会被限制。所以建议仅在耗时的 loader 上使用。若项目文件不算多就不要使用，毕竟开启多个线程也会存在性能开销。

#### 定向查找第三方模块

`resolve.modules` 配置用于指定 `webpack` 去哪些目录下寻找第三方模块。默认值是 `['node_modules']`。而在引入模块的时候，会以 `node 核心模块 -----> node_modules ------> node全局模块` 的顺序查找模块。

我们通过配置 resolve.modules 指定 webpack 搜索第三方模块的范围，提高构建速率

```js
module.export = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}
```

### 构建结果优化

#### 压缩 js

webpack5的话通过 `terser-webpack-plugin` 来压缩 JS，但在配置了 `mode: production` 时，会默认开启

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    // 开启压缩
    minimize: true,
    // 压缩工具
    minimizer: [
      new TerserPlugin({}),
    ],
  },
}
```

需要注意一个地方：生产环境会默认配置`terser-webpack-plugin`，所以如果你还有其它压缩插件使用的话需要将`TerserPlugin`显示配置或者使用`...`，否则`terser-webpack-plugin`会被覆盖。

```js
const TerserPlugin = require("terser-webpack-plugin"); 

optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({}), // 显示配置
    // "...", // 或者使用展开符，启用默认插件
    // 其它压缩插件
    new CssMinimizerPlugin(),
  ],
},
```

#### 压缩 css

压缩 css 我们使用 `css-minimizer-webpack-plugin`

同时，应该把 css 提取成单独的文件，使用 `mini-css-extract-plugin`

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
           // 提取成单独的文件
           MiniCssExtractPlugin.loader,
           "css-loader"
        ],
        exclude: /node_modules/, 
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "asset/css/main.css",
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 css
      new CssMinimizerPlugin({}),
    ],
  },
}
```

#### 压缩 html

压缩 `html` 使用的还是 `html-webpack-plugin` 插件。该插件支持配置一个 [minify](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkangax%2Fhtml-minifier%23options-quick-reference "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkangax%2Fhtml-minifier%23options-quick-reference") 对象，用来配置压缩 `html`。

```js
module.export = {
  plugins: [
    new HtmlWebpackPlugin({
      // 动态生成 html 文件
      template: "./index.html",
      minify: {
        // 压缩HTML
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true // 压缩内联css
      },
    })
  ]
}
```

#### 压缩图片

可以通过 `image-webpack-loader` 来实现

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
        exclude: /node_modules/, //排除 node_modules 目录
      },
    ]
  },
}
```

#### 按需加载

很多时候我们不需要一次性加载所有的`JS`文件，而应该在不同阶段去加载所需要的代码。

**将路由页面/触发性功能单独打包为一个文件，使用时才加载**，好处是`减轻首屏渲染的负担`。因为项目功能越多其打包体积越大，导致首屏渲染速度越慢。

实际项目中大部分是对懒加载路由，而懒加载路由可以打包到一个 chunk 里面。比如某个列表页和编辑页它们之间存在相互跳转，如果对它们拆分成两个 `import()` js 资源加载模块，在跳转过程中视图会出现白屏切换过程。

因为在跳转期间，浏览器会动态创建 script 标签来加载这个 `chunk` 文件，在这期间，页面是没有任何内容的。

所以一般会把路由懒加载打包到一个 chunk 里面

```js
const List = lazyComponent('list', () => import(/* webpackChunkName: "list" */ '@/pages/list'));
const Edit = lazyComponent('edit', () => import(/* webpackChunkName: "list" */ '@/pages/edit'));
```

但需要注意一点：**动态导入 import() 一个模块，这个模块就不能再出现被其他模块使用 `同步 import` 方式导入。**

比如，一个路由模块在注册 `<Route />` 时采用动态 import() 导入，但在这个模块对外暴露了一些变量方法供其他子模块使用，在这些子模块中使用了同步 ESModule import 方式引入，这就造成了 `动态 import()` 的失效。

#### prload、prefetch

对于某些较大的模块，如果点击时再加载，那可能响应的时间反而延长。我们可以使用 `prefetch`、`preload` 去加载这些模块

`prefetch`：将来可能需要一些模块资源（一般是其他页面的代码），在核心代码加载完成之后`带宽空闲`的时候再去加载需要用到的模块代码。

`preload`：当前核心代码加载期间可能需要模块资源（**当前页面需要的但暂时还没使用到的**），其是和核心代码文件一起去加载的。

只需要通过`魔法注释`即可实现，以 `prefetch` 为例：

```js
document.getElementById('btn1').onclick = function() {
  import(
  /* webpackChunkName: "btnChunk" */
  /* webpackPrefetch: true*/
  './module1.js'
  ).then(fn => fn.default());
}
```

这行代码表示在浏览器空闲时加载 module1.js 模块，并且单独拆一个 chunk，叫做 btnChunk

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2e2b2771db547138ed818cd33d23139~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到，在`head`里面，我们的懒加载模块被直接引入了，并且加上了`rel='prefetch'`。

这样，页面首次加载的时候，浏览器空闲的会后会提前加载`module1.js`。当我们点击按钮的时候，会直接从缓存中读取该文件，因此速度非常快。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95cd9e7ee4b345ec8ef5eca12947f650~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 代码分割

在项目中，一般是使用同一套技术栈和公共资源。**如果每个页面的代码中都有这些公开资源，就会导致资源的浪费**。在每一个页面下都会加载重复的公共资源，一是会浪费用户的流量，二是不利于项目的性能，造成页面加载缓慢，影响用户体验。

一般是把不变的**第三方库**、**一些公共模块**（比如 util.js）这些单独拆成一个 chunk，在访问页面的时候，就可以一直使用浏览器缓存中的资源

webpack 里面通过 `splitChunks` 来分割代码

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 值有 `all`，`async` 和 `initial`
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\/]node_modules[\/]/,  //第三方模块拆出来
          priority: -10,
          reuseExistingChunk: true,
        },
        util.vendors: {
          test: /[\/]utils[\/]/, //公共模块拆出来
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

#### tree shaking

tree shaking 的原理细节可以看这篇文章[：# webpack tree-shaking解析](https://juejin.cn/post/7246219936594821180 "https://juejin.cn/post/7246219936594821180")

`tree shaking`在**生产模式下已经默认开启了**

只是需要注意下面几点：

1. 只对`ESM`生效
2. 只能是静态声明和引用的 `ES6` 模块，不能是动态引入和声明的。
3. 只能处理模块级别，不能处理函数级别的冗余。
4. 只能处理 `JS` 相关冗余代码，不能处理 `CSS` 冗余代码。

而可能样式文件里面有些代码我们也没有使用，我们可以通过`purgecss-webpack-plugin` 插件来对 css 进行 tree shaking

```js
const path = require("path");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob"); // 文件匹配模式

module.exports = {
  //...
  plugins: [
    ...
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATH.src}/**/*`, { nodir: true }),
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
};
```

#### gzip

前端除了在打包的时候将无用的代码或者 `console`、注释剔除之外。我们还可以使用 `Gzip` 对资源进行进一步压缩。那么浏览器和服务端是如何通信来支持 `Gzip` 呢？

1. 当用户访问 web 站点的时候，会在 `request header` 中设置 `accept-encoding:gzip`，表明浏览器是否支持 `Gzip`。
2. 服务器在收到请求后，判断如果需要返回 `Gzip` 压缩后的文件那么服务器就会先将我们的 `JS\CSS` 等其他资源文件进行 `Gzip` 压缩后再传输到客户端，同时将 `response headers` 设置 `content-encoding:gzip`。反之，则返回源文件。
3. 浏览器在接收到服务器返回的文件后，判断服务端返回的内容是否为压缩过的内容，是的话则进行解压操作。

一般情况下我们并不会让服务器实时 `Gzip` 压缩，而是利用`webpack`提前将静态资源进行`Gzip` 压缩，然后将`Gzip` 资源放到服务器，当请求需要的时候直接将`Gzip` 资源发送给客户端。

我们只需要安装 `compression-webpack-plugin` 并在`plugins`配置就可以了

```js
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 需要安装

module.exports = {
  plugins: [
    new CompressionWebpackPlugin()
  ]
}
```

#### 作用域提升

`Scope Hoisting` 可以让 `webpack` 打包出来的代码文件体积更小，运行更快。

在开启 `Scope Hoisting`后，**构建后的代码会按照引入顺序放到一个函数作用域里，通过适当重命名某些变量以防止变量名冲突**，从而减少函数声明和内存花销。

需要注意：`Scope Hoisting` 需要分析模块之间的依赖关系，所以源码必须采用 ES6 模块化语法

`Scope Hoisting` 是 webpack 内置功能，只需要在`plugins`里面使用即可，或者直接开启生产环境也可以让作用域提升生效。

```js
module.exports = {
  //方式1
  mode: 'production',

  //方式2
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```
