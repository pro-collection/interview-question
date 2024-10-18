**关键词**：input 标签 type 属性

HTML 中的`<input>`标签有多种`type`属性值，以下是一些常见的类型：

**一、文本输入类型**

1. `text`：

   - 用于输入单行文本。这是最常见的输入类型之一，用户可以在输入框中输入任何文本内容。
   - 例如：`<input type="text">`。

2. `password`：
   - 用于输入密码，输入的内容会以掩码形式显示，以保护密码的安全性。
   - 例如：`<input type="password">`。

**二、数值输入类型**

1. `number`：

   - 用于输入数值。可以设置最小值、最大值、步长等属性来限制输入的范围。
   - 例如：`<input type="number" min="0" max="100" step="1">`。

2. `range`：
   - 以滑块的形式显示，用户可以通过拖动滑块来选择一个数值范围内的值。
   - 例如：`<input type="range" min="0" max="100">`。

**三、日期和时间输入类型**

1. `date`：

   - 用于选择日期。通常会显示一个日期选择器，方便用户选择日期。
   - 例如：`<input type="date">`。

2. `time`：

   - 用于选择时间。可以选择小时、分钟和秒。
   - 例如：`<input type="time">`。

3. `datetime-local`：
   - 用于选择日期和时间，包括本地时区信息。
   - 例如：`<input type="datetime-local">`。

**四、选择类型**

1. `checkbox`：

   - 复选框，用户可以选择多个选项。
   - 例如：`<input type="checkbox">`。

2. `radio`：

   - 单选按钮，用户只能选择一个选项。通常多个单选按钮具有相同的`name`属性，以确保只能选择其中一个。
   - 例如：`<input type="radio" name="option">`。

3. `select`：
   - 下拉列表，用户可以从预定义的选项中选择一个值。可以使用`<option>`标签来定义选项。
   - 例如：

```html
<select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

**五、按钮类型**

1. `submit`：

   - 提交按钮，用于提交表单数据。通常与`<form>`标签一起使用。
   - 例如：`<input type="submit" value="Submit">`。

2. `reset`：

   - 重置按钮，用于重置表单中的所有输入字段为初始状态。
   - 例如：`<input type="reset" value="Reset">`。

3. `button`：
   - 普通按钮，可以通过 JavaScript 为其添加自定义的行为。
   - 例如：`<input type="button" value="Click Me">`。

**六、其他类型**

1. `email`：

   - 用于输入电子邮件地址。浏览器可能会对输入的内容进行有效性验证。
   - 例如：`<input type="email">`。

2. `url`：

   - 用于输入 URL 地址。浏览器可能会对输入的内容进行有效性验证。
   - 例如：`<input type="url">`。

3. `search`：

   - 用于输入搜索关键词。通常会显示一些特定的样式，如圆角等。
   - 例如：`<input type="search">`。

4. `hidden`：

   - 隐藏输入字段，用于在表单中传递数据，但不会在页面上显示给用户。
   - 例如：`<input type="hidden" value="some-value">`。

5. `color`：

   - 用于选择颜色。通常会显示一个颜色选择器。
   - 例如：`<input type="color">`。

6. `file`：
   - 用于上传文件。可以设置`multiple`属性允许选择多个文件。
   - 例如：`<input type="file">`或`<input type="file" multiple>`。
