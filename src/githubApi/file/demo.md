HTTP（HyperText Transfer Protocol，超文本传输协议）的请求和响应报文都遵循特定的格式。理解这些格式对于开发 Web 应用和 API 非常重要。以下是 HTTP 请求和响应报文的一般结构：

### HTTP 请求报文

HTTP 请求报文由三个主要部分组成：请求行、请求头部（Headers）、消息主体（Body）。

1. **请求行**：

   - 包括方法（如 GET、POST）、请求的资源（如 URL）、HTTP 版本（如 HTTP/1.1）。
   - 例：`GET /index.html HTTP/1.1`

2. **请求头部**：

   - 包括关于客户端环境和请求主体的详细信息，如`Host`、`User-Agent`、`Accept`、`Content-Type`等。
   - 例：
     ```
     Host: www.example.com
     User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
     Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
     ```

3. **消息主体**：
   - 不是所有的请求都有消息主体，比如 GET 请求通常没有。对于 POST 或 PUT 请求，消息主体包含了发送给服务器的数据。
   - 例（表单数据）：
     ```
     username=john&password=123456
     ```

### HTTP 响应报文

HTTP 响应报文也由三个主要部分组成：状态行、响应头部（Headers）、消息主体（Body）。

1. **状态行**：

   - 包括 HTTP 版本、状态码（如 200、404）、状态消息（如 OK、Not Found）。
   - 例：`HTTP/1.1 200 OK`

2. **响应头部**：

   - 包含了服务器的信息及进一步的操作指示，如`Content-Type`、`Content-Length`、`Set-Cookie`等。
   - 例：
     ```
     Content-Type: text/html; charset=UTF-8
     Content-Length: 438
     ```

3. **消息主体**：
   - 包含了返回给客户端的数据，可能是网页的 HTML，或者是 API 调用的 JSON 数据。
   - 例（HTML 内容）：
     ```
     <html>
       <head><title>Example</title></head>
       <body>
         <h1>Hello, world!</h1>
       </body>
     </html>
     ```

### 示例

#### 请求示例

```
GET /hello.txt HTTP/1.1
User-Agent: curl/7.58.0
Accept: */*
Host: www.example.com
```

#### 响应示例

```
HTTP/1.1 200 OK
Date: Wed, 21 Oct 2020 07:28:00 GMT
Server: Apache/2.4.1 (Unix)
Content-Type: text/plain
Content-Length: 13

Hello, world!
```

HTTP 请求和响应报文的结构相对简单，遵循标准的格式，容易解析。了解这些基本的组成部分有助于进行 Web 开发和调试网络通信问题。
