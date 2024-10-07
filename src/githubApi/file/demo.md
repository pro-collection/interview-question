**关键词**：模块化 导出

在 CommonJS 模块化规范中，`module.exports`与`exports`有以下区别：

**一、`module.exports`**

1. **本质**：

   - `module.exports`是一个对象，它代表当前模块要导出的内容。可以将任意类型的值（如函数、对象、字符串等）赋值给`module.exports`来决定模块导出的内容。

2. **作用范围和灵活性**：
   - 可以完全覆盖模块的导出内容。例如，可以直接将一个全新的对象赋值给`module.exports`，从而完全替换模块原本可能通过`exports`添加的属性。
   - 适合需要导出复杂数据结构或多个不同类型的值的情况。例如，可以导出一个包含多个函数和变量的对象。

**二、`exports`**

1. **本质**：

   - `exports`最初是一个对`module.exports`的引用。这意味着通过`exports`添加的属性实际上是添加到了`module.exports`所代表的对象上。

2. **局限性**：
   - 如果直接将一个值赋值给`exports`，它将不再是对`module.exports`的引用，而是变成一个独立的变量。此时，模块的导出内容将变为这个新的值，而不是原本期望的通过添加属性到`exports`来构建的导出对象。
   - 例如：
   ```javascript
   exports = function () {
     console.log("This is a new function.");
   };
   ```
   - 在这种情况下，模块将不再导出之前可能通过`exports.xxx = yyy`添加的属性，而是只导出这个新的函数。

**三、选择建议\*\***：

1. **简单模块导出单个值**：

   - 如果模块只需要导出一个简单的值，如一个函数或一个字符串，可以使用`module.exports`直接赋值的方式。例如：

   ```javascript
   module.exports = function add(a, b) {
     return a + b;
   };
   ```

2. **复杂模块构建导出对象**：

   - 当模块需要导出多个相关的值或功能时，可以先使用`exports`添加属性，最后确保`module.exports`指向一个包含所有需要导出内容的对象。例如：

   ```javascript
   exports.foo = function () {
     console.log("foo function.");
   };
   exports.bar = "bar value";
   module.exports = exports; // 确保 module.exports 和 exports 指向同一个对象
   ```

3. **避免混淆和错误**：
   - 理解`module.exports`和`exports`的区别非常重要，以避免在导出模块内容时出现意外的结果。尽量明确使用`module.exports`或遵循使用`exports`的正确方式，避免直接赋值给`exports`而导致错误的导出行为。
