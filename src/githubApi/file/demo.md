**关键词**：登录鉴权方式

前端登录鉴权的方式主要有以下几种：

1. 基于Session Cookie的鉴权： 
    - cookie: 用户在登录成功后，服务器会生成一个包含用户信息的Cookie，并返回给前端。前端在后续的请求中会自动携带这个Cookie，在服务器端进行验证和识别用户身份。
    - Session: 用户登录成功后，服务器会在后端保存用户的登录状态信息，并生成一个唯一的Session ID，将这个Session ID 返回给前端。前端在后续的请求中需要携带这个Session ID，服务器通过Session ID 来验证用户身份。

2. 单点登录（Single Sign-On，SSO）：单点登录是一种将多个应用系统进行集成的认证方式。用户只需登录一次，即可在多个系统中完成认证，避免了重复登录的麻烦。常见的单点登录协议有CAS（Central Authentication Service）、SAML（Security Assertion Markup Language）等。

3. OpenID Connect（OIDC）：OIDC是基于OAuth2.0的身份验证协议，通过在认证和授权过程中引入身份提供者，使得用户可以使用第三方身份提供者（如Google、Facebook等）进行登录和授权，从而实现用户身份验证和授权的功能。

4. OAuth2.0：OAuth2.0是一个授权框架，用于授权第三方应用访问用户的资源。它通过授权服务器颁发令牌（Token），使得第三方应用可以代表用户获取资源的权限，而无需知道用户的真实凭证。

5. LDAP（Lightweight Directory Access Protocol）：LDAP是一种用于访问和维护分布式目录服务的协议。在登录鉴权中，LDAP常用于验证用户的身份信息，如用户名和密码，通过与LDAP服务器进行通信来进行用户身份验证。

6. 2FA（Two-Factor Authentication）：二次验证是一种提供额外安全层的身份验证方式。与传统的用户名和密码登录不同，2FA需要用户提供第二个验证因素，如手机验证码、指纹识别、硬件令牌等，以提高账户的安全性。
