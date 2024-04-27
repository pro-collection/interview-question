**关键词**：ts 类型配置

**关键点在 `types` 属性配置**

在 TypeScript 项目中导入 `node_modules` 中定义的全局包，并在你的 `src` 目录下使用它，通常遵循以下步骤：

1. 安装包：
   使用包管理器如 npm 或 yarn 来安装你需要的全局包。

   ```sh
   npm install <package-name>
   # 或者
   yarn add <package-name>
   ```

2. 类型声明：
   确保该全局包具有类型声明。如果该全局包包含自己的类型声明，则 TypeScript 应该能够自动找到它们。如果不包含，则可能需要安装对应的 DefinitelyTyped 声明文件。

   ```sh
   npm install @types/<package-name>
   # 或者，如果它是一个流行的库，一些库可能已经带有自己的类型定义。
   ```

3. 导入包：
   在 TypeScript 文件中，使用 `import` 语句导入全局包。

   ```typescript
   import * as PackageName from "<package-name>";
   // 或者
   import PackageName from "<package-name>";
   ```

4. tsconfig.json 配置：
   确保你的 `tsconfig.json` 文件配置得当，以便 TypeScript 能够找到 `node_modules` 中的声明文件。

   - 如果包是模块形式的，确保 `"moduleResolution"` 设置为 `"node"`。
   - 确保 `compilerOptions` 中的 `"types"` 和 `"typeRoots"` 属性没有配置错误。

5. 使用全局包：
   现在你可以在你的 `src` 目录中的任何文件里使用这个全局包。

记住，最好的做法是不要把包当成全局包来使用，即使它们是全局的。通过显式地导入所需的模块，可以有助于工具如 linters 和 bundlers 更好地追踪依赖关系，并可以在以后的代码分析和维护中发挥重要作用。

此外，全局变量或全局模块通常指的是在项目的多个部分中无需导入就可以直接使用的变量或模块。如果你确实需要将某些模块定义为全局可用，并且无法通过导入来使用，你可能需要更新你的 TypeScript 配置文件（`tsconfig.json`）来包括这些全局声明。但这通常不是一个推荐的做法，因为它可能会导致命名冲突和代码可维护性问题。
