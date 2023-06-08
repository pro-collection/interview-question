**关键词**：js URL 编码解码

在 JavaScript 中，`escape()`、`encodeURI()` 和 `encodeURIComponent()` 都是用于编码 URL 或字符串的函数，但它们有一些区别：

1. `escape()` 函数用于编码字符串中的特殊字符，使其能够安全地传输。它对字符进行编码，包括非 ASCII 字符和特殊字符。但需要注意的是，`escape()` 不会编码 URL 中的保留字符（例如 `:/?#[]@!$&'()*+,;=`），它只会编码其他字符。
```javascript
// 输出：%48%65%6c%6c%6f%20%57%6f%72%6c%64%21
console.log(escape("Hello World!"));  
```

2. `encodeURI()` 函数用于对整个 URL 进行编码，用于将 URL 中的特殊字符转换为可传输的形式。它不会编码 URL 中的保留字符和一些特殊字符（例如 `:/?#[]@!$&'()*+,;=`）。它主要用于编码整个 URL，而不是编码 URL 的参数值。
```javascript
// 输出：http://example.com/page.php?id=123
console.log(encodeURI("http://example.com/page.php?id=123"));  
```

3. `encodeURIComponent()` 函数用于编码 URL 的参数值，它会对所有特殊字符进行编码，包括 URL 中的保留字符和其他特殊字符。它用于编码 URL 参数中的特殊字符，以确保它们在 URL 中的传输和解析过程中不会被误解。
```javascript
// 输出：Hello%20World%21
console.log(encodeURIComponent("Hello World!"));  
```

需要注意的是，`escape()` 函数已被废弃，不推荐使用。在大多数情况下，建议使用 `encodeURI()` 或 `encodeURIComponent()` 函数进行 URL 编码。选择使用哪个函数取决于具体的需求，是否需要编码整个 URL 或只是其中的一部分（如参数值）。
