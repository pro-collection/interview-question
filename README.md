# 面试题库

想做一个很全的面试题库工程

1. 需要去全网收集面试题               
2. 需要对面试题进行分类归类归档                       
3. 需要持续更新

----------

仓库迁移


## 如何使用？
1. 面试题采用 issue 方式来进行记录和作答， 直接访问本项目链接即可：https://github.com/pro-collection/interview-question/issues
2. 题目难度分级：初级、中级、高级、资深， 可以通过 milestone 来进行筛选：
<img width="1378" alt="image" src="https://user-images.githubusercontent.com/22188674/222943207-390166d3-062e-469d-a480-d34dc4db1895.png">
   
3. 题目的类型分类：使用 labels 方式管理
<img width="927" alt="image" src="https://user-images.githubusercontent.com/22188674/222943276-0cf2146a-f7a9-416d-bd66-890fc81e736b.png">
   
4. 关于题目序号， 直接使用 issue 自增 id 即可， 便于收藏记忆记录等：
<img width="620" alt="image" src="https://user-images.githubusercontent.com/22188674/222943315-fb58b939-53a2-467f-bc57-cccc66a166eb.png">

5. 关于问题讨论：开通 discussions 社区, 可以直接在 discussions 区进行讨论即可。
<img width="1334" alt="image" src="https://user-images.githubusercontent.com/22188674/222943370-122d4d33-73cb-44c7-b18d-7db089e0bdfe.png">
   
6. 使用技巧：本项目所有 open 的 issue 是作者进行整理了的问题。如何精确筛选呢？
- 搜索 title : `is:open in:title [txt]`
- 搜索 内容: `is:open in:body [txt]`
<img width="767" alt="image" src="https://user-images.githubusercontent.com/22188674/223155285-7cf7e2f5-e0ed-4d6c-adea-bc5ec3e2933c.png">


## 问题收集

> 2022.02.21


**初级**

- 说一说 cookie sessionStorage localStorage 区别？
- 说一说JS数据类型有哪些,区别是什么？
- 说一说你对闭包的理解？
- 说一说promise是什么与使用方法？
- 说一说跨域是什么？如何解决跨域问题？
- 说一说BFC
- 如何居中布局？
- 层叠上下文
- flex布局
- 说一说Vuex是什么，每个属性是干嘛的，如何使用 ？
- 说一说JavaScript有几种方法判断变量的类型？
- 说一说样式优先级的规则是什么？
- 说一说JS实现异步的方法？
- 说一说Vue2.0 双向绑定的原理与缺陷？
- 说一说数组去重都有哪些方法？
- 说一说null 和 undefined 的区别，如何让一个属性变为null
- 说一下浮动？
- 说一说es6中箭头函数？
- 说一说call apply bind的作用和区别？
- 说一说HTML语义化？
- 说一说this指向（普通函数、箭头函数）？
- 说一说CSS尺寸设置的单位
- 说几个未知宽高元素水平垂直居中方法
- 说一说JS变量提升？
- 说一说 HashRouter 和 HistoryRouter的区别和原理？
- 说一说map 和 forEach 的区别？
- 说一说事件循环Event loop，宏任务与微任务？
- 说一说Vue3.0 实现数据双向绑定的方法 ？
- 说一下Diff算法？
- 说一说三栏布局的实现方案
- 说一下浏览器垃圾回收机制？
- 说一说  vue 的 keep-alive ？
- CSRF攻击是什么？
- XSS攻击是什么？
- 说一说js继承的方法和优缺点？
- 说一说defer和async区别？
- 说一下浏览器如何渲染页面的？
- 说一说computed和watch的区别？
- 说一说 Vue 中 $nextTick 作用与原理？
- 说一说new会发生什么？
- 说一下token 能放在cookie中吗？
- 说一下浏览器输入URL发生了什么？
- 说一说组件通信的方式？
- 说一说 v-if 和 v-show区别？
- React生命周期的各个阶段是什么？
- React组件间传值的方法有哪些？
- 说一说盒模型？
- 说一说伪数组和数组的区别？
- 说一说如何实现可过期的localstorage数据？
- 说一说axios的拦截器原理及应用？
- 说一说创建ajax过程？
- 说一下fetch 请求方式？
- 说一下有什么方法可以保持前后端实时通信？
- 说一下重绘、重排区别如何避免？
- 说一说 Vue 列表为什么加 key？
- 说一说vue-router 实现懒加载的方法？
- ReactRouter基本用法是什么？
- setState是同步还是异步的？
- React事件绑定原理?
- React中hooks的优缺点是什么？
- 说一说前端性能优化手段？
- 说一说性能优化有哪些性能指标，如何量化？
- 说一说服务端渲染？
- 事件扩展符用过吗(...)，什么场景下？
- 说一说vue钩子函数？
- 浏览器缓存
- JS上下文执行栈和闭包
    - 你怎么看待闭包的副作用
    

**中级**              

- dom树是怎么生成的
- 渲染进程
- v8垃圾回收
- bind pipe compose 深拷贝
- 对React和Vue的看法
    - 为什么react需要合成事件
    - 生命周期
    - 路由
    - 指令
    - 响应式原理
    - 数组处理
    - key,diff算法
    - V3组合式API
    - V3编译原理
- pnpm、npm、yarn 关系？
- 如何组织 monorepo 工程？


------------

> 2023.02.22


- 闭包是什么? 闭包的用途?
- 简述事件循环原理
- 虚拟dom是什么? 原理? 优缺点?
- vue 和 react 在虚拟dom的diff上，做了哪些改进使得速度很快?
- vue 和 react 里的key的作用是什么? 为什么不能用Index？用了会怎样? 如果不加key会怎样?
- vue 双向绑定的原理是什么?
- vue 的keep-alive的作用是什么？怎么实现的？如何刷新的?
- vue 是怎么解析template的? template会变成什么?
- 如何解析指令? 模板变量? html标签
- 用过vue 的render吗? render和template有什么关系

- 对前端工程化的理解
- 前端性能优化都做了哪些工作
- Nodejs 异步IO模型
- pu/uv
- 设计模式
- 微前端
- 节流和防抖
- react有自己封装一些自定义hooks吗? vue有自己封装一些指令吗
- vue 向 react迁移是怎么做的? 怎么保证兼容的
- vue的双向绑定原理
- Node的日志和负载均衡怎么做的
- 那前后端的分工是怎样的？哪些后端做哪些node做

- 了解过vue3吗?
- webscoket的连接原理
- react生命周期
- redux原理
- vue 父子组件的通信方式
- async await的原理是什么?
- async/await, generator, promise这三者的关联和区别是什么?

- react和vue在技术层面的区别
- 常用的hook都有哪些?
- 用hook都遇到过哪些坑?
- 了解useReducer吗
- Node是怎么部署的? pm2守护进程的原理?
- Node开启子进程的方法有哪些?
- 进程间如何通信?
- css 三列等宽布局如何实现? flex 1是代表什么意思？分别有哪些属性?
- 前端安全都了解哪些? xss csrf
- https是如何安全通信的?


- 前端性能优化做了哪些工作?
- 线上监控 对于crashed这种怎么监控? 对于内存持续增长，比如用了15分钟之后才会出现问题怎么监控
- css 类 postion属性大概讲一下, static是什么表现? static在文档流里吗?
- Webpack的原理, plugin loader 热更新等等
- Set和Map
- 浏览器从输入url开始发生了什么
- vue 父子组件的通信方式

- node.js如何调试
- 代理调试工具用过哪些？
- chrome devtool 如何查看内存情况


- koa洋葱模型
- 中间件的异常处理是怎么做的？
- 在没有async await 的时候, koa是怎么实现的洋葱模型?
- body-parser 中间件了解过吗
- 如果浏览器端用post接口上传图片和一些其他字段, header里会有什么? koa里如果不用body-parser，应该怎么解析?
- webscoket的连接原理


- vue的响应式开发比命令式有什么好处
- 装饰器
- generator 是如何做到中断和恢复的
- function 和 箭头函数的定义有什么区别? 导致了在this指向这块表现不同
- 导致js里this指向混乱的原因是什么?
- 浏览器的事件循环
- 宏任务和微任务的区分是为了做什么? 优先级?

- 小程序的架构? 双线程分别做的什么事情?
- 为什么小程序里拿不到dom相关的api

- Promise then 第二个参数和catch的区别是什么?
- Promise finally 怎么实现的
- 作用域链
- Electron架构
- webpack5 模块联邦
- Webworker 了解多少？

- Symbol
- useRef /  ref / forwardsRef 的区别是什么?
- useEffect的第二个参数, 传空数组和传依赖数组有什么区别?
- 如果return 了一个函数, 传空数组的话是在什么时候执行? 传依赖数组的时候是在什么时候执行?
- ES5继承
- ES6继承, 静态方法/属性和实例方法/属性 是什么时候挂载的

- 前端稳定性监控
- 前端内存处理

- vue3添加了哪些新特性?
- Http 2.0和http3.0对比之前的版本, 分别做了哪些改进?
- HTTP 3.0基于udp的话, 如何保证可靠的传输?
- TCP和UDP最大的区别是什么?
- CSP除了能防止加载外域脚本, 还能做什么?
- typescript is这个关键字是做什么呢?

- Https中间人攻击
- 前端History路由配置 nginx

- 截图怎么实现
- qps达到峰值了，怎么去优化
- js超过Number最大值的数怎么处理?
- node 服务治理

----------

> 2023.02.23
> 参考文档：https://juejin.cn/post/6844903885488783374

- 第 1 题：（滴滴、饿了么）写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？
- 第 2 题：['1', '2', '3'].map(parseInt) what & why ?
- 第 3 题：（挖财）什么是防抖和节流？有什么区别？如何实现？
- 第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
- 第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？
- 第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？
- 第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？
- 第 8 题：setTimeout、Promise、Async/Await 的区别
- 第 9 题：（头条、微医）Async/Await 如何通过同步的方式实现异步
- 第 10 题：（头条）异步笔试题
```ts
// 请写出下面代码的运行结果
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```
  
- 第 11 题：（携程）算法手写题
```
已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
```

- 第 12 题：（滴滴、挖财、微医、海康）JS 异步解决方案的发展历程以及优缺点。
- 第 13 题：（微医）Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
- 第 14 题：（兑吧）情人节福利题，如何实现一个 new
- 第 15 题：（网易）简单讲解一下http2的多路复用
- 第 16 题：谈谈你对TCP三次握手和四次挥手的理解
- 第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态
```
如果A 与 B 建立了正常连接后，从未相互发过数据，这个时候 B 突然机器重启，问 A 此时处于 TCP 什么状态？如何消除服务器程序中的这个状态？（超纲题，了解即可）
```
- 第 18 题：（微医）React 中 setState 什么时候是同步的，什么时候是异步的？
- 第 19 题：React setState 笔试题，下面的代码输出什么？
```ts
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```
- 第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？
- 第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣
```
Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
```
- 第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化
- 第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景
- 第 24 题：聊聊 Redux 和 Vuex 的设计思想
- 第 25 题：说说浏览器和 Node 事件循环的区别
- 第 26 题：介绍模块化发展历程
```
可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、<script type="module"> 这几个角度考虑。
```
- 第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。
- 第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？
- 第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的
- 第 30 题：两个数组合并成一个数组
```
请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
```
- 第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
```
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```
- 第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。
- 第 33 题：下面的代码打印什么内容，为什么？
```
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
- 第 34 题：简单改造下面的代码，使之分别打印 10 和 20。
```
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
- 第 35 题：浏览器缓存读取规则
```
可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？
```
- 第 36 题：使用迭代的方式实现 flatten 函数。
- 第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？
- 第 38 题：（京东）下面代码中 a 在什么情况下会打印 1？
```
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```
- 第 39 题：介绍下 BFC 及其应用。
- 第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop
- 第 41 题：下面代码输出什么
```
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
- 第 42 题：实现一个 sleep 函数
- 第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果
- 第 44 题：介绍 HTTPS 握手过程
- 第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性
- 第 46 题：输出以下代码执行的结果并解释为什么
```
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
- 第 47 题：双向绑定和 vuex 是否冲突
- 第 48 题：call 和 apply 的区别是什么，哪个性能更好一些
- 第 49 题：为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？
- 第 50 题：（百度）实现 (5).add(3).minus(2) 功能。
- 第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？
- 第 52 题：怎么让一个 div 水平垂直居中
- 第 53 题：输出以下代码的执行结果并解释为什么
```
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```
- 第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？
- 第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面
```
如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
```
- 第 56 题：要求设计 LazyMan 类，实现以下功能。
```
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```
- 第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。
- 第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？
- 第 59 题：给定两个数组，写一个方法来计算它们的交集。
```
例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
```
- 第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。
```
<img src="1.jpg" style="width:480px!important;”>
```
- 第 61 题：介绍下如何实现 token 加密
- 第 62 题：redux 为什么要把 reducer 设计成纯函数
- 第 63 题：如何设计实现无缝轮播
- 第 64 题：模拟实现一个 Promise.finally
- 第 65 题： a.b.c.d 和 a['b']['c']['d']，哪个性能更高？
- 第 66 题：ES6 代码转成 ES5 代码的实现思路是什么
- 第 67 题：数组编程题
```
随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
```
- 第 68 题： 如何解决移动端 Retina 屏 1px 像素问题
- 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
- 第 70 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的
- 第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。
- 第 72 题： 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因。
- 第 73 题： 介绍下 BFC、IFC、GFC 和 FFC
- 第 74 题： 使用 JavaScript Proxy 实现简单的数据绑定
- 第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
- 第 76 题：输出以下代码运行结果
```
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```
- 第 77 题：算法题「旋转数组」
```
// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

// 示例1
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

// 示例2
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释: 
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]
```
- 第 78 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么
- 第 79 题：input 搜索如何防抖，如何处理中文输入
- 第 80 题：介绍下 Promise.all 使用、原理实现及错误处理
- 第 81 题：打印出 1 - 10000 之间的所有对称数
```
例如：121、1331 等
```
- 第 82 题：周一算法题之「移动零」
```
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
```
- 第 83 题：var、let 和 const 区别的实现原理是什么
- 第 84 题：请实现一个 add 函数，满足以下功能。
```
add(1); 	  // 1
add(1)(2);    // 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```
- 第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别
- 第 86 题：（京东、快手）周一算法题之「两数之和」
```
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
- 第 87 题：在输入框中如何判断输入的是一个正确的网址。
- 第 88 题：实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
```
以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
```
- 第 89 题：设计并实现 Promise.race()
- 第 90 题：实现模糊搜索结果的关键词高亮显示
- 第 91 题：介绍下 HTTPS 中间人攻击
- 第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
- 第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。
- 第 94 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？
- 第 95 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
- 第 96 题：介绍下前端加密的常见场景和方法
- 第 97 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？
- 第 98 题：（京东）写出如下代码的打印结果
```
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```
- 第 99 题：（bilibili）编程算法题
```
用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
```
- 第 100 题：（京东）请写出如下代码的打印结果
```ts
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

--------------------

> 2023.02.24

- 跨域问题如何解决？
- 路由匹配实现页面的跳转，这个是怎么做的？（history模式 、hash模式 、abstract路由模式）
- 小程序的大概原理?
- 简单的讲一下CSS中的盒模型，怎么触发？有什么效果？
- 手写一个 元素水平垂直于父元素
- 讲讲vue3的响应式，vue3的内部是怎么代理的？
- vue3 的响应式库是独立出来的，它单独使用的时候是什么效果？
- vue3 的一些响应式api你有用过吗？
- 二叉树算法题、合并有序链表
- ts 中 type 和 interface的区别
- ts 中 enum常规枚举和常量枚举的区别
- ts 中 void定义的变量类型
- vue 中 watch和computed的区分
- 大文件上传切割后如何上传的
- 什么场景引起重绘，什么场景引起重排
- 业务中必须要重绘重排如何进行优化
- webpack 热更新原理？


----------------------

> 2023.02.25

- 浏览器: from memory cache、from disk cache 有什么区别？
  https://juejin.cn/post/6844904006452510734
- editorconfig、prettier
- cookie https://juejin.cn/post/6914109129267740686
  - cookie存储在哪里？
  - cookie是如何工作的？
  - cookie和session的区别？
  - 什么是session级别的cookie？
  - cookie可以被谁来操作？
  - cookie各属性详解
  - js和服务端对cookie的操作有什么不同？
  - js如何操作cookie
  - 服务端如何读写cookie
  - Cookie 大小和数量的限制
  - 查看浏览器是否打开 Cookie 功能
  - cookie 的共享策略是什么
  - 跨域请求（CORS）中的cookie
  - cookie的编码
  - cookie与web安全
  - 不同的浏览器共享cookie吗?
  - cookie和localStorage/sessionStorage的差异
  - 哪些信息适合放到cookie中

--------------

> 2023.02.26

- 面试问题收集：https://github.com/lgwebdream/FE-Interview/issues
- 2021年前端面试必读文章【超三百篇文章/赠复习导图】：https://juejin.cn/post/6844904116339261447



------------

> 2023.02.27

将 node-index 项目里面的问题， 都搬移到这里来

- [会写 TypeScript 但你真的会 TS 编译配置吗？](https://www.51cto.com/article/694463.html)
