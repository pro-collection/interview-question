**关键词**：cookie 构成部分、cookie 作用路径、cookie 作用域

在 HTTP 协议中，cookie 是一种包含在请求和响应报文头中的数据，用于在客户端存储和读取信息。cookie 是由服务器发送的，客户端可以使用浏览器 API 将 cookie 存储在本地进行后续使用。

一个 cookie 通常由以下几个部分组成：

1. 名称：cookie 的名称（键），通常是一个字符串。
2. 值：cookie 的值，通常也是一个字符串。
3. 失效时间：cookie 失效的时间，过期时间通常存储在一个 `expires` 属性中，以便浏览器自动清除失效的 cookie。
4. 作用路径：cookie 的作用路径，只有在指定路径下的请求才会携带该 cookie。
5. 作用域：cookie 的作用域，指定了该 cookie 绑定的域名，可以使用 `domain` 属性来设置。

例如，以下是一个设置了名称为 "user"、值为 "john"、失效时间为 2022 年 1 月 1 日，并且作用于全站的 cookie：

```
Set-Cookie: user=john; expires=Sat, 01 Jan 2022 00:00:00 GMT; path=/; domain=example.com
```

其中，`Set-Cookie` 是响应报文头，用于设置 cookie。在该响应报文中，将 cookie 数据设置为 "user=john"，失效时间为 "2022年1月1日"，作用路径为全站，作用域为 "example.com" 的域名。这个 cookie 就会被存储在客户端，以便在以后的请求中发送给服务器。
