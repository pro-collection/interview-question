
## 迭代器分类
在 JavaScript 中，有三种类型的迭代器：

- **Array Iterator（数组迭代器）**：通过对数组进行迭代以访问其元素。

- **String Iterator（字符串迭代器）**：通过对字符串进行迭代以访问其字符。

- **Map Iterator（映射迭代器）和 Set Iterator（集合迭代器）**：通过对 Map 和 Set 数据结构进行迭代以访问其键和值。

此外，在 ES6 中，我们还可以使用自定义迭代器来迭代对象中的元素。我们可以使用 Symbol.iterator 方法来创建自定义迭代器，该方法返回一个具有 next 方法的迭代器对象。

另外，`Generator` 函数可以看作是一种特殊的迭代器，它能够暂停执行和恢复执行，使得我们可以通过控制迭代器的执行来生成序列。

## Array Iterator（数组迭代器）有哪些迭代方法？

Array Iterator（数组迭代器）是针对 JavaScript 数组的迭代器，它可以通过 `Array.prototype[Symbol.iterator]()` 方法来获取。

获取到数组迭代器后，我们可以使用以下迭代方法：

`next()`: 返回一个包含 value 和 done 属性的对象，value 表示下一个元素的值，done 表示是否迭代结束。

`return()`: 用于提前终止迭代，并返回给定的值。

`throw()`: 用于向迭代器抛出一个异常。

下面是一个使用迭代器的示例代码：
```js
const arr = ['a', 'b', 'c'];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: 'c', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

除了以上的迭代方法，还可以通过 for...of 语句来使用迭代器，如下所示：
```js
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item);
}
// output:
// a
// b
// c
```

另外，数组迭代器除了上述的迭代方法，还可以使用 forEach()、map()、filter()、reduce() 等常见数组方法进行迭代操作；

## String Iterator（字符串迭代器） 有哪些迭代方法？
`String Iterator` 是 ES6 引入的一种迭代器，可以用于遍历字符串。String Iterator 没有自己的迭代方法，但可以使用通用的迭代方法。以下是 String Iterator 可以使用的迭代方法：

`next()`：返回迭代器的下一个值，格式为 {value: string, done: boolean}。
`Symbol.iterator`：返回一个迭代器对象，可以使用 for...of 循环来遍历字符串。

示例代码如下：
```js
const str = "hello";
const strIterator = str[Symbol.iterator]();

console.log(strIterator.next()); // { value: 'h', done: false }
console.log(strIterator.next()); // { value: 'e', done: false }
console.log(strIterator.next()); // { value: 'l', done: false }
console.log(strIterator.next()); // { value: 'l', done: false }
console.log(strIterator.next()); // { value: 'o', done: false }
console.log(strIterator.next()); // { value: undefined, done: true }

for (let char of str) {
  console.log(char);
}
// Output:
// h
// e
// l
// l
// o
```

## Map Iterator（映射迭代器）和 Set Iterator（集合迭代器）有哪些迭代方法？

**Map Iterator 和 Set Iterator 都有以下迭代方法：**
`next()`: 返回迭代器中下一个元素的对象，对象包含 value 和 done 两个属性。value 属性是当前元素的值，done 属性表示迭代器是否已经迭代完成。
`Symbol.iterator`: 返回迭代器本身，使其可被 for...of 循环使用。


**Map Iterator 还有以下方法：**
`entries()`: 返回一个新的迭代器对象，该迭代器对象的元素是 [key, value] 数组。
`keys()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Map 中的键名。
`values()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Map 中的键值。


**Set Iterator 还有以下方法：**
`entries()`: 返回一个新的迭代器对象，该迭代器对象的元素是 [value, value] 数组。
`keys()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Set 中的值。
`values()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Set 中的值。


**Map Iterator 使用举例**
```js
const myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
myMap.set("key3", "value3");

const mapIterator = myMap.entries();

console.log(mapIterator.next().value); // ["key1", "value1"]
console.log(mapIterator.next().value); // ["key2", "value2"]
console.log(mapIterator.next().value); // ["key3", "value3"]
console.log(mapIterator.next().value); // undefined
```


**Set Iterator 使用举例**
```js
const mySet = new Set(['apple', 'banana', 'orange']);

// 使用 for...of 循环遍历 Set
for (const item of mySet) {
  console.log(item);
}

// 使用 Set 迭代器手动遍历 Set
const setIterator = mySet.values();
let next = setIterator.next();
while (!next.done) {
  console.log(next.value);
  next = setIterator.next();
}
```
