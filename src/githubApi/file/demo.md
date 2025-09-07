**关键词**：nginx 刷新 404

要解决 SPA（单页应用）History 路由模式在 Nginx 部署时刷新 404 的问题，核心是理解 **History 路由的原理缺陷** 与 **Nginx 的请求匹配逻辑**，再通过针对性配置让所有路由请求都指向 SPA 的入口文件（通常是 `index.html`）。以下是完整解决方案：

### 一、问题根源：为什么会出现 404？

首先要明确 SPA 两种路由模式的本质差异，这是理解问题的关键：

| 路由模式               | 原理                                                                                                                          | 部署后刷新行为                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Hash 模式（`#`）       | 路由信息包含在 URL 的 `#` 后（如 `https://xxx.com/#/about`），`#` 后的内容不会发送给服务器，所有请求本质都是访问根路径（`/`） | 刷新时服务器只接收 `/` 请求，返回 `index.html`，SPA 再解析 `#` 后的路由，**不会 404**                  |
| History 模式（无 `#`） | 路由信息是真实 URL 路径（如 `https://xxx.com/about`），刷新时浏览器会将完整路径（`/about`）发送给服务器                       | Nginx 会查找 `/about` 对应的物理文件/目录，而 SPA 只有 `index.html` 一个入口文件，找不到就返回 **404** |

### 二、解决方案：Nginx 核心配置

核心思路：**让 Nginx 接收到所有 SPA 路由相关的请求时，都返回入口文件 `index.html`**，由 SPA 框架（Vue/React/Angular 等）再解析具体路由。

#### 1. 基础配置（通用版）

在 Nginx 的 `server` 块中，通过 `try_files` 指令实现“优先匹配物理文件，匹配不到则返回 `index.html`”：

```nginx
server {
    listen 80;                  # 监听端口（根据实际情况调整，如 443 用于 HTTPS）
    server_name your-domain.com; # 你的域名（如 localhost 用于本地测试）
    root /path/to/your/spa;     # SPA 打包后文件的根目录（绝对路径，如 /usr/local/nginx/html/spa）
    index index.html;           # 默认入口文件

    # 关键配置：解决 History 路由刷新 404
    location / {
        # try_files 逻辑：先尝试访问 $uri（当前请求路径对应的物理文件）
        # 再尝试访问 $uri/（当前请求路径对应的目录）
        # 最后都找不到时，重定向到 /index.html（SPA 入口）
        try_files $uri $uri/ /index.html;
    }
}
```

#### 2. 进阶配置（处理子路径部署）

如果 SPA 不是部署在域名根路径（如 `https://xxx.com/admin`，而非 `https://xxx.com`），需调整 `location` 匹配规则和 `try_files` 目标路径，避免路由错乱：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/project; # 注意：这里是父目录（包含 admin 子目录）
    index index.html;

    # 匹配所有以 /admin 开头的请求（SPA 部署在 /admin 子路径）
    location /admin {
        # 1. 先尝试访问子路径下的物理文件（如 /admin/static/css/main.css）
        # 2. 再尝试访问子路径下的目录
        # 3. 最后重定向到 /admin/index.html（子路径下的入口文件，而非根目录）
        try_files $uri $uri/ /admin/index.html;

        # 可选：如果 SPA 框架需要 base 路径，需在框架配置中同步设置
        # 例：Vue 需配置 publicPath: '/admin/'，React 需配置 homepage: '/admin/'
    }
}
```

### 三、注意事项（避坑点）

1. **路径正确性**：

   - `root` 指令必须指向 SPA 打包后文件的 **实际绝对路径**（如 Linux 下的 `/var/www/spa`，Windows 下的 `D:/nginx/html/spa`），错误路径会导致 Nginx 找不到 `index.html`。
   - 子路径部署时，`try_files` 最后一个参数必须是 **完整的子路径入口（如 /admin/index.html）**，不能写 `/index.html`（会指向根目录，导致 404）。

2. **HTTPS 场景适配**：
   如果网站使用 HTTPS（`listen 443 ssl`），配置逻辑完全一致，只需在 `server` 块中补充 SSL 证书相关配置，不影响路由处理：

   ```nginx
   server {
       listen 443 ssl;
       server_name your-domain.com;
       ssl_certificate /path/to/cert.pem;   # SSL 证书路径
       ssl_certificate_key /path/to/key.pem; # 证书私钥路径

       root /path/to/your/spa;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **配置生效方式**：
   修改 Nginx 配置后，需执行以下命令让配置生效（避免重启服务导致短暂 downtime）：

   ```bash
   # 1. 测试配置是否有语法错误（必须先执行，避免配置错误导致 Nginx 启动失败）
   nginx -t

   # 2. 重新加载配置（平滑生效，不中断现有连接）
   nginx -s reload
   ```

4. **与后端接口的冲突处理**：
   如果 SPA 同时有后端接口请求（如 `/api` 开头的接口），需在 Nginx 中优先匹配接口路径，避免接口请求被转发到 `index.html`。配置示例：

   ```nginx
   server {
       # ... 其他基础配置 ...

       # 第一步：优先匹配后端接口（/api 开头的请求），转发到后端服务
       location /api {
           proxy_pass http://your-backend-server:port; # 后端服务地址（如 http://127.0.0.1:3000）
           proxy_set_header Host $host;               # 传递 Host 头信息
           proxy_set_header X-Real-IP $remote_addr;   # 传递真实客户端 IP
       }

       # 第二步：剩余请求（SPA 路由）转发到 index.html
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### 四、原理总结

通过 `try_files $uri $uri/ /index.html` 这行核心配置，Nginx 实现了：

1. 优先处理 **静态资源请求**（如 `css`、`js`、`img`）：如果请求路径对应物理文件（如 `/static/css/main.css`），则直接返回该文件。
2. 兜底处理 **SPA 路由请求**：如果请求路径不对应任何物理文件（如 `/about`、`/user/123`），则返回 `index.html`，由 SPA 框架根据 URL 解析并渲染对应的页面，从而解决刷新 404 问题。
