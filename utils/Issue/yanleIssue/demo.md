在 JavaScript 中，如果一个对象要被 for...of 迭代，那么它必须是可迭代的。可迭代对象是一种具有 Symbol.iterator 方法的对象，该方法返回一个迭代器对象，该迭代器对象实现了 next() 方法，每次调用 next() 方法都返回一个包含 value 和 done 属性的对象，用于迭代对象的每个元素。

因此，要使一个对象 iterable 化，需要实现一个 Symbol.iterator 方法。该方法应该返回一个迭代器对象，这个迭代器对象应该实现 next() 方法，用于返回迭代对象的每个元素。

**举一个例子**下面是一个简单的示例，演示如何将一个普通对象 iterable 化：
```js
const myObj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const item of myObj) {
  console.log(item);
}
// 输出：1, 2, 3
```

**再举一个例子**，比如我们有一个对象，里面存储了一些学生的信息，我们希望能够使用 for...of 循环遍历每个学生信息：
```js
const students = {
  Alice: { age: 18, gender: 'female', score: 90 },
  Bob: { age: 19, gender: 'male', score: 85 },
  Charlie: { age: 20, gender: 'male', score: 95 }
};

students[Symbol.iterator] = function* () {
  const keys = Object.keys(this);
  for (let i = 0; i < keys.length; i++) {
    yield [keys[i], this[keys[i]]];
  }
};

for (const [name, info] of students) {
  console.log(`${name}: ${info.age} ${info.gender} ${info.score}`);
}
```

这样我们就可以使用 for...of 循环遍历学生信息对象中的每个学生信息了。

