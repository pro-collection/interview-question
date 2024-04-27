**关键词**：ts 类型配置

> 作者备注
> 这个问题很冷门， 没有价值， 当做科普即可

在 TypeScript 的 `tsconfig.json` 配置文件中，`types` 和 `typeRoots` 是两个与类型声明相关的选项，它们用于控制 TypeScript 编译器如何处理类型声明文件。这两个选项的主要区别在于它们控制的范围：

### typeRoots

`typeRoots` 选项指定了包含类型声明文件的目录列表。默认情况下，TypeScript 会查看所有以 `node_modules/@types` 结尾的目录。通过设置 `typeRoots`，你可以直接告诉 TypeScript 编译器去哪查找类型声明：

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./typings"]
  }
}
```

在这个例子中，我们指定了两个 `typeRoots`：默认的 `node_modules/@types` 和另外一个自定义的类型声明目录 `./typings`。

### types

`types` 选项允许你设置在项目中所使用到的类型声明文件列表。这个列表会限制编译器在 `typeRoots` 下查找的声明文件，意味着 `types` 中列出的类型声明会是项目中唯一可以引用的声明。如果没有设置 `types`，你可以使用存在于 `typeRoots` 下面的任何类型声明：

```json
{
  "compilerOptions": {
    "types": ["my-global-types"]
  }
}
```

在这个例子中，`types` 选项限制了项目只能使用名为 `my-global-types` 的类型声明。即使有其他的 `.d.ts` 文件在 `typeRoots` 指定的目录下，它们也无法在不修改这个列表的情况下被引用。

### 使用场景区别

- 当你有多个 `d.ts` 文件你想指定给 TypeScript 编译器，而不是每一个单独去处理时，使用 `typeRoots` 更为方便。
- `types` 用于控制引用的类型声明集，如果你是在限制或精心策划的设定下工作，这会很有帮助。

### 结合使用

在许多情况下，`typeRoots` 和 `types` 可以联合使用：

1. `typeRoots` 列表包含了所有声明文件的位置。
2. `types` 列表限制 TypeScript 可以引用特定集合的声明（其中未列出的声明则不可用）。

通过合理的配置这两个选项，你可以精确控制在 TypeScript 项目中使用的类型声明，帮助你避免类型定义的混乱。
