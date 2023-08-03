**关键词**：unknown类型、unknown类型应用

**关键词**：unknown类型、unknown类型应用

**关键词**：unknown类型、unknown类型应用

`unknown`指的是**不可预先定义的类型**，在很多场景下，它可以替代any的功能同时保留静态检查的能力。

```typescript
typescriptconst num: number = 10;
(num as unknown as string).split('');          // 注意，这里和any一样完全可以通过静态检查
```

这个时候unknown的作用就跟any高度类似了，你可以把它转化成任何类型，不同的地方是，在静态编译的时候，unknown不能调用任何方法，而any可以。

```typescript
typescriptconst foo: unknown = 'string';
foo.substr(1);           // Error: 静态检查不通过报错
const bar: any = 10;
bar.substr(1); 
```

unknown的一个使用场景是，避免使用any作为函数的参数类型而导致的静态类型检查bug：

```typescript
typescriptfunction test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length;    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length;      // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
```

我们在一些无法确定函数参数（返回值）类型中 unknown 使用的场景非常多

```typescript
typescript// 在不确定函数参数的类型时
// 将函数的参数声明为unknown类型而非any
// TS同样会对于unknown进行类型检测，而any就不会
function resultValueBySome(val:unknown) { 
  if (typeof val === 'string') {  
    // 此时 val 是string类型   
    // do someThing 
  } else if (typeof val === 'number') { 
    // 此时 val 是number类型   
    // do someThing  
  } 
  // ...
}
```
