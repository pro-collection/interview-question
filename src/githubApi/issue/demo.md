### 如果用户觉得 web 应用反应卡顿， 主要从哪几个方面来排查？

- 加载慢
    - 资源下载慢
    - 首屏并发请求资源过多
    - 首屏接口慢
    - 首屏对应的 JS 执行慢
    - 首屏渲染慢
    - 首屏加载静态资源过大
    - .......
- 执行过程慢
    - 接口慢
    - long tasks 太多, 阻塞执行请求
    - 内存泄漏
    - 重绘重排 过多
    - 关键节点没有加 节流防抖
    - .......


### 主要排查手段有哪些
- **通过建立性能监控指标**: 通过真是用户数据反馈， 来判断用户是否卡顿

- **Chrome devtools: NetWork** 主要排查网络问题
<img width="1469" alt="image" src="https://user-images.githubusercontent.com/22188674/229800903-409009dd-105a-49e2-a7c4-4ed54c92210e.png">

- **Chrome devtools: Performance** 主要细查性能运行时性能，包含了 long tasks、render 次数、重排重绘、执行时间线、阻塞场景
<img width="973" alt="image" src="https://user-images.githubusercontent.com/22188674/229800739-3b8099bb-1aca-423a-a2d7-12c151becd47.png">

- **Chrome devtools: Performance monitor** 主要监控用户运行时性能，看看是否有内存泄露
<img width="597" alt="image" src="https://user-images.githubusercontent.com/22188674/229800314-4d1ae73a-50a2-47b0-bbf4-57d5ece7d4b7.png">

- **React Developer Tools**: 可以用于追踪 react 应用性能、渲染次数、重排重绘
![image](https://user-images.githubusercontent.com/22188674/229801498-3cc4fc25-64a5-4b9e-ace8-5ed7b96e4ac2.png)
  
- **Lighthouse**: 全面分析网页性能的一个工具、支持浏览器插件 
![image](https://user-images.githubusercontent.com/22188674/229803209-505d01da-d780-4a3e-abe7-e56cd942a64b.png)

- **webpack-bundle-analyzer**: 进行产物依赖分析、包大小分析

- **抓包**: 通过抓包的方式， 看看线上请求分析、请求模拟、网络劫持之后仅仅看 JS 执行时间

- **E2E测试**: 通过 E2E 进行性能预检， 每次上线前进行一系列系统操作， 看看时间耗时和线上耗时波动


### 主要解决办法和思路

**首屏加载慢的方向**          
- 减少包体积
  - 使用 `tree shaking` 减少包体积
  - 代码压缩和混淆
  - 对于高版本浏览器， 直接使用 ES6 语法，低版本浏览器再使用 ES5（es6 语法代码量会比编译成 es5 代码量小很多， 且执行速度也快）
  - 使用 `split chunks` 进行大包拆分、小包复用
  - 使用 `gzip` 
  - 使用 图片压缩
  - 使用 雪碧图
  - 图标使用 `iconfont` 加载
  - 懒加载， 仅加载首屏必要资源
  - 使用 `tailwindcss` 等技术， 复用 css 
  - 使用 `微前端` 技术，首屏仅加载当前子应用页面，可以做到只加载整站很少的一部分代码
  
- 网络方向
  - 使用流式服务端渲染， 可以查看文档：https://juejin.cn/post/6953819275941380109
  - 使用服务端渲染， 减少首屏请求
  - 使用 BFF 进行请求聚合
  - 使用 CDN 进行网络请求分发
  - DNS Prefetch 
  - 资源预加载（在闲暇时间加载后续页面所需要的资源和接口，例如：link rel preload）
  - 启用 HTTP2 多路复用
  - 在业务逻辑上， 首屏必要接口提前（例如在 html 加载的那一瞬间，利用一个非常小的 js 文件将首屏需要的请求发送出去, 然后缓存下来， 到业务使用的时候直接就使用即可）
  - 使用缓存技术缓存资源与请求：强缓存、协商缓存、离线缓存、Service Worker 缓存、后端业务缓存
  
- 



### 参考文档
- https://juejin.cn/post/7096144248713510943
- https://juejin.cn/post/6882936217609732110
- https://juejin.cn/post/7119074496610304031
