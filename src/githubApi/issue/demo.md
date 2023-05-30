### 基础版本

下面是一个简单的 JavaScript 函数，用于解析 URL 参数并返回一个包含参数键值对的对象：

```javascript
function parseUrlParams(url) {
  const params = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    });
  }

  return params;
}
```

这个函数接受一个 URL 字符串作为参数，并返回解析后的参数对象。例如：

```javascript
const url = 'https://example.com?name=John&age=30&city=New%20York';
const params = parseUrlParams(url);

console.log(params);
// Output: { name: "John", age: "30", city: "New York" }
```

这个函数的实现思路是先从 URL 字符串中提取查询字符串部分，然后将查询字符串按照 `&` 分割成键值对数组。接着遍历键值对数组，将每个键值对按照 `=` 分割，然后将键和值存储到结果对象 `params` 中，注意要对值进行 URL 解码以处理特殊字符。最后返回解析后的参数对象。


### 进阶 - 支持json字符串参数

如果要支持复杂的 JSON 字符串作为查询参数，可以使用 `JSON.parse()` 方法解析 JSON 字符串，并在解析后的对象中处理参数。

下面是一个修改后的函数，支持解析复杂的 JSON 字符串作为查询参数：

```javascript
function parseUrlParams(url) {
  const params = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      const decodedValue = decodeURIComponent(value);

      try {
        params[key] = JSON.parse(decodedValue);
      } catch (error) {
        // 如果解析 JSON 失败，则将原始字符串存储到参数对象中
        params[key] = decodedValue;
      }
    });
  }

  return params;
}
```

现在，如果查询参数是一个 JSON 字符串，它将被解析为相应的 JavaScript 对象，并作为参数对象的值。如果解析失败（例如，不是有效的 JSON 字符串），则将保留原始字符串作为值存储在参数对象中。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address={"city":"New York","zipcode":10001}';
const params = parseUrlParams(url);

console.log(params);
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 } }
```

### 再次进阶-支持更复杂的场景， 比如嵌套对象， 数组

下面是修改后的函数，支持解析复杂的查询参数，包括嵌套对象和数组：

```javascript
function parseUrlParams(url) {
  const params = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      const decodedValue = decodeURIComponent(value);

      const keys = key.split('.');
      let current = params;

      for (let i = 0; i < keys.length; i++) {
        const nestedKey = keys[i];
        const isArray = /\[\]$/.test(nestedKey);

        if (isArray) {
          const arrayKey = nestedKey.slice(0, -2);

          if (!current[arrayKey]) {
            current[arrayKey] = [];
          }

          if (i === keys.length - 1) {
            current[arrayKey].push(parseValue(decodedValue));
          } else {
            const newIndex = current[arrayKey].length;
            if (!current[arrayKey][newIndex]) {
              current[arrayKey][newIndex] = {};
            }
            current = current[arrayKey][newIndex];
          }
        } else {
          if (i === keys.length - 1) {
            current[nestedKey] = parseValue(decodedValue);
          } else {
            if (!current[nestedKey]) {
              current[nestedKey] = {};
            }
            current = current[nestedKey];
          }
        }
      }
    });
  }

  return params;
}

function parseValue(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    // 解析失败，则返回原始值
    return value;
  }
}
```

现在，该函数可以正确解析包含嵌套对象和数组的查询参数。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address.city=New%20York&address.zipcode=10001&tags[]=tag1&tags[]=tag2';
const params = parseUrlParams(url);

console.log(params);
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 }, tags: ["tag1", "tag2"] }
```

在这个修改后的函数中，当遇到嵌套对象时，它会递归创建相应的对象属性。当遇到数组时，它会创建一个数组，并将值添加到数组中。

