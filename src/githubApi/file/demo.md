**关键词**：axios 配置

> 作者备注
>
> 这个其实直接看官网即可 https://axios-http.com/docs/req_config

以下是翻译的全配置

```js
{
  // `url` 是将用于请求的服务器 URL。
  url: '/user',

  // `method` 是进行请求时要使用的请求方法。
  method: 'get', // 默认值。

  // `baseURL` 将被添加到 `url` 的前面，除非 `url` 是绝对路径。设置 axios 实例的 `baseURL` 可以方便地向该实例的方法传递相对 URL。
  baseURL: 'https://some-domain.com/api',

  // `transformRequest` 允许在将请求数据发送到服务器之前对其进行更改。这仅适用于请求方法为 'PUT'、'POST'、'PATCH' 和 'DELETE'。数组中的最后一个函数必须返回一个字符串或 `Buffer`、`ArrayBuffer`、`FormData` 或 `Stream` 的实例。你可以修改 `headers` 对象。
  transformRequest: [function (data, headers) {
    // 做任何你想对数据进行的转换。

    return data;
  }],

  // `transformResponse` 允许在将响应数据传递给 `then/catch` 之前对其进行更改。
  transformResponse: [function (data) {
    // 做任何你想对数据进行的转换。

    return data;
  }],

  // `headers` 是要发送的自定义请求头。
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是要与请求一起发送的 URL 参数。必须是一个普通对象或 `URLSearchParams` 对象。注意：值为 `null` 或 `undefined` 的参数不会在 URL 中呈现。
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个可选的负责序列化 `params` 的函数（例如：https://www.npmjs.com/package/qs，http://api.jquery.com/jquery.param/）。
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'});
  },

  // `data` 是要作为请求主体发送的数据。仅适用于请求方法为 'PUT'、'POST'、'DELETE' 和 'PATCH'。当没有设置 `transformRequest` 时，必须是以下类型之一：字符串、普通对象、`ArrayBuffer`、`ArrayBufferView`、`URLSearchParams`；仅在浏览器中：`FormData`、`File`、`Blob`；仅在 Node.js 中：`Stream`、`Buffer`。
  data: {
    firstName: 'Fred'
  },

  // 发送数据到主体的语法替代方法，方法为 post，仅发送值，不发送键。
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。如果请求花费的时间超过 `timeout`，请求将被中止。
  timeout: 1000, // 默认值为 `0`（无超时）。

  // `withCredentials` 指示是否应使用凭证进行跨站点的 Access-Control 请求。
  withCredentials: false, // 默认值。

  // `adapter` 允许对请求进行自定义处理，这使得测试更加容易。返回一个 Promise 并提供有效的响应（请参阅 lib/adapters/README.md）。
  adapter: function (config) {
    /*... */
  },

  // `auth` 表示应使用 HTTP 基本认证，并提供凭证。这将设置一个 `Authorization` 请求头，覆盖你使用 `headers` 设置的任何现有的 `Authorization` 自定义请求头。请注意，仅可通过此参数配置 HTTP 基本认证。对于 Bearer 令牌等，应使用 `Authorization` 自定义请求头代替。
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 指示服务器将响应的数据类型。选项有：'arraybuffer'、'document'、'json'、'text'、'stream'；仅在浏览器中：'blob'。
  responseType: 'json', // 默认值。

  // `responseEncoding` 指示用于解码响应的编码（仅在 Node.js 中有效）。注意：对于 `responseType` 为 'stream' 或客户端请求将被忽略。
  responseEncoding: 'utf8', // 默认值。

  // `xsrfCookieName` 是用作 xsrf 令牌值的 cookie 的名称。
  xsrfCookieName: 'XSRF-TOKEN', // 默认值。

  // `xsrfHeaderName` 是携带 xsrf 令牌值的 HTTP 请求头的名称。
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值。

  // `onUploadProgress` 允许处理上传的进度事件（仅在浏览器中有效）。
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件做任何你想做的处理。
  },

  // `onDownloadProgress` 允许处理下载的进度事件（仅在浏览器中有效）。
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件做任何你想做的处理。
  },

  // `maxContentLength` 定义在 Node.js 中允许的 HTTP 响应内容的最大字节大小。
  maxContentLength: 2000,

  // `maxBodyLength`（仅在 Node.js 中有效）定义允许的 HTTP 请求内容的最大字节大小。
  maxBodyLength: 2000,

  // `validateStatus` 定义对于给定的 HTTP 响应状态码是应该解析还是拒绝 Promise。如果 `validateStatus` 返回 `true`（或设置为 `null` 或 `undefined`），则 Promise 将被解析；否则，Promise 将被拒绝。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值。
  },

  // `maxRedirects` 定义在 Node.js 中要遵循的最大重定向次数。如果设置为 0，则不会遵循重定向。
  maxRedirects: 5, // 默认值。

  // `socketPath` 定义在 Node.js 中要使用的 UNIX 套接字。例如：'/var/run/docker.sock' 用于向 Docker 守护进程发送请求。只能指定 `socketPath` 或 `proxy` 中的一个。如果两者都指定，则使用 `socketPath`。
  socketPath: null, // 默认值。

  // `httpAgent` 和 `httpsAgent` 定义在 Node.js 中执行 HTTP 和 HTTPS 请求时分别要使用的自定义代理。这允许添加像 `keepAlive` 这样的选项，这些选项在默认情况下是未启用的。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义代理服务器的主机名、端口和协议。你也可以使用传统的 `http_proxy` 和 `https_proxy` 环境变量来定义你的代理。如果你使用环境变量来进行代理配置，你还可以定义一个 `no_proxy` 环境变量，作为不应被代理的域名的逗号分隔列表。使用 `false` 来禁用代理，忽略环境变量。`auth` 表示应使用 HTTP 基本认证来连接到代理，并提供凭证。这将设置一个 `Proxy-Authorization` 请求头，覆盖你使用 `headers` 设置的任何现有的 `Proxy-Authorization` 自定义请求头。如果代理服务器使用 HTTPS，则你必须将协议设置为 `https`。
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定一个取消令牌，可用于取消请求（请参阅下面的“取消”部分了解详细信息）。
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` 指示是否应自动解压缩响应主体。如果设置为 `true`，还将从所有解压缩响应的对象中删除 'content-encoding' 请求头。仅在 Node.js 中有效（XHR 无法关闭解压缩）。
  decompress: true // 默认值。

}
```
