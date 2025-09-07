**关键词**：nginx 多环境隔离

Nginx 可以通过 `include` 指令或虚拟主机（vhost）实现前端多环境（如开发、测试、生产）的隔离部署，同时针对同域名不同路径的映射场景，需要处理路径重写和资源引用问题。以下是具体实现方案和注意事项：

### 一、通过 include 或 vhost 实现多环境隔离

多环境隔离的核心是为不同环境（如 `dev`、`test`、`prod`）配置独立的 Nginx 规则，避免互相干扰。

#### 1. 基于 include 指令的多环境配置（推荐）

适合单服务器部署多个环境，通过拆分配置文件实现隔离，便于维护。

**目录结构**：

```
nginx/
├── conf.d/
│   ├── common.conf          # 公共配置（如日志、超时时间）
│   ├── frontend-dev.conf    # 开发环境配置
│   ├── frontend-test.conf   # 测试环境配置
│   └── frontend-prod.conf   # 生产环境配置
└── nginx.conf               # 主配置文件（通过 include 引入子配置）
```

**主配置（nginx.conf）**：

```nginx
http {
    # 引入公共配置
    include conf.d/common.conf;

    # 引入各环境配置（按需启用，生产环境可注释 dev/test）
    include conf.d/frontend-dev.conf;
    include conf.d/frontend-test.conf;
    include conf.d/frontend-prod.conf;
}
```

**环境配置示例（frontend-dev.conf）**：

```nginx
# 开发环境：监听 8080 端口
server {
    listen 8080;
    server_name localhost;

    # 开发环境前端文件目录
    root /path/to/frontend/dev;
    index index.html;

    # 开发环境特有的路由配置（如 History 模式支持）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 开发环境接口代理（指向开发后端）
    location /api {
        proxy_pass http://dev-backend:3000;
    }
}
```

**优势**：

- 配置模块化，各环境规则独立，修改单个环境不影响其他环境。
- 可通过注释 `include` 语句快速切换生效的环境。

#### 2. 基于虚拟主机（vhost）的多环境配置

适合通过不同域名/端口区分环境（如 `dev.example.com`、`test.example.com`）。

**配置示例**：

```nginx
http {
    # 开发环境（域名区分）
    server {
        listen 80;
        server_name dev.example.com;  # 开发环境域名
        root /path/to/frontend/dev;
        # ... 其他配置（路由、代理等）
    }

    # 测试环境（端口区分）
    server {
        listen 8081;  # 测试环境端口
        server_name localhost;
        root /path/to/frontend/test;
        # ... 其他配置
    }

    # 生产环境（HTTPS）
    server {
        listen 443 ssl;
        server_name example.com;  # 生产环境域名
        root /path/to/frontend/prod;
        # ... SSL 配置和其他生产环境特有的规则
    }
}
```

**优势**：

- 环境边界清晰，通过域名/端口直接访问对应环境，适合团队协作。
- 可针对生产环境单独配置 HTTPS、缓存等高级特性。

### 二、同域名不同路径映射的重写问题及解决方案

当多个前端应用部署在同一域名的不同路径下（如 `example.com/app1`、`example.com/app2`），需要解决路径映射和资源引用的问题。

#### 场景示例

- 应用 A 部署在 `/app1` 路径，文件目录为 `/var/www/app1`
- 应用 B 部署在 `/app2` 路径，文件目录为 `/var/www/app2`

#### 1. 基础路径映射配置

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www;  # 父目录

    # 应用 A：匹配 /app1 路径
    location /app1 {
        # 实际文件目录为 /var/www/app1
        alias /var/www/app1;  # 注意：这里用 alias 而非 root（关键区别）
        index index.html;

        # 解决 History 路由刷新 404
        try_files $uri $uri/ /app1/index.html;
    }

    # 应用 B：匹配 /app2 路径
    location /app2 {
        alias /var/www/app2;
        index index.html;
        try_files $uri $uri/ /app2/index.html;
    }
}
```

**关键区别**：`alias` vs `root`

- `root /var/www`：请求 `/app1/static/css.css` 会映射到 `/var/www/app1/static/css.css`（拼接完整路径）。
- `alias /var/www/app1`：请求 `/app1/static/css.css` 会直接映射到 `/var/www/app1/static/css.css`（替换 `/app1` 为实际目录），更适合子路径部署。

#### 2. 需要解决的重写问题及方案

##### （1）前端资源引用路径错误

**问题**：应用内的静态资源（如 `js`、`css`、图片）若使用绝对路径（如 `/static/js/main.js`），会被解析为 `example.com/static/js/main.js`，而非 `example.com/app1/static/js/main.js`，导致 404。

**解决方案**：

- 前端打包时配置 **公共路径（publicPath）**：
  - Vue 项目：在 `vue.config.js` 中设置 `publicPath: '/app1/'`
  - React 项目：在 `package.json` 中设置 `homepage: '/app1'`
- 资源引用使用相对路径（如 `./static/js/main.js`），避免绝对路径。

##### （2）接口请求路径前缀问题

**问题**：应用内的接口请求（如 `/api/user`）会被发送到 `example.com/api/user`，若需要根据子路径区分接口（如 `example.com/app1/api/user`），需调整代理规则。

**解决方案**：

- 前端统一为接口添加路径前缀（如 `axios.defaults.baseURL = '/app1/api'`）。
- Nginx 配置对应代理规则：
  ```nginx
  location /app1/api {
      # 移除 /app1 前缀后转发到后端
      proxy_pass http://backend:3000/api;  # 或 http://backend:3000/（根据后端路径调整）
  }
  ```

##### （3）路由跳转路径错误

**问题**：SPA 路由跳转（如从 `/app1/home` 跳转到 `/app1/about`）若使用绝对路径，可能因框架路由配置未添加基础路径导致跳转错误。

**解决方案**：

- 前端路由配置基础路径：
  - Vue Router：`base: '/app1/'`
  - React Router：`basename="/app1"`

### 三、总结

1. **多环境隔离**：

   - 推荐使用 `include` 指令拆分配置文件，实现模块化管理。
   - 或通过虚拟主机（不同域名/端口）实现环境隔离，适合团队协作。

2. **同域名不同路径映射**：
   - 使用 `alias` 指令正确映射子路径到实际文件目录。
   - 解决资源引用问题：前端配置 `publicPath`，使用相对路径。
   - 解决接口和路由问题：统一添加路径前缀，配置对应 Nginx 代理和前端路由基础路径。

通过以上配置，可以实现前端多环境的清晰隔离和同域名下多应用的无冲突部署。
