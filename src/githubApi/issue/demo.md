在使用Vue、React等前端框架时，我们都会发现项目中只有一个HTML文件，并且在该HTML中都存在一个根标签，起到了类似于容器的作用。容器内部的内容就由我们后续编写的每个视图决定，页面的切换就是容器中视图的切换。

前端路由的实现原理简单来说，就是在不跳转或者刷新页面的前提下，为SPA应用中的每个视图匹配一个特殊的URL，之后的刷新、前进、后退等操作均通过这个特殊的URL实现。为实现上述要求，需要满足：

改变URL且不会向服务器发起请求；

可以监听到URL的变化，并渲染与之匹配的视图。

主要有Hash路由和History路由两种实现方式。下文对两者的基本原理进行简单介绍，并分别实现了一个简易的路由Demo。

### Hash路由
原理就是通过键值对的形式保存路由及对应要执行的回调函数，当监听到页面hash发生改变时，根据最新的hash值调用注册好的回调函数，即改变页面。

#### 创建路由
```js
class Routers{
  constructor(){
    // 保存路由信息
    this.routes = {};
    this.currentUrl = '';
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  // 用于注册路由的函数
  route = (path, callback) => {
    this.routes[path] = callback || function(){};
  }

  // 监听事件的回调，负责当页面hash改变时执行对应hash值的回调函数
  refresh = () => {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
  }
}

window.Router = new Routers();
```

#### 注册路由
使用route方法添加对应的路由及其回调函数即可。以下代码实现了一个根据不同hash改变页面颜色的路由，模拟了页面的切换，在实际的SPA应用中，对应的就是页面内容的变化了。

```js
var content = document.querySelector('body');

function changeBgColor(color){
  content.style.background = color;
}

// 添加路由
Router.route('/', () => {
  changeBgColor('yellow');
});
Router.route('/red', () => {
  changeBgColor('red');
});
Router.route('/green', () => {
  changeBgColor('green');
});
Router.route('/blue', () => {
  changeBgColor('blue');
});
```


### History路由
在H5之前，浏览器的history仅支持页面之前的跳转，包括前进和后退等功能。

在HTML5中，新增以下API：
```js
history.pushState();			// 添加新状态到历史状态栈
history.replaceState();		// 用新状态代替当前状态
history.state;						// 获取当前状态对象
```

history.pushState()和history.replaceState()均接收三个参数：

- state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
- title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址

由于history.pushState()和 history.replaceState()都具有在改变页面URL的同时，不刷新页面的能力，因此也可以用来实现前端路由。

#### 创建路由类
```js
class Routers{
  constructor(){
    this.routes = {};
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    })
  }

  init(path){
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(path, callback){
    this.routes[path] = callback || function(){};
  }

  go(path){
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
}

window.Router = new Routers();
```


#### 注册路由
```js
function changeBgColor(color){
  content.style.background = color;
}

Router.route(location.pathname, () => {
  changeBgColor('yellow');
});
Router.route('/red', () => {
  changeBgColor('red');
});
Router.route('/green', () => {
  changeBgColor('green');
});
Router.route('/blue', () => {
  changeBgColor('blue');
});

const content = document.querySelector('body');
Router.init(location.pathname);
```


#### 触发事件
在使用hash实现的路由中，我们通过hashchange事件来监听hash的变化，但是上述代码中history的改变本身不会触发任何事件，因此无法直接监听history的改变来改变页面。因此，对于不同的情况，我们选择不同的解决方案：

- 点击浏览器的前进或者后退按钮：监听popstate事件，获取相应路径并执行回调函数
- 点击a标签：阻止其默认行为，获取其href属性，手动调用history.pushState()，并执行相应回调。

```js
const ul = document.querySelector('ul');

ul.addEventListener('click', e => {
  if(e.target.tagName === 'A'){
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
})
```

### 对比
基于hash的路由：

缺点：
- 看起来比较丑
- 会导致锚点功能失效

优点：                  
- 兼容性更好
- 无需服务器配合
