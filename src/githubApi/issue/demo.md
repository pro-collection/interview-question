**执行结果是多少， 为什么？**

```js
var foo = function () {
console.log("foo1")
}
foo()

var foo = function () {
console.log("foo2")
}
foo()


function foo() {
console.log("foo1")
}
foo()

function foo() {
console.log("foo2")
}
foo()
```

**执行结果是：**
```
foo1
foo2
foo2
foo2
```

**原因:**
首先，变量`foo`被赋值为一个函数表达式`function () { console.log("foo1") }`，然后立即调用`foo()`，输出结果为`foo1`。

接下来，变量`foo`再次被赋值为另一个函数表达式`function () { console.log("foo2") }`，然后再次调用`foo()`，输出结果为`foo2`。

然后，函数声明`function foo() { console.log("foo1") }`被解析并提升到作用域的顶部，但由于变量`foo`已经被重新赋值为函数表达式，因此这个函数声明不会对变量`foo`产生影响。

最后，另一个函数声明`function foo() { console.log("foo2") }`也被解析并提升到作用域的顶部。然后再次调用`foo()`，由于变量`foo`指向最后一个函数声明，输出结果为`foo2`。这也说明了后面的函数声明覆盖了前面的函数声明。
