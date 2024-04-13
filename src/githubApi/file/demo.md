### Map 遍历

在 JavaScript 中，`Map`对象当然可以被遍历。`Map` 对象持有键值对，任何值(对象或者原始值) 都可以作为一个键或一个值。你可以使用 `Map` 对象的几种方法遍历其中的键值对。

以下是几种遍历 Map 对象的方法：

1. **使用 `forEach()` 方法**：

`Map` 对象有一个 `forEach` 方法，你可以像遍历数组一样使用它来遍历 `Map`。`forEach` 方法会按照插入顺序遍历 Map 对象。

```javascript
let myMap = new Map();
myMap.set("a", "alpha");
myMap.set("b", "beta");
myMap.set("g", "gamma");

myMap.forEach((value, key) => {
  console.log(key + " = " + value);
});
```

1. **使用 `for...of` 循环**：

你可以使用 `for...of` 循环来遍历 `Map` 对象的键值对(`entries`)，键(`keys`)或值(`values`)。

- 遍历 `Map` 的键值对:

```javascript
for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
```

- 遍历 `Map` 的键:

```javascript
for (let key of myMap.keys()) {
  console.log(key);
}
```

- 遍历 `Map` 的值:

```javascript
for (let value of myMap.values()) {
  console.log(value);
}
```

1. **使用扩展运算符**：

你还可以使用扩展运算符来将 `Map` 对象的键值对、键或值转换为数组。

- 键值对数组:

```javascript
let keyValueArray = [...myMap];
console.log(keyValueArray);
```

- 键数组:

```javascript
let keysArray = [...myMap.keys()];
console.log(keysArray);
```

- 值数组:

```javascript
let valuesArray = [...myMap.values()];
console.log(valuesArray);
```

每种方法的使用取决于你的具体需求。通常，`for...of` 和 `forEach()` 会用得更多，因为它们可以直接操作键和值。
