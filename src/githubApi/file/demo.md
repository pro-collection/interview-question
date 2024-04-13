`Proxy` 和 `Reflect` 是 ES6 (ECMAScript 2015) 中引入的两个不同的构造函数，它们密切相关，通常在某些操作中一起使用。

1. **Proxy**：
   `Proxy` 对象用于定义基本操作的自定义行为，例如属性查找、赋值、枚举、函数调用等。当你对一个`Proxy`对象执行这些操作时，你可以拦截并重新定义这些操作的行为。

   下面是一些你可以使用`Proxy`拦截的操作:

   - `get`：读取属性值
   - `set`：设置属性值
   - `has`：`in`操作符
   - `deleteProperty`：`delete`操作符
   - `apply`：调用一个函数
   - 诸如此类的其他捕获器（handlers）

2. **Reflect**：
   `Reflect`对象与`Proxy`捕获器（handlers）的方法一一对应。其目的是提供默认行为，对相应的对象操作进行默认的行为操作。在很多情况下，`Reflect`的方法与对应的直接对象操作是相同的。

   这里是一些`Reflect`提供的方法的例子：

   - `Reflect.get()`：获取对象属性的值，类似于`obj[prop]`
   - `Reflect.set()`：设置对象属性的值，类似于`obj[prop] = value`
   - `Reflect.has()`：类似于`prop in obj`
   - `Reflect.deleteProperty()`：类似于`delete obj[prop]`
   - `Reflect.apply()`：调用一个函数
   - 其他与`Proxy`捕获器相对应的方法

**两者的关系**：
`Proxy`和`Reflect`的关系体现在它们共同协作时。在`Proxy`的捕获器函数中，开发者可以调用对应的`Reflect`方法，以实现默认的行为，同时加入自己的操纵和侧面逻辑。`Reflect`方法提供了一种方便的方式来保持默认行为，而不需要手动编写这些语义。

例如，当在`Proxy`捕获器中捕获属性的读取行为时，使用`Reflect.get()`可以非常容易地调用相应对象的默认读取行为：

```javascript
let obj = {
  a: 1,
  b: 2,
  c: 3,
};

let p = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log(`读取了属性 ${prop}`);
    return Reflect.get(target, prop, receiver); // 调用默认操作
  },
  set(target, prop, value, receiver) {
    console.log(`将属性 ${prop} 设置为 ${value}`);
    return Reflect.set(target, prop, value, receiver); // 调用默认操作
  },
});

console.log(p.a); // 读取了属性 a，返回 1
p.b = 4; // 将属性 b 设置为 4
```

上面的例子中，通过`Reflect`对象的方法，我们不仅可以保持默认的`get`和`set`行为，还可以在这个过程之前或之后添加自己的逻辑。这样的设计使得代理行为的实现既安全又易于管理。

总而言之，`Proxy`和`Reflect`共同提供了一种强大的机制来拦截和定义基本的 JavaScript 操作，`Reflect`能提供操纵对象的默认方法，而`Proxy`则允许我们根据需要来定义这些操作的新行为。

> 以前对两者进行过对比， 但是没有讨论起关联关系。
> 以前对比的文章：https://github.com/pro-collection/interview-question/issues/8
