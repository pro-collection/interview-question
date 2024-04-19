**关键词**：滚动到页面视口、IntersectionObserver 详解

### 基本原理

页面是用户与程序进行交互的界面，在对应表单校验场景中，通常会因为有填写错误需要用户进行修改。为了提高用户体验，可以将页面滚动至对应表单报错的位置，使得用户立即可见错误并进行修改。这通常可以通过 JavaScript 编程实现。

要注意的是，实现滚动至错误表单，一般需要几个步骤：

1. **记录表单元素的位置**：在表单提交前的适当时间里记录所有表单元素的错误位置。
2. **滚动到特定错误**：错误发生时，滚动到第一个错误的表单元素位置。
3. **优化**：可为同一元素多次错误滚动优化，避免不必要的用户干扰。

### 以下是这些步骤的代码示例

### HTML:

```html
<form id="myForm" onsubmit="return false;">
  <input type="text" id="name" name="name" />
  <input type="text" id="age" name="age" />
  <!-- ... 其他表单元素 ... -->
  <button type="submit" onclick="handleValidation()">Submit</button>
</form>
```

### JavaScript:

```javascript
// 一个假设的表单验证函数
function validateInput(inputId) {
  // 调用此处的校验逻辑，返回是否存在错误
  // 这里以ID "inputId"来获取对应的DOM对象
  var el = document.getElementById(inputId);
  // 此处只是示例, 实际上应根据具体的校验逻辑返回一个布尔类型
  return el.value === "预期值";
}

function handleValidation() {
  var valid = true;

  ["name", "age"].forEach((key) => {
    // 进行校验判断
    if (!validateInput(key)) {
      console.error(`Validation failed for: ${key}`);

      // 标记校验失败
      valid = false;

      // 滚动到出现问题的元素位置
      var element = document.getElementById(key);
      element.scrollIntoView({ block: "center", behavior: "smooth" });

      // 增加一些提示效果, 比如错误边框, 可按需实现
      // element.classList.add('error-highlight');
    }
  });

  // 检查是否验证失败，如果失败则不提交表单
  return valid;
}

// 处理表单提交事件，与HTML中的onclick绑定
document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault(); // 阻止表单默认提交行为
  handleValidation();
});
```

### 补充知识点 scrollIntoView

参考文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
