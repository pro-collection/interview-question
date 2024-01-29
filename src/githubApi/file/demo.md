**关键词**：http HSTS

HTTP `Strict-Transport-Security`（HSTS）是一种安全策略，它通过 HTTP 头部告诉浏览器只能通过安全的 HTTPS 连接访问网站，从而增加网站的安全性。HSTS 有助于防止恶意攻击者通过中间人攻击（如SSL剥离攻击）窃取敏感信息。

HSTS 的主要作用包括：

- **强制使用 HTTPS：** 通过 HSTS，网站可以强制浏览器在一定时间内只能通过 HTTPS 访问，提高数据的安全性。

- **防止 SSL 剥离攻击：** HSTS 通过告知浏览器只能通过安全的连接访问网站，有效地防止了一些中间人攻击，例如 SSL 剥离攻击，其中攻击者试图将 HTTPS 连接降级为不安全的 HTTP 连接。

- **增加网站的安全性：** HSTS 是一种增加网站安全性的简单而有效的手段，尤其是对于那些强调隐私和数据保护的网站。


HSTS 的工作原理如下：

1. **首次访问：** 当用户首次通过 HTTPS 访问网站时，服务器可以在响应头中包含 HSTS 头部，指定网站的 HSTS 策略。例如：
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- `max-age=31536000`: 告诉浏览器在接下来的 1 年内，只能通过 HTTPS 访问该网站。
- `includeSubDomains`: 表示该策略也适用于所有子域名。
- `preload`: 表示网站希望被添加到浏览器的 HSTS 预加载列表中。

2. **以后的访问：** 一旦浏览器接收到包含 HSTS 头部的响应后，它会记住这个信息。在接下来的一年内，浏览器将强制使用 HTTPS 访问该网站，即使用户尝试通过 HTTP 访问。

一旦网站启用了 `HSTS`，并且用户第一次通过 HTTPS 访问该网站，浏览器将在 `HSTS` 头部指定的时间内（`max-age` 参数指定的时间）记住这个策略，即使用户以后尝试通过 HTTP 访问，浏览器仍然会强制使用 HTTPS。因此，使用 HSTS 需要谨慎，确保网站支持 HTTPS 并且配置正确。

**如何取消 `HSTS`**

> 如果之前的请求设置了 HTTP Strict-Transport-Security 这个 header 了， 时间是 max-age=31536000；
> 之后因为一些原因， 取消了 Strict-Transport-Security 这个 header， 那么还是不能使用 http 吗?

一旦浏览器接收到包含 HTTP `Strict-Transport-Security`（HSTS）头部的响应，并且在响应中设置了 `max-age` 参数，浏览器会在指定的时间内坚持使用 HTTPS 连接，即使后续的请求中不再包含 HSTS 头部。

如果之前的请求设置了 `max-age=31536000`，那么浏览器将在接下来的一年内坚持使用 HTTPS 连接，即使后续的请求中不再包含 HSTS 头部。 即使之后取消了 HSTS 头部，浏览器仍然会在 `max-age` 规定的时间内执行强制使用 HTTPS 的策略。

如果由于一些原因需要取消 HSTS，可以采取以下步骤之一：

1. **在 HTTP 响应中不再包含 HSTS 头部：** 在服务器的 HTTPS 响应中，不再包含 `Strict-Transport-Security` 头部，或者将 `max-age` 设置为较短的时间，以便更快地使浏览器放弃 HSTS 策略。

2. **使用 `includeSubDomains` 指令进行逐步取消：** 如果之前设置了 `includeSubDomains`，并且想逐步取消 HSTS，可以在不同的子域名上逐步取消。例如，可以在某个子域名上不再包含 HSTS 头部，而其他子域名仍然保持 HSTS。

请注意，取消 HSTS 头部可能导致用户在一定时间内无法通过 HTTPS 访问网站，因为浏览器会在 `max-age` 规定的时间内继续强制使用 HTTPS。 确保在取消 HSTS 头部之前，确保网站的 HTTPS 配置是正确的，以避免访问问题。
