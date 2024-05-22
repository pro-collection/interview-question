**关键词**：CSS 变量

CSS 自定义属性，又称 CSS 变量，是一种在 CSS 样式表中声明可以使用任意值的方法，这样的值在同一份 CSS 代码中可以多次引用并调用来替代特定的内容。使用 CSS 变量可以提高样式表的可维护性和灵活性。以下是如何声明和使用 CSS 变量的步骤：

### 声明 CSS 变量

CSS 变量的声明总是以 `--` 开头，跟随变量名。你可以在 CSS 的任何范围内声明变量，包括 `:root`（相当于 HTML 的根），这样所有样式规则都可以访问到。

**示例**：

```css
:root {
  --main-color: #3498db;
  --padding: 8px;
  --transition-speed: 0.3s;
}
```

### 使用 CSS 变量

在 CSS 中使用变量时，你需要使用 `var()` 函数，并在括号中提供变量名，可以包含在`--` 前缀之后。

**示例**：

```css
body {
  background-color: var(--main-color);
  padding: var(--padding);
  transition: all var(--transition-speed) ease-in-out;
}
```

### 默认值

有时候，你可能想为 CSS 变量提供一个默认值，以防它未被声明时使用。在 `var()` 函数中，你可以添加一个可选的第二个参数作为默认值。

**示例**：

```css
body {
  font-size: var(--font-size, 16px);
}
```

在上面的例子中，如果 `--font-size` 变量没有在任何地方声明，`body` 的 `font-size`将默认使用 `16px`。

### 作用域

变量的作用域是根据它们声明的地方确定的：

- 在 `:root` 选择器内声明的变量是全局变量，在任何地方都可以使用。
- 在其他元素或伪类的 CSS 规则中声明的变量会在该元素或这些伪类中局部有效。

**示例**：

```css
button {
  --button-bg-color: #e74c3c;
}

.btn-primary {
  background-color: var(--button-bg-color);
}
```

在上面的例子中，`--button-bg-color` 变量只在 `button` 元素中声明，因此它只在 `button` 下的所有样式规则中可用，`.btn-primary`则是基于这个变量设置的。

CSS 变量是非常强大的工具，特别是当你需要在整个页面上保持一致性，或者是要实现主题应用时。它们有助于实现动态主题，使样式管理更系统化。
