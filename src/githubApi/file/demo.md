**关键词**：http 传输格式

HTTP（超文本传输协议）是一种用于传输超媒体文档（如 HTML）的应用层协议。在 HTTP 请求和响应中，可以传输多种数据格式。这些数据格式主要通过 HTTP 头部中的`Content-Type`字段来指定。下面是一些常见的 HTTP 传输数据格式：

### 1. 文本格式

- **`text/plain`**：纯文本格式，不包含任何格式化。
- **`text/html`**：HTML 格式，用于网页。
- **`text/css`**：层叠样式表（CSS）格式，用于样式信息。
- **`text/javascript`**（或`application/javascript`）：JavaScript 代码。

### 2. 应用格式

- **`application/json`**：JSON（JavaScript Object Notation）格式，常用于 Web 应用中的数据交换。
- **`application/xml`**：XML（可扩展标记语言）格式，类似于 HTML 但更加通用，也用于数据交换。
- **`application/x-www-form-urlencoded`**：这是 HTML 表单提交时最常用的编码格式，键值对都被编码为键=值对，并且使用`&`字符分隔。
- **`application/form-data`**：常用于文件上传。在表单数据被编码为一系列键值对时使用，每对键值对都表示为一个表单部分。
- **`application/octet-stream`**：任意的二进制数据。通常用于下载或上传文件。

### 3. 图像格式

- **`image/png`**：PNG 图像格式。
- **`image/jpeg`**：JPEG 图像格式。
- **`image/gif`**：GIF 图像格式。
- **`image/webp`**：WebP 图像格式，提供了比 JPEG 更好的压缩。

### 4. 音视频格式

- **`audio/mpeg`**：MP3 音频格式。
- **`audio/ogg`**：Ogg 音频格式。
- **`video/mp4`**：MP4 视频格式。
- **`video/webm`**：WebM 视频格式，提供高质量的视频压缩。

### 5. 字体格式

- **`font/woff`**：Web 开放字体格式。
- **`font/woff2`**：Web 开放字体格式的第二版，较 WOFF 更加高效。
