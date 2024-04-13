在 TypeScript 中，`any`和`unknown`都代表可以赋予任何类型的值，但它们在使用上有明显的不同。

### any 类型

1. **最不安全的类型**：`any`类型是 TypeScript 类型系统的逃逸舱口，使用`any`可以让任何表达式绕过类型检查，转而采用 JavaScript 动态类型的行为。
2. **类型放弃**：当你把一个值声明为`any`类型，你本质上在告诉 TypeScript 编译器：“信任我，我知道我在做什么。”编译器不会对`any`类型的值进行类型检查，这意味着你可以对它执行任何操作，无论它的实际类型。

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

notSure.ifItExists(); // okay, toExist might exist at runtime
```

上述代码没有错误，因为`notSure`被声明为`any`类型。

### unknown 类型

1. **类型安全的 any**：与`any`相比，`unknown`类型是类型安全的。它标志着一个值可以是任何类型，但与`any`不同的是，当值被声明为`unknown`时，你无法对该值执行任意的操作。

2. **需要断言或类型细化**：在对`unknown`类型的值执行大部分操作之前，你需要使用类型断言或类型守卫来细化类型。这迫使开发者更积极地处理`unknown`类型的值，因此可以防止潜在的错误。

```typescript
let unsure: unknown = 4;
unsure = "maybe a string instead";
unsure = false; // okay, still uncertain

// unsure.ifItExists(); // Error: Object is of type 'unknown'.
// 下面是对unknown类型进行类型断言的示例
(unsure as string).length; // okay, we have asserted that unsure is a string

// 或者使用类型守卫
if (typeof unsure === "string") {
  console.log(unsure.length); // okay, we have checked it's a string
}
```

如你所见，你不能像处理`any`类型那样直接调用 unknown 类型的方法或属性，必须先进行类型检查。

### 总结

`unknown`类型是`any`类型的类型安全对应物。当不确定一个值的类型时应首选使用`unknown`。这样，你会被迫在对该值执行操作之前进行适当的类型检查。这增加了一层类型安全性，可以帮助避免错误。相比之下，`any`类型则完全放弃了类型检查，通常应该尽量避免。
