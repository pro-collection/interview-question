在小程序中确实不能直接操作DOM元素，因为小程序的视图层采用了一种称为WXML的声明性语言，而不是直接使用HTML来构建页面。

如果需要在小程序中实现在文本中间显示光标的效果，可以使用`<textarea>`组件或`<input>`组件，并通过`selectionStart`和`selectionEnd`属性来设置光标的位置。例如：

```html
<view>
  <textarea value="()" bindfocus="onFocus"></textarea>
</view>

<script>
  function onFocus(event) {
    const value = event.detail.value;
    event.target.setSelectionRange(value.length, value.length - 1);
  }
</script>
```

在上面的代码中，当用户点击文本框时，会触发`bindfocus`事件并调用`onFocus`函数，在函数中通过`setSelectionRange`方法将光标的位置设置在文本中间。需要注意的是，由于小程序中不支持直接操作DOM元素，因此需要通过事件处理函数来实现操作文本的效果。
