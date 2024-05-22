**关键词**：主题色切换

页面主题色切换通常涉及到修改网页中的颜色方案，以提供不同的视觉体验，例如从明亮模式切换到暗黑模式。实现这一功能，可以通过配合使用 CSS、JavaScript 和本地存储来进行。以下是实施页面主题色切换的几种方法：

### 使用 CSS 自定义属性

1. 定义一套主题变量：

```css
:root {
  --primary-color: #5b88bd; /* 明亮主题色 */
  --text-color: #000; /* 明亮主题文本颜色 */
}

[data-theme="dark"] {
  --primary-color: #1e2a34; /* 暗黑主题色 */
  --text-color: #ccc; /* 暗黑主题文本颜色 */
}
```

2. 应用自定义属性到 CSS 规则中：

```css
body {
  background-color: var(--primary-color);
  color: var(--text-color);
}
```

3. 使用 JavaScript 动态切换主题：

```javascript
function toggleTheme() {
  const root = document.documentElement;
  if (root.dataset.theme === "dark") {
    root.dataset.theme = "light";
  } else {
    root.dataset.theme = "dark";
  }
}
```

### 使用 CSS 类切换

1. 为每个主题创建不同的 CSS 类：

```css
.light-theme {
  --primary-color: #5b88bd;
  --text-color: #000;
}

.dark-theme {
  --primary-color: #1e2a34;
  --text-color: #ccc;
}
```

2. 手动切换 CSS 类：

```javascript
function toggleTheme() {
  const bodyClass = document.body.classList;
  if (bodyClass.contains("dark-theme")) {
    bodyClass.replace("dark-theme", "light-theme");
  } else {
    bodyClass.replace("light-theme", "dark-theme");
  }
}
```

### 使用 LocalStorage 记录用户主题偏好

```javascript
// 当用户切换主题时
function saveThemePreference() {
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

// 页面加载时应用用户偏好
function applyThemePreference() {
  const preferredTheme = localStorage.getItem("theme");

  if (preferredTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

applyThemePreference();
```

### 使用媒体查询自动应用暗黑模式

某些现代浏览器支持 CSS 媒体查询`prefers-color-scheme`。你可以使用这个特性来自动根据用户的系统设置应用暗黑模式或明亮模式，而无须 JavaScript：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #1e2a34; /* 暗黑主题色 */
    --text-color: #ccc; /* 暗黑主题文本颜色 */
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --primary-color: #5b88bd; /* 明亮主题色 */
    --text-color: #000; /* 明亮主题文本颜色 */
  }
}
```

通过以上方法，开发人员能够为前端页面提供灵活的主题色切换功能，从而增强用户体验。
