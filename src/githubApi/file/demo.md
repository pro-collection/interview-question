**关键词**：less 函数

LESS 是一种基于 JavaScript 的 CSS 预处理器，它扩展了 CSS 的功能，提供了变量、嵌套、混合（Mixins）、函数等功能。LESS 中的函数允许你执行计算、转换和操纵值的操作，使得你的样式表更加灵活和动态。

### 使用 LESS 函数的基本步骤：

1. **定义函数**：你可以定义一个 LESS 函数，它接受参数并执行代码块。

```less
.my-function(@arg) {
  .result {
    width: @arg;
  }
}
```

2. **调用函数**：使用 `@` 前缀后跟函数名和所需的参数列表来调用函数。

```less
.my-class {
  .my-function(200px);
}
```

3. **传递参数**：函数可以接收一个或多个参数。上面的例子只传递一个参数。

### 示例：简单的 LESS 函数

```less
// 定义一个 LESS 函数
.pi(@num) {
  .pi-box {
    width: @num * 3.14159;
  }
}

// 调用这个函数
body {
  .pi(5px);
}
```

在该示例中，`pi` 是一个接受数字参数并返回其圆周长度的 LESS 函数。这个 `pi` 函数在 `body` 选择器内部被调用，并设置了宽度为 5 \* 3.14159 像素。

### LESS 内建函数

LESS 还包括多个内建函数，可以直接在 LESS 代码中使用。以下是一些常见的内建函数示例：

- **`percentage()`**：将值转换成百分比。
  ```less
  margin: percentage(20px / 100px); // 输出 20%
  ```
- **`round()`**：四舍五入数字。
  ```less
  width: round(23.7px); // 输出 24px
  ```
- **`floor()`** 和 **`ceil()`**：向下取整和向上取整。

  ```less
  height: ceil(14.2px); // 输出 15px
  ```

- **`unit()`** 和 **`convert()`**：分别用来获取值的单位和转换单位。

  ```css
  width: convert(10, ms); // 将 10 转换为毫秒
  margin: unit(25, "%"); // 输出 默认单位为 px，这次你却要改成百分比
  ```

- **`color-function()`**：用于操作颜色值的函数，例如 `lighten()`、`darken()`、`saturate()` 等。

  ```less
  background: lighten(#800, 10%); // 将颜色 #800 变亮 10%
  ```

- **`e()`**：允许你将 CSS 代码作为参数传递到 `&` 中，用于可扩展的类选择器。
  ```less
  .borderbox {
    *,
    *:before,
    *:after {
      .box-sizing(border-box);
    }
  }
  ```

### 注意事项：

- 函数可以返回任意值，包括颜色、数字、字符串和数组。
- 如果想要执行的是一个操作而非函数定义，需要注意的是 LESS 并不像 JavaScript 一样需要用 `function` 关键字声明。

合理使用函数可以极大增加 CSS 的动态性和灵活性，是构建维护性和复用性更强的 CSS 不可或缺的部分。
