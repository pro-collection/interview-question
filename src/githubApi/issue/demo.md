常见的 HTTP Header 在请求头（Request Header）和响应头（Response Header）中有许多不同的字段，它们具有各自的作用。下面是一些常见的 HTTP Header 字段及其作用的简要说明：

**Request Header：**
1. **Host**：指定目标服务器的域名或 IP 地址。
2. **User-Agent**：发送请求的用户代理（通常是浏览器标识）。
3. **Accept**：指定客户端可以接受的内容类型。
4. **Content-Type**：指定请求体的媒体类型。
5. **Authorization**：提供身份验证凭据，用于访问受保护的资源。
6. **Cookie**：包含在上一次响应中设置的服务器的 Cookie。
7. **Referer**：指定当前请求的来源页面 URL。

**Response Header：**
1. **Content-Type**：指定响应体的媒体类型。
2. **Content-Length**：指定响应体的长度（以字节为单位）。
3. **Cache-Control**：指定缓存策略，如缓存的有效期、是否可以缓存等。
4. **Set-Cookie**：在客户端设置 Cookie。
5. **Location**：指定重定向的目标 URL。
6. **Access-Control-Allow-Origin**：指定允许跨域请求的来源（CORS）。
7. **ETag**：指定实体标签，用于缓存验证。

这只是一小部分常见的 HTTP Header 字段，实际上还有很多其他的字段可以在请求头和响应头中使用，每个字段都有特定的作用和用途。这些头部字段能够提供额外的信息、控制请求和响应的行为，以及实现各种功能，如身份验证、缓存控制、安全性等。


**`Content-Type` 作用是啥，有哪些属性**

Content-Type 是 HTTP 头部字段之一，用于指示请求或响应中实体（如消息体、文件等）的媒体类型。

Content-Type 的值通常由媒体类型和字符集组成，使用 MIME（Multipurpose Internet Mail Extensions）类型标识。以下是一些常见的 Content-Type 值及其用途：

1. **text/plain**：纯文本类型，没有指定字符集，默认使用 ASCII 编码。
2. **text/html**：HTML 文档类型，用于表示网页内容。
3. **text/css**：CSS 文件类型，用于表示样式表。
4. **application/json**：JSON 数据类型，用于表示结构化数据。
5. **application/xml**：XML 数据类型，用于表示可扩展标记语言数据。
6. **application/octet-stream**：二进制流数据类型，用于表示任意二进制数据。
7. **multipart/form-data**：用于在 HTML 表单中上传文件时，将表单数据和文件一起提交。
8. **image/jpeg**、**image/png**、**image/gif**：用于表示不同格式的图像文件。

这只是一小部分常见的 Content-Type 值，实际上还有很多其他类型，每种类型都有其特定的用途和格式。根据实际需求，选择适当的 Content-Type 值可以确保请求和响应中的实体以正确的格式进行解析和处理。


