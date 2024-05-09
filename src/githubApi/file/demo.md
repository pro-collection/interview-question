**关键词**：解析 cookies

当然可以，以下是一个简单的 JavaScript 函数，用于解析当前页面的 cookie 并将它们存储到一个对象中：

```javascript
function parseCookies() {
  // 创建一个空对象来存储解析后的 cookie
  var cookiesObj = {};

  // 获取 cookie 字符串，然后分割每个键值对
  var cookies = document.cookie.split(";");

  // 遍历每个键值对
  cookies.forEach(function (cookie) {
    // 去除键值对前后的空格
    var cleanCookie = cookie.trim();
    // 找到键和值之间的等号位置
    var separatorIndex = cleanCookie.indexOf("=");

    // 如果找不到等号，则不是有效的键值对，跳过当前循环
    if (separatorIndex === -1) return;

    // 获取键名
    var key = cleanCookie.substring(0, separatorIndex);
    // 获取值
    var value = cleanCookie.substring(separatorIndex + 1);

    // 解码因为 cookie 键和值是编码过的
    key = decodeURIComponent(key);
    value = decodeURIComponent(value);

    // 将解析后的值存储到对象中
    cookiesObj[key] = value;
  });

  // 返回解析后的 cookie 对象
  return cookiesObj;
}

// 使用示例
var cookies = parseCookies();
console.log(cookies);
```

这个函数首先会以分号 `;` 分割 `document.cookie` 字符串来得到各个 cookie 键值对，然后移除键值对前后的任何空格。接着寻找每个键值对中的等号 `=` 位置，以此来分割键和值。最后，它会使用 `decodeURIComponent` 函数来解码键名和键值，因为通过 `document.cookie` 读取的键名和键值通常是编码过的。

调用 `parseCookies` 函数将返回一个对象，其中包含了当前页面的所有 cookie，键名和值都已被解码。然后你可以像访问普通对象一样访问这些值，例如 `cookies['username']` 来获取 'username' 键对应的值。
