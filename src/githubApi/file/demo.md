**关键词**：less 特性

Less 作为一款流行的 CSS 预处理器，核心价值在于通过**增强 CSS 的可编程性、复用性和可维护性**，简化样式开发流程。除了基础的变量、嵌套语法，它还提供了诸多“高级特性”，这些特性能应对复杂场景（如组件样式封装、主题切换、动态样式计算等）。以下是 Less 核心高级特性的详细解析，结合使用场景和示例帮助理解：

### 一、条件判定（Guards）

Less 不支持传统编程语言的 `if-else` 语句，但通过 **Guards（守卫）** 实现了“基于条件匹配样式规则”的能力，分为「规则守卫」和「混合守卫」，核心是通过表达式判断是否应用样式。

#### 1. 规则守卫（Guards on Rulesets）

给选择器添加条件，只有满足条件时，该选择器下的样式才会生效。  
**语法**：`& when (条件表达式)`（`&` 代表当前选择器）  
**支持的运算符**：`>`, `<`, `>=`, `<=`, `==`, `!=`，以及逻辑运算符 `and`, `or`, `not`。

**示例：根据屏幕宽度动态调整字体大小**

```less
// 定义变量存储断点
@sm: 768px;
@md: 1024px;

.container {
  font-size: 14px; // 默认样式

  // 屏幕 >= 768px 时生效
  & when (@media-width >= @sm) {
    font-size: 16px;
  }

  // 屏幕 >= 1024px 时生效（and 连接多条件）
  & when (@media-width >= @md) and (@theme = "dark") {
    font-size: 18px;
    color: #fff;
  }
}
```

#### 2. 混合守卫（Guards on Mixins）

给混合（Mixin）添加条件，只有满足条件时，混合中的样式才会被注入。常用于“动态复用样式片段”。

**示例：根据主题切换按钮样式**

```less
// 定义带条件的混合
.button-style(@theme) when (@theme = "primary") {
  background: #1890ff;
  border: 1px solid #1890ff;
}

.button-style(@theme) when (@theme = "danger") {
  background: #ff4d4f;
  border: 1px solid #ff4d4f;
}

// 使用混合（传入不同主题，触发不同条件）
.btn-primary {
  .button-style("primary");
  color: #fff;
}

.btn-danger {
  .button-style("danger");
  color: #fff;
}
```

### 二、高级变量特性

Less 的变量不仅支持“值存储”，还支持**变量插值**、**变量作用域**和**变量运算**，灵活应对动态样式场景。

#### 1. 变量插值（Variable Interpolation）

将变量值插入到**选择器名、属性名、URL、字符串**中，实现“动态生成标识符”。  
**语法**：`@{变量名}`

**示例：动态生成选择器和 URL**

```less
// 1. 动态选择器（如组件前缀）
@component-prefix: "my-btn";

.@{component-prefix} {
  // 最终编译为 .my-btn
  padding: 8px 16px;
}

.@{component-prefix}-disabled {
  // 最终编译为 .my-btn-disabled
  opacity: 0.6;
  cursor: not-allowed;
}

// 2. 动态 URL（如图片路径）
@img-path: "../assets/img";

.logo {
  background: url("@{img-path}/logo.png"); // 最终编译为 url("../assets/img/logo.png")
}

// 3. 动态属性名（如主题色属性）
@property: "color";
@theme-color: #1890ff;

.title {
  @{property}: @theme-color; // 最终编译为 color: #1890ff
}
```

#### 2. 变量作用域（Variable Scope）

Less 变量遵循“**就近原则**”：局部作用域（如选择器、混合内部）的变量会覆盖全局作用域的变量，且支持“向上查找”（局部没有时，查找父级作用域）。

**示例：作用域优先级**

```less
@color: red; // 全局变量

.container {
  @color: blue; // 局部变量（覆盖全局）
  .box {
    color: @color; // 优先使用局部变量，最终为 blue
  }
}

.text {
  color: @color; // 无局部变量，使用全局变量，最终为 red
}
```

#### 3. 变量运算（Operations）

支持对**数字、颜色、长度单位**进行算术运算（`+`, `-`, `*`, `/`），自动处理单位兼容（如 `px` 和 `rem` 混合运算）。

**示例：动态计算样式值**

```less
@base-padding: 10px;
@base-font-size: 14px;

.card {
  // 数字运算（padding = 基础值 * 1.5）
  padding: @base-padding * 1.5; // 最终 15px

  // 颜色运算（深色 = 基础色降低亮度）
  @base-color: #1890ff;
  background: @base-color - #333; // 最终 #0066cc

  // 单位混合运算（font-size = 基础值 + 2rem）
  font-size: @base-font-size + 2rem; // 最终 16px（Less 自动统一单位）
}
```

### 三、混合（Mixins）进阶

混合是 Less 的核心复用特性，除了基础的“样式片段复用”，还支持**带参数混合、默认参数、剩余参数**，甚至可以“返回值”（通过变量传递）。

#### 1. 带参数混合（Parametric Mixins）

给混合定义参数，使用时传入不同值，实现“个性化复用”。

**示例：通用圆角混合**

```less
// 定义带参数的混合（@radius 为参数）
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

// 使用混合（传入不同半径值）
.btn {
  .border-radius(4px); // 小圆角
}

.card {
  .border-radius(8px); // 大圆角
}
```

#### 2. 默认参数（Default Values）

给混合参数设置默认值，使用时可省略该参数（自动使用默认值）。

**示例：带默认值的阴影混合**

```less
// 定义混合（@color 默认 #000，@opacity 默认 0.2）
.box-shadow(@x: 0, @y: 0, @blur: 4px, @color: #000, @opacity: 0.2) {
  box-shadow: @x @y @blur rgba(@color, @opacity);
}

// 使用混合（省略部分参数，使用默认值）
.card {
  .box-shadow(0, 2px); // 省略 @blur（默认 4px）、@color（默认 #000）、@opacity（默认 0.2）
  // 最终编译为：box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
}
```

#### 3. 剩余参数（Variadic Arguments）

当混合参数数量不确定时，用 `...` 接收“剩余所有参数”，类似 JavaScript 的 `rest` 参数。

**示例：灵活的过渡动画混合**

```less
// 定义混合（@props 接收所有过渡属性，@duration 默认 0.3s）
.transition(@props..., @duration: 0.3s) {
  transition: @props @duration ease;
}

// 使用混合（传入多个过渡属性）
.btn {
  .transition(color, background); // @props 接收 [color, background]
  // 最终编译为：transition: color background 0.3s ease
}

.card {
  .transition(transform, opacity, 0.5s); // 自定义 duration 为 0.5s
  // 最终编译为：transition: transform opacity 0.5s ease
}
```

### 四、导入（Import）进阶

Less 的 `@import` 不仅能导入其他 Less 文件，还支持**条件导入**、**引用导入**和**导入变量/混合**，灵活管理样式模块。

#### 1. 条件导入（Conditional Import）

结合 Guards 实现“满足条件时才导入文件”，常用于“按需加载主题/适配样式”。

**示例：根据主题导入不同样式文件**

```less
@theme: "dark"; // 可动态切换为 "light"

// 条件：主题为 dark 时，导入深色主题文件
@import (multiple) "theme-dark.less" when (@theme = "dark");

// 条件：主题为 light 时，导入浅色主题文件
@import (multiple) "theme-light.less" when (@theme = "light");
```

- 注：`(multiple)` 表示“允许重复导入同一文件”（默认不允许）。

#### 2. 引用导入（Reference Import）

用 `@import (reference)` 导入文件时，**仅引用文件中的混合、变量，不编译文件本身的样式**，避免冗余代码。

**示例：引用工具类文件（仅用混合，不编译工具类样式）**

```less
// 导入工具类文件（reference 表示仅引用，不编译 utils.less 中的选择器）
@import (reference) "utils.less";

// 使用 utils.less 中的混合（如 .clearfix）
.container {
  .clearfix(); // 仅注入 .clearfix 的样式，utils.less 其他样式不编译
}
```

#### 3. 导入变量/混合（Import for Variables/Mixins）

导入文件时，可直接使用目标文件中的变量和混合，实现“样式模块拆分”（如将变量、混合、组件样式分别放在不同文件）。

**示例：模块化拆分样式**

```less
// 1. variables.less（存储全局变量）
@primary-color: #1890ff;
@font-size-base: 14px;

// 2. mixins.less（存储通用混合）
.clearfix() {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

// 3. main.less（导入并使用）
@import "variables.less";
@import "mixins.less";

.btn {
  color: @primary-color; // 使用 variables.less 的变量
  font-size: @font-size-base;
}

.container {
  .clearfix(); // 使用 mixins.less 的混合
}
```

### 五、循环（Loops）

Less 没有专门的 `for`/`while` 循环语法，但通过**混合自调用**（混合内部调用自身）实现循环效果，常用于“生成重复样式”（如网格系统、层级样式）。

**示例 1：生成 1-5 级标题样式**

```less
// 定义循环混合（@n 为当前层级，@max 为最大层级）
.generate-heading(@n, @max) when (@n <= @max) {
  // 动态生成选择器（h1, h2, ..., h@max）
  h@{n} {
    font-size: 16px + (@n - 1) * 4px; // 每级标题增大 4px
    margin-bottom: 8px + (@n - 1) * 2px;
  }
  // 自调用（层级 +1）
  .generate-heading(@n + 1, @max);
}

// 触发循环（生成 h1-h5 样式）
.generate-heading(1, 5);
```

**编译结果**：

```css
h1 {
  font-size: 16px;
  margin-bottom: 8px;
}
h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
h3 {
  font-size: 24px;
  margin-bottom: 12px;
}
h4 {
  font-size: 28px;
  margin-bottom: 14px;
}
h5 {
  font-size: 32px;
  margin-bottom: 16px;
}
```

**示例 2：生成网格系统（col-1 到 col-12）**

```less
.generate-col(@n) when (@n <= 12) {
  .col-@{n} {
    width: (@n / 12) * 100%; // 每列宽度 = (n/12)*100%
    float: left;
  }
  .generate-col(@n + 1);
}

.generate-col(1); // 生成 col-1 到 col-12
```

### 六、内置函数（Built-in Functions）

Less 提供了丰富的内置函数，覆盖**颜色处理、字符串操作、数值计算**等场景，无需手动编写复杂逻辑。以下是常用内置函数分类：

| 函数类别       | 常用函数                         | 功能说明                               | 示例                                        |
| -------------- | -------------------------------- | -------------------------------------- | ------------------------------------------- |
| **颜色处理**   | `darken(@color, @percent)`       | 降低颜色亮度（百分比）                 | `darken(#1890ff, 10%)` → #096dd9            |
|                | `lighten(@color, @percent)`      | 提高颜色亮度（百分比）                 | `lighten(#1890ff, 10%)` → #3ba0ff           |
|                | `rgba(@color, @alpha)`           | 设置颜色透明度                         | `rgba(#1890ff, 0.5)` → rgba(24,144,255,0.5) |
| **字符串操作** | `replace(@str, @find, @replace)` | 替换字符串内容                         | `replace("hello", "h", "H")` → "Hello"      |
|                | `upper(@str)`                    | 字符串转大写                           | `upper("hello")` → "HELLO"                  |
| **数值计算**   | `ceil(@num)`                     | 向上取整                               | `ceil(2.3)` → 3                             |
|                | `floor(@num)`                    | 向下取整                               | `floor(2.7)` → 2                            |
|                | `percentage(@num)`               | 小数转百分比                           | `percentage(0.25)` → 25%                    |
| **其他**       | `typeof(@value)`                 | 判断值的类型（number/string/color 等） | `typeof(#fff)` → "color"                    |

**示例：用内置函数处理主题色**

```less
@primary: #1890ff;

.btn {
  background: @primary;
  //  hover 时加深 10% 亮度
  &:hover {
    background: darken(@primary, 10%);
  }
  //  active 时降低透明度到 0.8
  &:active {
    background: rgba(@primary, 0.8);
  }
}
```

### 总结

Less 的高级特性围绕“**复用、动态、可维护**”三大核心设计，适合复杂项目的样式开发：

- 需**动态切换样式**（如主题、响应式）：用「条件判定」「变量插值」「条件导入」；
- 需**复用样式片段**（如组件、工具类）：用「带参数混合」「剩余参数」「引用导入」；
- 需**生成重复样式**（如网格、层级）：用「循环」；
- 需**处理颜色/数值**：用「内置函数」「变量运算」。

合理搭配这些特性，能大幅减少冗余 CSS 代码，提升样式开发效率和可维护性。
