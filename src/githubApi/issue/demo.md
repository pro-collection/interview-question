**关键词**：link 标签属性

link标签有以下几个常用的属性：

1. href：指定所链接文档的URL地址，可以是一个外部CSS文件的URL或者其他文档的URL。
2. rel：用于定义当前文档与所链接文档之间的关系。常用的取值有stylesheet（指定所链接文档是一个外部CSS文件）、icon（指定所链接文档是一个图标文件）、preconnect（预连接到指定的URL，加快页面加载速度）等等。
3. type：指定所链接文档的MIME类型。常用的取值有text/css（链接一个外部CSS文件）、image/x-icon（链接一个图标文件）等等。
4. media：指定链接的文档在哪些媒体设备上生效。常用的取值有print（应用于打印样式）和screen（应用于屏幕样式）。
5. crossorigin：用于指定跨域资源的处理方式。常用的取值有anonymous（允许跨域请求，但不发送凭据）和use-credentials（允许跨域请求，并发送凭据）。
6. integrity：用于指定链接的文档的完整性校验值，以确保外部资源不被篡改。通常结合subresource integrity（SRI）一起使用。
7. as：用于指定所链接资源的预期用途，以优化资源的加载方式。常用的取值有image（图片资源）、font（字体资源）、script（脚本资源）等等。

link标签的作用是在HTML文档中引入外部资源，例如外部CSS文件、图标文件等。通过link标签，可以将外部资源与HTML文档关联起来，使得浏览器能够正确加载和渲染页面所需的样式和其他资源。
