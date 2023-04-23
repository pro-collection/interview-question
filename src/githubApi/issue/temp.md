
# ref能否拿到函数组件的实例

### 使用`forwordRef`

将`input`单独封装成一个组件`TextInput`。

```jsx
const TextInput =  React.forwardRef((props,ref) => {
  return <input ref={ref}></input>
})

```

用`TextInputWithFocusButton`调用它

```jsx
function TextInputWithFocusButton() {
  // 关键代码
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      // 关键代码
      <TextInput ref={inputEl}></TextInput>
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

```

### useImperativeHandle

有时候，我们可能**不想将整个子组件暴露给父组件**，而只是暴露出父组件需要的值或者方法，这样可以让代码更加明确。而`useImperativeHandle` Api就是帮助我们做这件事的。

```jsx
const TextInput =  forwardRef((props,ref) => {
  const inputRef = useRef();
  // 关键代码
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />
})


function TextInputWithFocusButton() {
  // 关键代码
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      // 关键代码
      <TextInput ref={inputEl}></TextInput>
      <button onClick={onButtonClick}>
          Focus the input
      </button>
    </>
  );
}


```

也可以使用`current.focus()`来做`input`聚焦。

> 这里要注意的是，子组件`TextInput`中的`useRef`对象，只是用来获取`input`元素的，大家不要和父组件的`useRef`混淆了。

# useCallbck vs useMemo的区别

### useMemo

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);

```

`useMemo`:与`memo`的理念上差不多，都是判断是否满足**当前的限定条件**来决定是否执行`callback`函数，而`useMemo`的第二个参数是一个**数组**，通过这个数组来判定是否执行回调函数

> 当一个父组件中调用了一个子组件的时候，父组件的 `state` 发生变化，会导致**父组件更新**，而子组件虽然没有发生改变，但也会进行更新。

只要父组件的状态更新，无论有没有对子组件进行操作，子组件都会进行更新，`useMemo`就是为了防止这点而出现的。

---

### useCallback

> useCallback 可以理解为 useMemo 的语法糖

```diff
const memoizedCallback = useCallback(
+  () => {
    doSomething(a, b);
+  },
  [a, b],
);

```

`useCallback`与`useMemo`极其类似,唯一不同的是

> * `useMemo`返回的是**函数运行的结果**
> * 而`useCallback`返回的是**函数**
>   * **这个函数是父组件传递子组件的一个函数**，防止做无关的刷新，
>   * 其次，这个*子组件*必须配合`React.memo`,否则不但不会提升性能，还有可能降低性能

---

# React.memo

`memo`：结合了 `pureComponent` 纯组件和 `componentShouldUpdate()`功能，会对传入的 props 进行一次对比，然后根据**第二个函数返回值**来进一步判断哪些`props`需要更新

> 要注意 `memo` 是一个高阶组件，函数式组件和类组件都可以使用。

`memo` 接收两个参数:

```javascript
function MyComponent(props) {

}
function areEqual(prevProps, nextProps) {

}
export default React.memo(MyComponent, areEqual);

```

1. 第一个参数：**组件本身**，也就是要优化的组件
2. 第二个参数：`(pre, next) => boolean`,
   * `pre`：之前的数据
   * `next`：现在的数据
   * 返回一个布尔值
   * 若为 true 则不更新
   * 为 `false` 更新

### memo的注意事项

`React.memo` 与 `PureComponent` 的区别：

* **服务对象不同**：
  * `PureComponent` 服务于**类组件**，
  * `React.memo`既可以服务于类组件，也可以服务与函数式组件，
  * `useMemo` 服务于函数式组件
* 针对的对象不同：
  * `PureComponent` 针对的是`props`和`state`
  * `React.memo`只能针对`props`来决定是否渲染

> `React.memo` 的第二个参数的返回值与`shouldComponentUpdate`的返回值是**相反的**
>
> * `React.memo`:返回 `true` 组件不渲染 ， 返回 `false` 组件重新渲染。
> * `shouldComponentUpdate`: 返回 `true` 组件渲染 ， 返回 `false` 组件不渲染

---

# 类组件和函数组件的区别

### 相同点

组件是 `React` 可复用的最小代码片段，它们会返回要在页面中渲染 `React` 元素，也正是基于这一点，所以**在 `React` 中无论是函数组件，还是类组件，其实它们最终呈现的效果都是一致的**。

### 不同点

### 设计思想

1. 类组件的根基是 `OOP`(面向对象编程)，所以它会有**继承**，有**内部状态管理**等
2. 函数组件的根基是 `FP`(函数式编程)

### 未来的发展趋势

`React` 团队从 `Facebook` 的实际业务场景触发，通过探索时间切片和并发模式，以及考虑性能的进一步优化和组件间**更合理的代码拆分**后，认为 类组件的模式并不能很好地适应未来的趋势，它们给出了以下3个原因：

> 1. `this` 的模糊性
> 2. 业务逻辑耦合在生命周期中
> 3. `React` 的组件代码缺乏标准的**拆分方式**

---

# componentWillUnmount在浏览器刷新后，会执行吗

**不会**。

如果想实现，在刷新页面时进行数据处理。使用`beforeunload`事件。

还有一个`navigator.sendBeacon()`

---

# React 组件优化

> 1. 父组件刷新，而不波及子组件
> 2. 组件自己控制自己是否刷新
> 3. 减少波及范围，无关刷新数据不存入`state`中
> 4. 合并 `state`,减少重复 `setState` 的操作

### 父组件刷新，而不波及子组件

1. **子组件**自己判断是否需要更新 ,典型的就是
   * `PureComponent`，
   * `shouldComponentUpdate`，
   * `React.memo`
2. 父组件对子组件做个缓冲判断

### 使用PureComponent注意点

1. 父组件是**函数组件**，子组件用`PureComponent`时，**匿名函数**，**箭头函数**和**普通函数**都会重新声明
   * 可以使用`useMemo`或者 `useCallback`，利用他们缓冲一份函数，保证不会出现重复声明就可以了。
2. 类组件中不使用箭头函数，匿名函数
   * `class` 组件中每一次刷新都会重复调用`render`函数，**那么`render`函数中使用的匿名函数，箭头函数就会造成重复刷新的问题**
   * **处理方式**. 换成普通函数
3. 在 `class` 组件的`render`函数中调用`bind` 函数
   * 把`bind`操作放在`constructor`中

### shouldComponentUpdate

`class` 组件中 使用 `shouldComponentUpdate` 是主要的优化方式，它不仅仅可以判断来自父组件的`nextprops`，还可以根据`nextState`和最新的`nextContext`来决定是否更新。

### React.memo

`React.memo`的规则是如果想要复用最后一次渲染结果，就返回`true`，不想复用就返回`false`。所以它和`shouldComponentUpdate`的正好相反，`false`才会更新，`true`就返回缓冲。

```jsx
const Children = React.memo(function ({count}){
    return (
        <div>
            只有父组件传入的值是偶数的时候才会更新
            {count}
        </div>
    )
},(prevProps, nextProps)=>{
    if(nextProps.count % 2 === 0){
        return false;
    }else{
        return true;
    }
})

```

---

### 使用 React.useMemo来实现对子组件的缓冲

子组件**只关心`count`数据**，当我们刷新`name`数据的时候，并不会触发刷新 `Children子组件`，实现了我们对组件的缓冲控制。

```jsx
export default function Father (){
  let [count,setCount] = React.useState(0);
  let [name,setName] = React.useState(0);
  const render = React.useMemo(
          ()=>
              <Children count = {count}/>
              ,[count]
          )
  return (
      <div>
          <button onClick={()=>setCount(++count)}>
              点击刷新count
          </button>
          <br/>
          <button onClick={()=>setName(++name)}>
              点击刷新name
          </button>
          <br/>
          {"count"+count}
          <br/>
          {"name"+name}
          <br/>
          {render}
      </div>
  )
}

```

### 减少波及范围，无关刷新数据不存入state中

1. 无意义重复调用`setState`，**合并相关的`state`**
2. 和**页面刷新无关的数据**，不存入`state`中
3. 通过存入`useRef`的数据中，避免父子组件的重复刷新
4. 合并 `state`,减少重复 `setState` 的操作
   * `ReactDOM.unstable_batchedUpdates`;
   * 多个`setState`会合并执行一次。

---

# React-Router实现原理

### react-router-dom和react-router和history库三者什么关系

1. `history` 可以理解为`react-router`的核心，也是整个路由原理的核心，里面集成了`popState`,`history.pushState`等底层路由实现的原理方法
2. `react-router`可以理解为是`react-router-dom`的核心，里面封装了`Router`，`Route`，`Switch`等核心组件,实现了从路由的改变到组件的更新的核心功能
3. `react-router-dom`,在`react-router`的核心基础上，添加了用于跳转的`Link`组件，和`histoy`模式下的`BrowserRouter`和`hash`模式下的`HashRouter`组件等。
   * 所谓`BrowserRouter`和`HashRouter`，也只不过用了`history`库中`createBrowserHistory`和`createHashHistory`方法

### 单页面实现核心原理

> 单页面应用路由实现原理是，切换`url`，监听`url`变化，从而渲染不同的页面组件。

主要的方式有`history`模式和`hash`模式。

### history模式原理

1. 改变路由
   * `history.pushState(state,title,path)`
2. 监听路由
   * `window.addEventListener('popstate',function(e){ /* 监听改变 */})`

### hash模式原理

1. 改变路由
   * 通过`window.location.hash` 属性获取和设置 `hash` 值
2. 监听路由
   * `window.addEventListener('hashchange',function(e){ /* 监听改变 */})`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47ef14c7cdae4e53b7474e7e7125aaa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

# XXR

根据不同的构建、渲染过程有不同的优劣势和适用情况。

* 现代 UI 库加持下常用的 `CSR`、
* 具有更好 `SEO` 效果的 `SSR` (`SPR`)、
* 转换思路主打**构建时生成**的 `SSG`、
* 大架构视野之上的 `ISR`、`DPR`，
* 还有更少听到的 `NSR`、`ESR`。

### CSR(Client Side Rendering)

> 页面托管服务器只需要对页面的**访问请求响应**一个如下的**空页面**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- metas -->
    <title></title>
    <link rel="shortcut icon" href="xxx.png" />
    <link rel="stylesheet" href="xxx.css" />
  </head>
  <body>
    <div id="root"><!-- page content --></div>
    <script src="xxx/filterXss.min.js"></script>
    <script src="xxx/x.chunk.js"></script>
    <script src="xxx/main.chunk.js"></script>
  </body>
</html>

```

页面中留出一个用于填充渲染内容的视图节点 (`div#root`)，并插入指向项目**编译压缩后**的

* `JS Bundle` 文件的 `script` 节点
* 指向 `CSS` 文件的 `link.stylesheet` 节点等。

浏览器接收到这样的文档响应之后，会根据文档内的链接加载脚本与样式资源，并完成以下几方面主要工作：

> 1. **执行脚本**
> 2. 进行**网络访问以获取在线数据**
> 3. 使用 DOM API **更新页面结构**
> 4. **绑定交互事件**
> 5. **注入样式**

以此完成整个渲染过程。

CSR 模式有以下几方面优点：

* UI 库支持
* **前后端分离**
* **服务器负担轻**

---

### SSR (Server Side Rendering)

SSR 的概念，即与 `CSR` 相对地，在服务端完成大部分渲染工作，--- 服务器在响应站点访问请求的时候，就已经渲染好可供呈现的页面。

像 `React`、`Vue` 这样的 UI 生态巨头，其实都有一个关键的 `Virtual DOM` (or VDOM) 概念,先自己**建模处理视图表现与更新**、再批量调 `DOM API` 完成视图渲染更新。这就带来了一种 `SSR` 方案：

`VDOM` 是**自建模型**，是一种抽象的嵌套数据结构，也就可以在 `Node` 环境（或者说一切服务端环境）下跑起来，**把原来的视图代码拿来在服务端跑**，通过 `VDOM` 维护，再在最后**拼接好字符串作为页面响应**，生成文档作为响应页面，此时的页面内容已经基本生成完毕，把逻辑代码、样式代码附上，则可以实现完整的、可呈现页面的响应。

### SSR优点

* 呈现速度和用户体验佳
* `SEO` 友好

### SSR缺点

1. 引入成本高
   * 将视图渲染的工作交给了服务器做，引入了新的概念和技术栈（如 Node）
2. 响应时间长
   * SSR 在完成访问响应的时候需要做更多的计算和生成工作
   * 关键指标 `TTFB` (`Time To First Byte`) 将变得更大
3. 首屏交互不佳
   * 虽然 SSR 可以让页面请求响应后更快在浏览器上渲染出来
   * 但在首帧出现，需要客户端加载激活的逻辑代码（如事件绑定）还没有初始化完毕的时候，其实是不可交互的状态

---

### SSR-React 原理

1. VDOM
2. 同构
3. 双端对比

#### VDOM

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d052082765947a38922d92d2a96965f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 同构

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c09dd079ae444cfeb4d368def0874376~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c75da06489054600a6803d94c3e0933b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 双端对比

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/423e3fefb8f64fe6ae0a050aa0ff73d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

##### renderToString()

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/057226c98dfa49f6b4c6bc8b5d4d99aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

##### renderToStaticMarkup()

```javascript
ReactDOMServer.renderToStaticMarkup(element)

```

仅仅是为了将组件渲染为html字符串，不会带有`data-react-checksum`属性

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c913278ed284d75a846692bbc0f19bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

### SPR (Serverless Pre-Rendering)

无服务预渲染，这是 `Serverless` 话题之下的一项渲染技术。`SPR` 是指在 `SSR` 架构下通过预渲染与缓存能力，将部分页面转化为静态页面，以避免其在服务器接收到请求的时候频繁被渲染的能力，同时一些框架还支持**设置静态资源过期时间**，以确保这部分“静态页面”也能有一定的即时性。

---

### SSG (Static Site Generation)

* 它与 `CSR` 一样，只需要**页面托管**，不需要真正编写并部署服务端，页面资源在编译完成部署之前就已经确定；
* 但它又与 `SSR` 一样，属于一种 `Prerender` 预渲染操作，即在用户浏览器得到页面响应之前，页面内容和结构就已经渲染好了。
* 当然形式和特征来看，它更接近 SSR。

> `SSG` 模式，把原本日益动态化、交互性增强的页面，变成了大部分已经填充好，托管在页面服务 / CDN 上的**静态页面**

---

### NSR (Native Side Rendering)

`Native` 就是客户端，万物皆可**分布式**，可以理解为这就是一种分布式的 `SSR`，不过这里的渲染工作交给了客户端去做而不是远端服务器。在用户即将访问页面的**上级页面预取页面数据，由客户端缓存 HTML 结构，以达到用户真正访问时快速响应的效果**。

NSR 见于各种移动端 + `Webview` 的 `Hybrid` 场景，是需要页面与客户端研发协作的一种优化手段。

---

### ESR (Edge Side Rendering)

`Edge` 就是边缘，类比前面的各种 `XSR`，`ESR` 就是将渲染工作交给边缘服务器节点，常见的就是 `CDN` 的边缘节点。这个方案主打的是**边缘节点相比核心服务器与用户的距离优势**，利用了 `CDN` 分级缓存的概念，渲染和内容填充也可以是分级进行并缓存下来的。

`ESR` 之下静态内容与动态内容是分流的，

1. 边缘 CDN 节点可以将静态页面内容先响应给用户
2. 然后再自己发起动态内容请求，得到核心服务器响应之后再返回给用户

是在大型网络架构下非常极致的一种优化，但这也就依赖更庞大的技术基建体系了。

---

### ISR (Incremental Site Rendering)

**增量式网站渲染**，就是对待页面内容小刀切，**有更细的差异化渲染粒度**，能渐进、分层地进行渲染。

常见的选择是：

* 对于重要页面如首屏、访问量较大的直接落地页，进行**预渲染并添加缓存**，保证最佳的访问性能；
* 对于次要页面，则确保有兜底内容可以即时 `fallback`，再将其实时数据的渲染留到 CSR 层次完成，同时触发异步缓存更新。

对于“异步缓存更新”，则需要提到一个常见的内容缓存策略：`Stale While Revalidate`，CDN 对于数据请求始终首先响应缓存内容，如果这份内容已经过期，则**在响应之后再触发异步更新**——这也是对于次要元素或页面的缓存处理方式。

---

# WebComponents

`Web Components` 是一套不同的技术，允许您创建可重用的定制元素并且在您的 web 应用中使用它们

### 三要素

1. `Custom elements`（自定义元素）： 一组 `JavaScript` API，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
   * 通过 `class A extends HTMLElement {}` 定义组件，
   * 通过 `window.customElements.define('a-b', A)` 挂载已定义组件。
2. `Shadow DOM`（影子 DOM ）：一组 `JavaScript` API，用于将封装的“影子” DOM 树附加到元素（**与主文档 DOM 分开呈现**）并控制其关联的功能。
   * 通过这种方式，您可以**保持元素的功能私有**，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
   * 使用 `const shadow = this.attachShadow({mode : 'open'})` 在 `WebComponents` 中开启。
3. `HTML templates`（HTML 模板）`slot` ：`template` 可以简化生成 `dom` 元素的操作，不再需要 `createElement` 每一个节点。

虽然 `WebComponents` 有三个要素，但却不是缺一不可的，`WebComponents`

> * 借助 `shadow dom` 来实现**样式隔离**，
> * 借助 `templates` 来**简化标签**的操作。

---

### 内部生命周期函数（4个）

1. `connectedCallback`: 当 `WebComponents`**第一次**被挂在到 `dom` 上是触发的钩子，并且只会触发一次。
   * 类似 `React` 中的 `useEffect(() => {}, [])`，`componentDidMount`。
2. `disconnectedCallback`: 当自定义元素与文档 `DOM`**断开连接**时被调用。
3. `adoptedCallback`: 当自定义元素被**移动**到新文档时被调用。
4. `attributeChangedCallback`: 当自定义元素的被监听属性变化时被调用。

---

### 组件通信

### 传入复杂数据类型

* 传入一个 `JSON` 字符串配饰`attribute`

  * `JSON.stringify`配置指定属性
  * 在组件`attributeChangedCallback`中判断对应属性，然后用`JSON.parse()`获取

* 配置DOM的`property`属性

  * `xx.dataSource = [{ name: 'xxx', age: 19 }]`
  * 但是，自定义组件中没有办法监听到这个属性的变化
  * 如果想实现，复杂的结构，不是通过配置，而是在定义组件时候，就确定

### 状态的双向绑定

```kotlin
<wl-input id="ipt"
          :value="data"
          @change="(e) => { data = e.detail }">
</wl-input>

// js
(function () {
  const template = document.createElement('template')
  template.innerHTML = `
  <style>
    .wl-input {

    }
  </style>
  <input type="text" id="wlInput">
  `
  class WlInput extends HTMLElement {
    constructor() {
      super()
      const shadow = this.attachShadow({
        mode: 'closed'
      })
      const content = template.content.cloneNode(true)
      this._input = content.querySelector('#wlInput')
      this._input.value = this.getAttribute('value')
      shadow.appendChild(content)
      this._input.addEventListener("input", ev => {
        const target = ev.target;
        const value = target.value;
        this.value = value;
        this.dispatchEvent(
            new CustomEvent("change", { detail: value })
            );
      });
    }
    get value() {
      return this.getAttribute("value");
    }
    set value(value) {
      this.setAttribute("value", value);
    }
  }
  window.customElements.define('wl-input', WlInput)
})()

```

监听了这个表单的 `input` 事件，并且在每次触发 `input` 事件的时候触发自定义的 `change` 事件，并且把输入的参数回传。

---

### 样式设置

### 直接给自定义标签添加样式

```html
<style>
    wl-input{
        display: block;
        margin: 20px;
        border: 1px solid red;
    }
</style>
<wl-input></wl-input>
<script src="./index.js"></script>

```

### 定义元素内部子元素设置样式

分为两种场景：

1. 在主 DOM 使用 JS
2. 在 Custom Elements 构造函数中使用 JS

#### 在主 DOM 使用 JS 给 Shadow DOM 增加 style 标签：

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});

            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }

    window.customElements.define("wl-input", WlInput);

    // 给 Shadow DOM 增加 style 标签
    let styleEle = document.createElement("style");
    styleEle.textContent = `
        .input-header{
            padding:10px;
            background-color: yellow;
            font-size: 16px;
            font-weight: bold;
        }
    `;
    document.querySelector("wl-input").shadowRoot.appendChild(styleEle);
</script>

```

#### 在 Custom Elements 构造函数中使用 JS 增加 style 标签：

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});
            let styleEle = document.createElement("style");
            styleEle.textContent = `
                .input-header{
                    padding:10px;
                    background-color: yellow;
                    font-size: 16px;
                    font-weight: bold;
                }
            `;
            this.shadow.appendChild(styleEle);


            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }
    window.customElements.define("wl-input", WlInput);
</script>

```

### 引入 CSS 文件

使用 JS 创建 link 标签，然后引入 CSS 文件给自定义元素内部的子元素设置样式

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});
            let linkEle = document.createElement("link");
            linkEle.rel = "stylesheet";
            linkEle.href = "./my_input.css";
            this.shadow.appendChild(linkEle);


            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }
    window.customElements.define("wl-input", WlInput);
</script>

```

样式文件

```css
.input-header{
    padding:10px;
    background-color: yellow;
    font-size: 16px;
    font-weight: bold;
}

```

---

# Lit

`Lit` 的核心是一个组件基类，它提供**响应式**、**scoped 样式**和一个小巧、快速且富有表现力的声明性**模板系统**，且支持 `TypeScript` 类型声明。

> Lit 在开发过程中不需要编译或构建，几乎可以在无工具的情况下使用。

我们知道 `HTMLElement` 是浏览器内置的类，`LitElement` 基类则是 `HTMLElement` 的子类，因此 `Lit` 组件继承了所有标准 `HTMLElement` 属性和方法。更具体来说，`LitElement` 继承自 `ReactiveElement`，后者实现了响应式属性，而后者又继承自 `HTMLElement`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fed5ae5877d94e2ea77312e2b1a91cf2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

而 `LitElement` 框架则是基于 `HTMLElement` 类二次封装了 `LitElement` 类。

```js
export class LitButton extends LitElement { /* ... */  }
customElements.define('lit-button', LitButton);

```

### 渲染

组件具有 `render` 方法，该方法被调用以渲染组件的内容。

```javascript
export class LitButton extends LitElement {
 /* ... */

 render() {
    // 使用模板字符串，可以包含表达式
    return html`
      <div><slot name="btnText"></slot></div>
    `;
  }
}


```

组件的 `render()` 方法返回单个 `TemplateResult` 对象

---

### 响应式 properties

> DOM 中 `property` 与 `attribute` 的区别：
>
> * `attribute` 是 `HTML` 标签上的特性，可以理解为标签属性，它的值只能够是 `String` 类型，并且会自动添加同名 DOM 属性作为 property 的初始值；
> * `property` 是 `DOM` 中的属性，是 `JavaScript` 里的对象，有同名 `attribiute` 标签属性的 `property` 属性值的改变也并不会同步引起 `attribute` 标签属性值的改变；

`Lit` 组件接收标签属性 `attribute` 并将其状态存储为 `JavaScript` 的 `class` 字段属性或 `properties`。**响应式 `properties` 是可以在更改时触发响应式更新周期、重新渲染组件以及可选地读取或重新写入 `attribute` 的属性**。每一个 `properties` 属性都可以配置它的选项对象

### 传入复杂数据类型

对于复杂数据的处理，为什么会存在这个问题，根本原因还是因为 `attribute` 标签属性值只能是 `String` 类型，其他类型需要进行序列化。在 `LitElement` 中，只需要在父组件模板的属性值前使用`.`操作符，这样子组件内部 `properties` 就可以正确序列化为目标类型。

### 优点

`LitElement` 在 `Web Components` 开发方面有着很多比原生的优势，它具有以下特点：

> 1. 简单：在 `Web Components` 标准之上构建，`Lit` 添加了**响应式、声明性模板**和一些周到的功能，**减少了模板文件**。
> 2. 快速：更新速度很快，因为 `Lit` 会跟踪 `UI` 的动态部分，并且只在底层状态发生变化时更新那些部分——无需重建整个虚拟树并将其与 DOM 的当前状态进行比较。
> 3. 轻便：`Lit` 的压缩后大小约为 5 KB，有助于**保持较小的包大小并缩短加载时间**。
> 4. 高扩展性：`lit-html` 基于标记的 `template`，它结合了 ES6 中的模板字符串语法，使得它无需预编译、预处理，就能获得浏览器原生支持，并且扩展能力强。
> 5. 兼容良好：对浏览器兼容性非常好，对主流浏览器都能有非常好的支持。

---

# npm

### 嵌套的 node\_modules 结构

`npm` 在早期采用的是嵌套的 node\_modules 结构，**直接依赖**会平铺在 `node_modules` 下，**子依赖**嵌套在直接依赖的 `node_modules` 中。

比如项目依赖了A 和 C，而 A 和 C 依赖了不同版本的 `B@1.0` 和 `B@2.0`，`node_modules` 结构如下：

```kotlin
node_modules
├── A@1.0.0
│   └── node_modules
│       └── B@1.0.0
└── C@1.0.0
    └── node_modules
        └── B@2.0.0

```

如果 D 也依赖 [B@1.0](https://link.juejin.cn?target=mailto%3AB%401.0 "mailto:B@1.0")，会生成如下的嵌套结构：

```kotlin
node_modules
├── A@1.0.0
│   └── node_modules
│       └── B@1.0.0
├── C@1.0.0
│   └── node_modules
│       └── B@2.0.0
└── D@1.0.0
    └── node_modules
        └── B@1.0.0

```

可以看到**同版本的 B 分别被 A 和 D 安装了两次**。

### 依赖地狱 Dependency Hell

在真实场景下，依赖增多，冗余的包也变多，`node_modules` 最终会堪比黑洞，很快就能把磁盘占满。而且依赖嵌套的深度也会十分可怕，这个就是依赖地狱。

### 扁平的 node\_modules 结构

为了将嵌套的依赖尽量打平，避免过深的依赖树和包冗余，`npm v3` 将子依赖提升(hoist)，采用**扁平的** `node_modules` 结构，子依赖会**尽量平铺安装在主依赖项所在的目录中**。

```kotlin
node_modules
├── A@1.0.0
├── B@1.0.0
└── C@1.0.0
    └── node_modules
        └── B@2.0.0

```

可以看到 `A` 的子依赖的 `B@1.0` 不再放在 A 的 `node_modules` 下了，而是与 A 同层级。

而 `C` 依赖的 `B@2.0` 因为版本号原因还是嵌套在 C 的 `node_modules` 下。

这样不会造成大量包的重复安装，依赖的层级也不会太深，解决了依赖地狱问题，但也形成了新的问题。

### 幽灵依赖 Phantom dependencies

> 幽灵依赖是指**在 `package.json` 中未定义的依赖，但项目中依然可以正确地被引用到**。

比如上方的示例其实我们只安装了 A 和 C：

```json
{
  "dependencies": {
    "A": "^1.0.0",
    "C": "^1.0.0"
  }
}


```

由于 `B` 在安装时被提升到了和 `A` 同样的层级，所以在**项目中引用 B 还是能正常工作的**。

幽灵依赖是由依赖的声明丢失造成的，如果某天某个版本的 `A` 依赖不再依赖 `B` 或者 `B` 的版本发生了变化，那么就会造成依赖缺失或兼容性问题。

### 不确定性 Non-Determinism

不确定性是指：同样的 `package.json` 文件，`install` 依赖后可能不会得到同样的 `node_modules` 目录结构。

如果有 `package.json` 变更，本地需要删除 `node_modules` 重新 `install`，否则可能会导致生产环境与开发环境 `node_modules` 结构不同，代码无法正常运行。

### 依赖分身 Doppelgangers

假设继续再安装依赖 `B@1.0` 的 `D` 模块和依赖 `@B2.0` 的 `E` 模块，此时：

`A` 和 `D` 依赖 `B@1.0` `C` 和 `E` 依赖 `B@2.0` 以下是提升 `B@1.0` 的 `node_modules` 结构：

```kotlin
node_modules
├── A@1.0.0
├── B@1.0.0
├── D@1.0.0
├── C@1.0.0
│   └── node_modules
│       └── B@2.0.0
└── E@1.0.0
    └── node_modules
        └── B@2.0.0

```

可以看到 `B@2.0` 会被安装两次，实际上无论提升 `B@1.0` 还是 `B@2.0`，都会存在重复版本的 `B` 被安装，这两个重复安装的 `B` 就叫 `doppelgangers`。

---

# yarn

`yarn` 也采用**扁平化** `node_modules` 结构

### 提升安装速度

在 `npm` 中安装依赖时，**安装任务是串行的**，会按包顺序逐个执行安装，这意味着它会等待一个包完全安装，然后再继续下一个。

为了加快包安装速度，`yarn` 采用了并行操作，在性能上有显著的提高。而且在缓存机制上，`yarn` 会**将每个包缓存在磁盘上**，在下一次安装这个包时，可以脱离网络实现从磁盘离线安装。

### lockfile 解决不确定性

`yarn` 更大的贡献是发明了 `yarn.lock`。

在依赖安装时，会根据 `package.josn` 生成一份 `yarn.lock` 文件。

`lockfile` 里记录了依赖，以及依赖的子依赖，依赖的版本，获取地址与验证模块完整性的 hash。

> 即使是不同的安装顺序，相同的依赖关系在任何的环境和容器中，都能得到稳定的 `node_modules` 目录结构，保证了依赖安装的确定性。

所以 `yarn` 在出现时被定义为快速、安全、可靠的依赖管理。而 npm 在一年后的 `v5` 才发布了 `package-lock.json`。

### 与 npm 一样的弊端

`yarn` 依然和 `npm` 一样是扁平化的 `node_modules` 结构，没有解决**幽灵依赖**和**依赖分身**问题。

---

# pnpm

### 内容寻址存储 CAS

与依赖提升和扁平化的 `node_modules` 不同，`pnpm` 引入了另一套依赖管理策略：内容寻址存储。

> 该策略会将包安装在系统的**全局 store 中**，依赖的每个版本只会在系统中安装一次。

在引用项目 `node_modules` 的依赖时，会通过**硬链接**与**符号链接**在全局 `store` 中找到这个文件。为了实现此过程，`node_modules` 下会多出 `.pnpm` 目录，而且是非扁平化结构。

* 硬链接 `Hard link`：硬链接可以理解为**源文件的副本**，项目里安装的其实是副本，它使得用户可以通过路径引用查找到全局 `store` 中的源文件，而且这个副本根本不占任何空间。同时，`pnpm` 会在全局 `store` 里存储硬链接，不同的项目可以从全局 `store` 寻找到同一个依赖，大大地节省了磁盘空间。

* 符号链接 `Symbolic link`：也叫软连接，可以理解为快捷方式，`pnpm` 可以通过它找到对应磁盘目录下的依赖地址。

由于链接的优势，`pnpm` 的安装速度在大多数场景都比 `npm` 和 `yarn` 快 2 倍，节省的磁盘空间也更多。

---

# yarn Plug’n’Play

`Plug’n’Play`（Plug'n'Play = Plug and Play = PnP，即插即用）。

### 抛弃 node\_modules

无论是 `npm` 还是 `yarn`，都具备缓存的功能，大多数情况下安装依赖时，其实是将缓存中的相关包复制到项目目录中 `node_modules` 里。

而 `yarn PnP` 则不会进行拷贝这一步，而是在项目里维护一张静态映射表 `pnp.cjs`。

---

# npm install 发生了啥

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd9dca6498df4e52a42c9d609a6528d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

# 使用 history 模式的前端路由时静态资源服务器配置详解

我们一般都是打包以后放在**静态资源服务器**中的，我们访问诸如 `example.com/rootpath/` 这种形式的资源没问题，是因为，`index.html` 文件是真实的存在于 `rootpath` 文件夹中的，可以找到的，返回给前端的。

但是如果访问**子路由** `example.com/rootpath/login` 进行登录操作，但是 `login/index.html` 文件**并非真实存在的文件**，其实我们需要的文件还是 `rootpath` 目录中的 `index.html` 。

再者，如果我们需要 `js` 文件，比如登陆的时候请求的地址是 `example.com/rootpath/login/js/dist.js` 其实我们想要的文件，还是 `rootpath/js/` 目录中的 `dist.js` 文件而已。

> 前端路由其实是一种假象，只是用来蒙蔽使用者而已的，无论用什么路由，访问的都是同一套静态资源。

之所以展示的内容不同，只是因为代码里，根据不同的路由，对要显示的视图做了处理而已。

比如

* 要找 `example.com/rootpath/login` 静态资源服务器找不到，那就返回 `example.com/rootpath/` 内容；
* 要找 `example.com/rootpath/login/css/style.css` 找不到，那就照着 `example.com/rootpath/css/style.css` 这个路径去找。

> 总之就是，请求的是子目录，找不到，那就**返回根目录一级对应的资源文件**就好了。

### 在 nginx 中使用

如果你打包以后的前端静态资源文件，想要仍在 `nginx` 中使用，那首先将你打包好的静态资源目录**扔进 `www` 目录**，比如你打包好的资源的目录叫 `rootpath` ，那么直接将 `rootpath` 整个目录丢进 `www` 目录即可。

然后打开我们的 `nginx` 配置文件 `nginx.conf`，插入以下配置：

```bash
location /rootpath/ {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /rootpath/index.html;
}

```

1. `root` 的作用
   * 就是指定一个根目录。默认的是`html目录`
2. `try_files`

   * 关键点1：按指定的`file`顺序查找存在的文件，并使用第一个找到的文件进行请求处理
   * 关键点2：查找路径是按照给定的`root`或`alias`为根路径来查找的
   * 关键点3：如果给出的`file`都没有匹配到，则重新请求最后一个参数给定的`uri`，就是新的`location`匹配

---

# webpack 优化

### 时间方向(8个)

1. 开发环境 - `EvalSourceMapDevToolPlugin`**排除第三方模块**

   * `devtool:false`
   * `EvalSourceMapDevToolPlugin`,通过传入 `module: true` 和 `column:false`,达到和预设 `eval-cheap-module-source-map` 一样的质量
2. 缩小`loader`的搜索范围：`test、include、exclude`
3. **`Module.noParse`**

   * `noParse: /jquery|lodash/`,
4. `TypeScript` 编译优化
5. **`Resolve.modules`指定查找模块的目录范围**
6. **`Resolve.alias`**
7. **`Resolve.extensions`指定查找模块的文件类型范围**
8. `HappyPack`

### 资源大小（9个）

1. 按需引入类库模块 (工具类库)
   * 使用`babel-plugin-import`对其处理
2. **使用`externals`优化`cdn`静态资源**
3. **CSS抽离+剔除无用样式** -`MiniCssExtractPlugin` + `PurgeCSS`
4. **CSS压缩** - `CssMinimizerWebpackPlugin`
5. **`TreeSharking`**

   * CSS 方向 - `glob-all``purify-css``purifycss-webpack`
   * JS方向 - `babel-loader`版本问题
6. `Code Spilt` - `optimization` - `splitChunks` - `chunks:all`
7. **魔法注释 - `webpackChunkName：’xxx‘`**
8. `Scope Hoisting` - `optimization` - `concatenateModules:true`

   * 普通打包只是将一个模块最终放入一个单独的函数中,如果模块很多，就意味着在输出结果中会有很多的模块函数。concatenateModules 配置的作用,尽可能将所有模块合并到一起输出到一个函数中，既提升了运行效率，又减少了代码的体积。
9. **图片压缩** - `image-webpack-loader` - 只要在 `file-loader` 之后加入 `image-webpack-loader` 即可

### 共同方案

1. `IgnorePlugin`

---

# Redux内部实现

### createStore

```javascript
function createStore(
    reducer,
    preloadedState,
    enhancer
    ){
  let state;

  //  用于存放被 subscribe 订阅的函数（监听函数）
  let listeners = [];

  // getState 是一个很简单的函数
  const getState = () => state;

  return {
    dispatch,
    getState,
    subscribe,
    replaceReducer
  }
}

```

### dispatch

```javascript
function dispatch(action) {
  // 通过 reducer 返回新的 state
  // 这个 reducer 就是 createStore 函数的第一个参数
  state = reducer(state, action);
  // 每一次状态更新后，都需要调用 listeners 数组中的每一个监听函数
  listeners.forEach(listener => listener());
  return action;    // 返回 action
}

```

### subscribe

```javascript
function subscribe(listener){
  listeners.push(listener);
  // 函数取消订阅函数
  return () => {
    listeners = listeners.filter(fn => fn !== listener);
  }
}

```

### combineReducers

```javascript
function combineReducers(reducers){
    return (state = {},action) => {
        // 返回的是一个对象，reducer 就是返回的对象
        return Object.keys(reducers).reduce(
            (accum,currentKey) => {
                accum[currentKey] = reducers[currentKey](state[currentKey],action);
                return accum;
            },{}        // accum 初始值是空对象
        );
    }
}

```

### applyMiddleware

```javascript
function applyMiddleware(...middlewares){
  return function(createStore){
    return function(reducer,initialState){
      var store = createStore(reducer,initialState);
      var dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      };

      chain = middlewares.map(
          middleware => middleware(middlewareAPI)
          );

      dispatch = compose(...chain)(store.dispatch);
      return { ...store, dispatch };
    }
  }
}

```

`applyMiddleware` 函数是一个三级柯里化函数

---

# Vue和 React的区别

### 共同点

1. 数据驱动视图
2. 组件化
3. 都使用 `Virtual DOM`

### 不同点

1. 核心思想
   * `Vue`灵活易用的渐进式框架，进行**数据拦截/代理**，它对侦测数据的变化更敏感、更精确
   * `React`推崇**函数式编程**（纯组件），**数据不可变以及单向数据流**
2. 组件写法差异
   * `React`推荐的做法是`JSX + inline style`, 也就是把 `HTML` 和 `CSS` 全都写进 JavaScript 中,即 `all in js`;
   * `Vue` 推荐的做法是 `template` 的**单文件组件格式**即 `html`,`css`,`JS` 写在同一个文件
3. `diff`算法不同
   * 两者流程思路上是类似的：不同的组件产生不同的 DOM 结构。**当type不相同时，对应DOM操作就是直接销毁老的DOM，创建新的DOM**。 **同一层次的一组子节点，可以通过唯一的 key 区分**。
   * `Vue-Diff`算法采用了**双端比较的算法**，同时从新旧`children`的两端开始进行比较，借助`key`值找到可复用的节点，再进行相关操作。相比`React`的`Diff`算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。
4. 响应式原理不同
   * `Vue` 依赖收集，自动优化，**数据可变**, 当数据改变时，自动找到引用组件重新渲染
   * `React`基于**状态机**，手动优化，**数据不可变**，需要`setState`驱动新的`state`替换老的`state`。 当数据改变时，以组件为根目录，默认全部重新渲染。

---

# Webpack有哪些常用的loader和plugin

### Webpack Loader vs Plugin

* `loader` 是**文件加载器**，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
* `plugin` 赋予了 `webpack` 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是**解决 loader 无法实现的其他事**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a9d4af5a00143a189f1964ec5af4dd1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

* `loader` 运行在**打包文件之前**
* `plugins` 在整个编译周期都起作用

### 常用loader

* 样式：`style-loader`、`css-loader`、`less-loader`、`sass-loader`、`MiniCssExtractPlugin` + `PurgeCSS` + `CssMinimizerWebpackPlugin`
* js: `bable-loader`/`ts-loader`
* 图片：`url-loader`（`limit`）、`file-loader` 、`image-webpack-loader`
* 代码校验：`eslint-loader`

### 常用plugin

1. `HtmlWebpackPlugin`：会在打包结束之后自动创建一个`index.html`, 并将打包好的JS自动引入到这个文件中
2. `MiniCssExtractPlugin`
3. `IgnorePlugin`：用于**忽略第三方包**指定目录，让指定目录不被打包进去
4. `terser-webpack-plugin`：压缩js代码
5. `SplitChunksPlugin`：`Code-Splitting`实现的底层就是通过Split-Chunks-Plugin实现的，其作用就是代码分割。

---

# Babel

`Babel` 是一个 `JavaScript` 编译器！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba7ef757dea247ffa6630ab5758fcbc1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

> `Babel` 的作用就是将**源码**转换为**目标代码**

### Babel的作用

主要用于将采用 `ECMAScript 2015+` 语法编写的代码转换为 `es5` 语法，让开发者无视用户浏览器的差异性，并且能够用**新的 JS 语法**及**特性**进行开发。除此之外，`Babel` 能够转换 `JSX` 语法，并且能够支持 `TypeScript` 转换为 `JavaScript`。

> 总结一下：`Babel` 的作用如下
>
> 1. 语法转换
> 2. 通过 `Polyfill` 方式在目标环境中**添加缺失的特性**
> 3. 源码转换

### 原理

`Babel` 的运行原理可以通过以下这张图来概括。整体来看，可以分为三个过程，分别是：

1. 解析，
   1. 词法解析
   2. 语法解析
2. 转换，
3. 生成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/822560fe3587410aa301048a1ce3c00c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

### Babel7 的使用

`Babel` 支持多种形式的配置文件，根据使用场景不同可以选择不同的配置文件。

* 如果配置中需要**书写 js 逻辑**，可以选择**babel.config.js**或者 **.babelrc.js**；
* 如果只是需要一个简单的 `key-value` 配置，那么可以选择`.babelrc`，甚至可以直接在 **package.json** 中配置。

所有 `Babel` 的包都发布在 `npm` 上，并且名称以 `@babel` 为前缀（自从版本 7.0 之后）,接下来，我们一起看下 `@babel/core` 和 `@babel/cli` 这两个 `npm` 包。

* `@babel/core` - 核心库，封装了 `Babel` 的核心能力
* `@babel/cli` - 命令行工具， 提供了 `babel` 这个命令

> `Babel` 构建在插件之上的。默认情况下，`Babel` 不做任何处理，需要借助插件来完成语法的解析，转换，输出。

插件的**配置形式**常见有两种，分别是

1. 字符串格式
2. 数组格式，并且可以**传递参数**

如果插件名称为 `@babel/plugin-XXX`，可以使用简写成`@babel/XXX`，

* 例如 `@babel/plugin-transform-arrow-functions` 便可以简写成 `@babel/transform-arrow-functions`。

> 插件的执行顺序是从前往后。

```ruby
// .babelrc
/*
* 以下三个插件的执行顺序是：
    @babel/proposal-class-properties ->
    @babel/syntax-dynamic-import ->
    @babel/plugin-transform-arrow-functions
*/
{
    "plugins": [
        // 同 "@babel/plugin-proposal-class-properties"
        "@babel/proposal-class-properties",
        // 同 ["@babel/plugin-syntax-dynamic-import"]
        ["@babel/syntax-dynamic-import"],
        [
            "@babel/plugin-transform-arrow-functions",
            {
                "loose": true
            }
        ]
    ]
}


```

### 预设

> 预设是一组插件的集合。

与插件类似，预设的配置形式也是**字符串**和**数组**两种，预设也可以将 `@babel/preset-XXX` 简写为 `@babel/XXX` 。

> 预设的执行顺序是从后往前，并且**插件在预设之前执行**。

我们常见的预设有以下几种：

* `@babel/preset-env`： 可以**无视浏览器环境的差异**而尽情地使用 ES6+ 新语法和新特性；
  * 注：语法和特性不是一回事，语法上的迭代是让我们书写代码更加简单和方便，如展开运算符、类，结构等，因此这些语法称为语法糖；特性上的迭代是为了扩展语言的能力，如 `Map`、`Promise` 等，
  * 事实上，`Babel` 对新语法和新特性的处理也是不一样的，对于新语法，Babel 通过插件直接转换，而对于新特性，Babel 还需要借助 polyfill 来处理和转换。
* `@babe/preset-react`： 可以书写 `JSX` 语法，将 `JSX` 语法转换为 `JS` 语法；
* `@babel/preset-typescript`：可以使用 `TypeScript` 编写程序，将 `TS` 转换为 `JS`；
  * 注：**该预设只是将 TS 转为 JS，不做任何类型检查**
* `@babel/preset-flow`：可以使用 `Flow` 来控制类型，将 `Flow` 转换为 `JS`；

```json
// .babelrc
/*
*  预设的执行顺序为：
    @babel/preset-react ->
    @babel/preset-typescript ->
    @babel/preset-env
*/
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": {
                    "version": 3,
                    "proposals": true // 使用尚在提议阶段特性的 polyfill
                }
            }
        ],
        "@babel/preset-typescript",
        // 同 @babel/preset-react
        "@babel/react"
    ]
}

```

对于 `@babel/preset-env` ，我们通常需要设置目标浏览器环境，可以在根目录下的 `.browserslistrc` 文件中设置，也可以在该预设的参数选项中通过 `targets`(**优先级最高**) 或者在 `package.json` 中通过 `browserslist` 设置。

如果我们不设置的话，该预设默认会将所有的 ES6+ 的**新语法**全部做转换，否则，该预设只会对目标浏览器环境**不兼容的新语法做转换**。

> 推荐设置目标浏览器环境，这样在中大型项目中可以明显缩小编译后的代码体积，因为**有些新语法的转换需要引入一些额外定义的 helper 函数的，比如 class**。

#### .babelrc

```perl
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": "> 0.25%, not dead"
            }
        ]
    ]
}

```

#### .browserslistrc

```markdown

> 0.25%
not dead

```

对于新特性，`@babel/preset-env` 也是能转换的。但是需要通过 `useBuiltIns` 这个参数选项实现，值需要设置为 `usage`，这样的话，只会转换我们使用到的**新语法和新特性**，能够有效减小编译后的包体积，并且还要设置 `corejs: { version: 3, proposals }` 选项，因为转换新特性需要用到 `polyfill`，而 `corejs` 就是一个 `polyfill` 包。如果不显示指定 `corejs` 的版本的话，默认使用的是 `version 2` ，而 version 2 已经停更，诸如一些更新的特性的 `polyfill` 只会更行与 `version 3` 里，如 `Array.prototype.flat()`。

```json
// .babelrc
"presets": [
    [
        "@babel/preset-env",
        {
            "useBuiltIns": "usage",
            "corejs": {
                "version": 3,
                "proposals": true // 使用尚在提议阶段特性的 polyfill
            }
        }
    ]
]


```

虽然 `@babel/env` 可以帮我们做新语法和新特性的**按需转换**，但是依然存在 2 个问题：

1. 从 `corejs` 引入的 `polyfill` 是**全局范围**的，不是模块作用域返回的，可能存在污染全局变量的风险；
2. 对于某些新语法，如 `class`，会在编译后的文件中注入很多 `helper` 函数声明，而不是从某个地方 `require` 进来的函数引用，从而增大编译后的包体积；

---

### runtime

`runtime` 是 `babel7` 提出来的概念，旨在解决如上提出的性能问题的。

实践一下 `@babel/plugin-transform-runtime` 插件配合 `@babel/preset-env` 使用

```bash
npm install --save-dev @babel/plugin-transform-runtime
// @babel/runtime 是要安装到生产依赖的，因为新特性的编译需要从这个包里引用 polyfill
// 它就是一个封装了 corejs 的 polyfill 包
npm install --save @babel/runtime

```

```perl
// .babelrc
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",{
          "corejs": 3
      }
    ]
  ],
}

```

编译后，可以明显看到，

* 引入的 `polyfill` 不再是全局范围内的了，而是模块作用域范围内的；
* 并且不再是往编译文件中直接注入 `helper` 函数了，而是通过引用的方式，

既解决了全局变量污染的问题，又减小了编译后包的体积

---

# Fiber 实现时间切片的原理

### React15 架构缺点

`React16之前`的版本比对更新虚拟DOM的过程是采用循环递归方式来实现的，这种比对方式有一个问题，就是一旦任务开始进行就**无法中断**，如果应用中数组数量庞大，主线程被长期占用，直到整颗虚拟DOM树比对更新完成之后主线程才被释放，主线程才能执行其他任务，这就会**导致一些用户交互或动画等任务无法立即得到执行，页面就会产生卡顿，非常的影响用户体验**。

主要原因就是递归无法中断，执行重的任务耗时较长，`javascript`又是单线程的，无法同时执行其他任务，导致任务延迟页面卡顿用户体验差。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1d3f2d692f3413faeb50cdf7653e78d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

### Fiber架构

界面通过 `vdom` 描述，但是不是直接手写 `vdom`，而是 `jsx` 编译产生的 `render` function 之后以后生成的。这样就可以加上 `state`、`props` 和一些**动态逻辑**，动态产生 `vdom`。

> `vdom` 生成之后不再是直接渲染，而是先转成 fiber，这个 `vdom` 转 `fiber` 的过程叫做 `reconcile`。

`fiber` 是一个链表结构，可以打断，这样就可以通过 `requestIdleCallback` 来空闲调度 `reconcile`，这样不断的循环，直到处理完所有的 `vdom` 转 `fiber` 的 `reconcile`，就开始 `commit`，也就是更新到 `dom`。

`reconcile` 的过程会提前创建好 `dom`，还会**标记出增删改**，那么 `commit` 阶段就很快了。

> 从之前递归渲染时做 `diff` 来确定增删改以及创建 `dom`，提前到了可打断的 `reconcile` 阶段，让 `commit` 变得非常快，这就是 `fiber` 架构的目的和意义。

### 并发&调度(Concurrency & Scheduler)

* `Concurrency` 并发: **有能力优先处理更高优事务**，同时对正在执行的中途任务可暂存，待高优完成后，再去执行。
* `Scheduler` 协调调度: 暂存未执行任务，等待时机成熟后，再去**安排执行剩下未完成任务**。

考虑到可中断渲染，并可重回构造。`React`自行实现了一套体系叫做 `React fiber` 架构。

> `React Fiber` 核心: 自行实现 虚拟栈帧。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22d448ada65d4c42895d5b362dbba972~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

> schedule 就是通过**空闲调度**每个 `fiber` 节点的 `reconcile`（`vdom` 转 `fiber`），全部 `reconcile` 完了就执行 `commit`。

`Fiber`的数据结构有三层信息: （**采用链表结构**）

1. 实例属性
   * 该Fiber的基本信息，例如组件类型等。
2. 构建属性
   * 构建属性 (`return`、`child`、`sibling`)
3. 工作属性
   * 数据的变更会导致UI层的变更
   * 为了减少对`DOM`的直接操作，通过`Reconcile`进行`diff`查找，并将需要变更节点，打上标签，**变更路径保留在`effectList`里**
   * **待变更内容要有`Scheduler`优先级处理**
   * 涉及到`diff`等查找操作，是需要有个高效手段来处理前后变化，即**双缓存机制**。

> 链表结构即可**支持随时随时中断**的诉求

### Scheduler 运行核心点

1. 有个任务队列 `queue`，该**队列存放可中断的任务**。
2. `workLoop`对队列里取第一个任务`currentTask`，进入循环开始执行。
   * 当该任务**没有时间** 或 需要中断 (渲染任务 或 其他高优任务插入等)，则让出主线程。
3. `requestAnimationFrame` 计算一帧的空余时间；
4. 使用`new MessageChannel ()` 执行宏任务;

---

# devServer进行跨域处理

```javascript
module.exports = {
  devServer: {
        /* 运行代码的目录 */
        contentBase: resolve(__dirname, "dist"),
        /* 监视 contentBase 目录下的所有文件,一旦文件发生变化就会 reload (重载+刷新浏览器)*/
        watchContentBase: true,
        /* 监视文件时 配合 watchContentBase */
        watchOptions: {
            /* 忽略掉的文件(不参与监视的文件) */
            ignored: /node_modules/
        },
        /* 启动gzip压缩 */
        compress: true,
        /* 运行服务时自动打开服务器 */
        open: true,
        /* 启动HMR热更新 */
        hot: true,
        /* 启动的端口号 */
        port: 5000,
        /* 启动的IP地址或域名 */
        host: "localhost",
        /* 关闭服务器启动日志 */
        clientLogLevel: "none",
        /* 除了一些启动的基本信息,其他内容都不要打印 */
        quiet: true,
        /* 如果出错不要全屏提示 */
        overlay: false,
        /* 服务器代理 --> 解决开发环境跨域问题 */
        proxy: {
            /* 一旦devServer(port:5000)服务器接收到 ^/api/xxx 的请求,就会把请求转发到另外一个服务器(target)上 */
            "/api": {
                target: "http://localhost:3000",
                /* 路径重写(代理时发送到target的请求去掉/api前缀) */
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
}


```

---

# React 实现原理

### React-Hook为什么不能放到条件语句中

> 每一次渲染都是完全独立的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ea1372f383941ac8a253267819e11a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

每次渲染具有独立的状态值（每次渲染都是完全独立的）。也就是说，每个函数中的 `state` 变量只是一个简单的常量，每次渲染时从钩子中获取到的常量，并没有附着数据绑定之类的神奇魔法。

这也就是老生常谈的 `Capture Value` 特性。可以看下面这段经典的计数器代码

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}

```

按如下步骤操作：

* 1）点击 `Click me` 按钮，把数字增加到 3；
* 2）点击 `Show alert` 按钮；
* 3）在 `setTimeout` 触发之前点击 `Click me`，把数字增加到 5。

结果是 `Alert` 显示 3！

来简单解释一下：

* 每次**渲染相互独立**，因此每次渲染时组件中的状态、事件处理函数等等都是独立的，或者说只属于所在的那一次渲染
* 我们在 `count` 为 3 的时候触发了 `handleAlertClick` 函数，这个函数所记住的 `count` 也为 3
* 三秒种后，刚才函数的 `setTimeout` 结束，输出当时记住的结果：3

### 深入useState本质

### 当组件初次渲染（挂载）时

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d031187a4592464599a78737d3f15da1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

1. 在**初次渲染**时，我们通过 `useState` 定义了多个状态；
2. 每**调用一次**`useState` ，都会**在组件之外生成一条 Hook 记录**，同时包括状态值（用 `useState` 给定的初始值初始化）和修改状态的 `Setter` 函数；
3. **多次调用**`useState` 生成的 `Hook` 记录**形成了一条链表**；
4. 触发 `onClick` 回调函数，**调用 `setS2` 函数修改 `s2` 的状态**，不仅修改了 `Hook` 记录中的状态值，还即将**触发重渲染**。

### 组件重渲染时

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53eef022f4f94a47a8c0958164d4e8c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在初次渲染结束之后、重渲染之前，`Hook` 记录链表依然存在。当我们**逐个调用** `useState` 的时候，`useState` 便**返回了 `Hook` 链表中存储的状态**，以及修改状态的 `Setter`。

---

### 深入useEffect本质

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efe2295fa1d34660ad527081fa3d235f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

注意其中一些细节：

* `useState` 和 `useEffect` 在每次调用时都被添加到 `Hook` 链表中；
* `useEffect` 还会**额外**地在一个队列中添加一个等待执行的 `Effect` 函数；
* 在**渲染完成后**，依次调用 `Effect` 队列中的每一个 `Effect` 函数。

`React` 官方文档 `Rules of Hooks` 中强调过一点：

> Only call hooks at the top level. 只在最顶层使用 Hook。

具体地说，不要在循环、嵌套、条件语句中使用 `Hook`——

> 因为这些动态的语句很有可能会导致每次执行组件函数时调用 Hook 的顺序不能完全一致，导致 Hook 链表记录的数据失效。

---

### 自定义Hook实现原理

### 组件初次渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daab8683d74e49f09fa70366139e28ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在 `App` 组件中调用了 `useCustomHook` 钩子。可以看到，即便我们切换到了**自定义 Hook 中，Hook 链表的生成依旧没有改变**。

### 组件重新渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26c5979d361f4f159610841d07947cf6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 即便代码的执行进入到自定义 Hook 中，依然可以从 Hook 链表中读取到相应的数据，**这个”配对“的过程总能成功**。

而`Rules of Hook`。它规定**只有**在两个地方能够使用 React Hook：

1. React 函数组件
2. 自定义 Hook

第一点毋庸置疑，第二点通过刚才的两个动画你也可以轻松的得出一个结论：

> **自定义 Hook 本质上只是把调用内置 Hook 的过程封装成一个个可以复用的函数，并不影响 Hook 链表的生成和读取**。

---

### useCallback

> 依赖数组在判断元素是否发生改变时使用了 `Object.is` 进行比较，因此当 `deps` 中某一元素为**非原始类型**时（例如函数、对象等），每次渲染都会发生改变，从而每次都会触发 `Effect`，失去了 `deps` 本身的意义。

### Effect 无限循环

来看一下这段”永不停止“的计数器：

```jsx
function EndlessCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  });

  return (
    <div className="App">
      <h1>{count}</h1>
    </div>
  );
}

```

如果你去运行这段代码，会发现数字永远在增长。我们来通过一段动画来演示一下这个”无限循环“到底是怎么回事： ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77f89499d6eb4bbb9fbc31e333f9793c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp) 组件陷入了：**渲染 => 触发 Effect => 修改状态 => 触发重渲染**的无限循环

### 关于记忆化缓存（Memoization）

`Memoization`，一般称为记忆化缓存（或者“记忆”），它背后的思想很简单：假如我们有一个计算量很大的纯函数（给定相同的输入，一定会得到相同的输出），那么我们在第一次遇到特定输入的时候，把它的输出结果“记”（缓存）下来，那么下次碰到同样的输出，只需要从缓存里面拿出来直接返回就可以了，省去了计算的过程！

记忆化缓存（Memoization）的两个使用场景：

1. 通过缓存计算结果，节省费时的计算
2. 保证相同输入下**返回值的引用相等**

### useCallback使用方法和原理解析

为了解决函数在多次渲染中的**引用相等**（Referential Equality）问题，`React` 引入了一个重要的 `Hook`—— `useCallback`。官方文档介绍的使用方法如下：

```jsx
const memoizedCallback = useCallback(callback, deps);

```

第一个参数 `callback` 就是需要记忆的函数，第二个参数是`deps` 参数，同样也是一个**依赖数组**。在 `Memoization` 的上下文中，这个 `deps` 的作用相当于缓存中的键（Key），如果**键没有改变，那么就直接返回缓存中的函数，并且确保是引用相同的函数**。

#### 组件初次渲染(deps 为空数组的情况)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40a847ccd9904f2e98b02932da78762e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**调用 `useCallback` 也是追加到 `Hook` 链表上**，不过这里着重强调了这个函数 `f1` 所指向的**内存位置**，从而明确告诉我们：这个 **f1 始终是指向同一个函数。然后返回的 onClick 则是指向 Hook 中存储的 f1**。

#### 组件重新渲染

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/039bae2e1b98466aadfabeaad8d46040~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

重渲染的时候，再次调用 `useCallback` 同样返回给我们 `f1` 函数，并且**这个函数还是指向同一块内存，从而使得 onClick 函数和上次渲染时真正做到了引用相等**。

---

### useCallback 和 useMemo 的关系

之前我们说`Memoization` 的两大场景

1. 通过缓存计算结果，节省费时的计算
2. 保证相同输入下**返回值的引用相等**

而`useCallback` 和`uesMemo`从`Memoization`角度来说

* `useCallback` 主要是为了解决\*\*函数的”引用相等“\*\*问题，
* `useMemo` 则是一个”全能型选手“，能够**同时胜任引用相等和节约计算**的任务。

> 实际上，`useMemo` 的功能是 `useCallback` 的超集。

与 `useCallback` 只能缓存函数相比，`useMemo` 可以缓存任何类型的值（当然也包括函数）。`useMemo` 的使用方法如下：

```jsx
const memoizedValue = useMemo(() =>
    computeExpensiveValue(a, b),
    [a, b]
);

```

其中第一个参数是一个函数，这个**函数返回值的返回值**（也就是上面 computeExpensiveValue 的结果）将返回给 `memoizedValue` 。

因此以下两个钩子的使用是完全等价的：

```jsx
useCallback(fn, deps);
useMemo(() => fn, deps);

```

---

### useReducer

使用 `useState` 的时候遇到过一个问题：通过 `Setter` 修改状态的时候，怎么读取上一个状态值，并在此基础上修改呢？如果你看文档足够细致，应该会注意到 `useState` 有一个{函数式更新|Functional Update}的用法。

```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

```

传入 `setCount` 的是一个**函数**，它的**参数是之前的状态，返回的是新的状态**。熟悉 `Redux` 的朋友马上就指出来了：这其实就是一个 `Reducer` 函数。

### useState底层实现原理

在 `React` 的源码中，`useState` 的实现使用了 `useReducer`。在 `React` 源码中有这么一个关键的函数 `basicStateReducer`

```javascript
function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}

```

于是，当我们通过 `setCount(prevCount => prevCount + 1)` 改变状态时，传入的 `action` 就是一个 `Reducer` 函数，然后调用该函数并传入当前的 `state`，得到更新后的状态。而我们之前通过**传入具体的值修改状态时**（例如 `setCount(5)`），由于不是函数，所以**直接取传入的值作为更新后的状态**。

#### 传入的 action 是一个具体的值 （setCount(xx)）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa7eda4b26da4fab874b6bc96978e7cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 当传入 Setter 的是一个 Reducer 函数的时候：(setCount(c =>c+1))

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c70ed11225144c9ada81606e100d341~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

---

# 后记

**分享是一种态度**。

**全文完，既然看到这里了，如果觉得不错，随手点个赞和“在看”吧。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc034b4279c74625bfa91af96ecd0119~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
