**关键词**：JS 创建对象

1. 使用对象字面量创建对象。

```
var obj = { 
  name: "John", 
  age: 30 
};
```

2. 使用 Object 构造函数创建对象。

```
var obj = new Object();
obj.name = "John";
obj.age = 30;
```

3. 使用构造函数创建对象。

```
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var john = new Person("John", 30);
```

4. 使用 Object.create() 方法创建对象。

```
var obj = Object.create(null);
obj.name = "John";
obj.age = 30;
```

5. 使用类和继承创建对象。

```
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
var john = new Person("John", 30);
```
