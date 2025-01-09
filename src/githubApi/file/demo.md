**关键词**：并发请求处理

1. **使用`Promise.allSettled`和分批处理**：将请求按并发限制分成小批次，用`Promise.allSettled`逐批执行，如`fetchWithConcurrency`函数，通过循环取批次并处理，最后返回所有结果。
2. **使用队列方式控制并发**：`PromiseQueue`类通过限制同时运行的`Promise`数量管理并发，有`enqueue`方法添加任务，`runNext`方法按规则执行任务，使用时创建实例并传入并发数，将请求任务入队后用`Promise.all`执行。
3. **使用第三方库**
   - **`p - limit`**：引入后设置最大并发数，将请求任务用其包裹后用`Promise.all`执行。
   - **`promise - pool`**：引入后配置请求数组、并发数和任务函数，执行`promisePool`获取结果。
4. **浏览器专用：`AbortController`限制超时**：`fetchWithTimeout`函数利用`AbortController`结合超时机制，在超时后中止请求，处理请求时传入`signal`，捕获错误并在最后清除超时。
5. **选择建议**
   - 任务数量多但单任务时间短，适合分批处理或`PromiseQueue`。
   - 任务数量多且复杂，建议用`p - limit`等库。
   - 实时性要求高，可考虑`AbortController`或合理设置超时策略。

- 参考文档
  https://juejin.cn/post/7457511148513443850
