在浏览器中，上面的代码将输出 `Window` 对象。这是因为，当 `obj.getThis()` 方法被调用时，它返回一个函数，然后该函数被立即调用。

当这个函数被调用时，它是在全局上下文中被调用的，因此 `this` 关键字指向全局对象 `Window`。

需要注意的是，在这个例子中，`obj.getThis()` 返回的是一个普通函数，而不是箭头函数。如果将返回的函数改为箭头函数，那么 `this` 将会绑定到外层作用域的 `obj` 对象上。例如：

```javascript
let obj = {
  getThis: function() {
    return () => {
      console.log(this);
    };
  },
};
obj.getThis()(); // 输出 {getThis: ƒ}
```

在这种情况下，输出结果将是 `{getThis: ƒ}`，因为箭头函数的 `this` 关键字被绑定到外层的 `obj` 对象上。