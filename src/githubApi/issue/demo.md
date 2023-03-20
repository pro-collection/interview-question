### 浏览器进程：

浏览器是一个多进程的架构，当我们每开一个tab页面，就会开一个新的进程，所以如果一个页面崩溃也不会影响到别的页面。面试的时候经常会问从输入url到页面显示都发生了什么，这次主要说说针对渲染这块而浏览器具体都做了些什么，都有哪些进程？

首先浏览器进程有如下几部分：**主进程**，**第三方插件进程，GPU进程，渲染进程**。

而渲染进程又包含了很多线程：**js引擎线程，事件触发线程，定时器触发线程，异步http请求线程，GUI渲染线程。**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e40c867849c4911a6c16491a9bcf739~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

主进程：负责页面的显示与交互，各个页面的管理，创建和销毁其他进程。网络的资源管理和下载。

GPU进程： 最多有一个，3d绘制等。

插件进程： 每种类型的插件对应一个进程。

渲染进程：称为浏览器渲染或浏览器内核，内部是多线程的；主要负责页面渲染，脚本执行，事件处理等。

GUI渲染线程：

```markdown
1. 负责渲染浏览器界面，解析html，css，构建dom树和render树，布局和绘制。
2. 当重绘和回流的时候就会执行这个线程
3. GUI渲染线程和js引擎线程互斥，当js引擎执行时，GUI线程就会被挂起（相当于冻结了），GUI更新会被保存在一个队列中等到js引擎空闲时立即执行。


```

js引擎线程：

```markdown
1. 也称js内核，负责处理js脚本程序，例如v8引擎
2. 负责解析js脚本，运行代码
3. 等待任务队列中的任务，一个tab页只有一个js进程
4. 因为与GUI渲染线程互斥，所以js执行过长时间，就会造成页面渲染不连贯，导致页面渲染阻塞

```

事件触发线程：

```markdown
1. 归属于浏览器而不是js引擎，用了控制事件循环
2. 当js引擎执行settimeout类似的代码块时，会将对应任务添加到事件线程
3. 当对应的事件符合触发条件时，会被放到任务队列的队尾，等待js引擎线程处理
4. 由于js单线程的关系，这些等待处理的事件都需要排队等待js引擎处理

```

定时器触发线程：

```markdown
1. settimeout和setinterval所在的线程
2. 浏览器定时计数器不是由js引擎线程计数的，因此通过单独线程来计时触发定时，计时完毕后，添加到事件队列，等待js引擎执行。

```

异步http请求进程：

```markdown
1. 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求。
2. 将检测到状态变更时,如果设置有回调函数,异步线程就产生状态变更事件,将这个回调再放入事件队列中。再由 JavaScript 引擎执行

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e0e27b8d2954ab18ddf0ba13bdf70ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0bb32540e484bff8c162417e8112154~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

看图能大致了解渲染流程的七七八八，我按照我的理解重新梳理一下：

```css
1. 构建DOM树。因为浏览器无法理解和直接使用html所以需要转换成dom树的形式，对html进行解析。
2. 样式计算，对css进行解析。首先把css文本转化成浏览器可以理解的结构--stylesheets，然后对stylesheets进行标准化处理，就是将一些属性值转化为渲染引擎更容易理解，标准化的计算值（例如，color单词形式转化为rgb，em单位转化为px），其次计算dom节点的样式属性。
3. 布局阶段。
	a. 首先创建布局：遍历dom中所有节点，并添加到布局树中。
	b. 布局计算：通过js和css，计算dom在页面上的位置。
	c. 最后创建布局树。
4. 分层。根据复杂的3d转换，页面滚动，还有z-index属性都会形成单独图层，把图层按照正确顺序排列。生成分层树。
5. 图层绘制，栅格化以及图层显示。对每个图层进行单独的绘制，并提交到合成器线程。
6. 合成线程将图层分为图块，并在栅格化线程池中将图块转化为位图。
7. 合成线程发送绘制图块命令drawquads给浏览器进程。
8. 浏览器根据drawquads消息生成页面展示出来

```

### css阻塞，js阻塞：

关于提高页面性能经常听到建议说：把css代码放头部，js代码放底部。还有如果script和link都在头部，应该把script放上面。

css不会阻塞DOM解析，css阻塞DOM渲染：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cbba082d94a4241b2c2ab9e1e73c2c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

从这个渲染流程图可以看出，dom解析的时候，也可以进行css的解析

js阻塞DOM解析：

如果“script”和link都在头部，把link放在头部。就会发生阻塞，浏览器会先去下载css样式，再执行js，再执行dom。 因为浏览器不知道js脚本会写些什么，如果有删除dom操作，那提前解析dom就是无用功。不过浏览器也会先“偷看”下html中是否有碰到如link、script和img等标签时，它会帮助我们先行下载里面的资源，不会傻等到解析到那里时才下载。

我们在优化js阻塞的时候经常会用**defer和async异步进行js的解析，那这两个有什么区别呢？**

### async：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d5baa0a68b84c65b8b9059edf12be5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bde046b1318a4cc2849607734cd6653c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，async异步的解析js，如果js解析完毕，html还没解析完，就会停止html解析，立即执行js； 如果html解析完了就正好，直接执行js。所以还是有可能阻塞html。

### defer：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df533c40559640b78c0806288e60dc48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，defer可以异步的支持解析js，等到html解析完成后，才会执行js。必然不会阻塞html。
