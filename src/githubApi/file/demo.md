**关键词**：TS 类型兼容

TypeScript 中的类型系统允许类型之间存在不同的兼容性关系，这在处理复杂的类型结构时非常重要，尤其是涉及到函数类型和类结构的相互作用。以下是对逆变、协变、双向协变和不变这四个概念的解释：

### 协变（Covariance）

- **定义**：如果 `A` 类型是 `B` 类型的子类型，则由 `A` 构成的类型 `T<A>` 也是由 `B` 构成的类型 `T<B>` 的子类型。
- **应用场景**：在 TypeScript 中，数组类型是协变的。这意味着如果我们有类型 `string extends object`，那么 `string[] extends object[]` 也成立。
- **函数返回值**：在函数类型中，返回值类型是协变的，意味着函数的返回类型可以是其声明的返回类型的子类型。

**代码示例**：

数组的协变是最常见的例子：

```typescript
class Animal {}
class Dog extends Animal {}

// 协变：Dog是Animal的子类，因此Dog[]也可以赋值给Animal[]
let dogs: Dog[] = [new Dog(), new Dog()];
let animals: Animal[] = dogs; // 协变
```

函数返回值的协变：

```typescript
function getAnimal(): Animal {
  return new Animal();
}
function getDog(): Dog {
  return new Dog();
}

// 协变：getDog的返回类型是getAnimal返回类型的子类型
let animalFunction: () => Animal = getDog; // 协变
```

### 逆变（Contravariance）

- **定义**：在特定情况下，如果 `A` 类型是 `B` 类型的子类型，则由 `B` 构成的类型 `T<B>` 也是由 `A` 构成的类型 `T<A>` 的子类型。
- **应用场景**：主要体现在函数参数中。如果函数 `f` 的参数类型是 `B`，那么一个参数类型为 `A` 的函数可以分配给 `f`，前提是 `A` 是 `B` 的超类型。这意味着函数可以接受更泛化的参数类型。
- **函数参数**：在 TypeScript 的严格模式下，函数参数是双向协变的（见下），但在某些上下文中可以被视为逆变。

**代码示例**

在 TypeScript 中，函数参数在默认情况下是双向协变的，但我们可以使用逆变的方式理解它们在特殊情况下的行为，比如在启用 `--strictFunctionTypes` 标志后，函数参数表现出逆变：

```typescript
class Parent {}
class Child extends Parent {}

// 逆变：参数具有逆变的特性
let fn1: (param: Parent) => void = (child: Child) => {};
```

### 双向协变（Bivariance）

- **定义**：如果类型 `A` 可以赋值给类型 `B`，或者类型 `B` 可以赋值给类型 `A`，则类型 `A` 与 `B` 是双向协变的。
- **应用场景**：TypeScript 中函数参数的默认行为。意味着如果有两个函数，其参数类型分别是彼此的父类型或子类型，这两个函数类型被认为是兼容的。
- **注意事项**：这种设计是出于实用和方便考虑，但可能会导致类型系统的一些不直观行为，特别是在函数参数类型检查上。

**代码示例**

默认情况下，TypeScript 中的函数参数是双向协变的：

```typescript
function fnA(param: Animal) {}
function fnD(param: Dog) {}

// 双向协变：尽管参数类型不完全相同，但两个函数类型在TS中是兼容的
let fn: (param: Dog) => void = fnA; // 双向协变允许这种赋值
fn = fnD;
```

### 不变（Invariance）

- **定义**：类型 `T<A>` 仅与类型 `T<B>` 兼容，如果且仅如果 `A` 与 `B` 完全相同。
- **应用场景**：当我们处理类的实例类型时，经常会出现不变性。例如，如果有一个以 `T` 为泛型参数的类 `Container<T>`，则 `Container<string>` 与 `Container<object>` 将不兼容，除非它们具有完全相同的类型。
- **类和接口成员**：在 TypeScript 中，类和接口的成员默认是不变的。这意味着在赋值兼容性方面，类和接口的成员类型必须完全相同。

**代码示例**

对于类的实例类型的兼容性，体现为不变性：

```typescript
interface IContainer<T> {
  value: T;
}

let stringContainer: IContainer<string> = { value: "Hello, World!" };
let objectContainer: IContainer<object> = { value: { message: "Hello, World!" } };

// 不变：即使string是object的子类型，以下赋值仍然是不允许的。
// stringContainer = objectContainer; // 错误！
// objectContainer = stringContainer; // 错误！
```

---

这些类型兼容性的概念是理解和使用 TypeScript 高级类型系统的基础，尤其是在设计通用库或进行复杂类型转换时。
