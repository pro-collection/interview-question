TypeScript 中不可变量的实现方法有两种：

使用 ES6 的 const 关键字声明的值类型
被 readonly 修饰的属性
2、TypeScript 中 readonly：

TypeScript 中的只读修饰符，可以声明更加严谨的可读属性。通常在 interface 、 Class 、 type 以及 array 和 tuple 类型中使用它，也可以用来定义一个函数的参数。

3、两者区别：

（1）const 用于变量， readonly 用于属性

（2）const 在运行时检查， readonly 在编译时检查

（3）const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值；                        
readonly 修饰的属性能确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变。
```typescript
const foo: {
  readonly bar: number;
} = {
  bar: 123
};
function iMutateFoo(foo: { bar: number }) {
  foo.bar = 456;
}
iMutateFoo(foo);
console.log(foo.bar); // 456
```

（4）const 保证的不是变量的值不得改动，而是变量指向的那个内存地址不得改动，例如使用 const 变量保存的数组，可以使用 push ， pop 等方法。
但是如果使用 ReadonlyArray<number> 声明的数组不能使用 push ， pop 等方法。


