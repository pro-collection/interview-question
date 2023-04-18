数字千分化是指将数字按照千位分隔符进行分割，使其更容易被人类阅读。在 JavaScript 中，可以通过多种方式实现数字千分化，以下是其中的几种方式：

1. 使用正则表达式

```javascript
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(formatNumber(123456789)); // 输出 123,456,789
```

2. 使用 Intl.NumberFormat

```javascript
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

console.log(formatNumber(123456789)); // 输出 123,456,789（在大多数环境中）
```

3. 使用自带千分位分隔符的 toLocaleString

```javascript
function formatNumber(num) {
  return num.toLocaleString();
}

console.log(formatNumber(123456789)); // 输出 123,456,789（在大多数环境中）
```

这些方法都可以实现数字千分化，具体选择哪种方法，可以根据实际需求和代码环境进行选择。