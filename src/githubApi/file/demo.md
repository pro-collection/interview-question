**关键词**：MutationObserver api

`MutationObserver` 是一种能够响应 DOM 树变动的 Web API，它可以监听几乎所有类型的 DOM 变动，比如元素被添加、删除或修改。你可以通过它执行 callback 来应对这些变化。

下面是 `MutationObserver` 的基本用法：

### 创建 `MutationObserver` 实例

```javascript
var observer = new MutationObserver(callback);
```

### 配置观察者

你可以指定要观察的 DOM 变动的类型和具体的目标节点：

```javascript
var config = {
  attributes: true, // 观察属性变动
  childList: true, // 观察子列表变动
  subtree: true, // 观察后代节点
};

observer.observe(targetNode, config);
```

这里的 `callback` 是一个在观察到变动时执行的函数，它有两个参数：`mutationsList` 是一个变动列表，`observer` 是观察者实例。

### 回调函数

`MutationCallback` 函数会被调用，它有两个参数：

1. `mutationsList`：一个 `MutationRecord` 对象的数组，每个对象都描述了一个变动。
2. `observer`：触发通知的 `MutationObserver` 实例。

```javascript
function callback(mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
}
```

### 停止观察

你可以通过调用 `disconnect` 方法来停止观察：

```javascript
observer.disconnect();
```

这将停止观察并且清除之前的记录。

### 注意

- 使用 `MutationObserver` 应该谨慎，因为它可能对页面性能产生影响，尤其是在观察大型 DOM 树或频繁变动时。
- 尽量不要过度使用 `MutationObserver` 或过度指定需要它观察的变动种类和节点。

比如，如果你只想监听某个特定属性的变动，那么就不应该打开 `childList` 或者 `attributes`（如果不需要观察它们）。

`MutationObserver` 非常适用于响应 DOM 的动态变动来执行特定的 JavaScript 代码，而且是现代前端开发中的一个重要工具。在使用它时，考虑使用最严格的选项来优化性能并减少不必要的性能损耗。
