**关键词**：Object.is()、js 相等比较

`Object.is()` 方法和比较操作符 "==="、"==" 用于比较两个值的相等性，但它们在比较方式和行为上有一些区别。

1. `Object.is()` 方法是严格相等比较，而 "===" 操作符也是严格相等比较，但 "==" 操作符是相等比较。
    - 严格相等比较（`===`）要求比较的两个值在类型和值上完全相同才会返回 `true`。
    - 相等比较（`==`）会进行类型转换，将两个值转换为相同类型后再进行比较。

2. `Object.is()` 方法对于一些特殊的值比较更准确：
    - 对于 NaN 和 NaN 的比较，`Object.is(NaN, NaN)` 返回 `true`，而 `NaN === NaN` 返回 `false`。
    - 对于 +0 和 -0 的比较，`Object.is(+0, -0)` 返回 `false`，而 `+0 === -0` 返回 `true`。

下面是一些示例：

```javascript
console.log(Object.is(1, 1));  // true
console.log(Object.is('foo', 'foo'));  // true
console.log(Object.is(true, true));  // true

console.log(Object.is(null, null));  // true
console.log(Object.is(undefined, undefined));  // true

console.log(Object.is(NaN, NaN));  // true
console.log(NaN === NaN);  // false

console.log(Object.is(+0, -0));  // false
console.log(+0 === -0);  // true

console.log(Object.is({}, {}));  // false
console.log({} === {});  // false
```

`Object.is()` 方法更精确地比较两个值的相等性，尤其是在处理一些特殊的值时，而 "===" 操作符和 "==" 操作符则具有不同的类型转换行为和比较规则。
