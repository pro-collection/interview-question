**关键词**：dom.contains 方法

在 DOM（文档对象模型）中，要判断元素 `a` 是否是元素 `b` 的子元素，您可以使用以下的 JavaScript 代码：

```javascript
function isChildElement(a, b) {
  return b.contains(a);
}
```

可以这样使用上述函数：

```javascript
const elementA = document.getElementById("elementA");
const elementB = document.getElementById("elementB");

if (isChildElement(elementA, elementB)) {
  console.log("元素 A 是元素 B 的子元素");
} else {
  console.log("元素 A 不是元素 B 的子元素");
}
```
