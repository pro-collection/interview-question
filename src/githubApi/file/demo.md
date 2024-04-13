> 作者备注：  
> 实话实说， 这个问题真的很冷门。 如果有面试官问到这个问题了，感觉就是坏。  
> 但是作为一个知识点儿， 还是有一丢丢意思。 所以顺手就记录下来了。

在 JavaScript 中，严格模式禁用了 with 语句，主要是出于以下三个原因：

1. 性能问题：使用 with 语句会为 JavaScript 解释器带来优化难题。当使用 with 语句时，解释器在编译阶段无法确定对象属性的作用域，因此无法在编译时进行优化。这意味着在执行时需要做额外的作用域查找，可能会降低代码的执行效率。

2. 代码可读性和维护性：with 语句可以将一个对象的所有属性和方法直接引入到当前作用域中，这可能会带来潜在的命名冲突。如果一个属性在 with 语句内部和外部作用域都有定义，编写和维护代码的人员可能会对此感到困惑。因此，这种语句的使用可以使代码的可读性和维护性降低。

3. 编码错误可能性：with 语句改变了正常的作用域链查找规则，这可能会导致意外的变量分配。例如，如果 with 对象不包含某个属性，那么它可能意外地引用或创建一个全局变量，导致难以追踪的错误。

**其中前两个原因还是比较好理解的，第三个原因， 「编码错误可能性」就需要好好解释下了：**

这里 with 语法， 我就不过多讲解了哈。 如果不知道语法的同学， 我这儿丢一个传送门：

下面的例子展示了`with`语句如何导致潜在的编码错误：

考虑下面的对象和`with`语句：

```javascript
var person = {
  name: "Alice",
  age: 25,
};

function updatePerson(person) {
  with (person) {
    name = "Bob"; // 意图是更新person的name属性
    age = 30; // 意图是更新person的age属性
  }
}

updatePerson(person);

console.log(person); // 输出: { name: 'Bob', age: 30 }，这里看起来没问题
```

看起来这段代码没有问题，并且确实更新了`person`对象；但问题出现在如果`with`中的属性并不存在于对象中：

```javascript
var person = {
  name: "Alice",
  age: 25,
};

function createNewPerson() {
  var name = "Charlie";
  var age = 20;

  with (person) {
    name = "David"; // 本意是更新person的name属性
    age = 35; // 本意是更新person的age属性
    // 由于person没有phone属性，所以这将创建一个全局变量phone
    phone = "123-456-7890";
  }

  // 调用者可能预期这里的name和age还是'Charlie'和20 - 因为 with 预期是更改 person 的属性；
  console.log(name, age); // 输出: 'David' 35，而非'Charlie', 20
}

createNewPerson();

console.log(window.phone); // 输出: '123-456-7890'
```

在这个例子里：

- `name`和`age`都是局部变量，但它们被`with(person)`覆盖了，因为`person`对象确实有这样的属性。
- `phone`属性不在`person`对象中，`with`语句创建了一个全局变量`phone`。

这展示了`with`语句如何引入两个潜在的陷阱：

1. **局部变量被意外覆盖：** 函数内部的`name`和`age`变量被覆盖，因为`with`语句使得`person`对象的属性在作用域链中的优先级高于局部变量。

2. **意外的全局变量：** 因为`person`对象中没有`phone`属性，所以`phone`变成了一个全局变量。

这些情况可能会导致难以追踪的错误和未预期的副作用，这正是为何严格模式中不允许使用`with`语句的原因之一。在严格模式中，代码会因试图使用`with`而抛出语法错误，上述的误导性行为就不会发生。
