**关键词**：nginx proxy_pass

Nginx 中 `proxy_pass` 路径结尾是否加 `/` 会直接影响代理后的 URL 拼接规则，对前端接口请求路径的映射结果有显著差异。理解这一差异是配置接口代理的关键。

### 核心差异：路径拼接规则

假设：

- Nginx 配置的 `location` 匹配规则为 `/api`
- 后端服务地址为 `http://backend:3000`

两种配置的区别如下：

| `proxy_pass` 配置                          | 拼接规则                                                         | 最终代理地址                            |
| ------------------------------------------ | ---------------------------------------------------------------- | --------------------------------------- |
| 不加 `/`：`proxy_pass http://backend:3000` | 将 `location` 匹配的路径（`/api`）**完整拼接到后端地址后**       | `http://backend:3000 + /api + 剩余路径` |
| 加 `/`：`proxy_pass http://backend:3000/`  | 将 `location` 匹配的路径（`/api`）**替换为 `/`**，仅拼接剩余路径 | `http://backend:3000 + / + 剩余路径`    |

### 举例说明（前端请求路径对比）

假设前端发送请求：`http://nginx-host/api/user/list`

#### 1. `proxy_pass` 不加 `/` 的情况

```nginx
location /api {
    # 后端地址末尾无 /
    proxy_pass http://backend:3000;
}
```

- 匹配逻辑：`location /api` 匹配到请求中的 `/api` 部分
- 代理后地址：`http://backend:3000` + `/api` + `/user/list` → `http://backend:3000/api/user/list`

#### 2. `proxy_pass` 加 `/` 的情况

```nginx
location /api {
    # 后端地址末尾有 /
    proxy_pass http://backend:3000/;
}
```

- 匹配逻辑：`location /api` 匹配到的 `/api` 被替换为 `/`
- 代理后地址：`http://backend:3000/` + `/user/list` → `http://backend:3000/user/list`

### 扩展场景：`location` 带多级路径时

若 `location` 规则为 `/api/v1`，请求路径为 `http://nginx-host/api/v1/user/list`

#### 1. 不加 `/`

```nginx
location /api/v1 {
    proxy_pass http://backend:3000;
}
# 代理结果：http://backend:3000/api/v1/user/list
```

#### 2. 加 `/`

```nginx
location /api/v1 {
    proxy_pass http://backend:3000/;
}
# 代理结果：http://backend:3000/user/list
```

### 特殊场景：`proxy_pass` 包含子路径

若 `proxy_pass` 不仅是域名/IP，还包含子路径（如 `http://backend:3000/service`），加不加 `/` 的规则依然适用：

#### 1. 后端路径不加 `/`

```nginx
location /api {
    proxy_pass http://backend:3000/service;
}
# 请求 /api/user → 代理到 http://backend:3000/serviceapi/user
# （注意：/api 被完整拼接，导致 service 和 api 连在一起，通常不符合预期）
```

#### 2. 后端路径加 `/`

```nginx
location /api {
    proxy_pass http://backend:3000/service/;
}
# 请求 /api/user → 代理到 http://backend:3000/service/user
# （正确拼接：/api 被替换为 /，剩余路径 /user 拼接到 service/ 后）
```

### 总结

- **不加 `/`**：`location` 匹配的路径会被完整拼接到 `proxy_pass` 地址后（适合后端接口路径与前端请求路径完全一致的场景）。
- **加 `/`**：`location` 匹配的路径会被替换为 `/`，仅将剩余路径拼接到 `proxy_pass` 地址后（适合需要简化后端接口路径的场景）。

实际配置时，建议通过 `curl` 测试或查看后端日志确认代理结果，避免因路径拼接错误导致接口 404。
