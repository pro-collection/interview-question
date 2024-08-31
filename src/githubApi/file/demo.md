**关键词**：TS 类型

在 TypeScript 中，`any`、`never`、`unknown`、`null` & `undefined` 以及 `void` 都是类型系统的一部分，各自具有不同的用途和含义，下面是它们的主要区别：

### `any`

- **含义**：`any` 类型表示任何 JavaScript 值都可以赋值给它。使用 `any` 类型，可以绕过 TypeScript 的静态类型检查。
- **用途**：适用于你不想给变量设置具体类型的情况，或者在迁移旧 JavaScript 项目到 TypeScript 时临时使用。
- **示例**：
  ```typescript
  let anything: any = "Hello world";
  anything = 25; // ok
  anything = false; // ok
  ```

### `never`

- **含义**：`never` 类型表示永远不存在的值的类型。例如，`never` 类型是那些总是抛出异常或根本就不会有返回值的函数表达式或箭头函数的返回类型。
- **用途**：`never` 用于表示那些总是异常或无限循环的函数返回类型，或者用在永远不可能有匹配结果的类型守卫条件。
- **示例**：
  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

### `unknown`

- **含义**：`unknown` 类型表示任何值。它类似于 `any`，但是更安全，因为对 `unknown` 类型的值执行大多数操作都是不允许的，直到我们通过类型检查缩小了该值的类型。
- **用途**：当我们不确定将要使用的变量的类型时可以使用 `unknown` 类型，它是 `any` 类型的类型安全等价物。
- **示例**：
  ```typescript
  let uncertainValue: unknown = 4;
  uncertainValue = "maybe a string instead";
  // TypeScript会阻止你执行不安全的操作
  // console.log(uncertainValue.length); // Error
  ```

### `null` & `undefined`

- **含义**：`null` 和 `undefined` 在 TypeScript 里分别有各自的类型，分别叫做 `null` 和 `undefined`。`null` 是一个表示无值的特殊值，而 `undefined` 表示未定义。
- **用途**：`null` 和 `undefined` 分别用于表示变量的“空”或“未定义”状态。
- **示例**：
  ```typescript
  let empty: null = null;
  let notDefined: undefined = undefined;
  ```

### `void`

- **含义**：`void` 类型与 `any`、`never` 和 `unknown` 不同，它表示没有任何类型。在函数中使用 `void` 类型，表示该函数没有返回值。
- **用途**：主要用在没有返回值的函数的返回类型注解上。
- **示例**：
  ```typescript
  function warnUser(): void {
    console.log("This is a warning message");
  }
  ```

总结如下：

- `any` 允许你对值执行任何操作，但是使用它会放弃类型检查的保护。
- `never` 用于函数永远不会正常结束的返回类型。
- `unknown` 用在不确定类型时，比 `any` 更安全因为它不允许你随便操作这个值。
- `null` 和 `undefined` 用于表示没有值或值未定义。
- `void` 用于没有返回任何值的函数。
