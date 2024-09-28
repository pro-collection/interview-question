**关键词**：axios 配置

> 作者备注
>
> 这个问题太冷门了， 如果不是细看过顾问囊的人， 是不会知道有这个配置项的。 可以当做科普即可， 面试中问到的可能性也非常的低。

在 Axios 中，`withCredentials`是一个配置选项，用于处理跨源请求时是否携带用户凭证（cookies、HTTP 认证信息等）。

**一、作用**

1. 默认行为：

   - 默认情况下，`withCredentials`的值为`false`。这意味着在跨源请求中，浏览器不会自动发送用户凭证。
   - 例如，当你使用 Axios 向不同域名的服务器发送请求时，如果`withCredentials`为`false`，浏览器不会在请求中包含任何用户凭证信息。

2. 启用凭证发送：
   - 如果将`withCredentials`设置为`true`，则在跨源请求中，浏览器会自动包含用户凭证信息，如 cookies、HTTP 认证信息等。
   - 这对于需要在不同域名之间共享用户认证状态的应用非常有用。例如，一个单页应用（SPA）可能需要与不同的后端服务进行交互，并且希望在这些服务之间共享用户登录状态。

**二、注意事项**

1. 服务器端配置：

   - 要使`withCredentials`生效，服务器端也需要进行相应的配置，以允许接收跨源请求中的凭证信息。
   - 服务器需要设置适当的 CORS（跨源资源共享）响应头，如`Access-Control-Allow-Credentials: true`，并且指定允许的源`Access-Control-Allow-Origin`不能为通配符`*`，而必须是具体的源地址。

2. 安全考虑：
   - 启用`withCredentials`可能会带来安全风险，因为用户凭证可能会被发送到不受信任的服务器。因此，在使用时需要谨慎考虑安全问题，并确保只向可信任的服务器发送凭证信息。

例如：

```javascript
axios
  .get("http://another-domain.com/api/data", {
    withCredentials: true,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

在这个例子中，Axios 发送一个跨源请求，并将`withCredentials`设置为`true`，以尝试在请求中包含用户凭证信息。
