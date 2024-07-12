**关键词**：判断

以下是一个 JavaScript 方法，用于校验您提到的各种“为空”的场景：

```javascript
function isEmpty(value) {
  // 空字符串
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  // 空数组
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  // 空对象（不包括 `null`）
  if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
    return true;
  }
  // 数字 0
  if (typeof value === "number" && value === 0) {
    return true;
  }
  // `undefined`
  if (typeof value === "undefined") {
    return true;
  }
  // `null`
  if (value === null) {
    return true;
  }
  // 空 `Map`
  if (value instanceof Map && value.size === 0) {
    return true;
  }
  // 空 `Set`
  if (value instanceof Set && value.size === 0) {
    return true;
  }

  return false;
}
```

您可以使用这个方法来检测各种值是否为空，例如：

```javascript
const emptyStr = "";
const emptyArr = [];
const emptyObj = {};
const zero = 0;
const undef = undefined;
const nullVal = null;
const emptyMap = new Map();
const emptySet = new Set();

console.log(isEmpty(emptyStr));
console.log(isEmpty(emptyArr));
console.log(isEmpty(emptyObj));
console.log(isEmpty(zero));
console.log(isEmpty(undef));
console.log(isEmpty(nullVal));
console.log(isEmpty(emptyMap));
console.log(isEmpty(emptySet));
```
