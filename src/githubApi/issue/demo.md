**关键词**：Object.prototype.hasOwnProperty

### `Object.prototype.hasOwnProperty()`

`Object.prototype.hasOwnProperty()`是JavaScript中`Object`原型对象上的方法。它用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。

`hasOwnProperty()`方法的作用是检查对象是否包含特定的属性，而不会考虑该属性是否继承自原型链。它接受一个字符串参数，表示要检查的属性名。如果对象自身拥有该属性，则返回`true`；如果对象没有该属性或该属性是从原型链继承的，则返回`false`。

以下是`hasOwnProperty()`方法的使用示例：

```javascript
const obj = {
  prop1: 'value1',
  prop2: 'value2',
};

console.log(obj.hasOwnProperty('prop1')); // true
console.log(obj.hasOwnProperty('prop3')); // false
```

在上述示例中，`obj`对象拥有`prop1`属性，因此`obj.hasOwnProperty('prop1')`返回`true`。然而，`obj`对象没有`prop3`属性，因此`obj.hasOwnProperty('prop3')`返回`false`。

使用`hasOwnProperty()`方法可以帮助我们确定属性是对象自身的属性还是继承自原型链。这在进行属性遍历或属性存在性检查时非常有用。请注意，`hasOwnProperty()`方法只能检查对象自身的属性，不能检查原型链上的属性。如果需要检查原型链上的属性，可以使用`in`运算符或`Object.prototype.hasOwnProperty.call()`方法。


### `hasOwnProperty`和`instanceof` 区别

`hasOwnProperty`和`instanceof`是两个不同的操作符，用于在JavaScript中进行不同类型的检查。

1. `hasOwnProperty`：`hasOwnProperty`是`Object`原型对象上的方法，用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。它是针对对象属性的检查。

2. `instanceof`：`instanceof`是JavaScript的一个操作符，用于检查一个对象是否是某个构造函数的实例。它用于检查对象的类型。

以下是两者之间的区别：

* `hasOwnProperty`是用于检查对象是否具有特定的属性，它关注的是对象自身的属性，不涉及对象的类型。它只检查对象自身的属性，不会检查原型链上的属性。

* `instanceof`是用于检查对象是否是某个构造函数的实例，它关注的是对象的类型。它会检查对象的原型链上是否存在指定构造函数的原型对象。

使用示例：

```javascript
const obj = {
  prop: 'value'
};

console.log(obj.hasOwnProperty('prop')); // true

console.log(obj instanceof Object); // true
console.log(obj instanceof Array); // false
```

在上述示例中，`obj`对象拥有`prop`属性，因此`obj.hasOwnProperty('prop')`返回`true`。同时，`obj`对象是`Object`构造函数的实例，因此`obj instanceof Object`返回`true`，但不是`Array`构造函数的实例，因此`obj instanceof Array`返回`false`。

总结而言，`hasOwnProperty`用于检查对象是否拥有特定的属性，而`instanceof`用于检查对象的类型。
