### 单点登录

单点登录：Single Sign On，简称SSO。用户只要登录一次，就可以访问所有相关信任应用的资源。企业里面用的会比较多，有很多内网平台，但是只要在一个系统登录就可以。

#### 实现方案

* 单一域名：可以把 cookie 种在根域名下实现单点登录
* 多域名：常用 CAS来解决，新增一个认证中心的服务。CAS（Central Authentication Service）是实现SSO单点登录的框架

#### CAS实现单点登录的流程：

1. 用户访问系统A，判断未登录，则直接跳到认证中心页面
2. 在认证中心页面输入账号，密码，生成令牌，重定向到 系统A
3. 在系统A拿到令牌到认证中心去认证，认证通过，则建立对话
4. 用户访问系统B，发现没有有效会话，则重定向到认证中心
5. 认证中心发现有全局会话，新建令牌，重定向到系统B
6. 在系统B使用令牌去认证中心验证，验证成功后，建议系统B的局部会话。

具体的可以下面的文章，讲解的很详细

* [CAS实现单点登录SSO执行原理探究(终于明白了)](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fjavaloveiphone%2Farticle%2Fdetails%2F52439613 "https://blog.csdn.net/javaloveiphone/article/details/52439613")
* [一张图看明白CAS单点登录原理](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fqq_21251983%2Farticle%2Fdetails%2F52695206 "https://blog.csdn.net/qq_21251983/article/details/52695206")

#### 关键点

下面是举例来详细说明CAS实现单点登录的流程：

一、第一次访问系统A

1. 用户访问系统A ([www.app1.com)，](https://link.juejin.cn?target=http%3A%2F%2Fwww.app1.com)%25EF%25BC%258C "http://www.app1.com)%EF%BC%8C") 跳转认证中心 client([www.sso.com)，](https://link.juejin.cn?target=http%3A%2F%2Fwww.sso.com)%25EF%25BC%258C "http://www.sso.com)%EF%BC%8C") 然后输入用户名，密码登录，然后认证中心 serverSSO 把 **cookieSSO** 种在认证中心的域名下 ([www.sso.com)，](https://link.juejin.cn?target=http%3A%2F%2Fwww.sso.com)%25EF%25BC%258C "http://www.sso.com)%EF%BC%8C") 重定向到系统A，并且带上生成的 ticket 参数 ([www.app1.com?ticket](https://link.juejin.cn?target=http%3A%2F%2Fwww.app1.com%3Fticket "http://www.app1.com?ticket") =xxx)
2. 系统A ([www.app1.com?ticket](https://link.juejin.cn?target=http%3A%2F%2Fwww.app1.com%3Fticket "http://www.app1.com?ticket") =xxx)请求系统A的后端 serverA ，serverA 去 serverSSO 验证，通过后，将**cookieA**种在 [www.app1.com下](https://link.juejin.cn?target=http%3A%2F%2Fwww.app1.com%25E4%25B8%258B "http://www.app1.com%E4%B8%8B")

二、第二次访问系统A 直接携带 cookieA 去访问后端，验证通过后，即登录成功。

三、第三次访问系统B

1. 访问系统B ([www.app2.com)，](https://link.juejin.cn?target=http%3A%2F%2Fwww.app2.com)%25EF%25BC%258C "http://www.app2.com)%EF%BC%8C") 跳转到认证中心 client([www.sso.com)，](https://link.juejin.cn?target=http%3A%2F%2Fwww.sso.com)%25EF%25BC%258C "http://www.sso.com)%EF%BC%8C") 这个时候会把认证中心的**cookieSSO**也携带上，发现用户已登录过，则直接重定向到系统B（[www.app2.com），](https://link.juejin.cn?target=http%3A%2F%2Fwww.app2.com%25EF%25BC%2589%25EF%25BC%258C "http://www.app2.com%EF%BC%89%EF%BC%8C") 并且带上生成的ticket参数（[www.app2.com?ticket](https://link.juejin.cn?target=http%3A%2F%2Fwww.app2.com%3Fticket "http://www.app2.com?ticket") =xxx）
2. 系统B ([www.app2.com?ticket](https://link.juejin.cn?target=http%3A%2F%2Fwww.app2.com%3Fticket "http://www.app2.com?ticket") =xxx)请求系统B的后端 serverB，serverB 去 serverSSO 验证，通过后，将**cookieB**种在www.app2.com下

注意cookie生成时机及种的位置。

* cookieSSO，SSO域名下的cookie
* cookieA，系统A域名下的cookie
* cookieB，系统B域名下的cookie


### 参考文档
https://juejin.cn/post/7195588906809032764
