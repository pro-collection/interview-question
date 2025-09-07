**关键词**：nginx 加载特定资源

Nginx 为不同前端资源配置缓存策略的核心是**根据资源特性（是否常变、是否带版本标识）差异化设置缓存规则**，同时通过特定机制实现特定资源的强制刷新。以下是详细方案：

### 一、按资源类型配置差异化缓存策略

前端资源可分为**静态资源**（JS、CSS、图片等）和**入口文件**（如 `index.html`），需根据其更新频率和版本管理方式设置不同缓存策略：

#### 1. 带哈希/版本号的静态资源（永久强缓存）

**特征**：文件名含唯一哈希（如 `app.8f3b.js`）或版本号（如 `v2/style.css`），内容变化时文件名必变。  
**策略**：设置长期强缓存，减少重复请求。

```nginx
# 匹配带哈希的 JS/CSS/图片（假设哈希为 8-16 位字符）
location ~* \.\w{8,16}\.(js|css|png|jpg|jpeg|webp|svg)$ {
    # 缓存 1 年（31536000 秒）
    expires 365d;
    # 强缓存标识：浏览器直接使用本地缓存，不发送请求
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

- **关键参数**：`immutable`（H5 新特性）告知浏览器资源不会变化，避免发送无效的条件请求（如 `If-Modified-Since`）。

#### 2. 无哈希的静态资源（短期强缓存 + 协商缓存）

**特征**：文件名固定（如 `favicon.ico`、`common.js`），可能不定期更新但无版本标识。  
**策略**：短期强缓存减少请求，过期后通过协商缓存验证是否更新。

```nginx
# 匹配无哈希的图片、字体等
location ~* \.(png|jpg|jpeg|ico|woff2?)$ {
    # 短期强缓存 7 天
    expires 7d;
    # 过期后必须验证是否更新
    add_header Cache-Control "public, max-age=604800, must-revalidate";
}
```

#### 3. 入口文件与动态页面（协商缓存）

**特征**：如 `index.html`、`page.html`，作为路由入口或动态内容载体，需确保用户获取最新版本。  
**策略**：禁用强缓存，每次请求通过协商缓存验证。

```nginx
# 入口文件（如 index.html）
location = /index.html {
    # 禁用强缓存（立即过期）
    expires -1;
    # 协商缓存：必须向服务器验证
    add_header Cache-Control "no-cache, must-revalidate";
}

# 其他 HTML 页面
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

- **协商缓存原理**：Nginx 自动返回 `Last-Modified`（文件修改时间），浏览器下次请求携带 `If-Modified-Since`，服务器比对后返回 `304`（未修改）或 `200`（新内容）。

#### 4. API 接口与动态数据（无缓存或短时缓存）

**特征**：如 `/api/user`，返回动态数据，需实时性。  
**策略**：禁用缓存或设置极短缓存时间。

```nginx
# API 接口
location /api {
    # 完全禁用缓存
    add_header Cache-Control "no-store, no-cache, must-revalidate";
    expires -1;
    # 转发到后端服务
    proxy_pass http://backend;
}
```

### 二、强制刷新特定资源的方法

当资源更新但因缓存未生效时，需强制用户获取最新版本，核心思路是**破坏缓存标识**或**主动清理缓存**：

#### 1. 前端主动更新资源标识（推荐）

利用“哈希/版本号与内容绑定”的特性，资源更新时修改文件名，浏览器会视为新资源自动请求：

- 例：`app.8f3b.js` → 更新后变为 `app.9c4d.js`，无需 Nginx 配置，彻底避免缓存问题。

#### 2. 通过 URL 参数强制刷新（临时方案）

对无哈希的资源，可在请求 URL 后添加随机参数（如 `?v=2`），使浏览器认为是新资源：

- 例：`common.js` → `common.js?v=2`
- **Nginx 无需额外配置**，但需前端手动更新参数，适合临时紧急更新。

#### 3. 清理 CDN 缓存（若使用 CDN）

若资源通过 CDN 分发，需在 CDN 控制台手动清理特定资源缓存：

- 例：阿里云 CDN 支持按路径（如 `/*/*.js`）或具体 URL 清理缓存，生效后用户请求会回源获取最新资源。

#### 4. 动态修改资源的 `Last-Modified`（不推荐）

通过 Nginx 指令强制修改资源的 `Last-Modified` 头，触发协商缓存更新：

```nginx
# 强制刷新某个资源（如 common.js）
location = /static/js/common.js {
    # 手动设置一个较新的修改时间（比实际文件新）
    add_header Last-Modified "Wed, 20 Sep 2025 08:00:00 GMT";
    # 协商缓存配置
    expires -1;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

- **缺点**：需手动修改 Nginx 配置并 reload，仅适合紧急情况，不建议长期使用。

### 三、完整缓存配置示例

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/frontend;

    # 1. 带哈希的静态资源（永久缓存）
    location ~* \.\w{8,16}\.(js|css|png|jpg|jpeg|webp|svg)$ {
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 2. 无哈希的静态资源（短期+协商）
    location ~* \.(png|jpg|jpeg|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, must-revalidate";
    }

    # 3. 入口文件与 HTML（协商缓存）
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # 4. API 接口（无缓存）
    location /api {
        add_header Cache-Control "no-store, no-cache";
        expires -1;
        proxy_pass http://backend;
    }

    # SPA 路由支持（配合 History 模式）
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 四、关键注意事项

1. **缓存与版本管理协同**：前端打包工具（Webpack/Vite）需确保“内容变则哈希变”，与 Nginx 强缓存配合，这是最可靠的刷新方式。
2. **避免缓存 `index.html`**：入口文件必须用协商缓存，否则用户可能无法获取新的哈希资源列表。
3. **HTTPS 环境下的缓存**：若启用 HTTPS，需确保 `Cache-Control` 头正确传递（Nginx 默认不拦截），避免 CDN 或代理服务器篡改缓存策略。

### 总结

- **差异化缓存**：带哈希资源用永久强缓存，无哈希资源用短期+协商缓存，入口文件和 API 禁用强缓存。
- **强制刷新**：优先通过修改资源哈希/版本号实现，临时场景可用 URL 参数，CDN 资源需手动清理 CDN 缓存。

这种策略既能最大化利用缓存提升性能，又能确保资源更新及时生效。
