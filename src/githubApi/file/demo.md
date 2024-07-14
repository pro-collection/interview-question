**关键词**：DOM getSelection 方法 应用场景

> 主要考察 dom 方法， `getSelection`
> 属于很冷门知识， 只会在做过富文本的同学面试过程中可能会问得到。

要在划词选择的文本上添加右键菜单，可以按照以下步骤进行操作：

1. 监听鼠标右键事件
   在文档或富文本区域上添加 `contextmenu` 事件的监听。

```javascript
document.addEventListener("contextmenu", function (event) {
  // 阻止默认的浏览器右键菜单
  event.preventDefault();

  // 在此处显示自定义右键菜单
  showCustomMenu(event);
});
```

2. 显示自定义右键菜单
   创建一个自定义的菜单元素，并根据选择的文本设置菜单选项。

```javascript
function showCustomMenu(event) {
  const customMenu = document.createElement("div");
  customMenu.style.position = "absolute";
  customMenu.style.left = event.clientX + "px";
  customMenu.style.top = event.clientY + "px";

  // 添加菜单选项
  const menuItem1 = document.createElement("div");
  menuItem1.textContent = "复制";
  menuItem1.addEventListener("click", function () {
    // 处理复制操作
    copySelectedText();
  });
  customMenu.appendChild(menuItem1);

  // 可以添加更多的菜单选项

  document.body.appendChild(customMenu);
}
```

3. 处理菜单选项的操作
   例如，实现复制选中文本的功能。

```javascript
function copySelectedText() {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const clipboardData = new ClipboardEvent("copy", {
      clipboardData: { text: range.toString() },
      bubbles: true,
    }).clipboardData;
    document.execCommand("copy", false, clipboardData);
  }
}
```

4. 隐藏右键菜单
   当用户点击菜单之外的区域时，隐藏自定义右键菜单。

```javascript
document.addEventListener("click", function (event) {
  const customMenu = document.querySelector(".custom-menu");
  if (customMenu && !customMenu.contains(event.target)) {
    customMenu.remove();
  }
});
```
