**关键词**：nginx 转发

Nginx 可以通过 `location` 指令匹配不同资源类型（如 `.js`、`.png`），并将请求分发到不同服务器，实现资源的分类部署和负载均衡。这种配置策略适合将静态资源（JS、图片）与动态资源（API）分离部署，提升整体服务性能。

### 一、核心配置策略：按文件后缀匹配并转发

通过 `location` 块的正则表达式匹配符（区分大小写）或 ~\* 匹配符（不区分大小写），根据文件后缀名匹配不同资源类型，再通过 `proxy_pass` 转发到对应服务器。

#### 1. 基础配置示例（分离 JS/CSS 与图片资源）

```nginx
http {
    # 定义后端服务器组（可配置负载均衡）
    # JS/CSS 资源服务器组
    upstream js_css_servers {
        server 192.168.1.101:8080;  # JS/CSS 服务器1
        server 192.168.1.102:8080;  # JS/CSS 服务器2（负载均衡）
    }

    # 图片资源服务器组
    upstream image_servers {
        server 192.168.1.201:8080;  # 图片服务器1
        server 192.168.1.202:8080;  # 图片服务器2（负载均衡）
    }

    # 其他资源（如HTML、API）服务器
    upstream default_server {
        server 192.168.1.301:8080;
    }

    server {
        listen 80;
        server_name example.com;

        # 1. 匹配 .js 和 .css 文件，转发到 JS/CSS 服务器组
        location ~* \.(js|css)$ {
            proxy_pass http://js_css_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            # 静态资源缓存优化（可选）
            expires 1d;  # 缓存 1 天
            add_header Cache-Control "public, max-age=86400";
        }

        # 2. 匹配图片文件（.png/.jpg/.jpeg/.gif/.webp），转发到图片服务器组
        location ~* \.(png|jpg|jpeg|gif|webp)$ {
            proxy_pass http://image_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            # 图片缓存时间更长（可选）
            expires 7d;  # 缓存 7 天
            add_header Cache-Control "public, max-age=604800";
        }

        # 3. 其他所有请求（如 HTML、API）转发到默认服务器
        location / {
            proxy_pass http://default_server;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 二、配置策略解析

#### 1. 匹配规则说明

- **`~* \.(js|css)$`**：

  - `~*` 表示不区分大小写匹配（如 `.JS`、`.Css` 也会被匹配）。
  - `\.(js|css)$` 是正则表达式，匹配以 `.js` 或 `.css` 结尾的请求。

- **优先级注意**：  
  Nginx 的 `location` 匹配有优先级，**精确匹配（`=`）> 前缀匹配（不含正则）> 正则匹配（`~`/`~*`）**。  
  因此，按资源类型的正则匹配会优先于普通前缀匹配（如 `/static`），需确保规则无冲突。

#### 2. 服务器组（upstream）配置

- 通过 `upstream` 定义同类资源的服务器集群，支持负载均衡策略（默认轮询）：
  - 可添加 `weight=2` 调整权重（如 `server 192.168.1.101:8080 weight=2;`）。
  - 可添加 `backup` 配置备用服务器（如 `server 192.168.1.103:8080 backup;`）。

#### 3. 资源优化补充配置

- **缓存策略**：静态资源（JS、图片）通常不频繁变动，通过 `expires` 和 `Cache-Control` 头设置浏览器缓存，减少重复请求。
- **防盗链**：图片等资源可添加防盗链配置，防止被其他网站盗用：
  ```nginx
  location ~* \.(png|jpg|jpeg|gif|webp)$ {
      # 仅允许 example.com 域名引用图片
      valid_referers none blocked example.com *.example.com;
      if ($invalid_referer) {
          return 403;  # 非法引用返回 403
      }
      # ... 其他配置
  }
  ```

### 三、扩展场景：按目录 + 资源类型组合匹配

若资源按目录分类（如 `/static/js`、`/static/img`），可结合目录和后缀匹配，进一步细化转发规则：

```nginx
# 仅匹配 /static/js 目录下的 .js 文件
location ~* /static/js/.*\.js$ {
    proxy_pass http://js_servers;
}

# 仅匹配 /static/img 目录下的图片文件
location ~* /static/img/.*\.(png|jpg)$ {
    proxy_pass http://image_servers;
}
```

### 四、注意事项

1. **正则表达式效率**：  
   过多复杂的正则匹配会影响 Nginx 性能，建议资源类型规则尽量简洁（如合并同类后缀）。

2. **后端资源路径一致性**：  
   确保转发目标服务器的资源路径与请求路径一致。例如，请求 `example.com/static/a.js` 被转发到 `js_css_servers` 后，服务器需能在 `/static/a.js` 路径找到资源。

3. **HTTPS 场景适配**：  
   若使用 HTTPS，配置逻辑不变，只需在 `server` 块中添加 SSL 证书配置，转发目标可保持 HTTP（内部通信）或 HTTPS（跨公网）。

### 总结

按资源类型分发的核心策略是：

1. 用 `location ~* \.(后缀1|后缀2)$` 匹配不同资源类型。
2. 通过 `upstream` 定义对应资源的服务器集群，支持负载均衡。
3. 结合缓存、防盗链等配置优化静态资源访问。

这种方案能实现资源的分类部署，减轻单服务器压力，同时针对不同资源类型（如图片、JS）进行专项优化，提升整体服务性能。
