**关键词**：生命周期

最基础生命周期直接可以看下面这个图， 如果只能回答下面这个图里面的生命周期， 那么该问题只能是「中等」级别； 之所以是 「高等」级别的问题， 因为还有很多别的生命周期， 大家不一定知道， 但是也很重要；

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/135d7bede61b4423961c2dfb208f44a7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pm05bCP56-G:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDEyNTAyMzM1Nzg5OTM2NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726649822&x-orig-sign=7AZx17uuMqrw4eKTe%2BJoj%2FHSI4c%3D)

### Vue3 新增的生命周期

- `onErrorCaptured()`
- `onRenderTracked()`
- `onRenderTriggered()`
- `onActivated()`
- `onDeactivated()`
- `onServerPrefetch()`

Vue 3 引入了组合式 API，随之而来的是一系列新的生命周期钩子，这些钩子提供了更细粒度的控制方式，尤其是在使用 `setup()` 函数时非常有用。下面简单解释一下你提到的这几个新的生命周期钩子：

**onErrorCaptured()**

- **作用**：捕获组件及其子组件树中发生的错误。它提供了一个句柄来处理错误，并防止错误继续冒泡。
- **使用场景**：当你需要在组件树中某个层级捕获并处理错误时使用，特别适用于构建错误边界。

**onRenderTracked()**

- **作用**：每当一个响应式依赖被访问时调用，允许开发者跟踪渲染过程中依赖的访问。
- **使用场景**：用于调试目的，帮助开发者理解组件如何响应数据变化，以及哪些依赖触发了组件的重新渲染。

**onRenderTriggered()**

- **作用**：每当响应式依赖的变化导致组件重新渲染时调用。
- **使用场景**：同样用于调试目的，让开发者知道是哪个具体的依赖变化导致了组件的更新。

**onActivated() 和 onDeactivated()**

- **作用**：这两个钩子分别在 `<keep-alive>` 缓存的组件激活和停用时被调用。
- **使用场景**：在使用 `<keep-alive>` 时非常有用，可以用来执行如清理或设置相关资源的操作。

**onServerPrefetch()**

- **作用**：允许组件在服务器端渲染（SSR）期间进行数据预取。
- **使用场景**：用于服务器端渲染的 Vue 应用中，可以在组件级别添加数据预取逻辑，提高首屏加载性能和 SEO 优化。

这些新的生命周期钩子为 Vue 应用提供了更多的灵活性和控制力，允许开发者编写更高效、更可靠的代码。特别是在构建大型应用或需要精细管理资源和错误处理的情况下非常有用。
