**关键词**：代码清理

清理源码中未被应用的 JavaScript (JS)、TypeScript (TS) 和 CSS 代码的关键在于合理利用工具和策略，来识别和移除这些废弃的代码。下面是一份指南，帮助你高效完成这一任务：

### 对于 JavaScript 和 TypeScript

#### 1. 使用 ESLint

- **初始化 ESLint**：如果你还没有使用 ESLint，可以通过`npx eslint --init`命令来初始化配置。
- **配置规则**：确保在`.eslintrc`配置文件中启用了`no-unused-vars`规则，以识别未使用的变量和函数。

```json
{
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

- **使用 ESLint 的 --fix 选项**: 虽然 ESLint 主要用于识别问题，但它的 --fix 选项可以自动修复一些问题，包括删除未使用的变量等。不过，这种方式相对保守，无法删除大块的未使用代码

#### 2. 使用 TypeScript 编译器选项

- 对于 TypeScript 项目，可以在`tsconfig.json`文件中启用`noUnusedLocals`和`noUnusedParameters`选项，以识别未使用的本地变量和函数参数。

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

#### 3. 利用 Webpack 的 Tree Shaking

- 确保在生产模式下使用 Webpack，它自带 Tree Shaking 功能，可以去除死代码（未被使用的代码）。
- 使用 ES6 模块语法（即`import`和`export`），因为 Tree Shaking 仅支持静态导入。

### 对于 CSS

#### 1. 使用 PurgeCSS

- **PurgeCSS**分析你的内容和 CSS 文件，去除不匹配的选择器。非常适用于清楚在 HTML 或 JS 文件中未引用的 CSS 代码。
- 可以通过 Webpack、Gulp 或 PostCSS 等多种方式与 PurgeCSS 集成。

```bash
npm install purgecss
```

使用 PurgeCSS 时，配置你的内容文件路径（如 HTML 或 JSX 文件），它会扫描这些文件以确定哪些 CSS 选择器被使用：

```javascript
// 一个基本的PurgeCSS配置例子
new PurgecssPlugin({
  paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
});
```

### 使用 Codemods

Codemods 是 Facebook 提出的一种工具，允许你对代码库进行大规模的自动化重构。通过编写特定的脚本，你可以自定义删除或修改未被调用的代码的逻辑。例如，使用 `jscodeshift` 工具可以配合具体规则进行代码修改。

### 注意事项

- **测试**：自动删除代码后，务必执行完整的测试套件，确认改动不会影响现有功能。
- **版本控制**：在进行删除操作之前，确保代码已经提交到版本控制系统，以便必要时可以恢复。
- **逐步执行**：尤其是在较大或复杂的项目中，建议分步骤、逐渐移除未使用的代码，每次删除后都进行测试和评估。

使用这些策略和工具可以帮助自动化清理未使用的代码，但是请注意，完全自动化的过程可能会有风险，依然需要人工审核和测试以确保代码的质量和应用的稳定性。
