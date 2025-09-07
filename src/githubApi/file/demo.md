**关键词**：nginx 资源缓存

要实现前端前端静态资源的“hash 资源永久缓存 + 非 hash 资源协商缓存”，需结合 Nginx 的缓存头配置，针对不同类型资源设计差异化策略。核心思路是：**对带 hash 的指纹文件（如`app.8f3b.js`）设置长期强缓存，对无 hash 的文件（如`index.html`）使用协商缓存**，既以下是具体实现方案：

### 一、两种缓存策略的适用场景

| 资源类型       | 特征                                                          | 缓存策略   | 目的                                   |
| -------------- | ------------------------------------------------------------- | ---------- | -------------------------------------- |
| 带 hash 的资源 | 文件名含唯一 hash（如`style.1a2b.css`），内容变化则 hash 变化 | 永久强缓存 | 一次缓存后不再请求，减少重复下载       |
| 非 hash 的资源 | 文件名固定（如`index.html`、`favicon.ico`），内容可能动态更新 | 协商缓存   | 每次请求验证是否更新，确保获取最新内容 |

### 二、核心配置方案

通过`location`匹配不同资源类型，分别设置缓存头：

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/frontend/dist;  # 前端打包目录
    index index.html;

    # 1. 处理带hash的静态资源（JS/CSS/图片等）：永久强缓存
    # 假设hash格式为 8-16位字母数字（如 app.8f3b1e7d.js）
    location ~* \.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)(\?.*)?$ {
        # 匹配带hash的文件名（如 .1a2b3c. 或 .v2.3.4. 等格式）
        # 正则说明：\.\w{8,16}\. 匹配 .hash. 结构（8-16位hash值）
        if ($request_filename ~* .*\.\w{8,16}\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$) {
            # 永久缓存（1年）
            expires 365d;
            # 强缓存标识：告知浏览器直接使用缓存，不发请求
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }

    # 2. 处理非hash资源（如 index.html）：协商缓存
    location / {
        # 禁用强缓存
        expires -1;
        # 协商缓存：基于文件修改时间（Last-Modified）验证
        add_header Cache-Control "no-cache, must-revalidate";

        # 支持 History 路由（SPA必备）
        try_files $uri $uri/ /index.html;
    }

    # 3. 特殊资源补充：favicon.ico（通常无hash）
    location = /favicon.ico {
        expires 7d;  # 短期强缓存（7天）+ 协商缓存兜底
        add_header Cache-Control "public, max-age=604800, must-revalidate";
    }
}
```

### 三、配置详解与核心参数

#### 1. 带 hash 资源的永久强缓存

- **匹配规则**：  
  通过正则`.*\.\w{8,16}\.(js|css...)`精准匹配带 hash 的文件（如`app.8f3b1e7d.js`、`logo.a1b2c3.png`），确保只有内容不变的文件被长期缓存。

- **核心缓存头**：

  - `expires 365d`：设置浏览器缓存过期时间（1 年）。
  - `Cache-Control: public, max-age=31536000, immutable`：
    - `public`：允许中间代理（如 CDN）缓存。
    - `max-age=31536000`：1 年内直接使用缓存（单位：秒）。
    - `immutable`：告知浏览器资源不会变化，无需发送验证请求（H5 新特性，增强缓存效果）。

- **关键逻辑**：  
  当资源内容更新时，打包工具（Webpack/Vite 等）会生成新的 hash 文件名（如`app.9c4d2f8e.js`），浏览器会将其视为新资源重新请求，完美解决“缓存更新”问题。

#### 2. 非 hash 资源的协商缓存

- **适用场景**：  
  `index.html`（SPA 入口文件）、`robots.txt`等文件名固定的资源，需确保用户能获取最新版本。

- **核心缓存头**：

  - `expires -1`：禁用强缓存（立即过期）。
  - `Cache-Control: no-cache, must-revalidate`：
    - `no-cache`：浏览器必须发送请求到服务器验证资源是否更新。
    - `must-revalidate`：若资源过期，必须向服务器验证。

- **协商验证机制**：  
  Nginx 默认会返回`Last-Modified`头（文件最后修改时间），浏览器下次请求时会携带`If-Modified-Since`头：
  - 若文件未修改，服务器返回`304 Not Modified`（无响应体），浏览器使用缓存。
  - 若文件已修改，服务器返回`200 OK`和新内容。

#### 3. 特殊资源处理（如 favicon.ico）

- 对于不常变化但无 hash 的资源（如网站图标），可采用“短期强缓存 + 协商缓存兜底”：
  - `expires 7d`：7 天内直接使用缓存。
  - `must-revalidate`：过期后必须向服务器验证是否更新。

### 四、与前端打包的配合要点

1. **确保 hash 生成规则可靠**：  
   前端打包时，需保证“内容不变则 hash 不变，内容变化则 hash 必变”。例如：

   - Webpack：`contenthash`（基于文件内容生成 hash）。
   - Vite：默认对静态资源生成 contenthash。

2. **避免 hash 资源依赖非 hash 资源**：  
   确保带 hash 的 JS/CSS 不引用无 hash 的资源（如`background: url(/img/bg.png)`），否则 bg.png 更新后，引用它的 CSS 因 hash 未变而无法更新。  
   解决方案：让被引用资源也带上 hash（如`bg.a1b2c3.png`）。

3. **index.html 必须无 hash**：  
   作为入口文件，`index.html`需通过协商缓存确保用户每次获取最新版本，从而加载新的 hash 资源。

### 五、验证缓存是否生效

1. **强缓存验证**：  
   访问带 hash 的资源（如`app.8f3b.js`），在浏览器 Network 面板中查看：

   - 状态码为`200 OK (from disk cache)`或`200 OK (from memory cache)`。
   - Response Headers 包含`Cache-Control: public, max-age=31536000, immutable`。

2. **协商缓存验证**：  
   访问`index.html`，刷新页面：
   - 第一次请求：状态码`200 OK`，Response Headers 有`Last-Modified`。
   - 第二次请求：Request Headers 有`If-Modified-Since`，若未修改，状态码`304 Not Modified`。

### 总结

通过 Nginx 实现“hash 资源永久缓存 + 非 hash 资源协商缓存”的核心是：

1. 利用 hash 文件名的唯一性，对静态资源设置长期强缓存，最大化减少重复请求。
2. 对入口文件等无 hash 资源启用协商缓存，确保内容更新时能被及时获取。
3. 前端打包与 Nginx 配置协同，保证 hash 机制可靠，避免缓存不一致问题。

这种策略既能大幅提升页面加载速度，又能确保资源更新的即时性，是前端性能优化的关键实践。
