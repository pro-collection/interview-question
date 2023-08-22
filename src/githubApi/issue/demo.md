**通用头部字段**

指的是在请求头和响应头中都可以使用的字段

| 通用字段          | 作用                                          |
| ----------------- | --------------------------------------------- |
| Date              | 表示报文创建的时间                            |
| Connection        | 表示内部使用的TCP连接类型，keep-alive / close |
| **Cache-Control** | 控制http缓存的行为                            |
| Transfer-Encoding | 传输报文时候的编码方式                        |
| Upgrade           | 要求客户端升级协议                            |



**请求头字段**

| 请求头字段        | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| Accept            | 能正确接收的媒体类型                                         |
| Accept-Charset    | 能正确接收的字符集                                           |
| Accept-Encoding   | 能正确接收的编码格式列表。比如：gzip deflate                 |
| Accept-Language   | 能正确接收的语言列表                                         |
| Host              | 表示服务器的域名                                             |
| if-Match          | **比较两端资源的ETag，只有相等的时候才能正常完成请求**       |
| If-Modified-Since | 客户端记录的最后一次修改资源的时间，如果小于服务端最后一次修改的时间，则会返回200；否则返回304，去缓存中获取。 |
| if-None-Match     | 客户端记录的当前资源的Etag，如果和服务端不匹配，说明有了新的修改，返回200；否则返回304 |
| User-Agent        | 客户端的信息                                                 |
| Range             | 片段请求中，表示请求资源中的某一个部分                       |
| Referer           | 表示**当前是在哪个地址上请求这个资源**                       |
| Cookie            | 一些存在前端的信心，比如用户登录的信息。每次请求的时候都会带到后端 |



**响应头字段**

| 字段                             | 作用                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| **Content-Type**                 | 表示内容的媒体类型，text/html;charset=UTF-8                 |
| Content-Encoding                 | 告诉客户端内容的编码格式                                    |
| Content-Language                 | 表示返回内容使用的语言                                      |
| Content-Length                   | 表示响应体的长度                                            |
| Content-Range                    | 表示返回的实体的片段范围                                    |
| Content-Location                 | 表示返回数据的备用地址                                      |
| **Location**                     | 表示资源重定向之后的地址                                    |
| Expires                          | 表示强缓存资源的过期时间                                    |
| Last-Modified                    | 服务端记录的资源修改的最后时间，和If-Modified-Since配合使用 |
| ETag                             | 服务端记录的资源标识，和if-None-Match配合使用               |
| Allow                            | 当前资源允许的请求方法                                      |
| **Access-Control-Allow-Origin ** | 表示哪些网站可以跨域访问当前的资源，CORS                    |
| Access-Control-Allow-Methods     | 表示允许使用的方法                                          |
| Access-Control-Allow-Credentials | 表示CORS请求中是否可以带Cookie                              |
