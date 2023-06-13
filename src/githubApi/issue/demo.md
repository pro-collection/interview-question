**关键词**：原型链的终点

在JavaScript中，原型链的终点是 `null`。当访问一个对象的属性或方法时，如果当前对象没有该属性或方法，JavaScript引擎会沿着原型链向上查找，直到找到该属性或方法或者到达原型链的终点 `null`。

每个对象都有一个原型（`prototype`）属性，指向它的原型对象。原型对象也是一个对象，也有自己的原型，形成了原型链。原型链是由一系列对象的连接构成的，每个对象都有一个指向其原型的引用，通过这个引用可以沿着原型链向上查找属性和方法。

原型链的终点是 `null`，即最顶层的原型对象没有原型，它的 `[[Prototype]]` 指向 `null`。当查找属性或方法时，如果一直沿着原型链找到最顶层的原型对象仍然没有找到，则返回 `undefined`。

示例：
```javascript
const obj = {};
console.log(obj.toString()); // obj 没有定义 toString 方法，通过原型链找到 Object.prototype 上的 toString 方法

const arr = [];
console.log(arr.join()); // arr 没有定义 join 方法，通过原型链找到 Array.prototype 上的 join 方法

const str = 'Hello';
console.log(str.toUpperCase()); // str 没有定义 toUpperCase 方法，通过原型链找到 String.prototype 上的 toUpperCase 方法

const num = 42;
console.log(num.toFixed(2)); // num 没有定义 toFixed 方法，通过原型链找到 Number.prototype 上的 toFixed 方法

console.log(Object.prototype.__proto__); // 最顶层的原型对象 Object.prototype 的原型是 null
```

因此，原型链的终点是 `null`，表示在原型链的最顶层无法再继续向上查找。
