**关键词**：script 标签属性、script 标签属性作用、常用 script 标签属性

在HTML中，`<script>`标签用于引入或嵌入JavaScript代码。`<script>`标签可以使用以下属性来调整脚本的行为：

**常用属性**

1. `src`：指定要引入的外部JavaScript文件的URL。例如：`<script src="script.js"></script>`。通过这个属性，浏览器会下载并执行指定的外部脚本文件。

2. `async`：可选属性，用于指示浏览器异步加载脚本。这意味着脚本会在下载的同时继续解析HTML文档，不会阻塞其他资源的加载。例如：`<script src="script.js" async></script>`。

3. `defer`：可选属性，用于指示浏览器延迟执行脚本，直到文档解析完成。这样可以确保脚本在文档完全呈现之前不会执行。例如：`<script src="script.js" defer></script>`。

4. `type`：指定脚本语言的MIME类型。通常是`text/javascript`或者`module`（用于ES6模块）。如果未指定该属性，浏览器默认将其视为JavaScript类型。例如：`<script type="text/javascript">...</script>`。

5. `charset`：指定外部脚本文件的字符编码。例如：`<script src="script.js" charset="UTF-8"></script>`。

6. `integrity`：用于指定外部脚本文件的Subresource Integrity（SRI）。SRI可以确保浏览器在加载脚本时验证其完整性，防止通过恶意更改文件来执行潜在的攻击。例如：`<script src="script.js" integrity="sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng="></script>`。

**不常用属性**

7. `crossorigin`：正常的 script 元素将最小的信息传递给 window.onerror，用于那些没有通过标准 CORS 检查的脚本。要允许对静态媒体使用独立域名的网站进行错误记录，请使用此属性。参见 CORS 设置属性。

8. `fetchpriority`：提供一个指示，说明在获取外部脚本时要使用的相对优先级。

9. `nomodule`： 这个布尔属性被设置来标明这个脚本不应该在支持 ES 模块的浏览器中执行。实际上，这可用于在不支持模块化 JavaScript 的旧浏览器中提供回退脚本。

10. `nonce`: 在 `script-src Content-Security-Policy (en-US)` 中允许脚本的一个一次性加密随机数（nonce）。服务器每次传输策略时都必须生成一个唯一的 nonce 值。提供一个无法猜测的 nonce 是至关重要。
    
11. `referrerpolicy`: 表示在获取脚本或脚本获取资源时，要发送哪个 referrer。


可以参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script
