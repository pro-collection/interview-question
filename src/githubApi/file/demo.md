**关键词**：nginx 配置 https

Nginx 配置 HTTPS 需重点关注协议版本、加密套件、证书配置等核心项，同时需正确设置 HTTP 到 HTTPS 的强制跳转。以下是详细配置方案：

### 一、HTTPS 核心配置项（协议、加密套件等）

HTTPS 配置的核心目标是**确保安全性**（禁用不安全协议和加密套件）和**兼容性**（支持主流浏览器），关键配置项缺一不可：

#### 1. 证书与私钥配置（必备）

需指定 SSL 证书（公钥）和私钥文件路径，证书需由可信 CA 机构签发（如 Let's Encrypt、阿里云等）：

```nginx
server {
    listen 443 ssl;  # 监听 443 端口并启用 SSL
    server_name example.com;  # 证书绑定的域名

    # 证书文件路径（PEM 格式）
    ssl_certificate /path/to/fullchain.pem;  # 包含服务器证书和中间证书
    ssl_certificate_key /path/to/privkey.pem;  # 服务器私钥
}
```

#### 2. 协议版本（禁用不安全协议）

需明确启用现代安全协议，禁用已被破解或不安全的旧协议（如 SSLv2、SSLv3、TLSv1.0、TLSv1.1）：

```nginx
# 仅启用 TLSv1.2 和 TLSv1.3（目前最安全的协议版本）
ssl_protocols TLSv1.2 TLSv1.3;
```

- **为何禁用旧协议**：  
  TLSv1.0/1.1 存在安全漏洞（如 BEAST 攻击），且不支持现代加密套件；SSL 协议已完全过时，必须禁用。

#### 3. 加密套件（优先选择强加密算法）

加密套件决定数据传输的加密方式，需优先选择**支持前向 secrecy（完美前向保密）** 和**AES-GCM 等强加密算法**的套件：

```nginx
# 现代浏览器兼容的强加密套件（TLSv1.2+）
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# 优先使用服务器端的加密套件选择（增强安全性）
ssl_prefer_server_ciphers on;
```

- **核心原则**：  
  避免使用 RSA 密钥交换（无 Forward Secrecy）和 CBC 模式加密（存在漏洞），优先 ECDHE 密钥交换 + GCM 模式。

#### 4. 性能与安全性优化项

```nginx
# SSL 会话缓存（减少握手耗时，提升性能）
ssl_session_cache shared:SSL:10m;  # 共享缓存，容量 10MB（约 40000 个会话）
ssl_session_timeout 1d;  # 会话超时时间（1天）

# 启用 HSTS（强制客户端后续使用 HTTPS 访问，防降级攻击）
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# 禁用 SSL 压缩（防止 CRIME 攻击）
ssl_compression off;

# 启用 OCSP Stapling（减少证书验证步骤，提升加载速度）
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /path/to/fullchain.pem;  # 与 ssl_certificate 一致即可
resolver 8.8.8.8 114.114.114.114 valid=300s;  # DNS 解析器（用于验证 OCSP 响应）
```

### 二、强制 HTTP 跳转 HTTPS 的配置方法

需将所有 HTTP（80 端口）请求强制重定向到 HTTPS（443 端口），确保用户始终使用加密连接。推荐两种可靠方案：

#### 1. 方案一：通过 301 永久重定向（推荐）

在 80 端口的 `server` 块中直接返回 301 重定向，适用于大多数场景：

```nginx
# HTTP 服务器（80端口）：仅用于跳转 HTTPS
server {
    listen 80;
    server_name example.com;  # 需与 HTTPS 服务器的域名一致

    # 永久重定向到 HTTPS
    return 301 https://$host$request_uri;
}
```

- **优势**：简单高效，搜索引擎会记住重定向，将权重转移到 HTTPS 域名。

#### 2. 方案二：通过 rewrite 指令（灵活适配复杂场景）

若需对特定路径做特殊处理（如临时不跳转某些路径），可使用 `rewrite`：

```nginx
server {
    listen 80;
    server_name example.com;

    # 对 /api/temp 路径临时不跳转（示例）
    location /api/temp {
        # 保持 HTTP 访问（仅临时使用，不推荐长期保留）
        proxy_pass http://backend;
    }

    # 其他所有路径跳转 HTTPS
    location / {
        rewrite ^(.*)$ https://$host$1 permanent;  # permanent 等价于 301
    }
}
```

### 三、完整 HTTPS 配置示例

```nginx
# HTTP 服务器：强制跳转 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

# HTTPS 服务器：核心配置
server {
    listen 443 ssl;
    server_name example.com;

    # 证书配置
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    # 协议与加密套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;

    # 性能与安全优化
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_compression off;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /path/to/fullchain.pem;
    resolver 8.8.8.8 114.114.114.114 valid=300s;

    # 前端资源配置（如 SPA 路由、缓存等）
    root /path/to/frontend;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 四、关键注意事项

1. **证书路径正确性**：  
   确保 `ssl_certificate` 和 `ssl_certificate_key` 指向的文件存在且权限正确（Nginx 进程需可读，建议权限 600）。

2. **HSTS 配置风险**：  
   `Strict-Transport-Security` 头一旦设置，客户端会严格遵守（即使后续关闭 HTTPS 也会强制使用），需确保 HTTPS 服务长期稳定后再添加 `preload` 选项。

3. **兼容性平衡**：  
   若需支持非常旧的浏览器（如 IE 10），可临时启用 TLSv1.1，但需知晓安全风险；现代网站建议仅保留 TLSv1.2+。

4. **配置验证**：  
   修改配置后需执行 `nginx -t` 检查语法，通过 `nginx -s reload` 生效；可使用 [SSL Labs 工具](https://www.ssllabs.com/ssltest/) 检测配置安全性（目标评分 A+）。

### 总结

HTTPS 核心配置包括：

- 证书与私钥（基础）、TLSv1.2+ 协议（安全）、强加密套件（防破解）；
- 强制跳转通过 301 重定向实现，确保所有 HTTP 请求转向 HTTPS。

合理配置可在安全性、兼容性和性能之间取得平衡，是现代网站的必备实践。
