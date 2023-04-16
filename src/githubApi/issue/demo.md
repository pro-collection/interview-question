### 监听静态资源加载情况
可以通过 `window.performance` 对象来监听页面资源加载进度。该对象提供了各种方法来获取资源加载的详细信息。

可以使用 `performance.getEntries()` 方法获取页面上所有的资源加载信息。可以使用该方法来监测每个资源的加载状态，计算加载时间，并据此来实现一个资源加载进度条。

下面是一个简单的实现方式：

```javascript
const resources = window.performance.getEntriesByType('resource');
const totalResources = resources.length;
let loadedResources = 0;

resources.forEach((resource) => {
  if (resource.initiatorType !== 'xmlhttprequest') {
    // 排除 AJAX 请求
    resource.onload = () => {
      loadedResources++;
      const progress = Math.round((loadedResources / totalResources) * 100);
      updateProgress(progress);
    };
  }
});

function updateProgress(progress) {
  // 更新进度条
}
```

该代码会遍历所有资源，并注册一个 `onload` 事件处理函数。当每个资源加载完成后，会更新 `loadedResources` 变量，并计算当前的进度百分比，然后调用 `updateProgress()` 函数来更新进度条。需要注意的是，这里排除了 AJAX 请求，因为它们不属于页面资源。

当所有资源加载完成后，页面就会完全加载。



### 实现进度条

网页加载进度条可以通过前端技术实现，一般的实现思路是通过监听浏览器的页面加载事件和资源加载事件，来实时更新进度条的状态。下面介绍两种实现方式。

#### 1. 使用原生进度条

在 HTML5 中提供了 `progress` 元素，可以通过它来实现一个原生的进度条。

```html
<progress id="progressBar" value="0" max="100"></progress>
```

然后在 JavaScript 中，监听页面加载事件和资源加载事件，实时更新 `progress` 元素的 `value` 属性。

```javascript
const progressBar = document.getElementById('progressBar');

window.addEventListener('load', () => {
  progressBar.value = 100;
});

document.addEventListener('readystatechange', () => {
  const progress = Math.floor((document.readyState / 4) * 100);
  progressBar.value = progress;
});
```

#### 2. 使用第三方库

使用第三方库可以更加方便地实现网页加载进度条，下面以 `nprogress` 库为例：

1. 安装 `nprogress` 库

```bash
bashCopy codenpm install nprogress --save
```

2. 在页面中引入 `nprogress.css` 和 `nprogress.js`

```html
<link rel="stylesheet" href="/node_modules/nprogress/nprogress.css">
<script src="/node_modules/nprogress/nprogress.js"></script>
```

3. 在 JavaScript 中初始化 `nprogress` 并监听页面加载事件和资源加载事件

```javascript
// 初始化 nprogress
NProgress.configure({ showSpinner: false });

// 监听页面加载事件
window.addEventListener('load', () => {
  NProgress.done();
});

// 监听资源加载事件
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    NProgress.start();
  } else if (document.readyState === 'complete') {
    NProgress.done();
  }
});
```

使用 `nprogress` 可以自定义进度条的样式，同时也提供了更多的 API 供我们使用，比如说手动控制进度条的显示和隐藏，以及支持 Promise 和 Ajax 请求的进度条等等。
