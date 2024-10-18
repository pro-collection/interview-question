**关键词**：URLSearchParams API 介绍

`URLSearchParams`是 JavaScript 中的一个内置 API，用于处理 URL 的查询参数部分。它提供了一系列方法来方便地操作和获取 URL 中的查询参数。

**一、创建`URLSearchParams`对象**

1. **从现有 URL**：
   - 可以从当前页面的 URL 中提取查询参数来创建`URLSearchParams`对象。例如：

```javascript
const urlParams = new URLSearchParams(window.location.search);
```

- 这里使用`window.location.search`获取当前页面 URL 的查询字符串，然后将其传递给`URLSearchParams`构造函数来创建一个新的对象。

2. **从字符串**：
   - 也可以直接从一个查询字符串创建`URLSearchParams`对象。例如：

```javascript
const queryString = "param1=value1&param2=value2";
const urlParams = new URLSearchParams(queryString);
```

**二、主要方法**

1. **`get()`方法**：
   - 用于获取指定参数的第一个值。例如：

```javascript
const value = urlParams.get("paramName");
```

- 如果参数不存在，`get()`方法将返回`null`。

2. **`set()`方法**：
   - 设置指定参数的值。如果参数不存在，将添加一个新的参数。例如：

```javascript
urlParams.set("paramName", "newValue");
```

3. **`append()`方法**：
   - 向现有参数添加一个新的值。如果参数不存在，将添加一个新的参数。例如：

```javascript
urlParams.append("paramName", "anotherValue");
```

4. **`delete()`方法**：
   - 删除指定参数。例如：

```javascript
urlParams.delete("paramName");
```

5. **`has()`方法**：
   - 检查是否存在指定参数。返回一个布尔值。例如：

```javascript
const hasParam = urlParams.has("paramName");
```

6. **遍历参数**：
   - 可以使用`forEach()`方法遍历所有参数。例如：

```javascript
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

**三、优点和用途**

1. **方便性**：

   - `URLSearchParams`提供了一种简洁、直观的方式来处理 URL 查询参数，避免了手动解析和拼接查询字符串的繁琐过程。

2. **兼容性**：

   - 它在现代浏览器中广泛支持，可以在各种前端开发场景中使用。

3. **动态操作**：

   - 可以方便地在运行时修改查询参数，例如在单页应用程序中根据用户操作动态更新 URL 的查询参数。

4. **与 URL 对象结合**：
   - 可以与`URL`对象结合使用，方便地构建和操作完整的 URL。例如：

```javascript
const url = new URL("https://example.com");
url.searchParams.set("paramName", "value");
console.log(url.toString());
```

总之，`URLSearchParams`是一个强大而方便的 API，用于处理 URL 的查询参数，在前端开发中具有广泛的应用。
