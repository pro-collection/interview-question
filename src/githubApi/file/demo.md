**关键词**：eslint 插件实现

### 1. 项目结构

假设你的项目根目录为 `your-project`，在项目中创建插件相关的目录结构：

```
your-project/
├── .eslintrc.js
├── src/
│   └── ...
├── eslint-plugin-local/
│   ├── lib/
│   │   ├── rules/
│   │   │   └── uppercase-snake-case.js
│   │   └── index.js
```

### 2. 编写插件代码

#### 规则组件（`eslint-plugin-local/lib/rules/uppercase-snake-case.js`）

```javascript
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce uppercase snake case naming convention",
      category: "Stylistic Issues",
      recommended: false,
    },
    schema: [],
    messages: {
      invalidNaming: 'Variable name "{{name}}" should be in uppercase snake case.',
    },
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        const { id } = node;
        if (id.type === "Identifier") {
          const name = id.name;
          const isUppercaseSnakeCase = /^[A-Z_]+$/.test(name);
          if (!isUppercaseSnakeCase) {
            context.report({
              node: id,
              messageId: "invalidNaming",
              data: {
                name,
              },
            });
          }
        }
      },
    };
  },
};
```

#### 插件入口文件（`eslint-plugin-local/lib/index.js`）

```javascript
module.exports = {
  rules: {
    "uppercase-snake-case": require("./rules/uppercase-snake-case"),
  },
  configs: {
    recommended: {
      rules: {
        "eslint-plugin-local/uppercase-snake-case": "error",
      },
    },
  },
};
```

### 3. 配置 ESLint

在项目根目录下的 `.eslintrc.js` 文件中进行配置，让 ESLint 能够识别并使用本地插件：

```javascript
module.exports = {
  // 告诉 ESLint 从哪里查找插件
  plugins: [
    {
      rules: require("./eslint-plugin-local/lib/index.js").rules,
      configs: require("./eslint-plugin-local/lib/index.js").configs,
    },
  ],
  extends: ["plugin:eslint-plugin-local/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
};
```

#### 代码解释：

- `plugins` 数组中的对象用于直接引入本地插件的规则和配置。
- `extends` 用于应用插件中定义的推荐配置。

### 4. 运行 ESLint

确保你的项目已经安装了 ESLint，然后在项目根目录下运行 ESLint 检查：

```bash
npx eslint src
```

这里的 `src` 是你的项目代码所在目录，你可以根据实际情况修改为其他目录。

通过以上步骤，你就可以在自己的项目中使用本地编写的 ESLint 插件了。当你修改插件代码后，再次运行 ESLint 检查，就能看到最新的检查结果。
