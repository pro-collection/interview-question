`decodeURI()` 和 `decodeURIComponent()` 是 JavaScript 中用于解码 URI（统一资源标识符）的两个方法，它们的核心区别在于解码范围和适用场景。

### **1. 编码规则回顾**

在 URI 中，某些字符（如空格、特殊符号）需要被编码为 `%` 后跟两位十六进制数。例如：

- 空格被编码为 `%20`
- `&` 被编码为 `%26`
- `#` 被编码为 `%23`

### **2. 核心区别**

| 方法                   | 解码范围                                                 | 保留字符                        | 典型应用场景           |
| ---------------------- | -------------------------------------------------------- | ------------------------------- | ---------------------- |
| `decodeURI()`          | 解码整个 URI（如 `http://example.com/path?query=value`） | `;/?:@&=+$,#`（URI 分隔符）     | 解码完整 URL           |
| `decodeURIComponent()` | 解码 URI 的组件部分（如查询参数、路径片段）              | 无保留字符（解码所有 `%` 编码） | 解码查询参数或路径参数 |

### **3. 示例对比**

#### **场景 1：解码完整 URL**

```javascript
const encodedUrl = "http://example.com/path%2Fsubpath?param1=value1%26param2=value2";

// 使用 decodeURI()
decodeURI(encodedUrl);
// 输出：http://example.com/path/subpath?param1=value1%26param2=value2
// 注意：路径分隔符 `/`（%2F）和解码，但查询参数中的 `&`（%26）未解码

// 使用 decodeURIComponent()
decodeURIComponent(encodedUrl);
// 报错：URIError: malformed URI sequence
// 原因：完整 URL 中的分隔符（如 `?`、`&`）被错误解码
```

#### **场景 2：解码查询参数**

```javascript
const encodedParam = "key1=value1%26key2=value2%23hash";

// 使用 decodeURI()
decodeURI(encodedParam);
// 输出：key1=value1%26key2=value2%23hash
// 注意：`&`（%26）和 `#`（%23）未被解码

// 使用 decodeURIComponent()
decodeURIComponent(encodedParam);
// 输出：key1=value1&key2=value2#hash
// 正确解码所有参数部分
```

### **4. 常见误区**

- **误用 `decodeURI()` 处理参数**：若 URL 参数包含 `&`、`=` 等符号，`decodeURI()` 不会解码它们，导致参数解析错误。

  ```javascript
  // 错误示例：查询参数中的 `&` 未被解码
  const query = "name=John%26Doe";
  decodeURI(query); // "name=John%26Doe"（错误）

  // 正确方式
  decodeURIComponent(query); // "name=John&Doe"（正确）
  ```

- **误用 `decodeURIComponent()` 处理完整 URL**：会破坏 URL 结构（如路径分隔符被解码）。
  ```javascript
  const url = "http://example.com/path%3Fparam=value"; // 假设路径中包含 `?`
  decodeURIComponent(url); // "http://example.com/path?param=value"（错误，路径被截断）
  ```

### **5. 总结**

- **使用 `decodeURI()` 时**：

  - 处理完整 URL（如 `window.location.href`）。
  - 保留 URI 中的特殊分隔符（如 `?`、`&`、`/`）。

- **使用 `decodeURIComponent()` 时**：
  - 处理 URI 的组件部分（如查询参数、路径参数）。
  - 需要解码所有特殊字符（如表单提交的参数）。

**口诀**：

- **完整 URL** → `decodeURI()`
- **参数片段** → `decodeURIComponent()`
