## 前言

经过上一轮的面试，我信心一下子就建立起来了，说巧不巧，前几周正好看到美团校招，想着试一下也不会怎样，就找了学长要了内推码，试着投递了一下，然后就通知周六参加笔试，结果惨不忍睹。然后周二杭州一家（200-300/天）又通知参加面试，急匆匆看了下公司招聘要求，开始了面前突击。面试开始，面试结束，整个人如同被泼了冷水，心灰意冷。根据回忆总结复盘出这篇文章，希望记录下面试中的心态和遇到的难题，以及之后复盘中的一些面试技巧，重拾心态再度启程。

> 本文其实就是为了自己以后面试前复习方便写下来的，当我面试时遇到不会的实在没办法，但是遇到会的和之前被问到过的，必须保证不能丢分。抱着这样的想法，就想着一定要把每一个细节都弄懂并且最好有代码解释，林林总总下来没想到就万字了。

# 一、 杭州（实习 200-300 / 天）

### 1. ES6常用的API有哪些？

> 这里先不要急着深入描述这些方法的具体用法，有什么优缺点啊什么的，就只需要简单的列出来描述一下，面试官老师在问完这个问题后肯定会从中挑出一些拿来问你具体的。不要过于急于求成，把握好节奏，掌握技巧，不然太过于表现容易让面试官老师认为你在背八股。

1. **let和const**：引入了块级作用域变量的声明方式。
2. **箭头函数**：提供了更简洁的函数声明语法。
3. **模板字符串**：允许使用反引号（\`）创建多行字符串和插入变量。
4. **解构赋值**：可以从数组或对象中快速提取值并赋给变量。
5. **默认参数**：在函数声明时可以设置参数的默认值。
6. **扩展运算符**：用于将数组或对象展开为独立的元素。
7. **类（Class）**：引入了类和面向对象编程的概念。
8. **模块化（Modules）**：通过import和export语句实现模块的导入和导出。
9. **Promise**：用于处理异步操作，提供了更优雅的方式来处理回调函数。
10. **Set和Map**：提供了集合和字典数据结构，分别对应Set和Map对象。
11. **Symbol**：引入了一种新的原始数据类型，用于创建唯一的标识符。
12. **Proxy**：允许创建一个代理对象，用于拦截和自定义对象的操作。
13. **数组方法**：ES6添加了许多数组的新方法，如forEach、map、filter、reduce等。
14. **对象方法**：ES6引入了一些新的对象方法，如Object.assign、Object.keys、Object.values等。

### 2. Promise有几个方法以及它们之间的区别？

> 该问题是前一个你回答的答案中的Promise，所以当你回答面试官问题时，心里自己也要有心理准备，回答时尽量把自己懂得回答出来，逐渐引导面试官来问你自己有把握的问题，展现自己擅长的部分。

> 先一句话描述下常用的PromisePromise的方法

* `Promise.all()`：中的Promise序列会全部执行通过才认为是成功，否则认为是失败；
* `Promise.race()`：中的Promise序列中第一个执行完毕的是通过，则认为成功，如果第一个执行完毕的Promise是拒绝，则认为失败；
* `Promise.any()`：中的Promise序列只要有一个执行通过，则认为成功，如果全部拒绝，则认为失败；
* `Promise.allSettled()`：是一个用于处理多个 Promise 对象的方法，并且会返回一个包含每个 Promise 对象的解决状态的数组；
* `Promise.resolve()`：会返回一个新的 Promise 实例，该实例的状态为`fulfilled`。
* `Promise.reject()`：也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

> 接着再描述一下它们各自的使用场景

* `Promise.all()`：当需要同时发起多个异步请求，并在所有请求都完成后进行处理时，可以使用`Promise.all()` 来等待所有请求的结果返回。（*例如*：在图片批量上传的时候很有用，可以知道什么时候这批图片全部上传完毕，保证了并行，同时知道最终的上传结果。）

* `Promise.race()`：当需要同时发起多个异步请求，并且只关心最先返回的结果时，可以使用 `Promise.race()` 来获取最快的响应。（*例如*：当用户可以搜索不同城市的天气信息，你希望通过并行发送多个请求来获取不同天气数据源的结果，并显示最快返回的结果给用户。）

* `Promise.any()`：当需要同时发起多个异步请求，并且只关心第一个非拒绝状态的结果时，可以使用 `Promise.any()`。（*例如*：Vue3.0在unpkg和jsdelivr都有在线的CDN资源，都是国外的CDN，国内直接调用不确定哪个站点会抽风，加载慢，这时候可以两个资源都请求，哪个请求先成功就使用哪一个。）

* 当你想要等待多个异步操作全部完成（不管是解决还是拒绝），并获取每个操作的结果时，可以使用 `Promise.allSettled()`。（*例如*：管理员同时执行多个操作来处理用户退款请求，这些操作包括退款通知、退款日志。使用 `Promise.allSettled()` 可以获取每个操作的状态（成功或失败），并根据情况采取进一步的处理措施。）

* 当你需要创建一个已经解决（resolved）的 Promise 对象，并使用特定的值作为解决结果时，可以使用 `Promise.resolve()`。（*例如*：当用户登录成功通过身份验证时，使用 `Promise.resolve()` 创建一个已经解决的 Promise 对象，并将用户的身份验证结果作为解决值返回给调用者。）

* 当你需要创建一个已经拒绝（rejected）的 Promise 对象，并使用特定的原因作为拒绝原因时，可以使用 `Promise.reject()`。（*例如*：当用户尝试上传一个不支持的文件类型，你可以使用 `Promise.reject()` 创建一个已经拒绝的 Promise 对象，并将一个错误消息作为拒绝原因返回给用户。）

### 3. 阮一峰老师有一个博客，专门讲解一个flex布局，你可以讲一下flex布局吗？

> 因为我在自我介绍的时候说了我看过阮一峰老师相关的博客，在这里我也挺推荐对于ES6，flex布局等不熟的可以去看看

> 当你讲到这道题的时候，不要急着一股脑的全说出来，一定要注意自己的语速，要和面试官像聊天一样缓缓地聊出来，思路要清晰。

`Flex布局`是通过给父容器设置样式`(display:flex)`从而形成一个弹性容器`（flex container）`，其中这个容器里的子元素被称为弹性项目`（flex item）`，而在容器中有两根默认的轴，一根是水平的主轴`（main axis）`，另一根是垂直的交叉轴`（cross axis）`，弹性项目根据这两根轴在弹性容器中进行排列布局，从而形成了flex布局。

**弹性容器**有常用的6个属性：

* `flex-direction`
* `flex-wrap`
* `flex-flow`
* `justify-content`
* `align-items`
* `align-content`

`flex-direction`：属性决定主轴的方向（即项目的排列方向）。

```css
    .box {
      flex-direction: row | row-reverse | column | column-reverse;
    }
```

`flex-wrap`：属性定义，如果子元素在一条轴线排不下，换不换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

`flex-flow`：属性是`flex-direction`属性和`flex-wrap`属性的简写形式

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

`justify-content`：属性定义了项目在主轴上的对齐方式。

```css

.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
 align-items: flex-start | flex-end | center | baseline | stretch;
}
```

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
   align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

> 这里一定要记得弹性项目它也是有属性，可能在开发项目时用的不是很多，导致在问到的时候遗漏了这些子元素的属性，然后面试官就逮着你问这里的东西。

弹性项目也有常用的6个属性

* `order`
* `flex-grow`
* `flex-shrink`
* `flex-basis`
* `flex`
* `align-self`

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
 flex-grow: <number>; /* default 0 */
}
```

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

`flex-basis`属性定义了在分配多余空间之前，设置项目占据的主轴空间。它的默认值为`auto`，即项目的本来大小。

> 它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

*建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。*

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### 5.（场景题）flex布局如何实现子元素在右下角

```html
<div class="container">
  <div class="item">子元素1</div>
</div>
```

**第一种方式**

> 先在父元素通过`display:flex`设置 Flex 布局，并使用 `justify-content: flex-end;` 将子元素在主轴水平方向上右对齐，同时使用 `align-items: flex-end;` 将子元素在交叉轴垂直方向上底部对齐。

```css
.container {
  display: flex;
  justify-content: flex-end; /* 子元素在主轴上右对齐 */
  align-items: flex-end; /* 子元素在交叉轴上底部对齐 */
  height: 100vh; /* 设置容器高度，可以根据实际情况调整 */
}

.item {
  margin: 10px; /* 可以根据实际情况调整子元素之间的间距 */
}
```

**第二种方式**

> 直接在子元素上动手脚，设置`align-self: flex-end;`虽然实质上是一样的，但是面试官偏要在父容器上设置，子元素上也要设置。

```css
.container {
    display: flex;
    justify-content: flex-end; /. 子元素在主轴上右对齐 */
    height: 100vh; /* 设置容器高度，可以根据实际情况调整 \*/
}

.item {
    align-self: flex-end; /* 将子元素在交叉轴上底部对齐 */ 
}
```

### 6.（场景题）有四个按钮，实现鼠标移上去有高亮，移出高亮消失

> 其实这道题挺简单的，直接在相应的按钮上添加相应的伪类，并添加高亮的样式就差不多可以了。

```html
    <div class="button">按钮1</div>
    <div class="button">按钮2</div>
    <div class="button">按钮3</div>
    <div class="button">按钮4</div>
```

```css
.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #ccc;
    border-radius: 5px;
    cursor: pointer;
}

.button:hover {
    background-color: #ff0000; /. 高亮颜色 \*/
}
```

> ## 7. （场景题）有四个按钮，实现鼠标移上去，下面有横条，鼠标移动到另一个按钮上，横条跟着鼠标有跟随的动画效果

### 8. 有五个组件嵌套，Vue中实现这些组件传值的方法有哪些？

Vue中组件间通信的分类可以分成以下

* 父子组件之间的通信
* 兄弟组件之间的通信
* 祖孙与后代组件之间的通信
* 非关系组件间之间的通信

常用的组件通信一共有8种

1. 通过 props 传递
2. 通过 $emit 触发自定义事件
3. 使用 ref
4. EventBus
5. $parent 或$root
6. attrs 与 listeners
7. Provide 与 Inject
8. Vuex

### 父传子

* **props**

在父组件上传一些属性和值，然后子组件进行接收

`Father.vue`组件

```html
<Children name="jack" age=18 />  
```

`Children.vue`

```js
props:{  
    // 字符串形式  
 name:String // 接收的类型参数  
    // 对象形式  
    age:{    
        type:Number, // 接收的类型为数值  
        defaule:18,  // 默认值为18  
        require:true // age属性必须传递  
    }
}
```

### 子传父

* **$emit 触发自定义事件** 子组件通过`$emit触发`自定义事件，`$emit`第二个参数为传递的数值，父组件绑定监听器获取到子组件传递过来的参数

`Children.vue`

```js
<div @click="onSubmit">发送</div>
const onSubmit = () => {
 this.$emit('add', 'good') 
}
```

`Father.vue`

```js
<Children @add="cartAdd($event)" />
const cartAdd = (msg) => {
    console.log(msg) // 'good'
}
```

* **$ref**

`$ref`主要是在父组件中操作，在模板中创建好子组件，然后打个`child`ref标记，此时`this.$refs.child`代表的是获取到子组件`Children.vue`的vue实例，相当于在子组件中使用this，接着this.$refs.child.test()就是通过父组件调用子组件的方法或者值。

`Father.vue`

```js
 <Children ref="child"></Children>

 addClick() {
     this.$refs.child.test(); // 相当于直接Children.vue中的this.test()
 };
```

`Children.vue`

```js
 const test = () => {
     console.log('test');
 }
```

### 兄弟组件传值

* **EventBus**

* **A兄弟组件**通过`$emit`触发自定义事件，`$emit`第二个参数为传递的数值

* 另一个**B兄弟组件**通过`$on`监听自定义事件

`A兄弟组件.vue`

```js
import mitt from 'mitt'; // 引入第三方的EventEmitters
const emitter = mitt();

const onEventHandle = (msg) => {
    console.log(msg); // 666
}

 onMounted(() => {
    // 订阅
    emitter.on('eventName', onEventHandle);
})
```

`B兄弟组件.vue`

```js
<template>
    <div>
        <button @click="doSomething">按钮</button>
    </div>
</template>
<script setup>
    import mitt from 'mitt'; // 引入第三方的EventEmitters
    const emitter = mitt();
    // 发布
    const doSomething = () => {
        emitter.emit('eventName', '666');
    }
</script>
```

* **$parent 或 $ root**

通过共同的父组件`$parent`或者共同的根组件`$root`搭建通信桥梁，可以通过使用订阅与发布或者直接赋值和取值即可。

**发布与订阅**

兄弟组件

```js
this.$parent.on('add')
```

另一个兄弟组件

```js
this.$parent.emit('add',this.add)
```

**兄弟组件**

```js
this.$parent.msg = '123'
```

另一个兄弟组件

```js
console.log( 'this.$parent.msg')
```

`$root`与`$parent`类似

### 祖孙与后代组件传值

* **provide 与 inject**

* 在祖先组件使用`provide`传递值
* 在后代组件通过`inject`接收组件传递过来的值

祖先组件

```js
provide(){  
    foo:'test'
}  
```

后代组件

```html
    <h1>{{foo}}</h1> //  <h1>test</h1>
    
    <script>
        export default {
            inject:['foo'] // 获取到祖先组件传递过来的值
        }
    </script>
```

* **$attrs 与 $ listeners**

`$attrs`，先通过爷组件传值传给父组件，然后父组件使用`v-bind="$attrs"`把爷组件传过来的值放到`\$attrs`里，再到子组件中使用`\$attrs`

`爷组件`

```html
<template> 
   <child msg="参数" @eventFn="handle">
 </template>
```

`Child父组件`

```html
<template> 
    <son v-bind="$attrs" v-on="$listener"></son>
</template>
```

`Son子组件`

```html
<template>
   {{ $attrs.msg }}
</template>
```

`listeners`相当于一个中转站一样，通过设置`v-on="$listeners"'`可以监听子组件的$emit定义的函数指令，然后爷组件可以直接使用这个自定义的函数指令

`爷组件`

```html
<template> 
   <span>爷组件</span> 
   <child @eventFn="handle">
</template>
<script>
     const handle = (val) => {
         console.log(val) // foooo
     }
 </script>
```

`Child父组件`

```html
<template> 
    <span>父组件</span> 
    <son v-on="$listener"></son>
</template>
```

`Son子组件`

```html
<template> 
    <span>孙组件</span> 
    <button @click="clickFn">发送事件</button> 
</template>
<script>
    const clickFn = () => {
        this.$emit('eventFn','fooooo') // 第一个参数是自定义函数
    }
</script>
```

**非关系组件间之间的通信**

* **vuex**

  * `Vuex`作用相当于一个用来存储共享变量的容器

  * `state`用来存放共享变量的地方

  * `getter`，可以增加一个`getter`派生状态，(相当于`store`中的计算属性），用来获得共享变量的值

  * `mutations`用来存放修改`state`的方法。

  * `actions`也是用来存放修改state的方法，不过`action`是在`mutations`的基础上进行。常用来做一些异步操作

### 9. Vue生命周期的执行顺序？

> 其实就是官网上的一张图，只需要理解了它的流程之后，你能够清晰的说出来就可以了，这里我说的是vue2的

* 首先创建一个vue实例

* `Init Events Lifecycle`：在`beforeCreate`之前，对vue的生命周期钩子函数和vue的一些内置事件（如事件修饰符所代表的事件，`.once, .enter`等），此时数据代理还没有开始

* `beforeCreate`：此时data和methods都没有初始化，所以`无法`通过vue实例来访问data的数据和methods中的方法

* `Init injections reactivity`：在`created`之前，初始化组件实例的依赖注入`(init injections)`，就是对你在`main.js`中`use`的路由和`vuex`等一些第三方库，以便能够确保在组件创建和使用过程中正确地注入这些依赖项。

* `created`：该阶段data和methods已经初始化了，`可以`通过vue实例来访问data的数据和methods中的方法，但整个页面没有挂载到页面上，还无法获取到el的值

* `el`选项的判断：如果有`el`选项（options)，则继续执行；如果没有，则等待`vm.$mounted(el)`这个函数被调用，直到调用了这个函数才继续执行。

* `template`选项的判断：如果有`template`这个选项，则直接用这个`template`；如果没有，则去找`el`这个节点上的整个外部HTNL结构，包含

这个节点。
比如`el：'#app'`

```html
<div id="app">
    <h1>Hello</h1>
    <h2>World</h2>
</div>
```

`在判断阶段`，此时开始解析模板，在内存中生成虚拟DOM，浏览器页面还不能显示解析好内容

* `beforeMounted`：此时

  1. 页面呈现的是未经Vue编译的DOM结构。
  2. 所有对DOM的操作，最终都不奏效。

* `create vm.$el and replace "el" with it`：创建`vm.$el`，然后将内存中的虚拟DOM转为真实DOM插入页面

* `mounted`：此时，

  1. 页面中呈现的是经过Vue编译的DOM。

  2. 对DOM的操作均有效（尽可能避免）。至此初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作。

* `beforeUpdate`：此时：数据是新的，但页面是旧的，即：页面尚未和数据保持同步。

* `Virtual DOM re-render and patch`：根据新数据复集成新的虚拟 `DOM`,随后与引旧的虚拟`DOM`进行比较，最终完成页面更新，即：完成了`Model View`的更新，也就是进行了`diff`算法。

* `updated`： 此时：数据是新的，页面也是新的，即：页面和数据保持同步。

* `beforeDestroy`：此时：`vm`中所有的：`data`、`methods`、指令等等，都做处于可用状态，马上要执行销毁过程，一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作

* `destroyed`：当执行到`destroyed`函数时，组件已经被完全销吸，此时所有的数据、方法、指令、过滤器都不可用

![生命周期.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24be7753457a404485757e05c8976a25~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 10. 数据结构有哪几种？

数据结构是指组织和存储数据的方式，常用的数据结构包括以下几种：

1. **数组（Array）**：是一种线性数据结构，用于存储一组有序的元素。数组的特点是通过索引访问元素，具有随机访问和连续存储的特性。
2. **链表（Linked List）**：也是一种线性数据结构，但与数组不同，链表中的元素通过指针相互连接。链表的特点是插入和删除元素更加高效，但随机访问需要遍历整个链表。
3. **栈（Stack）**：是一种后进先出（LIFO）的数据结构，元素的插入和删除操作只能在一端进行，称为栈顶。栈的典型应用包括函数调用、表达式求值和撤销操作等。
4. **队列（Queue）**：是一种先进先出（FIFO）的数据结构，元素的插入操作在一端进行，而删除操作在另一端进行。队列的常见应用包括任务调度、消息传递等。
5. **树（Tree）**：是一种非线性数据结构，由节点和边组成，具有层级关系。树的常见类型包括二叉树、二叉搜索树、堆、平衡树等，树的应用广泛，如文件系统、数据库索引等。
6. **图（Graph）**：也是一种非线性数据结构，由节点和边组成，节点之间可以有多种关系。图的常见应用包括社交网络、网络路由等。
7. **哈希表（Hash Table）**：是一种基于哈希函数实现的数据结构，用于存储键值对。哈希表的特点是通过键的哈希值进行快速的插入、删除和查找操作。
8. **堆（Heap）**：是一种特殊的树形数据结构，具有堆序性质，即父节点的值大于等于（或小于等于）其子节点的值。堆常用于实现优先队列和堆排序等算法。

> 除了上述常见的数据结构，还有一些高级的数据结构如红黑树、字典树、并查集等，它们在特定场景下具有更高效的性能和应用价值。选择合适的数据结构对于解决问题和提高算法效率至关重要。

### 11. 单向链表如何插入一个值？（说一下思路）

> 对于单向链表进行操作，你得先和面试官介绍一下在JS中如何创建链表的，这样才好在后面讲清楚如何进行操作的

JS 中的链表，是以嵌套的对象的形式来实现的：

```kotlin
{
    // 数据域
    val: 1,
    // 指针域，指向下一个结点
    next: {
        val:2,
        next: ...
    }
}
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c60ff35372e40dca06479790637d28c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp) 

### 链表结点的创建

创建链表结点，是以一个构造函数开始的：

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

在使用构造函数创建结点时，传入 val （数据域对应的值内容）、指定 next （下一个链表结点）即可：

```js
const node = new ListNode(1)  
node.next = new ListNode(2)
```

然后，就创建出了一个数据域值为1，`next` 结点数据域值为2的链表结点：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da538d5287864c6b9cd35de8844faf31~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 链表元素的添加

链表的结点间关系是通过 `next` 指针来维系的。因此，链表元素的添加和删除操作，本质上都是在围绕 `next` 指针。

**在尾部添加结点**：只要改变一个 next 指针就行。这里记值为2的 node 结点为 node2（假设 node2 是现在的尾部结点），值为3的 node 结点为 node3。假如我要把 node3 添加到 node2 所在链表的尾部，直接把 node2 的 next 指针指向 node3 即可：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b066b7f58c448688a0499c466e3100f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp) 


**在两个结点间插入一个结点**：要想完成这个动作，我们需要变更的是**前驱结点**和**目标结点**的 next 指针指向，过程如下图：

插入前：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07ca037be54641c087aa5f14038cfb81~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp) 


插入后：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a854b778fa4e16ad635fac2d5bc834~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp) 


下面用代码来表述一下这个改变。：

```js
const node3 = new ListNode(3) // 如果目标结点本来不存在，那么记得手动创建     

node3.next = node1.next // 把node3的 next 指针指向 node2（即 node1.next）

node1.next = node3 // 把node1的 next 指针指向 node3
```

**在头部增加结点**：由于链表有时会有头结点，这时即便你是往链表头部增加结点，其本质也是“在头结点和第一个结点之间插入一个新结点”。

### 12. 你能把动态规划向我讲解清楚一下吗？

当涉及到解决某些具有重叠子问题性质的复杂问题时，动态规划是一种常用的算法思想。它通过将原问题拆解成一系列重叠子问题，并通过解决子问题来求解原问题。

动态规划的基本思路如下：

1. **确定状态**：将原问题划分成若干个子问题，并定义状态，通常用一个或多个变量来表示状态。

2. **定义状态转移方程**：找出子问题与原问题之间的关系，建立状态转移方程，描述状态之间的转移。

3. **确定初始条件**：确定初始状态对应的值，作为动态规划的起点。

4. **计算顺序**：根据状态转移方程和初始条件，按照一定的顺序计算出所有状态的值，通常是从小规模问题向大规模问题逐步推进。

5. **解决原问题**：根据计算得到的各个状态的值，得到原问题的解。

下面通过一个示例来说明动态规划的应用。

假设有一组数值，我们的目标是选择其中一些数值，使得它们的和最大，但选择的数值不能相邻。例如，对于数组\[1, 2, 3, 1\]，最大的非相邻数值和是4（选择1和3）。

可以使用动态规划来解决这个问题。以下是使用 JavaScript 实现的代码：

```javascript
function maxNonAdjacentSum(nums) {
  if (nums.length === 0) {
    return 0;
  }
  
  const dp = []; // 用于存储中间状态的数组
  dp[0] = nums[0]; // 初始状态，第一个数作为初始值
  dp[1] = Math.max(nums[0], nums[1]); // 第二个数的最大和为较大的那个数

  for (let i = 2; i 小于 nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    // 状态转移方程：当前位置的最大和为前两个位置的最大和加上当前位置的数值，或者前一个位置的最大和
  }

  return dp[nums.length - 1]; // 返回最后一个位置的最大和
}

// 示例用法
const nums = [1, 2, 3, 1];
const result = maxNonAdjacentSum(nums);
console.log(result); // 输出 4
```

在上述代码中，使用 `dp` 数组来存储中间状态，通过状态转移方程 `dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])` 计算出每个位置的最大和。最终，返回 `dp[nums.length - 1]`，即最后一个位置的最大和，即为原问题的解。

动态规划常用于解决一些最优化问题，例如最大值、最小值等。通过拆分问题、定义状态和状态转移方程，动态规划能够高效地解决许多复杂问题。

# 二、上海（实习)

### 1. vue2和vue3的区别

我的上篇文章中：第一家公司第一题 [面试题：小男孩毕业之初次面试](https://juejin.cn/post/7233307834456375353#heading-2 "https://juejin.cn/post/7233307834456375353#heading-2")

### 2. 项目中登录权限是如何处理的

首先，我在路由配置中对需要登录权限的页面添加一个`meta：{isRequireLogin:true}`，表示跳转到该页面后需要进行登录权限验证，

```js
{
    path: '/user',
    meta: {
        requiredLogin: true
    },
    component: () => import('@/views/User/Index.vue')
}
```

之后在路由守卫中`(to, from, next)`三个参数中的`to`获取到`meta.isRequireLogin`，如果有且为真，则需要对该页面进行登录校验，

```js
// 路由守卫，登录判断，以及主子页面之间的切换
router.beforeEach((to, from, next) => {
  const { requiredLogin } = to.meta;
});
```

然后再从本地存储`localstore`中获取login，看看用户有没有登录，如果登录了，则能获取到login且为真，之后放行，执行`next`,如果不能获取，则表示用户没有登录，那么就跳转到登录页面

```js
router.beforeEach((to, from, next) => {
  const { requiredLogin } = to.meta;
  const isLogin = localStorage.getItem("isLogin");
  // 判断是否已经登录并是否页面需要登录权限，如果是，跳转到登录页面，若否，则放行
  if (!isLogin && requiredLogin) {
    next("login");
  } else {
    next();
  }
});
```

### 3. 在项目中如何使用localStore本地存储的

> 除了第一个其他都是我现场想的，项目赶得太急了，这些功能都还没来得及加，但没关系，大胆说，只要你能清楚怎么实现就行。

1. **用户登录状态的持久化**：当用户登录成功后，将用户的身份标识或认证令牌存储在`localStorage`中。这样，在用户刷新页面或重新打开应用时，可以检查`localStorage`中是否存在有效的登录信息，从而保持用户的登录状态。
2. **购买时表单数据的保存和恢复**：使用`localStorage`来保存表单数据。当用户暂时离开页面或刷新页面时，可以将表单数据存储在`localStorage`中，并在用户回到页面时从`localStorage`中恢复数据，避免用户需要重新填写。
3. **搜索界面的搜索记录**：将搜索后的记录数据存储在`localStorage`中，并在需要时从本地获取，提高用户的体验感。

### 4. 登录中如果token失效了，你是怎么处理的

1. **清除失效的token**：在前端，你可以清除本地存储（例如localStorage或sessionStorage）中的token以及与之相关的任何认证信息。这可以通过调用相应的方法（如`localStorage.removeItem('token')`）来实现。
2. **重定向到登录页**：一旦token失效，用户需要重新进行身份验证并获取新的有效token。在前端，你可以通过重定向用户到登录页来实现这一点。你可以使用Vue Router提供的`router.push('/login')`方法将用户导航到登录页面。
3. **提示用户重新登录**：为了给用户明确的反馈，你可以显示一条消息或弹出对话框，提示用户他们的token已经失效，并需要重新登录。

### 5. vue中的v-model对它的原理你知道吗？如果让你手写一个你是怎么处理？

[. 万能面试题：手写一个Vue2的MVVM响应式原理](https://juejin.cn/post/7289667869578592275 "https://juejin.cn/post/7289667869578592275")

### 6. ES6中的新特性你把你知道的稍微说一说

> 本文中第一家公司的第一题

### 7. 你知道箭头函数的作用以及使用场景？

> 当我被问到这道题时，我有点懵，因为我只知道箭头函数的特点，却没怎么关注于作用和使用场景。当你遇到这种情况时，你应该向面试官阐述一下你所知道的，并不是你不会，而是你平时没有关注到这方面，但另一方面你知道的一定要向面试官表达出来。所以我向面试官说，关于作用我没怎么关注，不过关于箭头函数的一些特性我还是了解一些的，之后开始表达你的观点，，如果面试官没喊停，你就可以继续讲下去了，

**特点**

1. **简洁的语法形式**：箭头函数使用了更简洁的语法形式，省略了传统函数声明中的`function`关键字和大括号。它通常可以在更少的代码行数中表达相同的逻辑。
2. **没有自己的this**：箭头函数没有自己的`this`绑定，它会捕获所在上下文的`this`值。这意味着箭头函数中的`this`与其定义时所在的上下文中的`this`保持一致，而不是在函数被调用时动态绑定。这可以避免传统函数中常见的`this`指向问题，简化了对`this`的使用和理解。
3. **没有`arguments`对象**：箭头函数也没有自己的`arguments`对象。如果需要访问函数的参数，可以使用剩余参数（Rest Parameters）或使用展开运算符（Spread Operator）将参数传递给其他函数。
4. **无法作为构造函数**：箭头函数不能用作构造函数，不能使用`new`关键字调用。它们没有`prototype`属性，因此无法使用`new`关键字创建实例。
5. **隐式的返回值**：如果箭头函数的函数体只有一条表达式，并且不需要额外的处理逻辑，那么可以省略大括号并且该表达式将隐式作为返回值返回。
6. **不能绑定自己的this、super、new.target**：由于箭头函数没有自己的`this`绑定，也无法使用`super`关键字引用父类的方法，也无法使用`new.target`获取构造函数的引用。

**作用**

1. **简化普通函数**：箭头函数提供了更简洁的语法形式，可以在需要定义函数的地方使用更短的代码来表达同样的逻辑。这可以提高代码的可读性和维护性。
2. **保留上下文**：箭头函数没有自己的`this`绑定，它会捕获所在上下文的`this`值。这意味着在箭头函数中，`this`的值是在函数定义时确定的，而不是在函数被调用时动态绑定。这种特性可以避免传统函数中的`this`绑定问题，并使代码更易于理解和维护。

**使用场景**

1. 简化函数表达式：当需要定义一个简单的函数表达式时，可以使用箭头函数代替传统的函数表达式，减少代码量。

   ```js
   // 传统函数表达式
   const sum = function(a, b) {
     return a + b;
   };

   // 箭头函数
   const sum = (a, b) => a + b;
   ```

2. 箭头函数作为回调函数：当需要传递回调函数时，箭头函数可以提供更简洁的语法形式，同时保留外层上下文中的`this`。

   ```js
   // 传统回调函数
   someFunction(function() {
     console.log(this); // 外层上下文的this
   });

   // 箭头函数作为回调函数
   someFunction(() => {
     console.log(this); // 外层上下文的this
   });
   ```

3. 简化函数中的`this`绑定问题：由于箭头函数没有自己的`this`绑定，可以避免使用传统函数中常见的`bind`、`call`或`apply`等方法来绑定`this`。

   ```js
   // 传统函数中的this绑定
   const obj = {
       value: 42,
       getValue: function() {
           setTimeout(function() {
               console.log(this.value); // undefined，因为此时this指向全局对象
           }, 1000);
       }
   };

   // 使用箭头函数避免this绑定问题
   const obj = {
       value: 42,
       getValue: function() {
           setTimeout(() => {
               console.log(this.value); // 42，箭头函数捕获了外层上下文的this
           }, 1000);
       }
   };

       ```
   ```

### 8. promise的一些方法，并且分别一般在什么情况下使用？

> 本文中第一家公司的第二题

### 9. 项目中版本管理，对git这些操作你了解吗？

> 如果你有项目，并且你把项目地址写到了简历里，在这里我建议你对代码提交的注释进行规范一点，因为有些面试官可能会去你的项目仓库看你的项目，提前了解一下你，所以在你写项目的过程中一定要注意不能太随意了。

可以看看这篇实际的git应用[git命令](https://juejin.cn/post/7264556202138009656#heading-2 "https://juejin.cn/post/7264556202138009656#heading-2")

初始化仓库：使用命令`git init`在当前目录下初始化一个Git仓库。  
克隆仓库：使用命令`git clone <repository>`从远程仓库克隆一个本地副本。  
添加文件：使用命令`git add <file>`将文件添加到Git的暂存区。  
提交更改：使用命令`git commit -m "<message>"`将暂存区的更改提交到本地仓库。  
查看状态：使用命令`git status`查看当前仓库的状态，包括已修改、已暂存和未跟踪的文件。  
查看提交历史：使用命令`git log`查看当前分支的提交历史。  
查看分支：git branch  
创建分支：git branch  
切换分支：git checkout  
创建+切换分支：git checkout -b 合并某分支到当前分支：git merge  
删除分支：git branch -d  
使用`git reset`命令回退版本：`git reset`命令可以将分支的HEAD指针和索引（暂存区）回退到指定的提交。具体的用法有三种：

* 回退到指定提交并丢弃之后的提交：使用命令`git reset <commit>`，例如`git reset HEAD~1`将回退到前一个提交。

* 回退到指定提交并保留之后的提交作为未暂存的更改：使用命令`git reset --soft <commit>`，例如`git reset --soft HEAD~1`将回退到前一个提交。

* 回退到指定提交并丢弃之后的提交和未暂存的更改：使用命令`git reset --hard <commit>`，例如`git reset --hard HEAD~1`将回退到前一个提交并丢弃未暂存的更改。

  注意：使用`git reset`命令回退版本会改变分支的历史记录，如果已经将回退前的提交推送到远程仓库，推荐使用`git revert`命令（下面会介绍）来回退版本，以避免造成分支历史冲突。

使用`git revert`命令回退版本：`git revert`命令用于创建一个新的提交，以撤销指定提交引入的更改。使用命令`git revert <commit>`，例如`git revert HEAD`将撤销最近的提交。

* `git revert`命令的优点是可以在不改变分支历史的情况下回退版本，并且可以将撤销的提交推送到远程仓库。

### 10. js里有哪些数据类型？

> 这里乍一看只是在问数据类型，回答很容易，其实下一个的问题才是面试官真正想问的，所以你在这道题上你得把一些堆栈的底层能够了解的非常清楚

**基本类型(值类型)：** Number(数字),String(字符串),Boolean(布尔),Symbol(符号),null(空),undefined(未定义)在内存中占据固定大小，数据保存在栈内存中

**引用类型(复杂数据类型)：** Object(对象)、Function(函数)、Array(数组)。其他还有Date(日期)、RegExp(正则表达式)等。引用类型的值是对象，数据是保存在堆内存中，栈内存存储的只是对象的变量标识符以及对象在堆内存中的存储地址。

### 11. 如果我有一个对象数组A，想生成一个B的对象数组，把A赋值给了B，当我改变了B的话A会改变吗，为什么？（其实就是深浅拷贝问题)

> 先回答会改变，当面试官抛出一个判断题时，先判断再作解释及拓展

当你将对象数组 A 赋值给对象数组 B，实际上是将 A 的引用（即内存地址）赋给了 B。因此，A 和 B 实际上指向了同一块内存地址，它们引用的是相同的对象。

当你修改 B 中的对象时，A 中相应位置的对象也会发生改变，因为它们是指向同一个对象，所以当你通过 B 修改对象时，实际上是在修改对象本身，而该对象被 A 和 B 共享，从而A的值也跟B修改了。

```css
let A = [{ name: 'John' }, { name: 'Jane' }];
let B = A;

B[0].name = 'Alice';

console.log(A); // 输出: [{ name: 'Alice' }, { name: 'Jane' }]
console.log(B); // 输出: [{ name: 'Alice' }, { name: 'Jane' }]
```

### 12. ES6中有个拷贝的方法，你知道那个方法吗？你还知道其他哪些方法？

ES6中的拷贝方法为`Object.assign`，它是一个**浅拷贝**的使用

### Object.assign

```js
var obj = {
    age: 18,
    nature: ['smart', 'good'],
    names: {
        name1: 'fx',
        name2: 'xka'
    },
    love: function () {
        console.log('fx is a great girl')
    }
}
var newObj = Object.assign({}, fxObj);
```

除了`Object.assign`这个浅拷贝方法，还有

* `Array.prototype.slice()`, `Array.prototype.concat()`

* 使用拓展运算符实现的复制

### slice()

```js
const fxArr = ["One", "Two", "Three"]
const fxArrs = fxArr.slice(0)
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### concat()

```vbscript
const fxArr = ["One", "Two", "Three"]
const fxArrs = fxArr.concat()
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### 拓展运算符

```css
const fxArr = ["One", "Two", "Three"]
const fxArrs = [...fxArr]
fxArrs[1] = "love";
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### 深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

* \_.cloneDeep()
* JSON.stringify()
* 手写循环递归

### \_.cloneDeep()

开发中常用的`lodash`库，`lodash`库中的`cloneDeep`

```ini
const _ = require('lodash');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```

### JSON.stringify()

```ini
const obj2=JSON.parse(JSON.stringify(obj1));
```

但是这种方式存在弊端，会忽略`undefined`、`symbol`和`函数`

```javascript
const obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

### 循环递归

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

### 13. vant中你如何修改官方上定义的样式的？

1. 使用全局样式覆盖：你可以在项目中的全局样式表（如`App.vue`或`main.scss`）中重写 Vant 组件的样式。在这些样式中，你可以使用 CSS 选择器和属性覆盖官方定义的样式。例如，你可以通过使用更具体的选择器或更高的优先级来修改组件的样式。

2. 使用组件的自定义类名：Vant 组件通常提供了一个 `class-prefix` 属性，你可以通过该属性自定义组件的类名前缀。通过自定义类名前缀，你可以在组件中使用自己的样式类名，并在全局样式表中重写这些类名的样式。

   ```html
   <van-button class="my-custom-button">Custom Button</van-button>
   ```

   ```css
   /* 在全局样式表中 */
   .my-custom-button {
     /* 自定义样式 */
   }
   ```

3. 使用组件提供的样式覆盖选项：一些 Vant 组件提供了样式覆盖选项，以便更方便地修改它们的样式。通过这些选项，你可以传递一个包含你想要修改的样式属性的对象，并将其应用到组件上。具体的选项名称和使用方式可以查阅 Vant 的文档来了解。

4. 使用样式穿透，在样式规则前面加上 `/deep/` 或 `>>>` 符号（视情况而定），然后再编写你想要修改的样式。这样可以让样式规则穿透组件封装，直接作用于组件内部的 DOM 元素。

   ```html
   <template>
       <van-button class="custom-button">Custom Button</van-button>
   </template>
   ```

   ```css
   <style scoped>
   .custom-button /deep/ .van-button {
     /* 修改样式 */
   }
   </style>
   ```

# 杭州（实习 200-250/天 ？）

> 面试官玩偷袭，毫无通知直接电话面试，囧~。遇到这种情况，第一件事情应该先缓口气，冷静下来，不要像我一样自我介绍的时候声音都是颤抖着，直到在自我介绍之中我停了一会儿只为了缓一缓才冷静下来。如果没有准备好，可以和面试官商量商量。之后再详细的问清楚是哪一家公司，让自己心里有个底，缓缓面试节奏，在和面试官沟通的过程中状态也会逐渐的调整好了，之后就可以开始面试了。

> ## 1. 听你自己写了文章，你是如何把自己的收获从输入到输出的

### 2. Pinia和vuex的区别

> 问区别，管他三七二十一，先把共同点说出来

**共同点**：Pinia和Vuex都是为Vue.js框架设计的状态管理库，与Vue.js无缝集成，并提供了在Vue.js应用程序中管理和共享状态的机制。它们也是管理数据流的一种设计模式，使得在vue开发中可以分成**数据流开发**和**UI组件开发**两部分

**区别：**

1. Vuex是基于全局单一状态树的概念，所有组件共享一个状态。而Pinia则采用了分模块的状态树，每个模块有自己的状态，较小且更简单，使得Pinia在一些小型或简单的项目中可能更容易上手，而Vuex则更适合大型和复杂的项目。
2. 在Vuex中，你需要定义`state`、`mutations`、`actions`和`getters`来管理状态。而在Pinia中，你只需要定义一个类似`state`的响应式对象，和用一些方法来代替`actions`、`mutations`和`getters`这些复杂的方法。Pinia与Vuex在语法上的差异并不大，但是它更贴近Vue 3的响应式API设计。
3. 在Vuex中，你可以通过`mapState`、`mapGetters`、`mapMutations`和`mapActions`等辅助函数来简化状态的访问和调用。而Pinia没有提供类似的辅助函数，而是通过使用Composition API和Vue 3的响应式工具来访问和操作状态。
4. Pinia支持TypeScript更好，可以更容易地进行类型推断和类型安全检查。Vuex也支持TypeScript，但在某些情况下可能需要额外的配置和类型注解。

### 3. 项目中如何做登录路由守卫的

> 本文中第二家第二题

### 4. 在你的项目中你是如何设置你的token时限

服务器端生成token时的有效期设置： 在服务器端生成token时，通常会使用一种称为JWT（JSON Web Token）的标准。JWT中可以包含有效期的声明，用于指定token的有效期限。服务器端在生成token时，可以设置`exp`（expiration）字段来指定token的过期时间。

例如，使用jsonwebtoken库生成JWT的示例代码如下：

```js
export const signToken = (options) => {
// 准备选项
const { payload } = options;

// 签发 JWT并且设置token有效期为1个小时
const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256'，expiresIn: '1h' });

// 提供 JWT
return token;

};
```

```go
上述示例中，`expiresIn`参数设置了有效期为1小时。可以根据需要调整有效期的长度。
```

### 5. 在项目中如何使用pinia和localStore的，分别什么时候使用

1. Pinia的使用场景：

   * **状态管理**：`Pinia`适用于管理应用程序的状态。当应用程序需要共享状态，例如用户认证信息、购物车数据、应用程序设置等，`Pinia`可以提供一种结构化的方式来管理和操作这些状态数据。通过Pinia，你可以定义状态、操作、变更和计算属性，并在不同组件中共享和访问这些数据。这样可以简化状态管理、组件通信和数据的一致性维护。
   * **复杂应用程序**：`Pinia`在大型或复杂的`Vue.js`应用程序中特别有用。当应用程序有多个模块或子系统，每个模块有自己的状态和逻辑时，`Pinia`的模块化状态树的设计可以提供更好的可扩展性和可维护性。

2. LocalStorage的使用场景：

   * **持久化数据**：`LocalStorage`适合用于在客户端浏览器中存储持久化数据。这些数据可以包括用户的偏好设置、本地缓存、本地会话数据等。`LocalStorage`提供了一种简单的键值对存储方式，可以方便地将数据存储在浏览器中，以供后续访问和使用。
   * **跨页面共享数据**：`LocalStorage`允许不同页面之间共享数据。当需要在不同页面之间传递数据或同步数据状态时，可以使用`LocalStorage`进行数据的存储和读取。这对于需要在多个页面之间保持数据一致性或共享数据状态的应用程序非常有用。

需要注意的是，LocalStorage是浏览器提供的功能，数据存储在用户的本地环境中，而Pinia是一个用于状态管理的Vue.js库，用于在Vue.js应用程序中管理和操作共享状态。因此，在项目中根据具体需求，你可以同时使用Pinia和LocalStorage，以实现状态管理和本地数据持久化的需求。

### 6. 你如何封装了Axios的请求数据的？

```js
import axios from "axios";

// 设置默认域名
axios.defaults.baseURL = 'http://localhost:3000'
// 设置请求头的授权标记，为后端jwt作准备
axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''
// 请求头 带上 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截器,拦截后端传来的数据
axios.interceptors.response.use((res) => {
    return res.data
})

export default axios
```

> ## 7. 你是如何学习前端的

### 结语

不断努力，不断坚持，一直不放弃

### 参考资料

* [阮一峰ES6入门](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F "https://es6.ruanyifeng.com/")
* [阮一峰# Flex 布局教程：语法篇](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F07%2Fflex-grammar.html "https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html")
* [张鑫旭Promise.all、race和any方法都是什么意思？](https://link.juejin.cn?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2021%2F05%2Fpromise-all-race-any%2F "https://www.zhangxinxu.com/wordpress/2021/05/promise-all-race-any/"))
* [chatgpt](https://link.juejin.cn?target=https%3A%2F%2Fchat.openai.com%2F "https://chat.openai.com/")
* [web前端面试 - 面试官系列](https://link.juejin.cn?target=https%3A%2F%2Fvue3js.cn%2Finterview%2F "https://vue3js.cn/interview/")
