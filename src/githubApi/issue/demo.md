**关键词**：nodejs与浏览器环境判定

Axios 是一个跨平台的 HTTP 客户端库，可以在浏览器和 Node.js 中使用。Axios 通过判断当前环境来确定是在浏览器还是在 Node.js 环境中运行。

在浏览器环境中，Axios 默认会使用浏览器提供的 XMLHttpRequest 对象来发送 HTTP 请求。

在 Node.js 环境中，**Axios 会检查是否存在 `process` 全局对象，以及 `process` 对象中是否存在 `nextTick` 方法**。如果存在以上两个条件，Axios 就默认在 Node.js 环境中运行，并使用 Node.js 内置的 `http` 模块发送 HTTP 请求。

如果需要明确指定运行环境，可以使用 `axios.defaults.adapter` 属性来设置适配器（adapter），以便在需要时手动选择使用 XMLHttpRequest 或 Node.js 内置的 `http` 模块。

例如，在 Node.js 环境中可以这样设置适配器：

```javascript
const axios = require('axios');
const httpAdapter = require('axios/lib/adapters/http');

axios.defaults.adapter = httpAdapter;
```

通过上述方式，Axios 可以根据环境自动选择适当的底层实现来发送 HTTP 请求，使其在不同的环境中都能正常工作。
