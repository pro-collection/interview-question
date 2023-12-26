**关键词**：跨域 cookie

在跨域请求中携带另外一个域名下的 Cookie，需要通过设置响应头部的Access-Control-Allow-Credentials字段为true，并且请求头部中添加withCredentials字段为true。

在服务端需要设置响应头部的Access-Control-Allow-Origin字段为指定的域名，表示允许指定域名的跨域请求携带Cookie。

下面是一个示例代码（Node.js）：
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://example.com');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/api/data', (req, res) => {
  // 处理请求
  res.send('Response Data');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

在客户端发起跨域请求时，需要设置请求头部的withCredentials字段为true，示例代码（JavaScript）：
```javascript
fetch('http://example.com/api/data', {
  credentials: 'include',
})
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

以上代码中，Access-Control-Allow-Origin设置为'http://example.com'，表示允许该域名的跨域请求携带Cookie。fetch请求的参数中，credentials设置为'include'表示请求中携带Cookie。
