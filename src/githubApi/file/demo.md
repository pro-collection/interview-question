**关键词**：webpack ts 编写配置文件

要使用 [Typescript](https://www.typescriptlang.org/) 来编写 webpack 配置，你需要先安装必要的依赖，比如 Typescript 以及其相应的类型声明，类型声明可以从 [DefinitelyTyped](https://definitelytyped.org/) 项目中获取，依赖安装如下所示：

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# 如果使用版本低于 v4.7.0 的 webpack-dev-server，还需要安装以下依赖
npm install --save-dev @types/webpack-dev-server
```

完成依赖安装后便可以开始编写配置文件，示例如下：

**webpack.config.ts**

```typescript
import * as path from "path";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./foo.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "foo.bundle.js",
  },
};

export default config;
```

该示例需要 typescript 版本在 2.7 及以上，并在 `tsconfig.json` 文件的 compilerOptions 中添加 `esModuleInterop` 和 `allowSyntheticDefaultImports` 两个配置项。

值得注意的是你需要确保 `tsconfig.json` 的 `compilerOptions` 中 `module` 选项的值为 `commonjs`,否则 webpack 的运行会失败报错，因为 `ts-node` 不支持 `commonjs` 以外的其他模块规范。

你可以通过三个途径来完成 module 的设置：

- 直接修改 `tsconfig.json` 文件
- 修改 `tsconfig.json` 并且添加 `ts-node` 的设置。
- 使用 `tsconfig-paths`

**第一种方法**就是打开你的 `tsconfig.json` 文件，找到 `compilerOptions` 的配置，然后设置 `target` 和 `module` 的选项分别为 `"ES5"` 和 `"CommonJs"` (在 `target` 设置为 `es5` 时你也可以不显示编写 `module` 配置)。

**第二种方法** 就是添加 ts-node 设置：

你可以为 `tsc` 保持 `"module": "ESNext"`配置，如果你是用 webpack 或者其他构建工具的话，为 ts-node 设置一个重载（override）。[ts-node 配置项](https://typestrong.org/ts-node/docs/imports/)

```json
{
  "compilerOptions": {
    "module": "ESNext"
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

**第三种方法**需要先安装 `tsconfig-paths` 这个 npm 包，如下所示：

```bash
npm install --save-dev tsconfig-paths
```

安装后你可以为 webpack 配置创建一个单独的 TypeScript 配置文件，示例如下：

**tsconfig-for-webpack-config.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

**提示**

ts-node 可以根据 `tsconfig-paths` 提供的环境变量 `process.env.TS_NODE_PROJECT` 来找到 `tsconfig.json` 文件路径。

`process.env.TS_NODE_PROJECT` 变量的设置如下所示:

**package.json**

```json
{
  "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json. webpack"
  }
}
```

之所以要添加 `cross-env`，是因为我们在直接使用 `TS_NODE_PROJECT` 时遇到过 `"TS_NODE_PROJECT" unrecognized command` 报错的反馈，添加 `cross-env` 之后该问题也似乎得到了解决，你可以查看[这个 issue](https://github.com/webpack/webpack.js.org/issues/2733)获取到关于该问题的更多信息。

**参考文档**

- https://www.webpackjs.com/configuration/configuration-languages/#typescript
