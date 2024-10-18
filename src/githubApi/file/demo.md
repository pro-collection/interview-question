**关键词**：主题色切换

在前端处理一个页面有多个主题色可供选择的场景，可以通过以下几种方式实现：

**一、使用 CSS 变量**

1. **定义 CSS 变量**：
   - 在 CSS 中，可以使用`--`来定义变量。例如，可以定义一些代表主题色的变量：

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}
```

- 这里定义了两个变量`--primary-color`和`--secondary-color`，分别代表主色和辅助色。

2. **在 CSS 中使用变量**：
   - 然后在 CSS 规则中使用这些变量：

```css
.button {
  background-color: var(--primary-color);
  color: white;
}
```

- 在这个例子中，`.button`类的按钮背景颜色使用了`--primary-color`变量定义的颜色。

3. **在 JavaScript 中切换主题**：
   - 在 JavaScript 中，可以通过修改`document.documentElement.style`来改变 CSS 变量的值，从而切换主题色：

```javascript
const setTheme = (theme) => {
  document.documentElement.style.setProperty("--primary-color", theme.primaryColor);
  document.documentElement.style.setProperty("--secondary-color", theme.secondaryColor);
};

const theme1 = {
  primaryColor: "#007bff",
  secondaryColor: "#6c757d",
};

const theme2 = {
  primaryColor: "#ff5733",
  secondaryColor: "#999999",
};

// 切换到主题 1
setTheme(theme1);

// 切换到主题 2
setTheme(theme2);
```

- 在这个例子中，`setTheme`函数接受一个主题对象，然后通过`document.documentElement.style.setProperty`方法修改 CSS 变量的值。可以定义多个主题对象，然后根据用户的选择切换主题。

**二、使用预处理器（如 Sass、Less）**

1. **定义变量和混合**：
   - 在 Sass 或 Less 中，可以定义变量来代表主题色。例如，在 Sass 中：

```scss
$primary-color: #007bff;
$secondary-color: #6c757d;

.button {
  background-color: $primary-color;
  color: white;
}
```

- 这里定义了变量`$primary-color`和`$secondary-color`，并在`.button`类中使用了这些变量。

2. **创建多个主题文件**：

   - 可以创建多个主题文件，每个文件定义不同的变量值。例如，创建`theme1.scss`和`theme2.scss`两个文件，分别定义不同的主题色。

3. **在 JavaScript 中切换主题文件**：
   - 在 HTML 中，可以通过`<link>`标签引入不同的 CSS 文件来切换主题。在 JavaScript 中，可以动态地修改`<link>`标签的`href`属性来切换主题文件：

```javascript
const setTheme = (theme) => {
  const link = document.getElementById("theme-link");
  link.href = theme.href;
};

const theme1 = {
  href: "theme1.css",
};

const theme2 = {
  href: "theme2.css",
};

// 切换到主题 1
setTheme(theme1);

// 切换到主题 2
setTheme(theme2);
```

- 在这个例子中，`setTheme`函数接受一个主题对象，然后通过修改`<link>`标签的`href`属性来切换主题文件。可以定义多个主题对象，每个对象包含不同的主题文件路径。

**三、使用 JavaScript 动态修改样式**

1. **定义样式类**：
   - 在 CSS 中定义多个样式类，每个类代表一种主题。例如：

```css
.theme1 {
  background-color: #007bff;
  color: white;
}

.theme2 {
  background-color: #ff5733;
  color: white;
}
```

- 这里定义了两个样式类`.theme1`和`.theme2`，分别代表不同的主题。

2. **在 JavaScript 中切换样式类**：
   - 在 JavaScript 中，可以通过修改元素的`classList`属性来切换样式类，从而切换主题：

```javascript
const setTheme = (theme) => {
  const element = document.getElementById("my-element");
  element.classList.remove("theme1", "theme2");
  element.classList.add(theme);
};

// 切换到主题 1
setTheme("theme1");

// 切换到主题 2
setTheme("theme2");
```

- 在这个例子中，`setTheme`函数接受一个主题类名作为参数，然后通过修改元素的`classList`属性来切换主题。首先移除当前元素的所有主题类名，然后添加指定的主题类名。
