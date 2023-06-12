**关键词**：hasOwnProperty、instanceof、hasOwnProperty作用、instanceof作用

hasOwnProperty 和 instanceof 是两个不同的操作符，用于不同的目的。

1. hasOwnProperty

hasOwnProperty 是一个对象的原型方法，用来检测一个对象自身是否具有指定名称的属性（不会检查原型链上的属性）。其语法如下：

```
object.hasOwnProperty(property)
```

其中，object 是要检测的对象，property 是要检测的属性名。如果对象自身具有指定名称的属性，则返回 true，否则返回 false。

2. instanceof

instanceof 是一个运算符，用来检测一个对象是否是某个类的实例。其语法如下：

```
object instanceof constructor
```

其中，object 是要检测的对象，constructor 是要检测的类（构造函数）。如果对象是指定类的实例，则返回 true，否则返回 false。

举个例子来说，假设有以下代码：

```
function Person(name) {
  this.name = name;
}

var john = new Person("John");

console.log(john.hasOwnProperty("name")); // true
console.log(john instanceof Person); // true
```

上述代码中，我们创建了一个 Person 类，并使用构造函数创建了一个实例 john。然后我们分别使用 hasOwnProperty 和 instanceof 操作符检测 john 对象是否具有 name 属性和是否是 Person 类的实例，得到的结果分别为 true 和 true。
