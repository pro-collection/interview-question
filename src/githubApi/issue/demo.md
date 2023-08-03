**关键词**：extends 类型继承、extends 条件类型定义

在 TypeScript 中，`extends` 关键字不仅仅用于类之间的继承关系，还可以用于条件类型的定义。

条件类型是一种在类型系统中根据条件进行推断的方式。通过使用 `extends` 关键字，可以根据给定的条件选择不同的类型。

以下是一个使用 `extends` 条件语句定义条件类型的示例：

```typescript
type TypeName<T> =
  T extends string ? "string" :
    T extends number ? "number" :
      T extends boolean ? "boolean" :
        "unknown";

let type1: TypeName<string>;  // 类型为 "string"
let type2: TypeName<number>;  // 类型为 "number"
let type3: TypeName<boolean>; // 类型为 "boolean"
let type4: TypeName<object>;  // 类型为 "unknown"
```

在上面的例子中，我们定义了一个条件类型 `TypeName`，它根据给定的泛型类型 `T` 来选择不同的类型。如果 `T` 是 `string` 类型，那么返回值类型为 `"string"`；如果 `T` 是 `number`
类型，那么返回值类型为 `"number"`；如果 `T` 是 `boolean` 类型，那么返回值类型为 `"boolean"`；否则返回值类型为 `"unknown"`。

通过上述定义，我们可以根据不同的类型获取它们的类型名称。例如，`type1` 的类型为 `"string"`，`type2` 的类型为 `"number"`，依此类推。

注意，条件类型的定义中可以使用嵌套的 `extends` 关键字，以支持更复杂的条件判断。
