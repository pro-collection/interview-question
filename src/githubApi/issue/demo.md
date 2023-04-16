移动端适配问题是指如何让网页在不同的移动设备上显示效果相同。下面是一些常见的 H5 移动端适配方案：

1. 使用 viewport 标签

通过设置 viewport 标签的 meta 属性，来控制页面的缩放比例和宽度，以适配不同的设备。例如：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

其中 `width=device-width` 表示设置 viewport 的宽度为设备宽度，`initial-scale=1.0` 表示初始缩放比例为 1。

2. 使用 CSS3 的媒体查询

通过 CSS3 的媒体查询，根据不同的设备宽度设置不同的样式，以适配不同的设备。例如：

```arduino
arduinoCopy code@media screen and (max-width: 640px) {
  /* 样式 */
}
```

其中 `max-width` 表示最大宽度，当屏幕宽度小于等于 640px 时，应用这些样式。

3. 使用 rem 单位

通过将 px 转化为 rem 单位，根据不同的设备字体大小设置不同的样式，以适配不同的设备。例如：

```css
html {
  font-size: 16px;
}

@media screen and (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

div {
  width: 10rem;
}
```

其中 `font-size: 16px` 表示将网页的基准字体大小设置为 16px，`font-size: 14px` 表示在屏幕宽度小于等于 640px 时将基准字体大小设置为 14px，`div` 元素的 `width: 10rem` 表示该元素的宽度为 10 个基准字体大小。

4. 使用 flexible 布局方案

通过使用 flexible 布局方案，将 px 转化为 rem 单位，并且动态计算根节点的字体大小，以适配不同的设备。例如使用 lib-flexible 库：

```html
arduinoCopy code// index.html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.4/flexible.js"></script>

// index.js
import 'lib-flexible/flexible.js'
```

其中 `flexible.js` 会在页面加载时动态计算根节点的字体大小，并将 px 转化为 rem 单位。在样式中可以直接使用 px 单位，例如：

```css
div {
  width: 100px;
  height: 100px;
}
```

这个 div 元素的大小会根据设备屏幕的宽度进行适配。
