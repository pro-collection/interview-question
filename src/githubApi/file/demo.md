在前端，可以通过以下几种方式来限制 `<input>` 框只能输入正整数：

**一、使用 HTML5 的输入类型和属性**

1. 使用 `type="number"` 属性：
   `<input type="number">` 设置输入框的类型为数字。然而，这并不能完全确保只输入正整数，因为用户仍然可以输入小数。

2. 添加 `step="1"` 和 `min="0"` 属性：
   `<input type="number" step="1" min="0">`。`step="1"` 确保输入的步长为 1，即只能输入整数。`min="0"` 限制输入值不能小于 0。

   这种方法在大多数现代浏览器中能提供一定程度的限制，但用户仍然可以通过浏览器的开发者工具等方式绕过这些限制。

**二、使用 JavaScript 进行实时验证**

1. 使用 `oninput` 事件处理函数：

   ```html
   <input id="myInput" />
   ```

   ```javascript
   const inputElement = document.getElementById("myInput");
   inputElement.oninput = function () {
     // 只保留数字字符
     this.value = this.value.replace(/[^0-9]/g, "");
   };
   ```

   这个方法在用户输入时实时过滤非数字字符。但是，它不能确保输入的是正整数，只是限制了输入为数字。

2. 结合正则表达式进行更严格的验证：
   ```javascript
   inputElement.oninput = function () {
     const value = this.value;
     if (!/^\d+$/.test(value)) {
       // 如果输入不是正整数，清空输入框
       this.value = "";
     }
   };
   ```
   这里使用正则表达式 `/^\d+$/` 来检查输入是否只包含一个或多个数字。如果输入不符合要求，就清空输入框。
