**关键词**：手写 JSON.stringify、手写 JSON.parse

### 手写`JSON.stringify`

`JSON.stringify` 是一个将 JavaScript 对象或值转换为 JSON 字符串的函数。下面是一个简化的实现，主要考虑以下几种类型：字符串、数字、布尔值、对象和数组。

```javascript
function jsonStringify(value) {
  const type = typeof value;

  if (type === 'string') {
    return `"${value}"`;
  }

  if (type === 'number' || type === 'boolean' || value === null) {
    return String(value);
  }

  if (type === 'object') {
    if (Array.isArray(value)) {
      const arrayItems = value.map((item) => jsonStringify(item)).join(',');
      return `[${arrayItems}]`;
    } else {
      const objectKeys = Object.keys(value);
      const objectItems = objectKeys.map((key) => {
        const keyValue = jsonStringify(value[key]);
        return keyValue !== undefined ? `"${key}":${keyValue}` : undefined;
      }).filter((item) => item !== undefined).join(',');
      return `{${objectItems}}`;
    }
  }

  return undefined; // 这里省略了对函数、Symbol、循环引用等类型的处理
}

// 使用示例
const obj = {
  a: "hello",
  b: 42,
  c: true,
  d: { e: "world", f: [1, 2, 3] },
};

console.log(jsonStringify(obj)); // {"a":"hello","b":42,"c":true,"d":{"e":"world","f":[1,2,3]}}
```

请注意，这个实现有很多限制，适用于简单场景。它没有处理循环引用、函数、`Symbol` 类型等复杂情况。实际项目中，你还是应该使用内置的 `JSON.stringify` 函数。

### 手写 `JSON.parse`

`JSON.parse` 是一个将 JSON 字符串转换为 JavaScript 对象或值的函数。手写一个简化版的 `JSON.parse` 可能不会涵盖所有的细节和兼容性问题，这里提供一个基于 JavaScript 的 eval 函数实现的简单版本。请注意，在实际项目中应使用原生的 `JSON.parse` 函数以保证安全性和性能。

```javascript
function jsonParse(jsonString) {
  return eval("(" + jsonString + ")");
}

// 使用示例
const jsonString = '{"a": "hello", "b": 42, "c": true, "d": {"e": "world", "f": [1, 2, 3]}}';

console.log(jsonParse(jsonString));
/* 输出：
{
  a: "hello",
  b: 42,
  c: true,
  d: { e: "world", f: [1, 2, 3] },
}
*/
```

虽然使用 `eval` 函数能简单地实现 JSON 字符串的解析，但在实践过程中使用 `eval` 并不安全，因为它会执行任意字符串中包含的 JavaScript 代码。因此，强烈建议实际项目中使用 `JSON.parse` 和 `JSON.stringify` 函数。

