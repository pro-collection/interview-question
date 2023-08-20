**关键词**：rel preload 作用、rel prefetch 作用、rel defer 作用、rel prefetch

`rel` 属性定义了所链接的资源与当前文档的关系，在 `<a>、<area> 和 <link>` 元素上有效。支持的值取决于拥有该属性的元素。

`preload和prefetch`是浏览器提供的两种对静态资源预下载的方式，对于优化页面的渲染速度是很有作用的。

### preload - 立即下载

preload针对的是当前页面需要加载的资源，使用preload加载的资源会提前下载，但是并不会立即执行，`而且等到使用的时候才会执行`。

**preload 使用方式**

preload是<link>元素中rel属性的一个值，所以需要使用link标签来实现资源的预加载

```html
<link rel="preload" as="script" href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js'>
```

对于预加载的资源来说，一般需要设置以下三个属性：

- `rel`: preload或者prefetch，表示预加载的方式。必填（rel的值很多，这里只考虑预加载的情况）
- `as`: 表示预加载资源的类型。必填
- `href`: 表示预加载资源的地址。必填

当预加载的是字体资源时，必须加上`crossorigin`属性

**preload的好处**

- 能够分离资源的下载和执行
- 能够提高资源的下载优先级
- 能够支持多种资源的预下载，比如脚本，样式，图片等等

**preload VS defer**

和preload一样，defer的script资源也会将下载和执行过程分离。不同的是，preload的资源是由开发者来确定何时执行，defer的script资源是由浏览器来决定何时执行。

除此之外，defer和preload相比还有以下缺点：

只能支持script资源


**preload VS 预解析操作**

在分析页面渲染流程的时候我们提到过浏览器的一个优化操作，就是预解析操作。当浏览器获取到HTML文件之后，会分析其中依赖哪些外部资源，并提前下载这些外部资源。

看上去这个功能和preload基本上是一样的，可以达到同样的效果。

但是浏览器预解析操作有一个缺陷：就是只能预下载HTML文件中引入的静态资源，对于当前页面动态加载的资源是无能为力的。但是preload可以解析这个问题。

### prefetch - 有空才下载

prefetch针对的资源是用户下个浏览的页面需要的资源，可以在当前页面开始预下载，提高下个页面渲染的速度。

在使用上，prefetch和preload基本是一致的。


### preload VS prefetch

preload 和 prefetch在使用上是有很大的不同的。

- **preload针对的资源是当前页面需要的资源，下载的优先级很高**
- **prefetch针对的资源是下个页面需要的资源，下载的优先级很低，有空的时候才下载**

所以开发者是使用的时候需要区分场景，避免浪费用户的带宽资源。
