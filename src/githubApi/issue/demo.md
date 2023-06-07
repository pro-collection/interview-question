HTML 中前缀为 `data-` 开头的元素属性被称为自定义数据属性（Custom Data Attributes）或者数据属性（Data Attributes）。

这些属性的命名以 `data-` 开头，后面可以跟上任意自定义的名称。这样的属性可以用来存储与元素相关的自定义数据，以便在 JavaScript 或 CSS 中进行访问和操作。

自定义数据属性的命名应该遵循以下规则：
- 属性名必须以 `data-` 开头。
- 属性名可以包含任意`字母、数字、连字符（-）、下划线（_）和小数点（.）`。
- 属性名不应该包含大写字母，因为 HTML 属性名是不区分大小写的。

通过自定义数据属性，我们可以在 HTML 元素中嵌入自定义的数据，然后在 JavaScript 中使用 `getAttribute()` 方法或直接通过元素对象的 `dataset` 属性来访问这些数据。

例如，在 HTML 中定义了一个自定义数据属性 `data-color="red"`：
```html
<div id="myDiv" data-color="red"></div>
```

在 JavaScript 中可以通过以下方式获取该自定义数据属性的值：
```javascript
const myDiv = document.getElementById('myDiv');
const color = myDiv.getAttribute('data-color'); // 获取属性值为 "red"
const dataset = myDiv.dataset; // 获取包含所有自定义数据属性的对象 { color: "red" }
const colorValue = dataset.color; // 获取属性值为 "red"
```

通过自定义数据属性，我们可以将相关的数据绑定到 HTML 元素上，方便在 JavaScript 中进行处理和操作，增强了 HTML 和 JavaScript 之间的交互性。
