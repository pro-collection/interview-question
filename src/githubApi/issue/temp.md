
### 全局模块 vs. 文件模块

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4136bb434f542e1b1c246efd3581661~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# 🤫刷题习得黑魔法

### 🌟字符串、数组拆解

数组可以直接用类似js的`[infer start, ...infer M, infer end]`来获得一个数组的第一个和最后一个值。 字符串也是`${infer L}${infer M}${infer R}`，但注意这里L是第一个字符，M是第二个字符，R是剩下的字符，如果字符只有2个，则R是''，如果字符只有一位，则无法这么拆解成3个变量，`T extends`<math><semantics><mrow><mi>i</mi><mi>n</mi><mi>f</mi><mi>e</mi><mi>r</mi><mi>L</mi></mrow><annotation>{infer L}</annotation></semantics></math>inferL{infer M}${infer R}\`\`条件会走到false的语句里去，这一点比较奇怪。

```typescript
// 15 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
type Last<T extends any[]> = T extends [...infer B, infer P] ? P : never;

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1


// 实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。
type Replace<S extends string, From extends string, To extends string> = From extends '' 
? S 
: S extends (`${infer L}${From}${infer R}`) ? `${L}${To}${R}`: S

type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

Replace的用法可见字符串拆解时，变量位置明确时可以是多个字符的字符串

### 🌟遍历

### 联合类型

类似结构的联合类型可以直接通过extends条件语句遍历到

```typescript
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type LookUp<T, K extends string> = T extends { type: K } ? T : never;

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

这个特性可以做些变态的事了，譬如把联合类型组成笛卡尔积的数组，直接看：[github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fissues%2F614 "https://github.com/type-challenges/type-challenges/issues/614")

```typescript
type Permutation<T, K=T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never

type perm = Permutation<'A' | 'B' | 'C'>; 
// ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

### 映射类型

通过`extends keyof T`进行遍历

```typescript
type ObjectEntries<T extends Record<string, any>, K = keyof T> = K extends keyof T ? [K, T[K]]: [];

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

### 元组

元组的遍历，借助元组解构逐个处理逻辑，再把剩下的元组迭代调用当前的类型分析器

```typescript
type PromiseParseAll<T extends any[]> = T extends [infer P, ...infer O]
  ? P extends Promise<infer R> ? [R, ...PromiseParseAll<O>] : [P, ...PromiseParseAll<O>]
  : []
type PromiseAll<T extends any[]> = Promise<PromiseParseAll<T>>
// expected to be `Promise<[number, 42, string]>`
type PRes = PromiseAll<[Promise<number>, 42, Promise<string>]>;
```

### 字符串

字符串类似

```typescript
type TrimLeft<T extends string> = T extends `${infer L}${infer R}`
? L extends " "|"\n"|"\t" ? TrimLeft<R> : T
: never
type trimed = TrimLeft<'  Hello World '> // 应推导出 'Hello World '
```

### 🌟字符串转数字

使用场景：字符串的逐个解析有递归特性，我们可以转成字符串后做一些这方面的处理，处理完后还需要转回去

```typescript
type ToNumber<T> = T extends `${infer N extends number}`
  ? N
  : T
```

### 映射类型 key值的交集与并集

```typescript
type foo = {
  name: string;
  age: string;
}

type coo = {
  age: number;
  sex: string
}

type TestUnion = keyof foo | keyof coo; // 'name' | 'age' | 'sex'
type TestBoth = keyof (foo | coo);  // 'age'
```

### 🌟联合类型变交叉类型

利用函数入参的逆变特性，把输入类型构建成函数参数

```typescript
type UnionToIntersection<U> = 
  (U extends any 
   ? (arg: U) => any 
   : never
  ) extends ((arg: infer I) => any) 
  ? I 
  : never
type TestUnion2Intersection = UnionToIntersection<{a: 1} | {b: 2} | {c: 3}> 
// expected to be {a: 1} & {b: 2} & {c: 3}
```

### 联合类型转元组 - 多个函数交集的返回值类型只取最后一个

`(()=>a) & (()=>b) & (()=>c)`获得这些函数返回值会是c

```typescript
//需要了解性质：多个函数交集的返回值类型只取最后一个！(This is Important!)
//例如：
// type Intersepted = (() => 'a') & (() => 'b') & (() => 'c')
// type Last = Intersepted extends () => infer R ? R : never // 'c'
//参考：https://github.com/type-challenges/type-challenges/issues/21658#issue-1523555097

/**并集转交集 */
type UnionToIntersection<T> = (T extends T ? (args: T) => any : never) 
  extends (args: infer P) => any 
  ? P 
  : never;    // a | b | c ==> a & b & c
/**联合类型最后一个 */
type UnionLast<T> = (UnionToIntersection<T extends T ? () => T : never>) 
  extends () => infer R ? R : never;           // a | b | c ==> (()=>a) | (()=>b) | (()=>c) ==> (()=>a) & (()=>b) & (()=>c) ==> c

type UnionToTuple<T> = [T] extends [never] 
  ? [] 
  : [UnionLast<T>, ...UnionToTuple<Exclude<T, UnionLast<T>>>];

type TestUnionToTuple1 = UnionToTuple<1>           // [1]
type TestUnionToTuple2 = UnionToTuple<'any' | 'a'> // ['any','a']
Equal<UnionToTuple<any | 'a'>,       UnionToTuple<any>>         // will always be a true
Equal<UnionToTuple<unknown | 'a'>,   UnionToTuple<unknown>>     // will always be a true
Equal<UnionToTuple<never | 'a'>,     UnionToTuple<'a'>>         // will always be a true
Equal<UnionToTuple<'a' | 'a' | 'a'>, UnionToTuple<'a'>>         // will always be a true
  
```

### 判断两个类型相等

大多数非严格情况下的相等使用 `A extends B`基本可以做到，譬如前一步的类型中间方法根据条件返回了true或false，接下来要判断结果是否是true，直接用 `T extends true ? xxx : xxx`进行接下来的操作就好。

但是枚举类型下，extends无法很好的区分是否可选，是否只读的区别。

```typescript
type a = {a: string} extends {readonly a: string} ? true : false; // true
type b = {readonly a: string} extends {a: string} ? true : false; // true
type c = {a: string} extends {a?: string} ? true : false; // true
type d = {a?: string} extends {a: string} ? true : false; // false
```

所以严格的相等要借助函数的协变，具体的逻辑我也没get到。。。

```typescript
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
```

### 判断never

先来看一个反直觉的现象：

```typescript
// 1.
type JudgeNever = never extends never ? true : false; // true

// 2.
type TryIsNever<T extends any> = T extends never ? true : false;
type testTryIsNever = TryIsNever<never> // never

// 3.
type IsNever<T extends any> = [T] extends [never] ? true : false;
type testIsNever = IsNever<never>  // true

```

非常难以理解是不

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5cf3434e3c54e53b474117d85b52567~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 详情：

大概意思就是：never是一个特殊的联合类型（它本身是一个底部类型），它没有任何一个成员，而根据Distributive Conditional Types，联合类型作为泛型传入后，会分开计算，因此当输入是never时，因为他一个成员都没有，自然也不需要计算了，直接返回never。而`[T]`是ts实现的一个特性，能够打破这种Distributive Conditional Types规则。 然后似乎范型默认是当联合类型处理条件语句？所以1和2的结构不同 如果不能理解咱就记住：`[T] extends [never]`只能这么判断类型是否是never

### ❓❓❓T extends never的作用

```typescript
// 解析：https://github.com/type-challenges/type-challenges/issues/22792、
// https://github.com/type-challenges/type-challenges/issues/1140
type IsUnion<T, Copy = T> =
  [T] extends [never]
    ? false
    : T extends never
      ? false
      : [Copy] extends [T]
        ? false
        : true
;

type TestN<T, Copy = T> = T extends never
      ? false : [Copy] extends [T] ? false : true;
type TestNI = TestN<string | number> // true

type TestNC<T, Copy = T> = [Copy] extends [T] ? false : true;
type TestNCI = TestNC<string | number> // false

```

为什么TestNI和TestNCI如此不同， `T extends never`的作用究竟是什么？ ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/652be1cfbc7346c1afb391e15b21bc32~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 让我们来看看：

```typescript
type Hmm<T> = keyof T extends never ? true : false
// 如前人所说是true
// 1.
type testMapVal = Hmm<{ a: string } | { b: string }> // true

type testUnionMapKeyType = keyof ({ a: string } | { b: string }) // never
// 几个没有共同属性的映射类型的联合类型的keyof 是never

type TestUnkown<T> = T extends never ? true : false;
// 2.
type testUnionMapKey = TestUnkown<keyof ({ a: string } | { b: string })> // never
```

1和2的差异乍一看很奇怪，但是看了上一张我们知道1中`keyof T extends never`等同于`never extends never`就是true。2中keyof是先求值再作为范型传进去，按照联合类型分配律，never这个底部类型组成的联合类型没有成员，不会执行条件语句，也就返回never了。

再回头看看这一段

```typescript
type IsUnion<T, Copy = T> =
  [T] extends [never]
    ? false
    : T extends never
      ? false
      : [Copy] extends [T]
        ? false
        : true
;
```

* 第1个条件让T为never类型时返回false
* 第2个条件是进行联合类型进行分配律拆解进入下一步骤的桥梁？并不是用来做条件判断的，上一步已经排除never类型后，这里都会判断为不成立。
* 第3个条件`[Copy] extends [T]`是要求不使用分配律来判断结果，大胆推测这里只是不对copy用分配律，copy只能是联合类型，T依旧可以是联合类型中的某一个，所以联合类型`[number|string] extends [string]`就会进入到为假的语句里返回true，有且只有联合类型能做到这样

啊。。。我强行解释也解释不了了，谁能解释留言教教我🐶。

回到这题不纠结never，肯能换种写法更好理解

```typescript
IsUnion<T, B = T> = [T] extends [never] 
  ? false 
  : (T extends T 
     ? [B] extends [T] 
     	? false 
     	: true 
     : never
  );
```

:::info 这里还有一个技巧`IsUnion<T, B = T>`看上去B和T是一样，但其实当T为联合类型时，B可能为其中任意一种子类型，譬如T是`string|number`，B可以是`number` :::

### 🌟枚举类型key的重新映射和过滤

可以使用`Key in keyof T as XXX`，对枚举类型重新封装生成新类型 如果as后的类型是`never`则会在结果中过滤掉这个类型。 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/276f6502fd6a4bb9adc5b268082d4d4f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> Implement RemoveIndexSignature , exclude the index signature from object types.

```typescript
type TypeLiteralOnly<T> =
  string extends T
  ? never
  : number extends T
    ? never
    : boolean extends T
      ? never
      : symbol extends T
        ? never
        : T;

type RemoveIndexSignature<T> = {
  [
    Key in keyof T
    as TypeLiteralOnly<Key>
  ]: T[Key]
};
type FooRemove = {
  [key: string]: any;
  foo(): void;
}

type ARemove = RemoveIndexSignature<FooRemove>  // expected { foo(): void }
```

### 👼枚举可能性组合 - 联合类型

联合类型在遍历时能产生枚举的效果：

```typescript
// [] | [1] | [3] | [1, 2, 3] | [2, 3] | [1, 2] | [2] | [1, 3]
type Subsequence<T extends any[]> = T extends [infer Left, ...infer Rest] 
? [Left, ...Subsequence<Rest>] | Subsequence<Rest> 
: T

// //  [1, 2, 3]
// type Subsequence<T extends any[]> = T extends [infer Left, ...infer Rest] 
// ? [Left, ...Subsequence<Rest>]
// : T

// []
// type Subsequence<T extends any[]> = T extends [infer Left, ...infer Rest] 
// ? Subsequence<Rest> 
// : T

type TestSubsequence = Subsequence<[1, 2, 3]> //[] | [1] | [3] | [1, 2, 3] | [2, 3] | [1, 2] | [2] | [1, 3]
```

这里的巧妙之处就是构建了一个联合类型，而其中一项可能是空元组`[]`。通过分解我们知道，每一次执行`Subsequence<Rest>`的结果可能是`[]`也可能是这个元组本身。所以我们会有：

* 每次递归都命中空元组，结果就是`[]`

* 第1次递归命中`[Left, ...Subsequence<Rest>]`，这时候元组会有`[1, ...Subsequence<2,3>]`

  * 第2轮递归：`Subsequence<2,3>`命中`[Left, ...Subsequence<Rest>]`，结果：`[1, 2, ...Subsequence<3>]`

    * 第3轮递归，`Subsequence<3>`命中`[Left, ...Subsequence<Rest>]`，经过第四轮获得的`[]`，整体结果`[1,2,3]`
    * 第3轮递归，`Subsequence<3>`命中`Subsequence<Rest>`，整体结果`[1,2]`
  * 第2轮递归：`Subsequence<2,3>`命中`Subsequence<Rest>`，结果：`[1, ...Subsequence<3>]`

    * 第3轮递归，`Subsequence<3>`命中`[Left, ...Subsequence<Rest>]`，经过第四轮获得的`[]`，整体结果`[1,3]`
    * 第3轮递归，`Subsequence<3>`命中`Subsequence<Rest>`，整体结果`[1]`

* 同理，如果第1次递归命中的取值是`Subsequence<Rest>`的类型，则这次递归结果是`[]`，经过后续2，3，4轮递归会有

  * `[2，3]`
  * `[2]`

* 再同理，第一二轮递归都可能命中`Subsequence<Rest>`的类型，递归结果是`[]`，剩下的靠第3轮得到：

  * `[3]`

这个排列组合确实逻辑比较绕。 可以再看个例子，自个脑补过程巩固下：

```typescript
type Combination<T extends string[], U = T[number], K = U> = K extends string
    ? K | `${K} ${Combination<[], Exclude<U, K>>}`
    : ''
    
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>
```

### 🌟拆分更清晰

一个类型推导拆成几个步骤，实现几个中间态的推导类型，就类似把一个大函数拆散，并且还可以方便的拥有了存储的中间态类型，也能能有效减少条件语句的分支数量。

实现类型 PercentageParser。根据规则`/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。 匹配的结果由三部分组成，分别是：\[正负号, 数字, 单位\]，如果没有匹配，则默认是空字符串。

```typescript
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

```typescript
type Symbol = "+" | "-";
type PercentageParser<A extends string> =
  A extends `${infer F extends Symbol}${infer R}%`
    ? [F, R, "%"]
    : A extends `${infer F extends Symbol}${infer R}`
    ? [F, R, ""]
    : A extends `${infer R}%`
    ? ["", R, "%"]
    : ["", A, ""];
```

```typescript
type ParseSign<T extends string> =
  T extends `${infer Head}${string}`
    ? Head extends '+' | '-'
      ? Head
      : ''
    : '';

type ParsePercent<T extends string> =
  T extends `${string}%`
    ? '%'
    : '';

type ParseNumber<T extends string> =
  T extends `${ParseSign<T>}${infer N}${ParsePercent<T>}`
    ? N
    : '';

type PercentageParser<T extends string> = [
  ParseSign<T>,
  ParseNumber<T>,
  ParsePercent<T>,
];

```

### 计数

ts类型是无法进行数学加减运算的，有运算或者计数的诉求，都可以构建一个元组，用元组的length来计数

```typescript
type FlattenDepth<
  T extends unknown[],
  Depth extends number = 1,
  Count extends 1[] = []
> =
  Count['length'] extends Depth
  ? T
  : T extends [infer Head, ...infer Tail]
    ? Head extends unknown[]
      ? [
          ...FlattenDepth<Head, Depth, [...Count, 1]>,
          ...FlattenDepth<Tail, Depth, Count>
        ]
      : [
          Head,
          ...FlattenDepth<Tail, Depth, Count>
        ]
    : [];

type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

### 😇加减运算

用上面计数相同的思想，我们甚至可以用类型计算斐波拉契数列： ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/961c871541494e638b91f4b2b6adec70~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```typescript
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [''],
  Prev extends any[] = [],
  Current extends any[] = ['']
> =
  CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<
      T,
      [...CurrentIndex, ''],
      Current,
      [...Prev, ...Current]
    >;

type ResultFibonacci1 = Fibonacci<3> // 2
type ResultFibonacci2 = Fibonacci<8> // 21
```

# ts题

### ConnectedFn

* [github.com/LeetCode-Op…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FLeetCode-OpenSource%2Fhire%2Fblob%2Fmaster%2Ftypescript_zh.md "https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md")

```typescript
type Origin = {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

type Result = {
  asyncMethod<T, U>(input: T): Action<U>;
  syncMethod<T, U>(action: T): Action<U>;
}


type ExtractFun<T> = {
  [key in keyof T]: T[key] extends Function ? key: never;
}[keyof T];

type onlyFunKey<T> = ExtractFun<T>;
// type test0 = onlyFunKey<Origin>;

type PickFun<T> = Pick<T, onlyFunKey<T>>;
type test0 = PickFun<Origin>;

type TmpAsyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type TransformAsyncFn<T> = T extends (input: Promise<infer P>) => Promise<Action<infer K>> ? (input: P) => Action<K>: never;

type test1<T,U> = TransformAsyncFn<TmpAsyncMethod<T,U>>;

type TmpSyncMethod<T, U> = (action: Action<T>) => Action<U>
type TransformSyncFn<T> = T extends (action: Action<infer P>) => Action<infer K> ? (action: P) => Action<K>: never;

type TransformFn<T> = T extends (input: Promise<infer P>) => Promise<Action<infer K>> ? (input: P) => Action<K>
: T extends (action: Action<infer P>) => Action<infer K> ? (action: P) => Action<K>
: never;

type test2<T,U> = TransformFn<TmpAsyncMethod<T,U>>;
type test3<T,U> = TransformFn<TmpSyncMethod<T,U>>;

type ConnectedFn<T> = {
  [key in keyof PickFun<T>]: TransformFn<PickFun<T>[key]>;
}

type test4<T, U> = ConnectedFn<Origin>;
```

* [juejin.cn/post/699410…](https://juejin.cn/post/6994102811218673700#heading-14 "https://juejin.cn/post/6994102811218673700#heading-14")

### 变态题

### 💥减法运算

> 给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

例如：

```typescript
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

原题干：[github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fblob%2Fmain%2Fquestions%2F02257-medium-minusone%2FREADME.zh-CN.md "https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.zh-CN.md")

解法一：

利用数组的长度来代表数字，加减法都可以通过改变数组长度实现

技巧是把原数字中**每位数都变成了一个数组**长度和数字相同的数组，避免整体一起算导致的递归有1000次限制问题，大大减少递归次数。

```typescript
// Utility Type
type ToNumber<T> = T extends `0${infer N extends number}`
  ? N
  : T extends `${infer N extends number}`
    ? N
    : T

// Utility Type
type DigitToArr<T extends number, R extends unknown[] = []> =
  R['length'] extends ToNumber<T>
    ? R
    : DigitToArr<T, [...R, 0]>

// Step 1
type NumberToArr<T extends number | string, Arr extends unknown[][] = []> =
  `${T}` extends `${infer A extends number}${infer Rest}`
    ? NumberToArr<Rest, [...Arr, DigitToArr<A>]>
    : Arr

// Step 2
type MinusArr<R extends unknown[]> =
  R extends [...infer A, infer B]
    ? B extends [...infer M, infer _N]
      ? [...A, M]
      : [...MinusArr<A>, DigitToArr<9>]
    : []

// Step 3
type ArrToString<Arr extends unknown[][], R = ''> =
  Arr extends [infer A extends unknown[], ...infer Rest extends unknown[][]]
    ? `${A['length']}${ArrToString<Rest>}`
    : R

type MinusOne<T extends number> =
  T extends 0
    ? -1
    : ToNumber<ArrToString<MinusArr<NumberToArr<T>>>>

// Steps
type Step1 = NumberToArr<3450> // [[0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0], []]
type Step2 = MinusArr<Step1> // [[0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
type Step3 = ArrToString<Step2> // "3449"
type Result = ToNumber<Step3> // 3449
```

原答案：[github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fissues%2F22169 "https://github.com/type-challenges/type-challenges/issues/22169")

解法二： 直接对每位数做了0-9减1后的映射。并且利用了字符串和数字互转的特性，采用字符串解构来做到逐位处理。

2次reverse导致是因为字符串很容易获取第一位数，但无法直接获取最后一位数，而减法是末尾向左逐步计算的，所以需要倒置处理

这种方式没有用递归，性能比较好。

```typescript
type ParseInt<T extends string> = T extends `${infer Digit extends number}` ? Digit : never
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
type RemoveLeadingZeros<S extends string> = S extends '0' ? S : S extends `${'0'}${infer R}` ? RemoveLeadingZeros<R> : S
type InternalMinusOne<
  S extends string
> = S extends `${infer Digit extends number}${infer Rest}` ?
    Digit extends 0 ?
      `9${InternalMinusOne<Rest>}` :
    `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`:
  never
type MinusOne<T extends number> = ParseInt<RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>>
type test = MinusOne<9007199254740992>
```

原答案：[github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fissues%2F13507 "https://github.com/type-challenges/type-challenges/issues/13507")

用数组的长度来作为数字去比较大小或者去计算，是常用的计较，会变种出很多变态的题，譬如：

* 比较大小
  * [github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fblob%2Fmain%2Fquestions%2F04425-medium-greater-than%2FREADME.md "https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md")
  * 解析：[github.com/type-challe…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftype-challenges%2Ftype-challenges%2Fissues%2F24326 "https://github.com/type-challenges/type-challenges/issues/24326")。（不是最佳答案，最佳答案可以再上一题解题思路上扩展）

### 加法运算

> 给定一个整数数组 nums 和一个目标整数 target, 如果 nums 数组中存在两个元素的和等于 target 返回 true, 否则返回 false

```typescript
/** Helpers */
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

// new Array(N).fill(T)
type Repeat<N extends number, T extends any = null, M extends T[] = []> = 
  M["length"] extends N ? M : Repeat<N, T, [T, ...M]>;

// If A >= B, return A - B. Else, return never.
type Subtract<A extends number, B extends number> = 
  Repeat<A> extends [...Repeat<B>, ...infer Rest] 
    ? Rest["length"]
    : never;

// T < U ? true: false
type LessThan<T extends number, U extends number> = 
  Equal<T, U> extends true ? false
    : Subtract<T, U> extends never ? true : false;

type Shift<T extends any[], N extends number = 1> = 
  N extends 0 ? T 
    : T extends [infer _, ...infer Rest]
      ? Shift<Rest, Subtract<N, 1>>
      : [];

// Iterate over T 
// -> If current element CURR > TARGET and TARGET - CURR exists in the remainder of T, return true.
// -> Else, recursively call TwoSum over remainder of T.
// -> If iteration is completed, return false.
type TwoSum<
  T extends number[], 
  TARGET extends number,
  CURR extends number = T[0],
  NEXT extends number[] = Shift<T>,
  RESULT extends boolean = T extends [] 
    ? false
    : LessThan<TARGET, CURR> extends true 
      ? TwoSum<NEXT, TARGET>
      : Subtract<TARGET, CURR> extends NEXT[number] 
        ? true
        : TwoSum<NEXT, TARGET>
> = RESULT;

type Test1TwoSum = TwoSum<[3,8], 11>
```

这里实际上是把加法转化成了减法，性能也不是最优的，仅供观摩体操

### 除法运算

> The FizzBuzz problem is a classic test given in coding interviews. The task is simple: Print integers 1 to N, except:
>
> * Print "Fizz" if an integer is divisible by 3;
> * Print "Buzz" if an integer is divisible by 5;
> * Print "FizzBuzz" if an integer is divisible by both 3 and 5.

For example, for N = 20, the output should be: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz

> In the challenge below, we will want to generate this as an array of string literals. For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by correctly using the tail-call optimisation for recursion).

```typescript
type FizzBuzzOne<
    C extends number, 
    C3 extends number, 
    C5 extends number, 
    _FB = `${C3 extends 3 ? 'Fizz' : ''}${C5 extends 5 ? 'Buzz' : ''}`
  > = _FB extends '' ? `${C}` : _FB

type FizzBuzz<
    N extends number, 
    _R extends string[] = [], 
    _CT extends unknown[] = [unknown], 
    _C3T extends unknown[] = [unknown], 
    _C5T extends unknown[] = [unknown]
  > = 
    _R['length'] extends N
    ? _R
    : FizzBuzz<
        N,
        [..._R, FizzBuzzOne<_CT['length'], _C3T['length'], _C5T['length']>],
        [..._CT, unknown],
        (_C3T['length'] extends 3 ? [unknown] : [..._C3T, unknown]),
        (_C5T['length'] extends 5 ? [unknown] : [..._C5T, unknown])
      >
```

这里解法跟题干相关，`n/3`通过在递归中不断构建逐位递增的数组且一到3时就清空重来，对比数据相同来做的，不是真的除，而是遍历找到了所有3的倍数值。

### 比较大小

```typescript
type ToTuple<T extends number, R extends readonly unknown[] = []> = R['length'] extends T
  ? R
  : ToTuple<T, [...R, unknown]>

type Max<L extends number, R extends number> =
  ToTuple<L> extends [...ToTuple<R>, ...infer _]
  ? L
  : R

type Maximum<T extends number[]> = T extends [infer F]
  ? F
  : T extends [infer L extends number, infer R extends number]
    ? Max<L, R>
    : T extends [infer L extends number, infer R extends number, ...infer O extends number[]]
      ? Maximum<[Max<L, R>, ...O]>
      : never
```

这里有个技巧性的比较大小的方式`Max`，是构建2个和数值相同长度的元组，然后用一个extends另一个，看一下是否还有剩余值，非常体操的行为了🐶。

### 排列组合

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72c547e740e0482b9128b2c702f48ac8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```typescript
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

首先运用了把字符串拆成单个字符的联合类型，作为基础单元 利用in遍历联合类型，取出一个和其他的组合获得结果

```typescript
type Exclude<T, U> = T extends U ? never : T;

type IsNever<T> = [T] extends [never] ? true : false;

type StringToUnion<T> =
  T extends `${infer Head}${infer Tail}`
  ? Head | StringToUnion<Tail>
  : never;

type AllCombinations<
  S,
  Acc extends string = StringToUnion<S>
> =
  IsNever<Acc> extends true
  ? ""
  : "" | {
    [Combo in Acc]:
      `${
        Combo
      }${
        AllCombinations<
          never,
          Exclude<Acc, Combo>
        >
      }`
  }[Acc];
```

### 💥幂运算 - 二进制转十进制

```typescript
type BinaryToDecimal<S extends string, Acc extends unknown[] = []> = S extends `${infer First}${infer Rest}`
? First extends '1'
  ? BinaryToDecimal<Rest, [...Acc, ...Acc, '']>
  : BinaryToDecimal<Rest, [...Acc, ...Acc]>
: Acc['length']

type Res1BinaryToDecimal = BinaryToDecimal<'10'>; // expected to be 0 + 2 = 2
type Res2BinaryToDecimal = BinaryToDecimal<'0011'>; // expected to be 1 + 2 = 3
type Res3BinaryToDecimal = BinaryToDecimal<'1011'>; // expected to be 1 + 2 + 0 + 8 = 11

type Res5BinaryToDecimal = BinaryToDecimal<'1000'>; // expected to be 0 + 0 + 0 + 8 = 8
/**
 * BinaryToDecimal<'1011'> 每轮递归ACC的值
 * 1 - '1': ['']
 * 2 - '0': ['', '']
 * 3 - '1': [...['', ''], ...['', ''], ''].length = 5
 * 4 - '1': [...['', '', '', '', ''], ...['', '', '', '', ''], ''].length = 11
 */


/**
 * BinaryToDecimal<'1000'> 每轮递归ACC的值
 * 1 - '1': ['']
 * 2 - '0': ['', '']
 * 3 - '0': [...['', ''], ...['', '']].length = 4
 * 4 - '0': [...['', '', '', ''], ...['', '', '', '']].length = 8
 */
```

数组长度计数和递归到了这个进度后都是常规操作了。

`[...Acc, ...Acc]`也不难理解，二进制，每多一位，都是前面的数量\*2翻倍么。

只是这里我一开始十分的不理解人脑是从右往左逐位算的，所以1011 = 1 + 2 + 0 + 8 = 11。 为什么程序从左到右算也能对。然后发现是脑子太固化了，1011 = 8 + 0 + 2 + 1 = 11 可不也成立么。每次往数组里丢一个新的值进去，在后面的递归中都会被每轮\*2，所以数组增加一位，就是在完成2^n 的操作，这里的n就是后续递归次数，每次递归翻倍。所以0和1的区别也确实就是只是n增加一位需要做原本的翻倍，还是该位有数据，需要丢个数据进数组，从而进行后续的翻倍。**关键点就是每次数组新增加的一位都完成了后续n轮递归中2**\*\*^n \*\***的职能。**

# 🤸‍♀️路别走偏了

整理看下来，类型体操是不是觉得比js还难学，就跟js的原型链实现的类一样，奇奇怪怪的。我觉得原因是TS一开始设计时没想承载这么多，譬如做加减乘除运算，是大家的在利用的它的规则和特性搞事情。TS本身缺乏类型方法内变量存储的设计、没有计数和运算能力、逻辑语句又只有三元运算符没有循环之类的，所以在做计数运算、递归等都比较让人迷惑，有些浮夸的体操我自己也是觉得做做开开眼图一乐就好，还是专注于日常工具方法、类能用得到的类型推导部分吧。

最后，即使已经进阶到高级选手了，**不要滥用工具类型，对外暴露的API，应该尽量多手动标注函数返回值类型**。**契约高于实现。**

这些ts类型体操的花活多是留给基础框架内部用的，通过写推导类型作为类型的通用方法，提高我们的类型编程的效率和准确性。
