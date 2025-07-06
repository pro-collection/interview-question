**关键词**：约定是路由

约定式路由（Convention over Configuration，CoC）是现代前端框架（如 Next.js、Nuxt.js、VitePress 等）广泛采用的路由实现方式，其核心思想是**根据文件目录结构自动生成路由配置**，无需手动编写冗长的路由表。下面介绍其实现原理和关键技术：

### **一、核心原理**

约定式路由通过以下步骤工作：

1. **文件系统扫描**：框架在构建或运行时遍历指定目录（如`pages/`），获取所有文件和文件夹结构。
2. **路径映射规则**：将文件路径转换为路由路径，例如：
   - `pages/index.js` → `/`
   - `pages/posts/[id].js` → `/posts/:id`（动态路由）
3. **路由配置生成**：根据映射规则生成路由配置对象（如 React Router 或 Vue Router 所需的格式）。
4. **运行时匹配**：在用户访问时，根据 URL 匹配对应的组件。

### **二、关键实现细节**

#### **1. 文件系统扫描与路径解析**

框架使用 Node.js 的`fs`模块读取文件目录，并递归生成路径树。例如：

```javascript
// 简化的文件扫描逻辑
import fs from "fs";
import path from "path";

function scanPages(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    const routePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // 递归扫描子目录
      routes.push(...scanPages(filePath, routePath));
    } else {
      // 处理文件（如.js、.vue）
      routes.push({
        file: filePath,
        path: convertToRoutePath(routePath), // 转换为路由路径
      });
    }
  }

  return routes;
}

// 路径转换示例：pages/posts/[id].js → /posts/:id
function convertToRoutePath(filePath) {
  // 移除扩展名
  let route = filePath.replace(/\.(js|jsx|ts|tsx|vue)$/, "");

  // 处理动态路由：[id] → :id
  route = route.replace(/\[([^\]]+)\]/g, ":$1");

  // 处理索引文件：index → /
  route = route.replace(/\/index$/, "");

  // 确保以斜杠开头
  return route.startsWith("/") ? route : `/${route}`;
}
```

#### **2. 动态路由与嵌套路由**

- **动态路由**：使用方括号`[]`表示参数，例如：

  - `pages/users/[id].js` → 匹配`/users/123`
  - `pages/[...all].js` → 匹配所有路径（通配符路由）

- **嵌套路由**：通过目录结构实现，例如：
  ```
  pages/
    posts/
      index.js    → /posts
      [id]/
        index.js  → /posts/:id
        comments/
          index.js → /posts/:id/comments
  ```

#### **3. 路由配置生成**

将扫描结果转换为框架所需的路由配置格式。例如，为 React Router 生成配置：

```javascript
// 生成React Router配置
function generateReactRoutes(pages) {
  return pages.map((page) => ({
    path: page.path,
    element: () => import(`./pages/${page.file}`), // 动态导入组件
  }));
}

// 使用生成的路由配置
const router = createBrowserRouter(generateReactRoutes(pages));
```

#### **4. 特殊文件处理**

- **布局文件**：如`_layout.js`或`layout.vue`，用于包裹子路由：

  ```
  pages/
    _layout.js    → 所有页面共用布局
    index.js      → 使用_layout.js的布局
  ```

- **错误页面**：如`404.js`或`error.vue`，处理未匹配的路由：
  ```javascript
  // 404页面自动映射到未匹配的路由
  {
    path: '*',
    element: <NotFoundPage />
  }
  ```

#### **5. 运行时优化**

- **按需加载**：使用动态导入（`import()`）实现组件懒加载。
- **路由预取**：在用户可能访问的链接上预加载组件（如 Next.js 的`next/link`）。
- **缓存机制**：开发环境中缓存扫描结果，仅在文件变化时重新生成路由。

### **三、不同框架的实现差异**

| 框架          | 约定规则                            | 实现特点                            |
| ------------- | ----------------------------------- | ----------------------------------- |
| **Next.js**   | `pages/`目录，支持`[param]`动态路由 | 服务端渲染（SSR）支持、自动代码分割 |
| **Nuxt.js**   | `pages/`目录，支持`_param`动态路由  | 基于 Vue Router，支持中间件         |
| **VitePress** | `docs/`目录，Markdown 文件自动转换  | 静态网站生成（SSG），支持 Vue 组件  |

### **四、优缺点**

#### **优点**

- **减少样板代码**：无需手动维护路由配置。
- **提高一致性**：文件结构即路由结构，直观易懂。
- **易于扩展**：新增页面只需添加文件，无需修改路由表。

#### **缺点**

- **灵活性受限**：复杂路由模式可能需要额外配置。
- **学习成本**：需要熟悉框架的约定规则。
- **性能开销**：大型项目中扫描文件系统可能影响构建速度。

### **五、手动实现简易版约定式路由**

以下是一个简化的实现示例，用于理解核心逻辑：

```javascript
// 简易约定式路由实现
import fs from "fs";
import path from "path";
import { createRouter, createWebHistory } from "vue-router";

// 扫描pages目录
const pagesDir = path.resolve(__dirname, "pages");
const routes = fs
  .readdirSync(pagesDir)
  .filter((file) => file.endsWith(".vue"))
  .map((file) => {
    const name = file.replace(/\.vue$/, "");
    const path = name === "index" ? "/" : `/${name}`;

    return {
      path,
      component: () => import(`./pages/${file}`),
    };
  });

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### **六、总结**

约定式路由通过**文件系统映射**和**自动化配置**，极大简化了路由管理。其核心在于扫描文件、转换路径、生成配置和运行时匹配。现代框架在此基础上添加了动态路由、嵌套路由、懒加载等高级特性，提升了开发体验和应用性能。
