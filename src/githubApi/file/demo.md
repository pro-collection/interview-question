**关键词**：node 使用 es module

是的，从 Node.js 的较新版本开始，你可以在 Node.js 中使用 ES Modules（ESM）。

### 如何启用 ES Modules

要在 Node.js 中使用 ES Modules，你可以采取以下几种方式之一：

1. **使用 `.mjs` 扩展名**:
   你可以将你的模块文件保存为 `.mjs` 文件。Node.js 会将 `.mjs` 文件自动识别为 ES Modules。你可以直接使用 `import` 和 `export` 语法。

2. **在 `package.json` 中设置 `"type": "module"`**:
   如果你更倾向于使用 `.js` 扩展名，你可以在 `package.json` 文件中添加 `"type": "module"`。这会使得 Node.js 将`.js` 文件当作 ES Modules 来处理。注意，这样设置后，如果你需要使用 CommonJS 模块，那么 CommonJS 文件必须采用 `.cjs` 扩展名。

```json
{
  "type": "module"
}
```

这样，你的 `.js` 文件中就可以使用 `import` 和 `export` 语句了。

### 补充知识 - node 是从什么时候开始支持 esm 的？

Node.js 对 ES Modules (ESM) 的支持始于 Node.js 8.5.0（发布于 2017 年 9 月），但当时这一特性处于实验阶段，使用时需要通过 `--experimental-modules` 标志来启用。

Node.js 12 版本（具体地，12.17.0 及更高版本）中，ES Module (ESM) 支持进入了稳定状态，使得开发者可以在不需要任何标志的情况下直接使用 ESM。

随后的 Node.js 版本继续改进和增强对 ESM 的支持，包括改善与 CommonJS 模块互操作性等方面，从而提供更加稳定和完整的模块系统支持。

因此，如果您想使用不需要任何实验性标志的 ESM，应该使用 Node.js 12.17.0 或更高的版本。但要获得最佳的支持和最新的功能，推荐使用 Node.js 的最新稳定版本。

### 注意事项

- 当使用 ES Modules 时，`import` 语句必须使用完整的文件路径，包括文件扩展名，或者指向存在 `package.json` 的模块。这与 CommonJS 的 `require()` 有所不同，后者可以省略文件扩展名。
- 在使用 ES Modules 时，一些 Node.js 的全局变量和方法有所不同，比如，代替 `__dirname` 和 `__filename`，你可能需要通过 `import.meta.url` 来获取当前文件的 URL。
- 如果你的项目中同时使用了 ES Modules 和 CommonJS 模块，需要注意模块间的导入导出兼容性问题。

截止到我的知识更新日期（2023 年 4 月），Node.js 已经良好地支持 ES Modules，并且社区和生态系统也在不断地改进和适配这一新特性。实际使用中，应当关注你所使用的 Node.js 版本文档，查看关于 ES Modules 的最新支持情况和最佳实践。
