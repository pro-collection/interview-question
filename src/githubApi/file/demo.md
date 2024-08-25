**关键词**：页签活跃状态

判断页面页签（Tab）是否为活跃状态，可以通过监听 `visibilitychange` 事件来实现。这个事件是由 `document` 对象触发的，可以用来判断页面是否对用户可见。当用户切换到其他标签页、最小化浏览器窗口、或是锁屏时，页面就会变为不可见状态。如果页面对用户可见，那么页面就处于活跃状态。

使用 `document.visibilityState` 属性可以检查页面的当前可视状态，这个属性有以下可能的值：

- **"visible"**：页面至少部分可见。在桌面端，这通常意味着页面是当前激活的标签页。
- **"hidden"**：页面对用户不可见。
- **"prerender"** 和 **"unloaded"**：这两个值用于特殊情况，通常较少用到。

### 示例代码

下面的代码演示了如何使用 `visibilitychange` 事件和 `document.visibilityState` 来判断页面是否为活跃状态：

```javascript
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    console.log("页面现在是活跃状态。");
  } else {
    console.log("页面现在不是活跃状态。");
  }
});
```

每当用户切换到该页签或从该页签切换走时，会触发 `visibilitychange` 事件。通过检查 `document.visibilityState` 的值，你可以判断页面是变为活跃状态还是变为非活跃状态。

这个功能可以用于多种场合，比如：

- 停止或开始运行页面上的动画。
- 控制媒体播放（比如自动暂停视频播放）。
- 调整页面或应用的资源消耗（对于非活跃页签减少资源使用）。
- 发送用户行为统计数据，以记录用户实际查看页面的时间。

这种方法的优点是兼容性好，现代浏览器都支持 `visibilitychange` 事件，可以用于构建响应用户行为的 web 应用。
