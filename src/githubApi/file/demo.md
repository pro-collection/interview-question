**关键词**：操作链路耗时分析

> 作者笔记
> 该问题， 主要是考察两个问题， 怎么定操作节点指标， 怎么去捕获每个阶段时间的耗时

### 操作节点指标

首先对一个操作链路切片：比如一个操作流程， 分拆为第一步， 第二步， 第三步.......  
然后对每一步一个事件点。  
然后统计每一个时间点之间的时间差， 就可以得出用户早操作每一步操作停留的时间。

甚至可以统计一个串行流程， 实际上是一样的。

### 阶段耗时统计

**推荐： `performance.mark()`**

`performance.mark()` 是 Web Performance API 的一部分，它允许你在浏览器的性能条目缓冲区中创建一个具有特定名称的时间戳（也就是一个"标记"）。这些标记可用于精确测量页面或应用中的特定流程、操作、或某段代码的执行时间。通过使用`performance.mark()`来标记关键的代码执行点，你可以准确地测量出这些点之间的耗时，从而评估性能和识别瓶颈。

#### 如何使用 `performance.mark()`

**创建标记**

要使用`performance.mark()`，直接调用此函数并传入一个字符串作为标记的名称即可：

```javascript
performance.mark("startLoad");
// 执行一些操作
performance.mark("endLoad");
```

在上述示例中，`startLoad`和`endLoad`是两个标记点，分别表示加载操作的开始和结束。

**测量两个标记间的耗时**

创建标记后，你可以使用`performance.measure()`方法来测量这两个标记点之间的耗时。`performance.measure()`方法同样需要一个名称，并且可以接受两个额外的参数：起始标记和结束标记的名称。

```javascript
performance.measure("loadDuration", "startLoad", "endLoad");
```

在上面的代码中，`loadDuration`是测量的名称，表示从`startLoad`到`endLoad`之间的耗时。

**获取和分析测量结果**

通过`performance.getEntriesByName()`或其他类似的 API，你可以获取到性能条目并分析结果：

```javascript
const measure = performance.getEntriesByName("loadDuration")[0];
console.log(`加载耗时：${measure.duration}毫秒`);
```

`performance.getEntriesByName('loadDuration')`会返回一个数组，其中包含所有名为`loadDuration`的性能条目。在这个例子中，我们取数组的第一个元素，并通过`duration`属性获取实际的测量时间。

#### 清理标记和测量

为了避免性能条目缓冲区满了或是数据混乱，你可以在完成测量和分析后，使用`performance.clearMarks()`和`performance.clearMeasures()`来清除标记和测量结果。

```javascript
performance.clearMarks("startLoad");
performance.clearMarks("endLoad");
performance.clearMeasures("loadDuration");
```

#### 使用场景

`performance.mark()`非常适合用于测量页面加载、脚本执行、用户交互处理或任何自定义流程的性能。通过准确地标记和测量这些操作的起始和结束时间，开发者可以识别出性能瓶颈和潜在的优化点，从而改进应用的性能表现。

#### 注意事项

- 并非所有浏览器都支持 Web Performance API 的全部特性。使用这些 API 之前，建议检查兼容性。
- 对于高频率的性能标记和测量，要注意性能条目缓冲区可能会被快速填满，从而影响数据的收集和分析。确保适时清理不再需要的性能条目。
