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
