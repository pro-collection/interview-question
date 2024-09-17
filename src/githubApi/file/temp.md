> 作者：程序员吴铭  
> 链接：https://juejin.cn/post/7350535815132659749?searchId=20240915155824ADB9326F2CAF4BF8BE1F#heading-11  
> 来源：稀土掘金  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

【前端面试复习系列文章】

[2024 前端高频面试题-- html 篇](https://juejin.cn/post/7316349850855211046%22https://juejin.cn/post/7316349850855211046%22 "https://juejin.cn/post/7316349850855211046%22https://juejin.cn/post/7316349850855211046%22")

[2024 前端高频面试题-- CSS 篇](https://juejin.cn/post/6844904013620592654 "https://juejin.cn/post/6844904013620592654")

[2024 前端高频面试题-- JS 篇](https://juejin.cn/spost/7330065707358208010 "https://juejin.cn/spost/7330065707358208010")

[2024 前端高频面试题-- VUE 篇](https://juejin.cn/post/7343484473184698405 "https://juejin.cn/post/7343484473184698405")

[2024 前端高频面试题-- React 篇](https://juejin.cn/post/7349971654590857216 "https://juejin.cn/post/7349971654590857216")

[2024 前端高频面试题-- HTTP 和浏览器篇](https://juejin.cn/post/7351301328206331939 "https://juejin.cn/post/7351301328206331939")

[2024 前端高频面试题-- 手写代码篇](https://juejin.cn/post/7353456468094599205 "https://juejin.cn/post/7353456468094599205")

[2024 前端高频面试题-- 数据结构与算法篇](https://juejin.cn/post/7356060104565997605 "https://juejin.cn/post/7356060104565997605")

【导读】本文总结了前端面试中经常问到的前端工程化高频面试题，仅供参考。

下图为思维导图：

![前端工程化.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a9501f6130742d395c9d40d784801dc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2340&h=7934&s=2408107&e=jpg&b=313131)

### 1.webpack 配置有哪些 ?

Webpack 的配置主要包括以下几个部分：

- entry。指定 Webpack 打包的入口文件，可以是单个或多个 JavaScript 文件。这个配置决定了 Webpack 从哪个模块开始生成依赖关系图。1234
- output。设置 Webpack 打包后输出的目录和文件名称，包括 path、filename 和 publicPath 等。235
- module。配置了不同的 loaders 来处理不同的模块，例如，对于 CSS 文件，可以使用 css-loader 和 style-loader。2345
- [resolve**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dresolve%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=resolve&sa=re_dqa_zy")。设置 Webpack 如何解析模块依赖，包括别名、扩展名等。
- [plugins**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dplugins%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=plugins&sa=re_dqa_zy")。使用不同的插件可以增强 Webpack 的功能，例如，使用 html-webpack-plugin 可以将打包后的 js 文件自动引用到 HTML 文件中。
- [devServer**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3DdevServer%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=devServer&sa=re_dqa_zy")。提供了一个简单的 web 服务器和实时重载功能，可以通过 devServer.contentBase、devServer.port、devServer.proxy 等进行配置。
- [optimization**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Doptimization%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=optimization&sa=re_dqa_zy")。可以使用 optimization.splitChunks 和 optimization.runtimeChunk 配置代码拆分和运行时代码提取等优化策略。
- [externals**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dexternals%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=externals&sa=re_dqa_zy")。用于配置排除打包的模块，例如，可以将 jQuery 作为外置扩展，避免将其打包到应用程序中。
- devtool。配置 source-map 类型。
- [context**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dcontext%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=context&sa=re_dqa_zy")。webpack 使用的根目录，string 类型必须是绝对路径。
- [target**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dtarget%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=target&sa=re_dqa_zy")。指定 Webpack 编译的目标环境。
- [performance**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dperformance%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=performance&sa=re_dqa_zy")。输出文件的性能检查配置。
- [noParse**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3DnoParse%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=noParse&sa=re_dqa_zy")。不用解析和处理的模块。
- [stats**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dstats%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=stats&sa=re_dqa_zy")。控制台输出日志控制。

### 2.有哪些常见的 Loader 和 Plugin？

Loader:

- babel-loader：将 ES6+的代码转换成 ES5 的代码。
- css-loader：解析 CSS 文件，并处理 CSS 中的依赖关系。
- style-loader：将 CSS 代码注入到 HTML 文档中。
- file-loader：解析文件路径，将文件赋值到输出目录，并返回文件路径。
- url-loader：类似于 file-loader，但是可以将小于指定大小的文件转成 base64 编码的 Data URL 格式
- sass-loader：将 Sass 文件编译成 CSS 文件。
- less-loader：将 Less 文件编译成 CSS 文件。
- postcss-loader：自动添加 CSS 前缀，优化 CSS 代码等。
- vue-loader：将 Vue 单文件组件编译成 JavaScript 代码。

Plugin:

- HtmlWebpackPlugin：生成 HTML 文件，并自动将打包后的 javaScript 和 CSS 文件引入到 HTML 文件中。
- CleanWebpackPlugin：清除输出目录。
- ExtractTextWebpackPlugin：将 CSS 代码提取到单独的 CSS 文件中。
- DefinePlugin：定义全局变量。
- UglifyJsWebpackPlugin：压缩 JavaScript 代码。
- HotModuleReplacementPlugin：热模块替换，用于在开发环境下实现热更新。
- MiniCssExtractPlugin：与 ExtractTextWebpackPlugin 类似，将 CSS 代码提取到单独的 CSS 文件中。
- BundleAnalyzerPlugin：分析打包后的文件大小和依赖关系。

### 3.Loader 和 Plugin 的区别

功能不同：

Loader 本质是一个函数，它是一个转换器。webpack 只能解析原生 js 文件，对于其他类型文件就需要 loade 进行转换。

Plugin 它是一个插件，用于增强 webpack 功能。webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果 。

用法不同：

Loader 的配置是在 module.rules 下进行。类型为数组，每⼀项都是⼀个 Object ，⾥⾯描述了对于什么类型的⽂件（ test ），使⽤什么加载( loader )和使⽤的参数（ options ） 。

Plugin 的配置在 plugins 下。类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### 4.webpack 的构建流程

[Webpack**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3DWebpack%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=Webpack&sa=re_dqa_zy")的构建流程主要包括以下几个步骤：

0. 初始化参数。解析 Webpack 配置参数，合并[Shell**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3DShell%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=Shell&sa=re_dqa_zy")传入和 webpack.config.js 文件配置的参数，形成最终的配 置结果。
1. 开始编译。使用上一次得到的参数初始化 compiler 对象，注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
2. 确定入口。从配置的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。
3. 编译模块。递归中根据文件类型和[loader**](https://link.juejin.cn?target=https%3A%2F%2Fm.baidu.com%2Fs%3Fword%3Dloader%26sa%3Dre_dqa_zy "https://m.baidu.com/s?word=loader&sa=re_dqa_zy")配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
4. 完成模块编译。在经过第四步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
5. 输出资源。根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
6. 输出完成。在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

这个流程是一个串行的过程，Webpack 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来。在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条 Webpack 机制中，去改变 Webpack 的运作，使得整个系统扩展性良好。

### 5.什么是 Webpack 的热更新（Hot Module Replacement）？原理是什么？

Webpack 的热更新，在不刷新页面的前提下，将新代码替换掉旧代码。

HRM 的原理实际上是 webpack-dev-server（WDS）和浏览器之间维护了一个 websocket 服务。当本地资源发生变化后，webpack 会先将打包生成新的模块代码放入内存中，然后 WDS 向浏览器推送更新，并附带上构建时的 hash，让客户端和上一次资源进行对比.

### 6.什么是 Code Splitting

Code Splitting 代码分割，是一种优化技术。它允许将一个大的 chunk 拆分成多个小的 chunk，从而实现按需加载，减少初始加载时间，并提高应用程序的性能 。

在 Webpack 中通过 optimization.splitChunks 配置项来开启代码分割

### 7.Webpack 的 Source Map 是什么？如何配置生成 Source Map？

Source Map 是一种文件，它建立了构建后的代码与原始源代码之间的映射关系。通常在开发阶段开启，用来调试代码，帮助找到代码问题所在。

在 Webpack 配置文件中的 devtool 选项中指定 devtool: 'source-map'来开启

### 8.Webpack 的 Tree Shaking 原理

Webpack 的 Tree Shaking 是一个利用 ES6 模块静态结构特性来去除生产环境下不必要代码的优化过程。其工作原理在于：

0. 当 Webpack 分析代码时，它会标记出所有的 import 语句和 export 语句。
1. 然后，当 Webpack 确定某个模块没有被导入时，它会在生成的 bundle 中排除这个模块的代码。
2. 同时，Webpack 还会进行递归的标记清理，以确保所有未使用的依赖项都不会出现在最终的 bundle 中。

为了启用 Tree Shaking，需要在 webpack 配置文件中添加如下设置：

```yaml
yaml 代码解读javascriptmodule.exports = {  // ...  optimization: {    usedExports: true,    concatenateModules: true,    minimize: true,  },  // ...};
```

确保你使用的是 ES6 模块语法（即 import 和 export），因为只有这样才能让 Tree Shaking 发挥作用。

### 9.如何提高 webpack 的打包速度

- 利用缓存：利用 Webpack 的持久缓存功能，避免重复构建没有变化的代码
- 使用多进程/多线程构建 ：使用 thread-loader、happypack 等插件可以将构建过程分解为多个进程或线程
- 使用 DllPlugin 和 HardSourceWebpackPlugin： DllPlugin 可以将第三方库预先打包成单独的文件，减少构建时间。HardSourceWebpackPlugin 可以缓存中间文件，加速后续构建过程
- 使用 Tree Shaking: 配置 Webpack 的 Tree Shaking 机制，去除未使用的代码，减小生成的文件体积
- 移除不必要的插件: 移除不必要的插件和配置，避免不必要的复杂性和性能开销

### 10.如何减少打包后的代码体积

- 代码分割（Code Splitting）：将应用程序的代码划分为多个代码块，按需加载
- Tree Shaking：配置 Webpack 的 Tree Shaking 机制，去除未使用的代码
- 压缩代码：使用工具如 UglifyJS 或 Terser 来压缩 JavaScript 代码
- 使用生产模式：在 Webpack 中使用生产模式，通过设置 mode: 'production'来启用优化
- 使用压缩工具：使用现代的压缩工具，如 Brotli 和 Gzip，来对静态资源进行压缩
- 利用 CDN 加速：将项目中引用的静态资源路径修改为 CDN 上的路径，减少图片、字体等静态资源等打包

### 11. vite 比 webpack 快在哪里

**(一）、开发模式的差异**

在开发环境中，`Webpack` 是先打包再启动开发服务器，而 `Vite` 则是直接启动，然后再按需编译依赖文件。（大家可以启动项目后检查源码 `Sources` 那里看到）

这意味着，当使用 `Webpack` 时，所有的模块都需要在开发前进行打包，这会增加启动时间和构建时间。

而 `Vite` 则采用了不同的策略，它会在请求模块时再进行实时编译，这种按需动态编译的模式极大地缩短了编译时间，特别是在大型项目中，文件数量众多，`Vite` 的优势更为明显。

**Webpack 启动**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc3d36d0cca24ea5a0592000fc3034ca~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1029&h=552&s=20782&e=webp&b=fcfcfc)

**Vite 启动**

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/685974c37709481c877d3f0bb3bd4f9e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=892&h=838&s=24700&e=webp&b=fefefe)

**（二）、对 ES Modules 的支持**

现代浏览器本身就支持 `ES Modules`，会`主动发起`请求去获取所需文件。Vite 充分利用了这一点，将开发环境下的模块文件直接作为浏览器要执行的文件，而不是像 Webpack 那样`先打包`，再交给浏览器执行。这种方式减少了中间环节，提高了效率。

**什么是 ES Modules？**

通过使用 `export` 和 `import` 语句，ES Modules 允许在浏览器端导入和导出模块。

当使用 ES Modules 进行开发时，开发者实际上是在构建一个`依赖关系图`，不同依赖项之间通过导入语句进行关联。

主流浏览器（除 IE 外）均支持 ES Modules，并且可以通过在 script 标签中设置 `type="module"`来加载模块。默认情况下，模块会延迟加载，执行时机在文档解析之后，触发 DOMContentLoaded 事件前。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2da62dc4900d4a3ba4e04b228384cea4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2059&h=823&s=84182&e=webp&b=f0e7d2)

**(3)、底层语言的差异**

Webpack 是基于 `Node.js` 构建的，而 Vite 则是基于 `esbuild` 进行预构建依赖。esbuild 是采用 `Go` 语言编写的，Go 语言是`纳秒`级别的，而 Node.js 是`毫秒`级别的。因此，Vite 在打包速度上相比 Webpack 有 `10-100` 倍的提升。

**什么是预构建依赖？**

预构建依赖通常指的是在项目`启动或构建`之前，对项目中所需的依赖项进行预先的`处理或构建`。这样做的好处在于，当项目实际运行时，可以`直接使用`这些已经预构建好的依赖，而无需再进行实时的编译或构建，从而提高了应用程序的运行速度和效率。

**(4)、热更新的处理**

在 Webpack 中，当一个模块或其依赖的模块内容改变时，需要`重新编译`这些模块。

而在 Vite 中，当某个模块内容改变时，只需要让浏览器`重新请求`该模块即可，这大大减少了热更新的时间。

### 12. 说一下你对 Monorepo 的理解

Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。Monorepo 提倡了开放、透明、共享的组织文化，这种方法已经被很多大型公司广泛使用，如 Google、Facebook 和 Microsoft 等。

Monorepo 优劣：

| **场景**   | **MultiRepo**                                                                                                                                                                                                                                                 | **MonoRepo**                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 代码可见性 | ✅ 代码隔离，研发者只需关注自己负责的仓库 ❌ 包管理按照各自 owner 划分，当出现问题时，需要到依赖包中进行判断并解决。                                                                                                                                          | ✅ 一个仓库中多个相关项目，很容易看到整个代码库的变化趋势，更好的团队协作。 ❌ 增加了非 owner 改动代码的风险                                                                                                                                                      |
| 依赖管理   | ❌ 多个仓库都有自己的 node_modules，存在依赖重复安装情况，占用磁盘内存大。                                                                                                                                                                                    | ✅ 多项目代码都在一个仓库中，相同版本依赖提升到顶层只安装一次，节省磁盘内存，                                                                                                                                                                                     |
| 代码权限   | ✅ 各项目单独仓库，不会出现代码被误改的情况，单个项目出现问题不会影响其他项目。                                                                                                                                                                               | ❌ 多个项目代码都在一个仓库中，没有项目粒度的权限管控，一个项目出问题，可能影响所有项目。                                                                                                                                                                         |
| 开发迭代   | ✅ 仓库体积小，模块划分清晰，可维护性强。 ❌ 多仓库来回切换（编辑器及命令行），项目多的话效率很低。多仓库见存在依赖时，需要手动 `npm link`，操作繁琐。 ❌ 依赖管理不便，多个依赖可能在多个仓库中存在不同版本，重复安装，npm link 时不同项目的依赖会存在冲突。 | ✅ 多个项目都在一个仓库中，可看到相关项目全貌，编码非常方便。 ✅ 代码复用高，方便进行代码重构。 ❌ 多项目在一个仓库中，代码体积多大几个 G，`git clone`时间较长。 ✅ 依赖调试方便，依赖包迭代场景下，借助工具自动 npm link，直接使用最新版本依赖，简化了操作流程。 |
| 工程配置   | ❌ 各项目构建、打包、代码校验都各自维护，不一致时会导致代码差异或构建差异。                                                                                                                                                                                   | ✅ 多项目在一个仓库，工程配置一致，代码质量标准及风格也很容易一致。                                                                                                                                                                                               |
| 构建部署   | ❌ 多个项目间存在依赖，部署时需要手动到不同的仓库根据先后顺序去修改版本及进行部署，操作繁琐效率低。                                                                                                                                                           | ✅ 构建性 Monorepo 工具可以配置依赖项目的构建优先级，可以实现一次命令完成所有的部署。                                                                                                                                                                             |

### 13.你在项目是怎么做 Monorepo？

**工具对比**

| 工具     | **Turborepo** | **Rush** | **Nx** | **Lerna** | **Pnpm Workspace** |
| -------- | ------------- | -------- | ------ | --------- | ------------------ |
| 依赖管理 | ❌            | ✅       | ❌     | ❌        | ✅                 |
| 版本管理 | ❌            | ✅       | ❌     | ✅        | ❌                 |
| 增量构建 | ✅            | ✅       | ✅     | ❌        | ❌                 |
| 插件扩展 | ✅            | ✅       | ✅     | ❌        | ❌                 |
| 云端缓存 | ✅            | ✅       | ✅     | ❌        | ❌                 |
| Stars    | 20.4K         | 4.9K     | 17K    | 34.3K     | 22.7K              |

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d85551b9ce50496d8403956b571c4635~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2610&h=1020&s=64366&e=webp&b=fdfdfd)

详细对比：

- [Nx and Turborepo](https://link.juejin.cn?target=https%3A%2F%2Fnx.dev%2Fmore-concepts%2Fturbo-and-nx "https://link.juejin.cn?target=https%3A%2F%2Fnx.dev%2Fmore-concepts%2Fturbo-and-nx")
- [lerna-vs-turbopack-rush](https://link.juejin.cn?target=https%3A%2F%2Fbyteofdev.com%2Fposts%2Flerna-vs-turbopack-rush "https://link.juejin.cn?target=https%3A%2F%2Fbyteofdev.com%2Fposts%2Flerna-vs-turbopack-rush")

**选型建议**

- 建议采用渐进式架构方案，即对于轻量级 Monorepo 项目，我们初期可以选择 Lerna + pnpm workspace + lerna-changelog，解决了依赖管理、发版管理等问题，为开发者带来便利；随着后续项目迭代，代码变多或多个项目间依赖关系复杂，可以很平滑的接入 Nx 来提升构建打包效率。

### 14.为什么 pnpm 比 npm 快

**Pnpm 比 npm 快的原因在于其优化的文件存储方式、依赖管理方式以及并行下载能力。** 以下是详细介绍：

- Pnpm 使用基于内容寻址的文件系统来存储磁盘上的所有文件，这意味着它不会在磁盘中重复存储相同的依赖包，即使这些依赖包被不同的项目所依赖。这种存储方式使得 Pnpm 在安装依赖时能够更高效地利用磁盘空间，同时也减少了下载和安装的时间。
- Pnpm 在下载和安装依赖时采用了并行下载的能力，这进一步提高了安装速度。
- Pnpm 还具有一些其他特性，例如节省空间的硬链接和符号链接的使用，这些都有助于提高其性能。

### 15.ESLint 概念及原理

Lint 会对代码做静态分析，检查出其中的一些结构错误或者格式错误。在前端领域中，我们常用的 lint 就是 ESLint，它用于检查 JavaScript 代码是否符合规则 。

**基本原理**

ESLint 基本架构图如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44b465e402c84679946897eaa0d7eebd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1102&h=1024&s=33820&e=webp&b=fdfdfd)

`lib/linter/` - 这个模块是核心的 `Linter` 类，根据配置选项进行代码验证、检查并修复问题。这个文件不做任何文件 I/O，并且完全不与`console`互动。

Linter 是 eslint 最核心的类了，它提供了这几个 api：

- 检查：verify
- 检查并修复：verifyAndFix
- 获取 AST：getSourceCode
- 定义 Parser：defineParser
- 定义 Rule：defineRule
- 获取所有的 Rule：getRules

其中 SourceCode 指的是 AST（抽象语法树），源代码字符串通过 Parser 解析成 AST，之后 ESLint 就可以通过 AST 提供的信息与 Rules 对比，从而给出代码规范分析的结果，指出错误，并且还可以自动修复。

Linter 主要的功能是在 verify 和 verifyAndFix 里实现的，当命令行指定 `--fix` 或者配置文件指定 `fix: true` 就会调用 verifyAndFix 对代码进行检查并修复，否则会调用 verify 来进行检查。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddf06417bfa1498c987363e10f56b8f1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=711&h=477&s=5990&e=webp&b=ffffff)

#### AST

ESLint 拿到源代码后会进行 parse 操作，生成 AST 用于静态分析。ESLint 使用的是[Espree](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Feslint%2Fespree "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Feslint%2Fespree") parser。

> Estree 是一套 AST 标准，[Esprima](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjquery%2Fesprima "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjquery%2Fesprima")基于 estree 标准实现了 AST。[Acorn](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Facornjs%2Facorn "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Facornjs%2Facorn")，它在 Exprima 之后出现，也是 estree 标准的实现，但是它速度比 esprima 快，而且支持插件，可以通过插件扩展语法支持。
>
> Espree 最初 Fork 自 Esprima，因为 Acorn 的各种优点现在它建立在 Acorn 之上。

下面简单介绍下 Espree 解析器下 AST 的几个常见的节点，也可以在[estree](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Festree%2Festree "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Festree%2Festree")中查看更多详情。

##### Literal

Literal 是字面量的意思，它的值可以是布尔、数字、字符串等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31376afb40d34da799e49cdb2224cb44~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1360&h=946&s=37620&e=webp&b=fae9df)

##### Identifer

Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是 Identifer。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db9eaad722ae403296ef6acb541674d2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1356&h=910&s=29794&e=webp&b=f8ece9)

##### statement

statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。语句末尾一般会加一个分号分隔，或者用换行分隔。

下面这些我们经常写的代码，每一行都是一个 Statement：

```javascript
 代码解读jsbreak;
continue;
return;
debugger;
throw Error();
{}
try {} catch(e) {} finally{}
for (let key in obj) {}
for (let i = 0;i < 10;i ++) {}
while (true) {}
do {} while (true)
switch (v){case 1: break;default:;}
with (a){}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/901fc9ea3fc24b7d8ce4185fb60141f5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1356&h=954&s=31906&e=webp&b=f8f7f7)

#### Verify & Fix

##### PreProcess 阶段

1.确定是否需要 process

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87ce56e30f9649c29d2be8c78735b5b2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=1140&s=98316&e=webp&b=212020)

上面介绍过，ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对 JavaScript 代码进行检查，这就是 processor 的作用之一。例如，对 vue 类型文件做 ESLint 检查，processor 就派上用场了。更详细的介绍可以看我另外一篇文章 [Processor](https://juejin.cn/post/7204399200934182949 "https://juejin.cn/post/7204399200934182949")

##### Parse 阶段

1.确定 parser：

默认是 ESLint 自带的 Espree，也可以通过配置来切换成别的 parser，比如 @eslint/babel-parser、@typescript/eslint-parser 等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a3e2c9950b64e868b7710fbe9537d8f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=644&s=73918&e=webp&b=212121)

2.执行 parse 生成 Source Code（AST）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47fa2af02ac14131bd58f36502e7cbe8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=683&s=70716&e=webp&b=212121)

##### 检查阶段

调用 rule 对 SourceCode 检查，生成 linting problems

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea83c7882b1d4149bdf8a8d7efb27fd0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=583&s=39296&e=webp&b=212121)

那么是如何检查？

1.遍历 AST 并存储 AST Node

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/574bcbe8f2eb4803a4f9c77aa9482949~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1266&h=624&s=40462&e=webp&b=202020)

2.遍历规则列表

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ef503bee4894ad594a5dcde41c61016~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=536&s=64898&e=webp&b=212121)

为每条规则添加对应 AST Node 的 Listener

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1547fa9eb64283b9c3536f7140cc59~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=394&s=42988&e=webp&b=222222)

为 constructor-super 规则绑定对应 Listener（ReturnStatement、"Program:exit"等），当 AST 遍历执行到 ReturnStatement 类型的节点的时候便会执行 constructor-super 规则 ReturnStatement 方法里的逻辑。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3ac89ceeb094618800ac20f6eab77f8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=778&s=58356&e=webp&b=222222)

3.Emit 对应 AST Node 的 Listener

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31e2a7bfaa894589b6c55c09b9d3d532~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=483&s=63572&e=webp&b=232323)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e001aa2c8a3410abe562c433606fa34~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=381&s=45116&e=webp&b=202020)

这样 AST Node 遍历完成后也就执行所有的 rules 了。

在执行 rules 的过程中对比 AST 发现和 rule 规则不匹配，就可以添加问题到 linting problems

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18486cf4d2ea4606be85a04377d83e6f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=1050&s=70972&e=webp&b=1f1f1f)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdae94faffdf4d15a2ca9a679a53047e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=688&s=62904&e=webp&b=212121)

最后生成的 linting problems 就是 lint 检查结果了。从哪一行（line）哪一列（column）到哪一行（endLine）哪一列（endColumn），有什么错误（message）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96dbf5ebf0664235ba6a6ff2a8ddf8cd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=512&s=70652&e=webp&b=212121)

问：在检查阶段为什么需要先存储 AST Node 然后再从 AST Node Queue 遍历来 Emit Listener 呢？这样不是遍历两次了吗？

因为 rules 一直有个小问题，node 的 parent 属性只会在节点被遍历后才能被访问到。为了解决这个问题 ESLint 延迟执行了 Emit，这样 node parent 属性就可以被访问到了。相关 issue：[github.com/eslint/esli…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Feslint%2Feslint%2Fissues%2F9122 "https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Feslint%2Feslint%2Fissues%2F9122")

##### PostProcess 阶段

这个阶段主要用来对生成的 linting problems 做一些处理，例如过滤、修改之类的。

##### Fix 阶段

对于可以 fix 的规则在 lint 检查完后会，linting problems 里会有生成的 fix 信息，用于自动修复问题。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb55f875b8814f548e21a5e260f482e5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=430&s=62848&e=webp&b=212020)

其中 range 表示范围，text 表示替换的内容。结合到一起就是，range 内的字符串替换成 text 即完成修复。

举个例子：

1.源代码

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c60ef7eb8c4a409f842f650c32a2f12e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=165&s=7512&e=webp&b=1f1f1f)

2.配置 rule：no-extra-semi，不允许多余的分号。 3.运行 ESLint 检查，生成如下结构

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db4a23a77a1a456db1149a02e445e6c1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=592&h=686&s=23118&e=webp&b=262626)

```css
css 代码解读js{
    fix: {
        range: [9, 11],
        text: ';'
    }
}
```

表示替换源码字符串（中 index 从 9 到 11 的内容为';'，即替换";;"为";"，替换后结果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e587714d937487f86b8f160c1724479~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1484&h=152&s=5902&e=webp&b=1f1f1f)

源码 fix 流程分析：

1.根据 linting problems 替换

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4349baba13f46769c4bf0b92aca0841~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=820&s=87010&e=webp&b=212121)

问：这里为什么要加循环呢？

答：因为多个 linting problem 之间的 range 也就是替换的范围可能是有重叠的，如果有重叠就放到下一次来修复，下一次修复则会根据当前修复过一次的代码再继续 verify，生成 linting problems，以此循环直至没有 problem 可以修复。不过这样的循环最多修复 10 次，如果还有 linting problems 没修复就不修了。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0a5e1a8e8a74122a83383ec20dbfd1b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1442&h=936&s=65268&e=webp&b=1f1f1f)

2.替换算法：其实就是简单的字符串拼接与替换。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d8b8b73b04545978514c0bdb268bd7a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1512&h=820&s=75144&e=webp&b=212121)

至此，ESLint 工作的主要流程完成。

### 16.Bable 概念及原理

`Babel`是一个流行的用于将新版本`ES6+代码转换为向后兼容版本（ES5）`代码的 JavaScript 编译器。它还为`JSX语法提供了编译`支持，还有一些其他插件可用于转换特定类型的代码 。

```
 代码解读 Babel 的工作原理：三类功能
```

**解析**

当 Babel 接收到源代码时，将会调用一个叫做解析器的工具，用于将源代码转换为抽象语法树（AST）。在这个过程中，解析器会识别代码中的语法结构，并将其转换为对应的节点类型。 例如，当解析器遇到一个变量声明语句时，它将会创建一个 “VariableDeclaration” 节点，并将该节点的信息存储在 AST 中。AST 是一个以节点为基础组成的树形结构，每个节点都有相应的类型、属性和子节点等信息。

**转换**

一旦 AST 被创建，Babel 将遍历整个树形结构，对每个节点进行转换。这些转换可以是插件、预设或手动创建的。转换器会检查 AST 中的每个节点，然后对其进行相应的修改或替换，以将新语法转换为旧语法。 例如，如果 Babel 遇到一个包含箭头函数的节点，而你已经启用了转换插件，该插件将会将箭头函数转换为其等效的体函数。代码转换后，Babel 将会生成一个新的 AST。

**生成**

最后，Babel 将基于转换后的 AST 生成代码文本。在这个步骤中，Babel 将遍历转换后的 AST，并创建对应的代码字符串，并将这些字符串组合成一个完整的 JavaScript 文件。如果启用了代码压缩，Babel 还可以将生成的代码进行压缩。 总结来说，Babel 的原理就是将 JavaScript 源代码转换为抽象语法树（AST），然后对 AST 进行转换，生成与源代码功能相同但向后兼容的代码。Babel 提供了一个强大的生态系统，使得开发者可以轻松扩展并自定义转换器，实现自己的功能需求。

### 17.npm install 的执行过程

`npm install` 是 Node.js 包管理器 (npm) 的一个命令，用于安装一个项目所依赖的模块。

执行过程大致如下：

1. 读取 `package.json` 文件，该文件列出了项目所需要的依赖。
2. 根据 `package.json` 中的依赖信息以及 `node_modules` 目录状态，npm 会决定哪些模块需要下载和安装。
3. npm 会查看每个模块的可用版本，并选择符合 `package.json` 中指定版本范围的最新版本进行安装。
4. 下载所需模块到本地的 `node_modules` 目录。
5. 如果模块包含子模块（`package.json` 中 `dependencies` 或 `devDependencies` 中的模块），则递归执行上述步骤安装这些子模块。

### 18.npm run start 的整个过程？

`npm run start` 是一个常见的命令，用于启动基于 Node.js 的应用程序。这个命令实际上是一个快捷方式，它告诉 npm 运行在 package.json 文件中定义的 "start" 脚本。

当你执行 `npm run start` 时，以下是发生的事情：

1. 查找当前目录下的 package.json 文件。
2. 在 package.json 文件中，找到 "scripts" 对象。
3. 在 "scripts" 对象中，找到 "start" 键。
4. 执行与 "start" 键关联的命令字符串。

例如，如果你的 package.json 文件中的 "scripts" 对象像这样：

1. ```json
   json 代码解读"scripts": {  "start": "node app.js"}
   ```

当你运行 `npm run start` 时，npm 将执行 `node app.js`。

这是一个简单的例子，实际的 "start" 脚本可能会包含更多步骤，比如预处理、打包、转译、加载模块绑定等。

总结：`npm run start` 执行 package.json 中定义的 "start" 脚本，这个脚本可以启动一个 Node.js 应用程序或执行更复杂的前端构建过程。

### 19.对 CSS 工程化的理解

**CSS 工程化是为了解决以下问题：**

1. 宏观设计：CSS 代码如何组织、如何拆分、模块结构怎样设计？
2. 编码优化：怎样写出更好的 CSS？
3. 构建：如何处理我的 CSS，才能让它的打包结果最优？
4. 可维护性：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践：

- 预处理器：Less、 Sass 等；
- 重要的工程化插件： PostCss；
- Webpack loader 等 。

基于这三个方向，可以衍生出一些具有典型意义的子问题，这里我们逐个来看：

（1）预处理器：为什么要用预处理器？它的出现是为了解决什么问题？ 预处理器，其实就是 CSS 世界的“轮子”。预处理器支持我们写一种类似 CSS、但实际并不是 CSS 的语言，然后把它编译成 CSS 代码：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d6b748d4eb04a5da0142cdd53bc88a9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1262&h=300&s=19612&e=png&b=ffffff)

那为什么写 CSS 代码写得好好的，偏偏要转去写“类 CSS”呢？这就和本来用 JS 也可以实现所有功能，但最后却写 React 的 jsx 或者 Vue 的模板语法一样。

随着前端业务复杂度的提高，前端工程中对 CSS 提出了以下的诉求：

- 宏观设计上：我们希望能优化 CSS 文件的目录结构，对现有的 CSS 文件实现复用；
- 编码优化上：我们希望能写出结构清晰、简明易懂的 CSS，需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用的代码；
- 可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。

这三点是传统 CSS 所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特性：

- 嵌套代码的能力，通过嵌套来反映不同 css 属性之间的层级关系 ；
- 支持定义 css 变量；
- 提供计算函数；
- 允许对代码片段进行 extend 和 mixin；
- 支持循环语句的使用；
- 支持将 CSS 文件模块化，实现复用。

（2）PostCss：PostCss 是如何工作的？我们在什么场景下会使用 PostCss？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506c4c64e8154f6492a86a498c1769f0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1258&h=304&s=17180&e=png&b=ffffff)

它和预处理器的不同就在于，预处理器处理的是 类 CSS，而 PostCss 处理的就是 CSS 本身。Babel 可以将高版本的 JS 代码转换为低版本的 JS 代码。PostCss 做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。

PostCss 在业务中的使用场景非常多：

- 提高 CSS 代码的可读性：PostCss 其实可以做类似预处理器能做的工作；
- 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 Autoprefixer 插件可以帮助我们自动增加浏览器前缀；
- 允许我们编写面向未来的 CSS：PostCss 能够帮助我们编译 CSS next 代码；

（3）Webpack 能处理 CSS 吗？如何实现？

- Webpack 在裸奔的状态下，是不能处理 CSS 的，Webpack 本身是一个面向 JavaScript 且只能处理 JavaScript 代 码的模块化打包工具；
- Webpack 在 loader 的辅助下，是可以处理 CSS 的。

如何用 Webpack 实现对 CSS 的处理：

- Webpack 中操作 CSS 需要使用的两个关键的 loader：css-loader 和 style-loader
- 注意，答出“用什么”有时候可能还不够，面试官会怀疑你是不是在背答案，所以你还需要了解每个 loader 都做了什么事情：

- css-loader：导入 CSS 模块，对 CSS 代码进行编译处理；

- style-loader：创建 style 标签，把 CSS 内容写入标签。

PS.未完待续，文中有错误的地方也欢迎评论指出或评论分享自己的面试题。

**另外作者也在找工作，欢迎公司有 HC 的同学内推，base 地：深圳、广州或长沙。**
