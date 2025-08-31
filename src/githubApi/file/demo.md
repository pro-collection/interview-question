**关键词**：ts RetrunType

在 TypeScript 中，`ReturnType` 是一个**内置的工具类型**，用于**提取函数的返回值类型**。它可以自动推断并返回函数的返回值类型，无需手动手动编写重复的类型定义，是处理函数类型时非常实用的工具。

### **作用**

- 从给定的函数类型中**提取其返回值的类型**，避免手动定义与函数返回值相同的类型，减少冗余代码。
- 当函数返回值类型修改时，通过 `ReturnType` 提取的类型会自动同步更新，保证类型一致性。

### **用法**

#### 基础语法

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

- 接收一个泛型参数 `T`，该参数必须是一个函数类型（通过 `extends (...args: any) => any` 约束）。
- 使用 `infer R` 推断函数的返回值类型 `R`，最终返回 `R`。

#### 实际示例

1. **提取普通函数的返回值类型**

   ```typescript
   // 定义一个返回对象的函数
   function getUser() {
     return { name: "张三", age: 20, isStudent: false };
   }

   // 提取函数返回值类型
   type User = ReturnType<typeof getUser>;
   // User 的类型为：{ name: string; age: number; isStudent: boolean }
   ```

2. **提取箭头函数的返回值类型**

   ```typescript
   const calculate = (a: number, b: number) => a + b;

   // 提取返回值类型（number）
   type Result = ReturnType<typeof calculate>; // Result = number
   ```

3. **提取泛型函数的返回值类型**

   ```typescript
   function createArray<T>(length: number, value: T): T[] {
     return Array(length).fill(value);
   }

   // 提取特定调用的返回值类型
   type StringArray = ReturnType<typeof createArray<string>>; // StringArray = string[]
   ```

4. **在类型定义中复用**

   ```typescript
   // 定义一个回调函数类型
   type FetchData = (url: string) => Promise<{ code: number; data: string }>;

   // 提取该函数返回的 Promise 内部类型
   type FetchResult = ReturnType<FetchData>; // FetchResult = Promise<{ code: number; data: string }>

   // 进一步提取 Promise 的 resolve 类型（结合 Awaited）
   type Data = Awaited<FetchResult>; // Data = { code: number; data: string }
   ```

### **注意事项**

1. **仅支持函数类型**：`ReturnType` 的参数必须是函数类型，否则会报错。

   ```typescript
   type Invalid = ReturnType<string>; // 报错：string 不是函数类型
   ```

2. **与 `typeof` 配合使用**：当需要提取具体函数的返回值类型时，需用 `typeof` 获取该函数的类型（如 `typeof getUser`）。

3. **内置工具类型**：`ReturnType` 是 TypeScript 内置的，无需手动定义，直接使用即可。

### **总结**

`ReturnType` 的核心价值是**自动同步函数返回值类型**，尤其适合以下场景：

- 函数返回值类型复杂，避免手动重复定义。
- 函数返回值可能频繁修改，通过 `ReturnType` 确保依赖其类型的地方自动更新。
- 在类型层面复用函数返回值结构，提升代码可维护性。
