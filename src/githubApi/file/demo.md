**关键词**：对象遍历方式

遍历 JavaScript 对象的属性可以使用几种不同的方法，每种方法都有其适用场景和特点。以下是一些常用的遍历对象属性的方法：

### 1. **for-in 循环**

`for-in` 循环可以遍历一个对象的所有**可枚举属性**，包括其原型链上的属性。

```javascript
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // 推荐检查属性是否为对象本身的属性
    console.log(key, obj[key]);
  }
}
```

使用 `hasOwnProperty` 方法检查属性是否是对象本身的属性（而不是继承的属性）是一个好习惯。

### 2. **Object.keys()**

`Object.keys()` 方法返回一个包含对象自身所有可枚举属性名称的数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
```

### 3. **Object.values()**

`Object.values()` 方法返回一个包含对象自身所有可枚举属性值的数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
Object.values(obj).forEach((value) => {
  console.log(value);
});
```

### 4. **Object.entries()**

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});
```

### 5. **Object.getOwnPropertyNames()**

`Object.getOwnPropertyNames()` 方法返回一个数组，包含对象自身的所有属性（不论属性是否可枚举），但不包括 Symbol 属性。

```javascript
const obj = { a: 1, b: 2, c: 3 };
const propertyNames = Object.getOwnPropertyNames(obj);
propertyNames.forEach((name) => {
  console.log(name, obj[name]);
});
```

### 6. **Reflect.ownKeys()**

`Reflect.ownKeys()` 方法返回一个数组，包含对象自身的所有键，包括**字符串键**和**Symbol 键**。

```javascript
const obj = { a: 1, b: 2, c: 3, [Symbol("d")]: 4 };
Reflect.ownKeys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
```

根据需要选择合适的方法进行对象属性的遍历。例如，当你想要同时获取属性的键和值时，`Object.entries()` 是一个很好的选择。而如果你想要包括 Symbol 属性在内的所有键，那么 `Reflect.ownKeys()`可能是更合适的选择。
