**关键词**：http CSP

在 HTTP 协议中，CSP 指的是 "Content Security Policy"（内容安全策略）。CSP 是一种用于增强网站安全性的安全策略机制，通过指定浏览器只能加载指定来源的资源，以减少恶意攻击的风险。

CSP 的主要目标是防止和减缓特定类型的攻击，例如跨站脚本攻击 (XSS) 和数据注入攻击。通过配置 CSP，网站管理员可以告诉浏览器哪些资源是被信任的，从而减少恶意代码的执行。

CSP 的一些常见配置项包括：

1. **default-src：** 指定默认情况下可以从哪些来源加载资源。
2. **script-src：** 指定允许加载脚本的来源。
3. **style-src：** 指定允许加载样式表的来源。
4. **img-src：** 指定允许加载图片的来源。
5. **font-src：** 指定允许加载字体的来源。
6. **connect-src：** 指定允许进行网络请求的来源（例如 Ajax 请求）。
7. **frame-src：** 指定允许加载框架的来源。
8. **media-src：** 指定允许加载媒体资源的来源。

等等。

以下是一个简单的 CSP 示例：

```http
Content-Security-Policy: default-src 'self'; script-src 'self' example.com; img-src 'self' data:;
```

上述 CSP 规则的含义是：

- `default-src 'self'`: 允许从同一站点加载默认来源的资源。
- `script-src 'self' example.com`: 允许从同一站点和 example.com 加载脚本。
- `img-src 'self' data:`: 允许从同一站点和 data: 协议加载图片。

CSP 可以通过 HTTP 头部来设置，也可以通过 `<meta>` 标签嵌入在 HTML 页面中。使用 CSP 可以帮助网站减少受到恶意攻击的风险，提高网站的安全性。

**如何通过 meta 标签设置 CSP**

通过 `<meta>` 标签设置 Content Security Policy (CSP) 的方式如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="directives">
    <title>Your Page Title</title>
</head>
<body>
    <!-- Your content goes here -->
</body>
</html>
```

在上面的代码中，`<meta>` 标签的 `http-equiv` 属性被设置为 "Content-Security-Policy"，而 `content` 属性中则包含了 CSP 指令（directives）。你需要将 "directives" 替换为你实际想要设置的 CSP 规则。

以下是一个具体的例子：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' example.com; img-src 'self' data:;">
```

在这个例子中，CSP 规则指定了默认来源是同一站点，允许加载同一站点和 example.com 的脚本，允许加载同一站点和 data: 协议的图片。

注意：通过 `<meta>` 标签设置的 CSP 规则只对当前页面生效，而通过 HTTP 头部设置的 CSP 规则对整个站点生效。因此，如果你希望 CSP 规则对整个站点生效，最好在服务器端通过 HTTP 头部设置 CSP。
