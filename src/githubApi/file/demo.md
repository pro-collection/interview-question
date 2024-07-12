**关键词**：单例 toast

要确保批量请求失败时只弹出一个 toast，可以通过以下几种方式实现：

1. 设置全局标志位：定义一个全局变量（如 `isToastShown`）来表示是否已经弹出过 toast。在请求失败的处理逻辑中，首先检查该标志位。如果尚未弹出 toast，则进行弹出操作，并设置标志位为 `true`；如果标志位已经为 `true`，则直接忽略后续的弹出操作。
2. 使用防抖或节流函数：防抖（debounce）或节流（throttle）函数可以限制某个函数在一定时间内的执行次数。将弹出 toast 的操作封装在防抖或节流函数中，确保在短时间内的多个请求失败时，不会频繁弹出 toast。
3. 集中处理错误：将所有请求的错误集中处理，而不是在每个请求的 catch 块中直接弹出 toast。例如，把所有请求的 Promise 添加到一个数组中，然后使用 `Promise.all()` 或其他类似方法来统一处理这些 Promise 的结果。如果所有请求都失败了，再弹出一个 toast。

以下是使用全局标志位和集中处理错误的示例代码：

```javascript
let isToastShown = false; // 全局标志位

function makeRequests() {
  const requests = [fetchPost(), fetchComments()]; // 多个请求的 Promise

  Promise.all(requests)
  .then(() => {
      // 所有请求成功的处理逻辑
    })
  .catch(errors => {
      if (!isToastShown) { // 检查标志位
        notify(errors[0]); // 弹出 toast
        isToastShown = true; // 设置标志位为 true
      }
    });
}

function fetchJSON(url, input) {
  return fetch(url, input)
  .then(res => {
      if (res.ok) {
        return res.json();
      }
      const err = new HttpError(res);
      if (!isToastShown) { // 检查标志位
        notify(err); // 弹出 toast
        is toastShown = true; // 设置标志位为 true
      }
      throw err;
    });
}
```

在上述代码中，定义了一个全局变量 `isToastShown` 来标记是否已经弹出过 toast。在 `fetchJSON` 函数中，当请求失败时，如果 `isToastShown` 为 `false`，则弹出 toast 并设置其为 `true`。在 `makeRequests` 函数中，使用 `Promise.all` 来处理多个请求。如果所有请求都失败（即 `errors` 数组有内容），并且 `isToastShown` 为 `false`，则弹出 toast 并设置标志位。

这样，无论有多少个请求失败，都只会弹出一个 toast。当有新的批量请求时，记得在请求开始前将 `isToastShown` 重置为 `false`。

另外，如果使用的是一些前端框架或库，它们可能提供了更方便的方式来处理这种情况。例如，在 Vue.js 中，可以使用 Vuex 来管理全局状态，实现类似的功能。具体的实现方式可能会因项目的架构和使用的技术而有所不同，但基本思路是相似的。
