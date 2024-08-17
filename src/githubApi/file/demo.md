**关键词**：node 使用 es module

在低版本的 Node.js 中想要使用 ES Modules (ESM)，你主要有以下几种方法。但是，请注意，这些方法或许涉及到一定程度的实验性特性或依赖第三方工具，可能不会像在高版本 Node.js 中那样稳定。

### 1. 使用实验性支持

在 Node.js 版本 8.5.0 到 12.17.0 之间，你可以通过启用实验性支持来使用 ES Modules：

- 启动 Node.js 时使用 `--experimental-modules` 标志。
- 文件需要使用 `.mjs` 扩展名，或者在项目的 `package.json` 中设置 `"type": "module"`。

例如，通过命令行参数启用：

```bash
node --experimental-modules my-app.mjs
```

请注意，这种方法可能会遇到一些 API 兼容性或行为上的差异。

### 2. 使用 Babel

[Babel](https://babeljs.io/) 是一个广泛使用的 JavaScript 编译器，可以将 ES6+ 代码转换为向后兼容的 JavaScript 版本。你可以使用 Babel 来编译使用了 ES Modules 语法的代码，使其能在旧版本的 Node.js 上运行。

配置 Babel 进行转换通常需要以下几步：

1. 安装 Babel 相关的依赖：

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

2. 创建一个 `.babelrc` 配置文件或在 `package.json` 中添加 Babel 配置，指定预设（presets）：

```json
{
  "presets": ["@babel/preset-env"]
}
```

3. 使用 Babel CLI 编译你的代码：

```bash
npx babel src --out-dir dist
```

在这个例子中，Babel 会将 `src` 目录下的所有文件编译到 `dist` 目录下，转换后的代码将兼容更早版本的 JavaScript。

### 3. 使用 TypeScript

如果你的项目使用 TypeScript，你也可以通过 TypeScript 编译器来转换 ES Modules 语法到 CommonJS，从而允许代码在旧版本的 Node.js 上运行。TypeScript 编译设置中有一个 `module` 配置项，你可以将其设置为 `"CommonJS"` 来实现转换。

在 `tsconfig.json` 中配置如下：

```json
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

这样配置后，使用 tsc 编译你的 TypeScript 代码时，它会自动将 ES Modules 转换为 CommonJS 模块。
