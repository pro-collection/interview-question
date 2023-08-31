**关键词**：typeof 与 instanceof、typeof 作用、instanceof 作用

在JavaScript中，typeof和instanceof是两个用于检查变量类型的操作符，但它们具有不同的用途和区别。

typeof是一个一元操作符，用于确定给定变量的数据类型。它返回一个字符串，表示变量的数据类型。typeof可以用于任何变量，包括基本数据类型（如字符串、数字、布尔值）和引用数据类型（如对象、数组、函数等）。

例如：
```ts
typeof 42; // "number"
typeof "Hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object"
typeof [1, 2, 3]; // "object"
typeof {name: "John", age: 30}; // "object"
typeof function() {} // "function"
```

注意，typeof null返回的是"object"，这是一个历史遗留问题。

instanceof是一个二元操作符，用于检查对象是否属于指定的构造函数的实例。它返回一个布尔值，表示对象是否是特定构造函数的实例或其子类的实例。

例如：
```ts
var arr = [1, 2, 3];
arr instanceof Array; // true

var obj = {name: "John", age: 30};
obj instanceof Object; // true

function Person(name) {
this.name = name;
}
var john = new Person("John");
john instanceof Person; // true
```

typeof用于确定变量的数据类型，而instanceof用于确定对象是否为某个构造函数的实例。虽然typeof可以检查基本数据类型和引用数据类型，但无法检查对象的具体类型。而instanceof可以在对象的继承链上进行检查，可以明确对象是否为某个类的实例或其子类的实例。
