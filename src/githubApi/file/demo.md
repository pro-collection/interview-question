**关键词**：ts 内置类型方法、ts 内置工具类型

TypeScript 提供了许多内置的类型方法和工具类型，用于处理和操作类型。以下是其中一些常用的内置类型方法：

### 分类

1. **Utility Types（工具类型）**：
    - **Partial\<T>**: 将类型 T 的所有属性变为可选。
    - **Required\<T>**: 将类型 T 的所有属性变为必选。
    - **Readonly\<T>**: 将类型 T 的所有属性变为只读。
    - **Record\<K, T>**: 创建一个具有指定键类型 K 和值类型 T 的新对象类型。
    - **Pick\<T, K>**: 从类型 T 中选择指定属性 K 形成新类型。
    - **Omit\<T, K>**: 从类型 T 中排除指定属性 K 形成新类型。
    - **Exclude\<T, U>**: 从类型 T 中排除可以赋值给类型 U 的类型。
    - **Extract\<T, U>**: 从类型 T 中提取可以赋值给类型 U 的类型。
    - **NonNullable\<T>**: 从类型 T 中排除 null 和 undefined 类型。
    - **ReturnType\<T>**: 获取函数类型 T 的返回类型。
    - **Parameters\<T>**: 获取函数类型 T 的参数类型组成的元组类型。

2. **条件判定类型**：
    - **Conditional Types（条件类型）**: 根据类型关系进行条件判断生成不同的类型。
    - **Distribute Conditional Types（分布式条件类型）**: 分发条件类型，允许条件类型在联合类型上进行分发。

3. **Mapped Types（映射类型）**：根据已有类型创建新类型，通过映射类型可以生成新的类型结构。

4. **Template Literal Types（模板文字类型）**：使用字符串模板创建新类型。

5. **类型推断关键字**：
   - **keyof关键字**：关键字允许在泛型条件类型中推断类型变量。
   - **instanceof**：运算符用于检查对象是否是特定类的实例。
   - **in**：用于检查对象是否具有特定属性。
   - **type guards**：类型守卫是自定义的函数或条件语句，用于在代码块内缩小变量的类型范围。
   - **as**：用于类型断言，允许将一个变量断言为特定的类型。
   

这些工具类型和方法使得在 TypeScript 中能够更灵活地操作和利用类型系统，增强了类型的安全性和可读性。

### Utility Types（工具类型）介绍

当涉及到 TypeScript 中的这些工具类型时，它们都是为了便捷地处理和操作类型而设计的。让我为你逐个介绍并提供代码示例：

#### 1. Partial\<T>

这个类型将类型 `T` 的所有属性变为可选。

示例：

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
// PartialUser 的类型为 { name?: string; age?: number; }

const partialUserData: PartialUser = {}; // 全部属性变为可选
```

#### 2. Required\<T>

与 `Partial` 相反，该类型将类型 `T` 的所有属性变为必选。

示例：

```typescript
interface PartialUser {
  name?: string;
  age?: number;
}

type RequiredUser = Required<PartialUser>;
// RequiredUser 的类型为 { name: string; age: number; }

const requiredUserData: RequiredUser = { name: 'John', age: 25 }; // 全部属性变为必选
```

#### 3. Readonly\<T>

将类型 `T` 的所有属性变为只读。 一旦复制之后是不允许更改的。

示例：

```typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// ReadonlyUser 的类型为 { readonly name: string; readonly age: number; }

const user: ReadonlyUser = { name: 'Alice', age: 30 };
// user.name = 'Bob'; // 这里会报错，因为属性是只读的
```

#### 4. Record\<K, T>

该类型创建一个具有指定键类型 `K` 和值类型 `T` 的新对象类型。

示例：

```typescript
type PageInfo = {
  title: string;
};

type Page = 'home' | 'about' | 'contact';

const pages: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contact: { title: 'Contact' },
};
// pages 的类型为 { home: PageInfo; about: PageInfo; contact: PageInfo; }
```

#### 5. Pick\<T, K>

从类型 `T` 中选择指定属性 `K` 形成新类型。

示例：

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserBasicInfo = Pick<User, 'name' | 'email'>;
// UserBasicInfo 的类型为 { name: string; email: string; }

const basicUserInfo: UserBasicInfo = { name: 'Sarah', email: 'sarah@example.com' };
```

#### 6. Omit\<T, K>

与 `Pick` 相反，该类型从类型 `T` 中排除指定属性 `K` 形成新类型。

示例：

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserWithoutAge = Omit<User, 'age'>;
// UserWithoutAge 的类型为 { name: string; email: string; }

const userWithoutAge: UserWithoutAge = { name: 'Alex', email: 'alex@example.com' };
```

当涉及到 `Exclude<T, U>` 和 `Extract<T, U>` 时，让我们进一步丰富例子来更好地说明它们的用法。

#### 7. Exclude\<T, U>

`Exclude<T, U>` 从类型 `T` 中排除可以赋值给类型 `U` 的类型。

举例：

```typescript
type T = string | number | boolean;
type U = string | boolean;

type OnlyNumber = Exclude<T, U>;
// OnlyNumber 的类型为 number

const example1: OnlyNumber = 10; // 可以赋值，因为只有 number 类型被提取
// const example2: OnlyNumber = 'Hello'; // 这行会报错，因为 string 类型被排除
// const example3: OnlyNumber = true; // 这行也会报错，因为 boolean 类型被排除

function printValue(val: OnlyNumber) {
  console.log(val);
}

printValue(20); // 可以传入，因为参数类型为 OnlyNumber
// printValue('Hi'); // 这行会报错，因为参数类型不是 OnlyNumber
```

在这个例子中，`T` 是 `string | number | boolean`，`U` 是 `string | boolean`。`Exclude<T, U>` 从 `T` 中排除了 `U` 中包含的类型，所以 `OnlyNumber`
的类型就只有 `number`。这个类型可以在函数参数上提供类型安全性，确保只接受特定类型的参数。

#### 8. Extract\<T, U>

`Extract<T, U>` 从类型 `T` 中提取可以赋值给类型 `U` 的类型。

举例：

```typescript
type T = string | number | boolean;
type U = string | boolean;

type OnlyStringOrBoolean = Extract<T, U>;
// OnlyStringOrBoolean 的类型为 string | boolean

const example1: OnlyStringOrBoolean = 'Hello'; // 可以赋值，因为 string 类型被提取
const example2: OnlyStringOrBoolean = true; // 也可以赋值，因为 boolean 类型也被提取
// const example3: OnlyStringOrBoolean = 10; // 这行会报错，因为 number 类型被排除

function printValue(val: OnlyStringOrBoolean) {
  console.log(val);
}

printValue('Hey'); // 可以传入，因为参数类型为 OnlyStringOrBoolean
printValue(true); // 也可以传入，因为参数类型为 OnlyStringOrBoolean
// printValue(30); // 这行会报错，因为参数类型不是 OnlyStringOrBoolean
```

在这个例子中，`T` 是 `string | number | boolean`，`U` 是 `string | boolean`。`Extract<T, U>` 从 `T` 中提取了 `U`
中包含的类型，所以 `OnlyStringOrBoolean` 的类型就是 `string | boolean`。这个类型可以用在函数参数上，确保只接受特定的类型作为参数，提高代码的类型安全性。

#### 9. NonNullable\<T>

`NonNullable<T>` 类型从类型 `T` 中排除 `null` 和 `undefined` 类型。

示例：

```typescript
type T = string | null | undefined;

type NonNullString = NonNullable<T>;
// NonNullString 的类型为 string

const example: NonNullString = 'Hello'; // 可以赋值，因为 null 和 undefined 被排除
// const example2: NonNullString = null; // 这行会报错，因为 null 被排除
```

在这个例子中，`NonNullable` 从 `string | null | undefined` 中排除了 `null` 和 `undefined` 类型，只保留了 `string` 类型。

#### 10. ReturnType\<T>

`ReturnType<T>` 类型获取函数类型 `T` 的返回类型。

示例：

```typescript
function greet(): string {
  return 'Hello!';
}

type GreetReturnType = ReturnType<typeof greet>;
// GreetReturnType 的类型为 string

const result: GreetReturnType = 'Hi'; // 可以赋值，因为函数的返回类型是 string
// const result2: GreetReturnType = 10; // 这行会报错，因为类型不匹配
```

`ReturnType` 获取了 `greet` 函数的返回类型，因此 `GreetReturnType` 就是 `string` 类型。

#### 11. Parameters\<T>

`Parameters<T>` 类型获取函数类型 `T` 的参数类型组成的元组类型。

示例：

```typescript
function greet(name: string, age: number): void {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

type GreetFunctionParams = Parameters<typeof greet>;
// GreetFunctionParams 的类型为 [string, number]

const example: GreetFunctionParams = ['Alice', 30]; // 可以赋值，因为参数类型匹配
// const example2: GreetFunctionParams = ['Bob', '20']; // 这行会报错，因为参数类型不匹配
```

`Parameters` 获取了 `greet` 函数的参数类型组成的元组类型 `[string, number]`，因此 `GreetFunctionParams` 就是包含了函数参数类型的元组类型。

### 条件判定类型

条件类型是 TypeScript 中强大且灵活的类型构造方式，它允许根据类型关系进行条件判断生成不同的类型。分布式条件类型是条件类型的一种特殊形式，它允许条件类型在联合类型上进行分发，以便更精确地推断和处理类型。

#### Conditional Types（条件类型）

条件类型基于输入的类型关系来确定最终的类型。它使用 `infer` 关键字来推断和定义类型。条件类型通常结合了 TypeScript 中的`extends`关键字，这样就可以根据条件来确定最终的类型。

当谈到 TypeScript 中的条件类型时，让我们通过更多的例子来深入了解它们的应用和灵活性。

**1. 根据输入类型选择不同的类型**
条件类型基于输入的类型关系来确定最终的类型。它使用 infer 关键字来推断和定义类型。条件类型通常结合了 TypeScript 中的extends关键字，这样就可以根据条件来确定最终的类型。

示例：

```typescript
type TypeName<T> =
  T extends string ? "string" :
    T extends number ? "number" :
      T extends boolean ? "boolean" :
        "other";

type A = TypeName<string>;            // A 的类型为 "string"
type B = TypeName<number>;            // B 的类型为 "number"
type C = TypeName<boolean>;           // C 的类型为 "boolean"
type D = TypeName<object>;            // D 的类型为 "other"
type E = TypeName<string | number>;   // E 的类型为 "string" | "number"
```

在这个例子中，`TypeName<T>` 条件类型根据传入的类型 `T` 来确定最终返回的类型字符串。如果 `T` 是 `string`、`number` 或 `boolean` 类型，则返回对应的类型字符串，否则返回 `"other"`。

**2. 条件类型中使用 `infer` 关键字**

`infer` 关键字通常与`extends`结合使用，用于在条件类型内部声明一个类型变量，并从中提取或推断出一个类型。 它允许我们在泛型条件类型中推断出待推断类型的部分。

具体左右有以下两点：
1. TypeScript 支持 infer 来提取类型的一部分，通过模式匹配的方式。
示例：

```typescript
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(): string {
  return 'Hello!';
}

type GreetReturnType = ExtractReturnType<typeof greet>;
// GreetReturnType 的类型为 string
```

这个例子中的 `ExtractReturnType<T>` 条件类型获取函数类型 `T` 的返回类型。它使用了 `infer` 关键字来推断函数的返回类型，如果 `T` 是一个函数类型，则返回其返回类型，否则返回 `never`。

2. `infer extends` 用来做类型转换，比如 string 转 number、转 boolean 等；

具体的例子可以参考文章：https://juejin.cn/post/7133438765317488677


**3. 条件类型配合泛型使用**

示例：

```typescript
type Diff<T, U> = T extends U ? never : T;

type FilterOut<T, U> = T extends any ? Diff<T, U> : never;

type Result = FilterOut<'a' | 'b' | 'c' | 'd', 'a' | 'c'>;
// Result 的类型为 "b" | "d"
```

在这个例子中，`FilterOut<T, U>` 条件类型根据传入的两个联合类型 `T` 和 `U`，从 `T` 中过滤掉属于 `U` 类型的成员，返回剩余的类型。通过 `Diff<T, U>`
辅助实现了这个操作。这种方式可以在处理类型时非常有用，比如过滤掉某些特定类型。

#### Distributive Conditional Types（分布式条件类型）

分布式条件类型是条件类型的一种特殊形式，它在联合类型上进行推断和分发，并返回联合类型中每个成员的条件类型。

示例：

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrArray = ToArray<string>; // StrArray 的类型为 string[]
type NumArray = ToArray<number>; // NumArray 的类型为 number[]
type UnionArray = ToArray<string | number>; // UnionArray 的类型为 (string | number)[]
```

在这个例子中，`ToArray<T>` 条件类型以联合类型 `T` 为输入，并将其分发到联合类型的每个成员上，返回一个数组类型。这种分布式行为使得条件类型在处理联合类型时更加灵活和强大。

条件类型和分布式条件类型为 TypeScript 中的类型系统增加了极大的灵活性和表达能力，允许开发者根据复杂的类型关系来定义和推断类型。


### Mapped Types（映射类型）

`映射类型（Mapped Types）` 是 TypeScript 中一种强大的类型操作，它允许你通过已有类型来创建新类型，通常通过映射现有类型的属性、方法或者创建新的属性来实现。

常见的映射类型是利用 `keyof` 关键字配合索引类型来生成新的类型。一个经典的例子是 `Partial<T>` 类型。它接受一个类型 `T` 并将所有属性设置为可选的：

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface User {
    name: string;
    age: number;
}

type PartialUser = Partial<User>;
// PartialUser 类型为 { name?: string; age?: number; }
```

在这个例子中，`Partial<T>` 使用了映射类型，通过遍历 `T` 类型的所有属性（由 `keyof T` 获取），创建了一个新类型，该类型包含了原类型 `T` 的所有属性，并将它们设为可选的。

除了 `Partial`，还有一些其他常见的映射类型：

- `Readonly<T>`：将类型 `T` 中所有属性设置为只读。
- `Pick<T, K>`：选择类型 `T` 中的特定属性 `K`。
- `Record<K, T>`：根据键类型 `K` 创建一个新类型，其属性为类型 `T`。
- `Exclude<T, U>` 和 `Extract<T, U>`：从类型 `T` 中排除或提取符合类型 `U` 的部分。

映射类型可以使类型操作更加灵活，能够根据现有类型创建出符合特定需求的新类型。这种功能特别适用于工具类型（Utility Types）的定义，使得类型系统更具表现力和可维护性。

### Template Literal Types（模板文字类型）

Template Literal Types（模板文字类型）是 TypeScript 4.1 引入的一项新特性，它允许在类型系统中对字符串文本进行操作和转换。这项功能利用了模板字符串的灵活性，使得可以在类型声明中使用类似于模板字符串的语法。

在模板文字类型中，可以使用模板字符串的 `${}` 语法来动态地创建字符串字面量类型。这使得类型系统更具表现力，能够进行更复杂的字符串类型操作。

举个例子，假设有一个类型 `WelcomeMessage`，用于根据用户类型生成不同的欢迎消息：

```typescript
type User = "admin" | "user";

type WelcomeMessage<T extends User> = `Welcome, ${Capitalize<T>}!`;

type AdminWelcome = WelcomeMessage<"admin">;
// AdminWelcome 类型为 "Welcome, Admin!"

type UserWelcome = WelcomeMessage<"user">;
// UserWelcome 类型为 "Welcome, User!"
```

在这个例子中，`WelcomeMessage` 是一个模板文字类型，利用了模板字符串中的 `${}` 语法。它动态地根据传入的用户类型（"admin" 或 "user"）生成相应的欢迎消息。这里使用了 `Capitalize<T>` 来确保用户名的首字母大写。

模板文字类型在类型定义中能够进行字符串的拼接、转换等操作，使得在类型层面上能够更灵活地处理和操作字符串类型。


### 类型推断关键字

在 TypeScript 中，有几个关键字和操作符用于类型判定。这些关键字和操作符帮助你在代码中进行类型检查、类型判断和类型转换。

1. **typeof**
`typeof` 是一个类型查询操作符，用于获取变量或表达式的类型。它可以返回该值的类型字符串表示。比如 `typeof variable` 返回变量的类型，如 `'number'`、`'string'`、`'object'` 等。

```typescript
const numberVar = 10;
type NumberType = typeof numberVar; // NumberType 是 number 类型
```

2. **instanceof**
`instanceof` 运算符用于检查对象是否是特定类的实例。它返回一个布尔值表示检查结果。

```typescript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();
if (dog instanceof Dog) {
  console.log('It is a dog!');
}
```

3. **in**
`in` 关键字用于检查对象是否具有特定属性。它在条件语句中常用于判断对象是否包含某个属性。

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: 'Alice', age: 30 };
if ('age' in person) {
  console.log('Person has age property.');
}
```

4. **type guards**
类型守卫是自定义的函数或条件语句，用于在代码块内缩小变量的类型范围。它们可以是 `typeof`、`instanceof` 或者其他自定义条件的组合。

```typescript
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

function process(value: any) {
  if (isNumber(value)) {
    // value 在此处被缩小为 number 类型
    console.log(value.toFixed(2)); // 可以调用 number 类型的方法
  } else {
    console.log('Value is not a number');
  }
}
```

5. **as**
`as` 关键字用于类型断言，允许将一个变量断言为特定的类型。

```typescript
const someValue: any = 'hello';
const length = (someValue as string).length;
```

这些关键字和操作符能够在 TypeScript 中进行类型判断、类型检查和类型转换，有助于确保代码的类型安全性和正确性。
