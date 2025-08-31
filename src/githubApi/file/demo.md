**关键词**：less 条件判定

是的，Less 完全支持条件判定，其核心通过 **`when` 关键字** 实现，同时可结合比较运算符、逻辑运算符构建复杂的条件逻辑，主要用于动态控制样式规则的生效与否（如根据变量值切换样式、适配不同场景）。

### 一、核心语法：`when` 条件判断

Less 的条件判定并非像 JavaScript 那样的 `if-else` 语句，而是以 **“条件附加在选择器/混合（Mixin）后”** 的形式存在，只有当条件满足时，对应的样式才会被编译。

#### 1. 基础语法结构

```less
// 格式：选择器 / 混合名 when (条件) { 样式 }
选择器 when (条件) {
  // 条件满足时生效的样式
}

// 示例：当 @width 大于 500px 时，设置容器宽度
.container when (@width > 500px) {
  width: @width;
  padding: 20px;
}
```

### 二、支持的条件类型

Less 允许在 `when` 中使用 **比较运算符**、**逻辑运算符** 和 **类型检查函数**，覆盖绝大多数场景需求。

#### 1. 比较运算符

用于数值（如长度、数字、百分比）的比较，支持 6 种运算符：

- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于
- `==`：等于（值和单位需完全匹配，如 `500px == 500` 不成立）
- `!=`：不等于

**示例：根据屏幕宽度变量适配样式**

```less
@screen-width: 1200px;

// 大屏幕（>1024px）
.header when (@screen-width > 1024px) {
  font-size: 18px;
  padding: 0 40px;
}

// 中屏幕（768px ~ 1024px）
.header when (@screen-width >= 768px) and (@screen-width <= 1024px) {
  font-size: 16px;
  padding: 0 20px;
}

// 小屏幕（<768px）
.header when (@screen-width < 768px) {
  font-size: 14px;
  padding: 0 10px;
}
```

编译后（因 `@screen-width=1200px`），仅大屏幕样式生效：

```css
.header {
  font-size: 18px;
  padding: 0 40px;
}
```

#### 2. 逻辑运算符

用于组合多个条件，支持 3 种逻辑关系：

- `and`：逻辑“与”（所有条件均满足才生效）
- `,`（逗号）：逻辑“或”（任意一个条件满足即生效，注意不是 `or`）
- `not`：逻辑“非”（否定单个条件，需用括号包裹）

**示例：逻辑组合的应用**

```less
@theme: "dark";
@font-size: 16; // 无单位（后续需拼接）

// 条件1：主题为 dark OR 字体大小 >= 16
.text-style when (@theme == "dark"), (@font-size >= 16) {
  color: #fff;
  background: #333;
}

// 条件2：主题不是 light AND 字体大小 < 20
.text-style when not (@theme == "light") and (@font-size < 20) {
  font-weight: 500;
}
```

编译后（`@theme=dark`、`@font-size=16` 满足所有条件）：

```css
.text-style {
  color: #fff;
  background: #333;
  font-weight: 500;
}
```

#### 3. 类型检查函数

用于判断变量的 **类型** 或 **是否为数值**，常见函数如下：
| 函数 | 作用 | 示例 |
|--------------------|---------------------------------------|-------------------------------|
| `isnumber(@value)` | 判断是否为数字（无论是否有单位） | `isnumber(123)` → `true` |
| `isstring(@value)` | 判断是否为字符串 | `isstring("red")` → `true` |
| `iscolor(@value)` | 判断是否为颜色值（如 `#fff`、`red`） | `iscolor(#333)` → `true` |
| `isurl(@value)` | 判断是否为 URL（如 `url(xxx.png)`） | `isurl(url(img.jpg))` → `true`|
| `isunit(@value, 单位)` | 判断是否为指定单位的数值 | `isunit(50px, px)` → `true` |

**示例：类型检查控制样式**

```less
@border-width: 2px;
@border-color: "#000"; // 字符串类型的颜色

// 条件：边框宽度是 px 单位，且边框颜色是字符串（需转换为颜色）
.border when (isunit(@border-width, px)) and (isstring(@border-color)) {
  border: @border-width solid @border-color; // Less 会自动将字符串颜色转为颜色值
}
```

编译后：

```css
.border {
  border: 2px solid #000;
}
```

### 三、进阶用法：结合混合（Mixin）

条件判定在 **混合（Mixin）** 中使用最广泛，可实现“动态复用样式”，甚至模拟“if-else 分支”。

#### 1. 带条件的混合

定义仅在特定条件下生效的混合，调用时自动判断是否执行：

```less
// 定义混合：仅当 @radius 是数字时，设置圆角
.border-radius(@radius) when (isnumber(@radius)) {
  border-radius: @radius * 1px; // 统一转为 px 单位
}

// 调用混合
.card {
  .border-radius(8); // 满足条件（8 是数字），编译为 border-radius: 8px
}

.button {
  .border-radius("8"); // 不满足条件（"8" 是字符串），无样式输出
}
```

#### 2. 模拟“if-else”分支

通过多个 `when` 条件的“互斥性”，实现类似 `if-else` 的逻辑（即“满足 A 则执行 A，否则执行 B”）：

```less
@is-disabled: true;

// 条件1：如果禁用（if）
.button-style when (@is-disabled = true) {
  background: #ccc;
  cursor: not-allowed;
  color: #999;
}

// 条件2：如果未禁用（else）
.button-style when (@is-disabled = false) {
  background: #007bff;
  cursor: pointer;
  color: #fff;
}

// 调用
.disabled-btn {
  .button-style; // 因 @is-disabled=true，编译为禁用样式
}
```

### 四、注意事项

1. **条件仅支持“编译时判定”**：Less 是预编译语言，条件判断基于 **编译时的变量值**，无法动态响应运行时（如浏览器窗口大小变化），运行时适配需结合 CSS `@media` 查询。
2. **键名与变量的区别**：条件中使用变量时，需确保变量已定义；若误写为未定义的键名（如 `when (screen-width > 1000px)`），Less 会视为 `undefined`，条件判定为 `false`。

3. **与 CSS `@media` 的分工**：
   - Less 条件：用于 **编译时的静态变量控制**（如主题切换、固定参数适配）；
   - CSS `@media`：用于 **运行时的动态环境适配**（如屏幕宽度、设备像素比）。
     两者可结合使用（如 Less 变量动态生成 `@media` 条件）：
   ```less
   @breakpoint: 768px;
   @media (max-width: @breakpoint) {
     .container when (@columns = 2) {
       // Less 条件 + CSS media
       display: grid;
       grid-template-columns: repeat(2, 1fr);
     }
   }
   ```

### 总结

Less 的条件判定通过 `when` 关键字实现，支持比较、逻辑、类型检查，核心价值是 **在编译时动态控制样式的生成**，尤其适合与混合结合实现可复用的条件样式。日常开发中，需根据“是否需要编译时变量控制”选择 Less 条件（静态）或 CSS `@media`（动态），两者配合可覆盖绝大多数适配场景。
