## Symbol 概要简介
Symbol 是 ECMAScript 6 引入的一种新的原始数据类型，用来表示独一无二的值。每个 Symbol 值都是唯一的，因此可以用来创建一些独特的标识符。

## 定义
Symbol 的定义非常简单，只需要调用 Symbol() 方法即可，例如：
```js
const mySymbol = Symbol();
```

在使用 Symbol 的时候，可以给它传递一个可选的描述信息，用于标识 Symbol 的含义，例如：
```js
const mySymbol = Symbol('my symbol');
```


## 使用场景

### 常量的定义
由于每个 Symbol 的值都是唯一的，因此可以用它来定义常量，避免不小心修改值。例如：
```js
const MY_CONST = Symbol('my_const')
```

### Symbol 值可以作为对象的属性名，用来避免属性名冲突
例如：
```js
const obj = {};
const mySymbol = Symbol('my symbol');
obj[mySymbol] = 'hello';
console.log(obj[mySymbol]); // 输出：'hello'
```


### 在使用 Symbol 的时候，可以结合 Object.defineProperty() 方法来定义一个只读的属性
例如：
```js
const obj = {};
const mySymbol = Symbol('my symbol');
Object.defineProperty(obj, mySymbol, {
    value: 'hello',
    writable: false
});
console.log(obj[mySymbol]); // 输出：'hello'
obj[mySymbol] = 'world';
console.log(obj[mySymbol]); // 输出：'hello'
```

### 还可以使用 Symbol.for() 方法创建一个可共享的 Symbol 值 
例如：
```js
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');
console.log(s1 === s2); // 输出：true
```
在上述示例中，虽然 s1 和 s2 的值不同，但是它们所表示的含义相同，因此可以认为它们是相等的。这种通过 Symbol.for() 方法创建的 Symbol 值，会被保存在一个全局的 Symbol 注册表中，可以被不同的代码块访问到。


### 私有属性的定义 
由于 Symbol 值是唯一的，因此可以用它来模拟私有属性的概念，防止属性名冲突。例如：
```js
const _myPrivateProp = Symbol('my_private_prop')
class MyClass {
    constructor() {
    this[_myPrivateProp] = 'private value'
}
getPrivateValue() {
    return this[_myPrivateProp]
    }
}
```
在这个例子中，_myPrivateProp 就是一个 Symbol 值，用于存储私有属性的值，它无法被外部访问到，只能通过类的方法来获取它的值。

### 自定义迭代器
Symbol 还可以用于自定义迭代器，例如：
```js
const myIterable = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  }
}
for (let value of myIterable) {
  console.log(value)
}
// Output: 1 2 3
```
在这个例子中，我们使用了 Symbol.iterator 来定义了一个自定义的迭代器，这个迭代器可以被 for...of 循环调用来遍历对象的属性值。


## 总结
总之，`Symbol` 的主要用途是创建独一无二的属性名，用来避免属性名冲突。
在实际开发中，可以将 `Symbol` 作为对象的属性名来定义一些特殊的行为，例如迭代器、生成器等，这些都是 `Symbol` 的实际使用案例。

