**关键词**：JS 类型转换

在 JavaScript（JS）中，以下类型之间是可以互相转换的：

**一、数字（Number）与字符串（String）**

1. 数字转字符串：

   - 使用`toString()`方法。例如：
     ```javascript
     let num = 123;
     let str = num.toString();
     ```
   - 使用字符串拼接的方式自动转换。例如：`let str = num + '';`

2. 字符串转数字：
   - 使用`Number()`函数。如果字符串不能转换为有效数字，则返回`NaN`。例如：`let num = Number('123');`
   - 使用`parseInt()`函数，将字符串解析为整数。例如：`let num = parseInt('123');`
   - 使用`parseFloat()`函数，将字符串解析为浮点数。例如：`let num = parseFloat('123.45');`

**二、布尔值（Boolean）与其他类型**

1. 布尔值转其他类型：

   - 转数字时，`true`转换为 1，`false`转换为 0。
   - 转字符串时，`true`转换为“true”，`false`转换为“false”。

2. 其他类型转布尔值：
   - 以下值转换为`false`：`false`、0、空字符串（''）、`null`、`undefined`、`NaN`。
   - 其他值转换为`true`。

**三、对象（Object）与原始类型**

1. 对象转原始类型：

   - 通过调用`valueOf()`和`toString()`方法进行转换，具体转换结果取决于对象的实现。例如：
     ```javascript
     let obj = {
       valueOf: function () {
         return 42;
       },
     };
     let num = Number(obj);
     ```

2. 原始类型转对象：
   - 使用包装对象，例如`new String('abc')`将字符串“abc”转换为字符串对象。

在进行类型转换时，需要注意转换的结果是否符合预期，以避免出现意外的错误。
