**关键词**：DOM getSelection 方法

> 主要考察 dom 方法， `getSelection`
> 属于很冷门知识， 只会在做过富文本的同学面试过程中可能会问得到。

在富文本环境中实现划词（鼠标滑动选择一组字符并对其进行操作）通常涉及以下几个关键步骤和技术：

1. 事件监听

   - 监听鼠标按下、鼠标移动和鼠标松开这三个主要的鼠标事件。当鼠标按下时，标记选择的开始；在鼠标移动过程中，根据鼠标的位置更新选择范围；鼠标松开时，确定最终的选择。

2. 选择范围计算

   - 使用浏览器提供的 `Selection` 对象来获取和管理选择的范围。在鼠标移动过程中，不断更新 `Selection` 对象的范围。

3. 操作处理
   - 一旦选择完成，可以根据具体的需求对选中的字符进行操作。例如，修改样式（如加粗、变色）、获取选中的文本内容、执行复制粘贴等操作。

以下是一个简单的 JavaScript 示例，展示了如何获取选中的文本：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <p>这是一段示例文本，您可以尝试选中一部分。</p>

    <script>
      document.addEventListener("mouseup", function () {
        const selection = window.getSelection();
        if (selection) {
          const selectedText = selection.toString();
          console.log("选中的文本: ", selectedText);
        }
      });
    </script>
  </body>
</html>
```
