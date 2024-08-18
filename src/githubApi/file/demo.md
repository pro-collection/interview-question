**关键词**：创建对象实例

在 JavaScript 中，使用`new`操作符创建对象时，既可以使用类（`class`）也可以使用构造函数（`function`）。二者都可以用来实例化新的对象，但它们之间存在一些关键的区别和相似之处：

### 使用`new`操作符

当使用`new`操作符时，JavaScript 会执行以下步骤：

1. 创建一个全新的空对象。
2. 将这个空对象的原型(`__proto__`)设置为构造函数的`prototype`属性。
3. 将`this`绑定到新创建的对象上，以便构造函数可以引用它。
4. 执行构造函数内的代码（对新对象进行初始化）。
5. 如果构造函数返回一个对象，则返回该对象；否则，返回刚才创建的新对象。

### 使用`new function()`

- 在使用函数时，实际上是在使用函数构造器模式。这个函数充当构造函数的角色，定义了如何初始化新对象的属性和方法。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function () {
  console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
};
const person1 = new Person("Alice", 30);
person1.greet(); // 输出: Hello, my name is Alice and I am 30 years old.
```

### 使用`new class`

- ES6 引入了类语法（`class`），使得基于类的面向对象编程在语法上更加清晰和直观。类的内部工作原理与使用构造函数的模式相似，但提供了更丰富的语法和特性，比如基于类的继承等。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
const person2 = new Person("Bob", 25);
person2.greet(); // 输出: Hello, my name is Bob and I am 25 years old.
```

### 主要区别

- **语法和语义**：`class`提供了一种清晰、模块化的方式来定义构造函数和原型方法。通过`class`关键字声明类使得代码更加直观易懂。
- **继承**：使用`class`语法，可以通过`extends`关键字更加简洁地实现继承。而在传统的函数式继承中，需要手动设置原型链。
- **严格模式**：使用`class`语法定义的类的方法自动运行在严格模式下(`"use strict"`)，而传统的构造函数则需要手动声明。
- **构造函数和原型方法的声明**：`class`语法使得构造函数和原型方法的声明更加直观和组织化，而在传统的构造函数中，需要分别设置构造函数的属性和其原型的方法。

### 结论

虽然`new function()`和`new class`都可以用来创建新的对象实例，但`class`提供了更现代、更丰富的语法和特性，使得代码更加直观、易于管理和维护。然而，重要的是理解两者在 JavaScript 底层使用相同的原型继承机制。
