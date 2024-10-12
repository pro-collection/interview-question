**关键词**：iterator 对象

在 JavaScript 中，Iterator（迭代器）对象具有以下特征：

**一、定义与目的**

1. **实现特定迭代行为**：
   - Iterator 对象是为了实现对可迭代对象（如数组、字符串、集合等）的遍历操作而设计的。它提供了一种标准化的方式来依次访问可迭代对象中的元素。

**二、主要特征**

1. **具有`next()`方法**：

   - Iterator 对象必须有一个`next()`方法。每次调用这个方法，它会返回一个对象，该对象包含两个属性：
     - `value`：表示当前迭代位置的元素值。如果迭代已经完成，这个值为`undefined`。
     - `done`：一个布尔值，表示迭代是否已经完成。如果迭代完成，`done`为`true`；否则为`false`。
   - 例如：

   ```javascript
   const iterable = [1, 2, 3];
   const iterator = iterable[Symbol.iterator]();
   console.log(iterator.next()); // { value: 1, done: false }
   console.log(iterator.next()); // { value: 2, done: false }
   console.log(iterator.next()); // { value: 3, done: false }
   console.log(iterator.next()); // { value: undefined, done: true }
   ```

2. **与可迭代对象关联**：

   - Iterator 对象通常是由可迭代对象通过调用其`Symbol.iterator`方法生成的。不同的可迭代对象可以生成不同的 Iterator 对象，但它们都遵循相同的`next()`方法约定。
   - 例如，数组的`Symbol.iterator`方法会返回一个 Iterator 对象，用于遍历数组的元素。

3. **单向遍历**：

   - Iterator 对象通常只能进行单向遍历，即从可迭代对象的起始位置依次访问到结束位置，不能反向遍历。一旦迭代完成，再次调用`next()`方法将始终返回`{ value: undefined, done: true }`。

4. **可用于各种迭代场景**：
   - Iterator 对象可以与`for...of`循环、扩展运算符（`...`）、解构赋值等语言特性一起使用，使得对可迭代对象的遍历更加简洁和方便。
   - 例如：
   ```javascript
   const iterable = [1, 2, 3];
   for (const value of iterable) {
     console.log(value);
   }
   ```
   - 这里的`for...of`循环内部会自动调用可迭代对象的`Symbol.iterator`方法获取 Iterator 对象，并依次调用其`next()`方法来遍历元素。

Iterator 对象在 JavaScript 中提供了一种灵活和统一的方式来遍历可迭代对象，通过`next()`方法和特定的返回值格式，实现了对可迭代对象的有序访问和迭代控制。
