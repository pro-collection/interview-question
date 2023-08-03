**关键词**：infer 关键字、infer 关键字作用

在 TypeScript 中，`infer` 是一个用于条件类型中的关键字。它的作用是从待推断的类型中提取特定的类型，并将其赋值给一个类型变量。这个类型变量可以在条件类型的 `true` 分支中使用。

通过使用 `infer` 关键字，我们可以实现一些高级的类型操作，比如从函数类型中提取参数类型、从数组类型中提取元素类型等。

以下是一个示例，展示了如何使用 `infer` 关键字提取函数参数的类型：

```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : never;

function foo(arg: number): void {
  // ...
}

type FooParam = ParamType<typeof foo>; // FooParam 的类型是 number
```

在上述示例中，我们定义了一个条件类型 `ParamType<T>`，它接受一个泛型参数 `T`。在 `extends` 条件语句中，我们检查泛型参数 `T` 是否可以赋值给一个函数类型，并使用 `infer`
关键字提取函数参数的类型并赋值给类型变量 `P`。如果不是函数类型，则返回 `never` 类型。

然后，我们定义了一个函数 `foo`，它接受一个 `number` 类型的参数。通过使用 `typeof foo`，我们获取函数 `foo` 的类型，并使用 `ParamType<typeof foo>`
提取函数参数的类型，赋值给类型变量 `FooParam`。在本例中，`FooParam` 的类型为 `number`。

因此，`infer` 是 TypeScript 中用于条件类型中的关键字，用于类型推断和提取特定类型的操作。
