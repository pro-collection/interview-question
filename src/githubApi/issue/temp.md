在实现vue双向数据绑定之前，先了解Proxy相关的概念和用法

### proxy概念

`Proxy` 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

### 一些术语

* handle

包含捕捉器（trap）的占位符对象，可译为处理器对象

* traps

提供属性访问的方法。这类似于操作系统中捕获器的概念。

* target

被 Proxy 代理虚拟化的对象。

### 语法

`const p = new Proxy(target, handler)`

* target

要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

* handle

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

### 使用proxy实现数据劫持

```javascript
let data = {
    name: YoLinDeng,
    height: '176cm'
}

const p = new Proxy(data, {
    get(target, prop) {
        return Reflect.get(...arguments)
    },
    set(target, prop, newValue) {
        return Reflect.set(...arguments)
    }
})
```

