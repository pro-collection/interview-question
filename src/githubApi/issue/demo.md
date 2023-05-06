**关键词**：new Function 概念、js new Function 执行性能、js new Function 使用场景

### 基本概念

`new Function()` 是 JavaScript 中的一个构造函数，它可以实例化一个新的函数对象并返回。该函数对象可以使用传递给 `new Function()` 的字符串参数作为函数体，并使用其他传递给它的参数作为函数参数，从而动态创建一个可执行的函数。

具体来说，`new Function()` 构造函数可以接受多个字符串参数作为函数的参数和函数体，其参数形式如下：

```
new Function ([arg1[, arg2[, ...argn]],] functionBody)
```

其中，`arg1, arg2, ..., argn` 为函数的参数列表，`functionBody` 为函数体的字符串表示。当调用 `new Function()` 函数时，JavaScript 引擎会将 `arg1, arg2, ..., argn` 所表示的参数和 `functionBody` 所表示的函数体组合成一个新的函数对象，并将该对象返回。

**举例**

下面是一个简单的 `new Function()` 的使用示例，它使用 `new Function()` 构造函数动态创建一个函数对象，并将该对象作为变量 `add` 的值进行赋值：

```
const add = new Function('a', 'b', 'return a + b;');
console.log(add(2, 3)); // 5
```

上述代码中，`new Function('a', 'b', 'return a + b;')` 创建了一个新的函数对象，其中 `'a'` 和 `'b'` 是函数的参数列表，`'return a + b;'` 是函数的实现代码。然后，该函数对象被赋值给变量 `add`。最后，调用 `add(2, 3)` 执行该函数，返回 `5`。

需要注意的是，`new Function()` 构造函数不能访问其上下文中的变量和函数，因此在使用时需要特别注意作用域的限制。同时，由于 `new Function()` 构造函数的执行权限较为灵活，因此在使用时需要仔细检查并确保其输入参数的合法性和安全性。


### new Function 和 eval 的区别

虽然 `new Function()` 和 `eval()` 都可以执行字符串形式的 JavaScript 代码，但是它们在执行方式、使用场景和安全性方面还是有很大的区别的。

下面是 `new Function()` 和 `eval()` 的主要区别：

1. 执行方式不同：`new Function()` 构造函数创建的函数对象只会在其被调用时才会执行，而 `eval()` 函数则立即执行其参数中的 JavaScript 代码，并返回其中的值（如果有）。

2. 作用域不同：`new Function()` 构造函数创建的函数对象没有访问父作用域的能力，只能访问自己的局部变量和全局变量；而 `eval()` 函数则可以访问其自身函数作用域和父作用域的变量和函数，因此具有更高的灵活性和不可预知性。

3. 安全性不同：由于 `new Function()` 构造函数定义的函数对象是在严格的函数作用域下运行的，因此其代码不会改变或访问父作用域中的变量。因此，使用 `new Function()` 构造函数创建函数对象时，可以更好地保证其安全性。而 `eval()` 函数则无法保证代码的安全性，因为它可以访问并改变父作用域中的变量，从而具有更高的攻击风险。

### new Function 性能

与 `eval()` 相比，`new Function()` 函数具有更好的性能。这是因为 `new Function()` 函数在编译时会创建一个新的函数对象，不会像 `eval()` 函数一样将代码注入到当前作用域中。相反，它只在需要时才编译并执行代码，因此在常规情况下，`new Function()` 的性能比 `eval()` 更好。

另外，由于 `new Function()` 在全局作用域外部定义新的函数，可以更好地掌控执行环境，因此我们可以利用 `new Function()` 函数的局部性，使其不仅取代 `eval()`，而且在一定程度上比自执行函数和即时函数表达式引入更少的全局变量。

不过需要注意的是，如果在一个循环中频繁地使用 `new Function()`，或者在函数体内创建过多的嵌套函数，可能会导致性能下降。因此，当需要使用 `new Function()` 函数时，应该尽量减少不必要的重复调用，并注意代码的优化和缓存。


### new Function 使用场景

`new Function()` 的使用场景主要是动态生成 Javascript 代码的情况。由于它可以使用字符串形式作为函数体，并接受可变数量的参数，因此很适合在需要动态生成 JavaScript 代码的场景中使用。下面列举一些常见的使用场景：

1. 动态生成函数：使用 `new Function()` 可以动态生成函数，有时候这种方式比使用函数表达式更加灵活。

2. 模板引擎：某些模板引擎使用 `new Function()` 动态生成 JavaScript 代码来进行文本渲染和数据绑定。

3. 解析 JSON：从服务端获取 JSON 数据时，可以使用 `new Function()` 将其转换为具有更好可读性的 JavaScript 对象。
举例：
```js
const json = '{"name": "张三", "age": "18", "gender": "男"}';
const parseJson = new Function(`return ${json}`);

console.log(parseJson()); // 输出：{name: "张三", age: "18", gender: "男"}
```

4. 在浏览器中查找或执行某些 DOM 元素：可以将 JavaScript 代码传递给 `new Function()` 进行动态执行和查找。

需要注意的是，由于 `new Function()` 可以动态生成和执行任意 JavaScript 代码，因此其安全性和风险需要仔细考虑和评估。在使用 `new Function()` 时，应该避免用于可疑的或不可信任的代码执行，并严格控制传递给函数构造函数的参数，以避免潜在的安全漏洞。
