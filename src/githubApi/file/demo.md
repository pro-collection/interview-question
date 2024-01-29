**关键词**：CORS 预检请求条件

其动机是，`HTML 4.0` 中的 `<form>` 元素（早于跨站 `XMLHttpRequest 和 fetch`）可以向任何来源提交简单请求，所以任何编写服务器的人一定已经在保护跨站请求伪造攻击`（CSRF）`。 在这个假设下，服务器不必选择加入（通过响应预检请求）来接收任何看起来像表单提交的请求，因为 CSRF 的威胁并不比表单提交的威胁差。然而，服务器仍然必须提供 `Access-Control-Allow-Origin`的选择，以便与脚本共享响应。

若请求满足所有下述条件，则该请求可视为简单请求：

- 使用下列方法之一：
    - `GET`
    - `HEAD`
    - `POST`

- 除了被用户代理自动设置的标头字段（例如 Connection、User-Agent 或其他在 Fetch 规范中定义为禁用标头名称的标头），允许人为设置的字段为 Fetch 规范定义的对 CORS 安全的标头字段集合。该集合为：
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type（需要注意额外的限制）`
    - `Range（只允许简单的范围标头值 如 bytes=256- 或 bytes=127-255）`

- Content-Type 标头所指定的媒体类型的值仅限于下列三者之一：
    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`

- 如果请求是使用 `XMLHttpRequest` 对象发出的，在返回的 `XMLHttpRequest.upload` 对象属性上没有注册任何事件监听器；也就是说，给定一个 `XMLHttpRequest` 实例 `xhr`，没有调用 `xhr.upload.addEventListener()`，以监听该上传请求。

- 请求中没有使用 `ReadableStream` 对象。

比如说，假如站点 https://foo.example 的网页应用想要访问 https://bar.other 的资源。foo.example 的网页中可能包含类似于下面的 JavaScript 代码：
