**关键词**：移动端适配

`px`（像素）转换为 `rem`（根元素字体大小的相对单位）需要先确定一个基准的根元素字体大小。

通常，我们将根元素（`<html>`）的字体大小设置为一个特定的值，比如 `16px`（这是常见的默认值，但您可以根据设计需求进行修改）。

假设根元素的字体大小为 `16px`，那么转换公式为：`rem 值 = px 值 / 16` 。

例如，如果有一个元素的宽度为 `100px`，转换为 `rem` 就是：`100 / 16 = 6.25rem` 。

在实际开发中，可以使用预处理器（如 Sass、Less）或者 JavaScript 来实现自动转换。

**追问：可有什么办法让 px 自动转为 rem， 在开发中就直接使用 px**

在前端开发中，要实现输入 `px` 但自动转换为 `rem` ，可以通过以下几种方式：

1. 使用 CSS 预处理器（如 Sass、Less）

- Sass：

```scss
@function pxToRem($pxValue) {
  @return $pxValue / 16 + rem;
}

.element {
  width: pxToRem(100);
}
```

- Less：

```less
.pxToRem(@pxValue) {
  @remValue: @pxValue / 16;
  @return @remValue + rem;
}

.element {
  width: pxToRem(100);
}
```

1. 使用构建工具（如 Webpack）的插件

   - 例如 `postcss-pxtorem` 插件，它可以在构建过程中自动将 `px` 转换为 `rem` 。您需要在配置中设置根元素的字体大小等相关参数。

2. 自己编写脚本进行转换
   - 可以在开发过程中使用 JavaScript 脚本来处理样式表中的 `px` 值，并将其转换为 `rem` 。但这种方式相对复杂，并且可能会影响开发效率。
