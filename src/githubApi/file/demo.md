**关键词**：nginx 配置跨域

Nginx 配置跨域（CORS）的核心是通过设置特定响应头，允许不同域的前端资源请求当前服务器资源。以下是关键配置和复杂跨域场景的注意事项：

### 一、基础跨域配置：关键响应头

基础跨域（无 cookie、无自定义头）需配置以下核心响应头，允许指定域的请求访问资源：

```nginx
location / {
    # 1. 允许的源域名（必填）
    # 注意：生产环境建议明确指定域名（如 https://example.com），而非 *
    add_header Access-Control-Allow-Origin *;

    # 2. 允许的请求方法（必填）
    add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';

    # 3. 允许的请求头（可选，根据实际需求添加）
    add_header Access-Control-Allow-Headers 'Content-Type, Authorization';

    # 4. 预检请求（OPTIONS）的缓存时间（可选，减少预检请求次数）
    add_header Access-Control-Max-Age 3600;

    # 处理预检请求（OPTIONS）：直接返回 204 成功状态
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

**各头字段作用**：

- `Access-Control-Allow-Origin`：指定允许跨域请求的源（`*` 表示允许所有源，不推荐生产环境使用）。
- `Access-Control-Allow-Methods`：允许的 HTTP 方法（需包含实际使用的方法，如 `OPTIONS` 是预检请求必须的）。
- `Access-Control-Allow-Headers`：允许请求中携带的自定义头（如 `Authorization`、`X-Custom-Header`）。
- `Access-Control-Max-Age`：预检请求（OPTIONS）的结果缓存时间（秒），避免频繁预检。

### 二、复杂跨域场景：带 cookie、自定义头的注意点

当跨域请求需要 **携带 cookie** 或 **自定义请求头** 时，配置需更严格，且前后端需协同配合：

#### 1. 带 cookie 的跨域（`withCredentials: true`）

- **Nginx 必须明确指定允许的源**（不能用 `*`），否则浏览器会拒绝响应：

  ```nginx
  # 错误：带 cookie 时不能用 *
  # add_header Access-Control-Allow-Origin *;

  # 正确：明确指定允许的源（如 https://frontend.com）
  add_header Access-Control-Allow-Origin https://frontend.com;

  # 必须添加：允许携带 cookie
  add_header Access-Control-Allow-Credentials true;
  ```

- **前端需配合设置**：请求时需显式开启 `withCredentials`（以 Fetch 为例）：
  ```javascript
  fetch("https://backend.com/api/data", {
    credentials: "include", // 等价于 XMLHttpRequest 的 withCredentials: true
  });
  ```

#### 2. 带自定义请求头（如 `X-Token`）

- **需在 `Access-Control-Allow-Headers` 中显式包含自定义头**，否则预检请求会失败：

  ```nginx
  # 例如允许 X-Token、X-User-Id 等自定义头
  add_header Access-Control-Allow-Headers 'Content-Type, X-Token, X-User-Id';
  ```

- **浏览器会先发送 OPTIONS 预检请求**，需确保 Nginx 正确处理（返回 204 或 200）：
  ```nginx
  if ($request_method = 'OPTIONS') {
      return 204;  # 预检请求成功，无需返回 body
  }
  ```

#### 3. 其他注意事项

- **`add_header` 指令的作用域**：如果 Nginx 配置中存在多个 `location` 块，跨域头需配置在对应请求的 `location` 中（如接口请求通常在 `/api` 路径）。
- **避免重复设置头**：如果后端服务（如 Node.js、Java）已设置 CORS 头，Nginx 无需重复添加，否则可能导致浏览器解析冲突。

- **生产环境安全性**：
  - 禁止使用 `Access-Control-Allow-Origin: *`（尤其是带 cookie 的场景）。
  - 限制 `Access-Control-Allow-Methods` 为必要的方法（如仅允许 `GET, POST`）。
  - 避免 `Access-Control-Allow-Headers` 包含通配符（如 `*`），仅添加实际需要的头。

### 三、完整复杂跨域配置示例（带 cookie + 自定义头）

```nginx
server {
    listen 80;
    server_name backend.com;

    # 接口路径的跨域配置（假设接口都在 /api 下）
    location /api {
        # 明确允许的前端域名（不能用 *）
        add_header Access-Control-Allow-Origin https://frontend.com;

        # 允许携带 cookie
        add_header Access-Control-Allow-Credentials true;

        # 允许的方法（包含预检请求 OPTIONS）
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';

        # 允许的头（包含自定义头 X-Token）
        add_header Access-Control-Allow-Headers 'Content-Type, Authorization, X-Token';

        # 预检请求结果缓存 1 小时
        add_header Access-Control-Max-Age 3600;

        # 处理预检请求
        if ($request_method = 'OPTIONS') {
            return 204;
        }

        # 转发请求到后端服务（如 Node.js、Java 服务）
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
}
```

### 总结

- 基础跨域：核心配置 `Access-Control-Allow-Origin`、`-Methods`、`-Headers`。
- 带 cookie 跨域：必须指定具体 `Origin`，并添加 `Access-Control-Allow-Credentials: true`。
- 自定义头跨域：需在 `Allow-Headers` 中显式声明，并正确处理 OPTIONS 预检请求。
- 生产环境需严格限制允许的源、方法和头，避免安全风险。
