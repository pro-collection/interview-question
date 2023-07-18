**关键词**：模拟 new

可以使用以下代码来模拟`new`操作：

```javascript
function myNew(constructor, ...args) {
    // 创建一个新对象，该对象继承自构造函数的原型
    const obj = Object.create(constructor.prototype);
    
    // 调用构造函数，并将新对象作为this值传递进去
    const result = constructor.apply(obj, args);
    
    // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
    return typeof result === 'object' && result !== null ? result : obj;
}
```

使用示例：
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHello = function() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
}

const john = myNew(Person, "John", 25);
john.sayHello(); // 输出：Hello, my name is John and I'm 25 years old.
```

在上述代码中，`myNew`函数模拟了`new`操作的过程：
1. 首先，通过`Object.create`创建了一个新对象`obj`，并将构造函数的原型对象赋值给该新对象的原型。
2. 然后，使用`apply`方法调用构造函数，并传入新对象`obj`作为`this`值，以及其他参数。
3. 最后，根据构造函数的返回值判断，如果返回的是一个非空对象，则返回该对象；否则，返回新创建的对象`obj`。

这样，我们就可以使用`myNew`函数来模拟`new`操作了。
