**关键词**：ts infer

在 TypeScript 中，`infer` 是一个用于**类型推断**的关键字，通常与条件类型（`Conditional types`）配合使用，用于**从泛型类型中提取或推断出某个具体类型**。它的核心作用是“让 TypeScript 自动推导出我们需要的类型”，而无需需手动指定。

### 基本语法与作用

`infer` 只能在条件类型的 `extends` 子句中使用，语法格式如下：

```typescript
type 类型名<T> = T extends 某个类型<infer 待推断类型> ? 待推断类型 : 其他类型;
```

- `infer X` 表示“声明一个需要推断的类型变量 `X`”
- TypeScript 会自动分析 `T` 的结构，推导出 `X` 的具体类型

### 典型使用场景

#### 1. 提取函数的返回值类型

最常见的场景之一：从函数类型中提取其返回值类型。

```typescript
// 定义一个条件类型，提取函数的返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 使用示例
function getUser() {
  return { name: "张三", age: 20 };
}

// 推断 getUser 函数的返回值类型
type User = ReturnType<typeof getUser>;
// User 的类型为 { name: string; age: number }
```

- `T extends (...args: any[]) => infer R` 表示：如果 `T` 是一个函数，就推断其返回值类型为 `R`
- 最终 `User` 被推断为函数 `getUser` 的返回值类型

#### 2. 提取函数的参数类型

类似地，可以提取函数的参数类型（单个参数或参数列表）。

```typescript
// 提取单个参数类型
type ParamType<T> = T extends (param: infer P) => any ? P : never;

// 提取参数列表类型（返回元组）
type ParamsType<T> = T extends (...args: infer P) => any ? P : never;

// 使用示例
function sum(a: number, b: string): boolean {
  return a + Number(b) > 10;
}

type SumParam = ParamType<typeof sum>; // 错误！因为函数有多个参数，这里会返回 never
type SumParams = ParamsType<typeof sum>; // [number, string]（参数列表组成的元组）
type SumReturn = ReturnType<typeof sum>; // boolean（返回值类型）
```

#### 3. 提取数组的元素类型

从数组类型中推断出元素的类型。

```typescript
// 提取数组元素类型
type ArrayItem<T> = T extends Array<infer Item> ? Item : T;

// 使用示例
type NumberItem = ArrayItem<number[]>; // number
type StringItem = ArrayItem<string[]>; // string
type UserItem = ArrayItem<{ name: string }[]>; // { name: string }
type Primitive = ArrayItem<boolean>; // boolean（非数组类型则返回自身）
```

#### 4. 提取 Promise 的 resolve 类型

从 `Promise` 类型中推断出其最终解析（resolve）的类型。

```typescript
// 提取 Promise 解析的类型
type PromiseResolve<T> = T extends Promise<infer R> ? R : T;

// 使用示例
type Resolve1 = PromiseResolve<Promise<string>>; // string
type Resolve2 = PromiseResolve<Promise<{ id: number }>>; // { id: number }
type Resolve3 = PromiseResolve<number>; // number（非 Promise 类型则返回自身）
```

#### 5. 嵌套推断（复杂结构）

`infer` 支持多层嵌套推断，可用于复杂类型结构的提取。

```typescript
// 从 { data: T } 结构中提取 T
type ExtractData<T> = T extends { data: infer D } ? D : T;

// 嵌套推断：从 Promise<{ data: T }> 中提取 T
type ExtractPromiseData<T> = T extends Promise<{ data: infer D }> ? D : T;

// 使用示例
type Data1 = ExtractData<{ data: { name: string } }>; // { name: string }
type Data2 = ExtractPromiseData<Promise<{ data: number[] }>>; // number[]
```

### 注意事项

1. **只能在条件类型中使用**：`infer` 不能单独使用，必须放在 `T extends ...` 的子句中。
2. **推断的不确定性**：如果 TypeScript 无法明确推断类型（如多种可能的匹配），会返回 `never` 或联合类型。

   ```typescript
   type Ambiguous<T> = T extends (a: infer A, b: infer A) => any ? A : never;
   type Test = Ambiguous<(x: number, y: string) => void>; // number | string（联合类型）
   ```

3. **与内置工具类型的关系**：TypeScript 内置的很多工具类型（如 `ReturnType`、`Parameters`）都是基于 `infer` 实现的，例如：
   ```typescript
   // TypeScript 内置的 Parameters 实现
   type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
   ```

### 总结

`infer` 是 TypeScript 类型系统中用于**自动推断类型**的强大工具，核心价值在于：

- 从复杂类型（如函数、数组、Promise 等）中“提取”我们需要的具体类型
- 减少手动编写重复类型的工作量，提升类型定义的灵活性和可维护性

它最常见的应用场景包括提取函数参数/返回值、数组元素、Promise 解析值等，是编写高级类型工具的基础。
