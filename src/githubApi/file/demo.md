**关键词**：nginx 配置分片请求

Nginx 支持前端大资源（如视频、大型压缩包等）的 Range 分片请求，主要通过配置实现对 HTTP 范围请求的支持，允许客户端分段块下载资源，提升大文件传输效率。以下是具体配置方法和核心参数解析：

### 一、Range 分片请求的原理

HTTP 协议的 `Range` 请求头允许客户端只请求资源的一部分（如 `Range: bytes=0-1023` 表示请求前 1024 字节），服务器通过 `Accept-Ranges` 和 `Content-Range` 头响应支持状态和分片数据。

Nginx 默认已支持 Range 请求，但需确保配置正确以避免功能被禁用，尤其针对大文件场景需优化相关参数。

### 二、核心配置（支持 Range 请求）

#### 1. 基础配置（启用 Range 支持）

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/large-files;  # 存放大资源的目录

    # 关键：确保未禁用 Range 请求（默认启用，无需额外配置，但需避免以下错误）
    # 错误示例：禁用 Range 的配置（生产环境需删除）
    # proxy_set_header Range "";  # 禁止传递 Range 头
    # add_header Accept-Ranges none;  # 告知客户端不支持 Range

    # 大文件传输优化（可选但推荐）
    location / {
        # 支持断点续传和分片请求（默认开启，显式声明更清晰）
        add_header Accept-Ranges bytes;

        # 读取文件的缓冲区大小（根据服务器内存调整）
        client_body_buffer_size 10M;

        # 发送文件的缓冲区大小（优化大文件传输效率）
        sendfile on;               # 启用零拷贝发送文件
        tcp_nopush on;             # 配合 sendfile 提高网络效率
        tcp_nodelay off;           # 减少小包发送，适合大文件

        # 超时设置（避免大文件传输中断）
        client_header_timeout 60s;
        client_body_timeout 60s;
        send_timeout 300s;         # 发送超时延长至 5 分钟
    }
}
```

#### 2. 核心参数解析

- **`Accept-Ranges: bytes`**  
  响应头，明确告知客户端服务器支持字节范围的分片请求（这是支持 Range 的核心标志）。Nginx 默认会自动添加该头，无需显式配置，但显式声明可增强配置可读性。

- **`sendfile on`**  
  启用零拷贝（zero-copy）机制，让 Nginx 直接从磁盘读取文件并发送到网络，跳过用户态到内核态的数据拷贝，大幅提升大文件传输效率（对 Range 分片请求尤其重要）。

- **`tcp_nopush on`**  
  与 `sendfile` 配合使用，在发送文件时先积累一定数据量再一次性发送，减少网络包数量，适合大文件的连续分片传输。

- **`proxy_set_header Range $http_range`**（反向代理场景）  
  若大资源存储在后端服务（而非 Nginx 本地），需通过此配置将客户端的 `Range` 请求头传递给后端，确保后端能正确处理分片请求：
  ```nginx
  location /large-files {
      proxy_pass http://backend-server;
      proxy_set_header Range $http_range;          # 传递 Range 头
      proxy_set_header If-Range $http_if_range;    # 传递 If-Range 头（验证资源是否修改）
      proxy_pass_request_headers on;               # 确保所有请求头被传递
  }
  ```

### 三、验证 Range 请求是否生效

可通过 `curl` 命令测试服务器是否支持分片请求：

```bash
# 测试请求前 1024 字节
curl -v -H "Range: bytes=0-1023" http://example.com/large-file.mp4
```

若响应中包含以下头信息，则表示配置生效：

```
HTTP/1.1 206 Partial Content  # 206 状态码表示部分内容响应
Accept-Ranges: bytes
Content-Range: bytes 0-1023/10485760  # 表示返回 0-1023 字节，总大小 10485760 字节
```

### 四、注意事项

1. **避免禁用 Range 的配置**  
   确保配置中没有 `add_header Accept-Ranges none` 或 `proxy_set_header Range ""` 等禁用 Range 的指令，这些会导致客户端分片请求失败。

2. **后端服务配合**  
   若资源通过反向代理从后端服务获取，需确保后端服务本身支持 Range 请求（如 Node.js、Java 服务需实现对 `Range` 头的处理），否则 Nginx 无法单独完成分片响应。

3. **大文件存储优化**  
   对于超大型文件（如 GB 级视频），建议结合 `open_file_cache` 配置缓存文件描述符，减少频繁打开文件的开销：
   ```nginx
   open_file_cache max=1000 inactive=20s;
   open_file_cache_valid 30s;
   open_file_cache_min_uses 2;
   open_file_cache_errors on;
   ```

### 总结

Nginx 支持 Range 分片请求的核心是：

1. 确保默认的 `Accept-Ranges: bytes` 响应头有效（不被禁用）。
2. 启用 `sendfile` 等传输优化参数提升大文件处理效率。
3. 反向代理场景下需传递 `Range` 相关请求头给后端服务。

通过以上配置，前端可以实现大资源的断点续传、分片下载，显著提升用户体验。
