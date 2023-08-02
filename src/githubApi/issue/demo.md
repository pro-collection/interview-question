**关键词**：never类型、never类型应用

**`never` 是其他任意类型的子类型的类型被称为底部类型(bottom type)。**

在 TypeScript 中，`never` 类型便为空类型和底部类型。`never` 类型的变量无法被赋值，与其他类型求交集为自身，求并集不参与运算。

#### 应用一: 联合类型中的过滤

**never在联合类型中会被过滤掉：**

```typescript
typescripttype Exclude<T, U> = T extends U ? never : T;

// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>

T | never // 结果为T
T & never // 结果为never

```

取一个映射类型中所有value为指定类型的key。例如，已知某个React组件的props类型，我需要“知道”（编程意义上）哪些参数是function类型。

```typescript
typescriptinterface SomeProps {
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 如何得到 'c' | 'd' ？ 

type GetKeyByValueType<T, Condition> = {
    [K in keyof T]: T[K] extends Condition ? K : never
} [keyof T];

type FunctionPropNames =  GetKeyByValueType<SomeProps, Function>;    // 'c' | 'd'


```

运算过程如下：

```typescript
typescript// 开始
{
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 第一步，条件映射
{
    a: never
    b: never
    c: 'c'
    d: 'd'
}
// 第二步，索引取值
never | never | 'c' | 'd'
// never的性质
'c' | 'd'
```

#### 应用二：防御性编程

举个具体点的例子，当你有一个 union type:

```typescript
typescriptinterface Foo {   type: 'foo' } 
interface Bar {   type: 'bar' } 
type All = Foo | Bar
```

在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

```typescript
typescriptfunction handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

`type All = Foo | Bar | Baz`

然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。
