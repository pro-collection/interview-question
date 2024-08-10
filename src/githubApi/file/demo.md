**关键词**：axios 请求依赖

Axios 的底层依赖会根据运行环境而有所不同：

在浏览器环境中，Axios 通常会优先使用 `XMLHttpRequest` 对象来发送请求。但它也可以使用 `fetch` API （如果浏览器支持）。

在 Node.js 环境中，Axios 依赖于 Node.js 的 `http` 或 `https` 模块来发送请求。
