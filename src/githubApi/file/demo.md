**关键词**：获取 url 参数

在前端，可以通过以下几种方式快速获取页面 URL 的查询参数：

**一、使用 URLSearchParams API**

1. **基本用法**：
   - `URLSearchParams`是一个内置的 JavaScript API，用于处理 URL 的查询参数。它提供了一种方便的方式来获取、设置和删除查询参数。
   - 首先，可以使用`window.location.search`获取 URL 的查询字符串，然后将其传递给`URLSearchParams`构造函数来创建一个`URLSearchParams`对象。
   - 例如：

```javascript
const urlParams = new URLSearchParams(window.location.search);
```

2. **获取单个参数值**：
   - 可以使用`get`方法来获取指定参数的值。例如，要获取名为`paramName`的参数值，可以使用以下代码：

```javascript
const paramValue = urlParams.get("paramName");
```

3. **遍历所有参数**：
   - 可以使用`forEach`方法来遍历所有的参数。例如：

```javascript
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

**二、手动解析查询字符串**

1. **基本思路**：

   - 如果不使用`URLSearchParams`，也可以手动解析 URL 的查询字符串。首先，获取`window.location.search`，它包含了查询字符串（例如`?param1=value1&param2=value2`）。
   - 然后，可以使用字符串的分割和遍历操作来提取参数名和参数值。

2. **示例代码**：

```javascript
const queryString = window.location.search.substring(1);
const params = {};
const paramPairs = queryString.split("&");
paramPairs.forEach((pair) => {
  const [key, value] = pair.split("=");
  if (key) {
    params[key] = decodeURIComponent(value);
  }
});
```

在这个例子中，首先提取查询字符串，然后将其分割成参数对数组。对于每个参数对，再次分割得到参数名和参数值，并将其存储在一个对象中。最后，可以通过`params`对象来访问各个参数的值。

**三、使用第三方库**

1. **库的选择**：

   - 有一些第三方库也提供了方便的方法来处理 URL 的查询参数。例如，`qs`库是一个流行的用于处理查询字符串的库。
   - 可以使用`npm`或`yarn`安装`qs`库：`npm install qs`或`yarn add qs`。

2. **使用示例**：

```javascript
import qs from "qs";

const queryString = window.location.search.substring(1);
const params = qs.parse(queryString);
```

在这个例子中，使用`qs.parse`方法将查询字符串解析为一个对象，其中键是参数名，值是参数值。
