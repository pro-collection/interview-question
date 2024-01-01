**关键词**：请求 header Content-Type、header Content-Type 参数类型

**常见的请求Content-Type有以下几种**：

1. application/x-www-form-urlencoded：用于URL编码的表单数据，数据以键值对的形式发送。

2. multipart/form-data：用于发送带有文件上传的表单数据，可以包含文本字段和文件字段。

3. application/json：用于发送JSON格式的数据。

4. text/plain：用于发送纯文本数据。

5. application/xml：用于发送XML格式的数据。

6. text/xml：用于发送XML格式的数据，与application/xml类似，但将数据视为纯文本。

7. application/octet-stream：用于发送任意的二进制数据。

这些Content-Type用于指定请求中的主体数据的类型。根据你要发送的数据类型，选择合适的Content-Type。在Fetch API中，你可以通过设置请求头部中的`Content-Type`字段来指定Content-Type。


**追问：`application/xml` 和 `text/xml` 有啥区别？**

虽然`application/xml`和`text/xml`都用于发送XML格式的数据，但它们在处理数据时有一些细微的区别。

`application/xml`是一种通用的媒体类型，用于表示XML数据。它指示接收方将数据视为XML，并根据XML的语法进行解析和处理。这意味着接收方应该期望接收到的是一个符合XML规范的文档，而不是纯文本。

`text/xml`是将XML数据表示为纯文本的媒体类型。它指示接收方将数据视为普通文本，并将其视为XML文档进行解析和处理。这意味着接收方会将接收到的数据解析为XML，并进行相应的处理。

因此，主要区别在于接收方对待数据的方式。`application/xml`更加严格，要求数据符合XML规范，而`text/xml`则更灵活，将数据视为普通文本进行处理。
