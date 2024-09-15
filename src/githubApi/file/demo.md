**关键词**：长文本隐藏

在前端处理长文本且需要在中间显示省略号（...），两端保留完整文本的情况，通常有下面几种方法可以达到效果：

### 1. 纯 CSS 解决方案（对于单行文本）

对于单行的文本，可以使用 CSS 的`text-overflow`属性来实现，但这种方法一般只能实现末尾的省略号，无法直接实现中间省略的效果。

### 2. JavaScript + CSS

当需要在文本中间显示省略号时，就需要结合使用 JavaScript 和 CSS 来处理。以下是一种可能的实现方法：

1. **确定保留文本的长度。** 首先确定需要在文本的开始和结束保留多少字符。
2. **使用 JavaScript 计算并处理文本。** 根据上面确定的长度，使用 JavaScript 截取字符串，并添加省略号。
3. **使用 CSS 来保证文本的美观展示。**

下面是一个简单的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .text-container {
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <div id="text" class="text-container">
      <!-- 动态生成的文本会放在这里 -->
    </div>

    <script>
      function truncateText(selector, text, frontLen, backLen) {
        const totalLen = frontLen + backLen;
        if (text.length > totalLen) {
          const startText = text.substr(0, frontLen);
          const endText = text.substr(-backLen);
          document.querySelector(selector).textContent = `${startText}...${endText}`;
        } else {
          document.querySelector(selector).textContent = text;
        }
      }

      const exampleText = "这是一个长文本示例，需要在中间显示省略号，同时保留两端的文本内容。";
      truncateText("#text", exampleText, 10, 10);
    </script>
  </body>
</html>
```

在这个例子中，`truncateText`函数接收一个选择器（在这里是指容器的 ID）、要处理的文本、前端和后端应保留文本的长度。函数计算并生成了新的文本内容，其中间部分被省略号（...）替代。

这个方法给予了你灵活性去确定前后端保留的文本长度，以及省略的部分。但需要注意，这是针对简单场景的解决方案，对于更复杂的布局或特殊字体，可能需要更细致的处理来保证良好的显示效果。

### 其他复杂实现可以参考下面的文档

- https://juejin.cn/post/7329967013923962895
