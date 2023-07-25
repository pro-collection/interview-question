**关键词**：Object.freeze、Object.freeze作用、深度冻结对象

**冻结对象**

要冻结一个 JavaScript 对象，以防止别人更改它，可以使用`Object.freeze()`方法。`Object.freeze()`方法会递归地冻结一个对象的所有属性，使其变为只读的，并防止更改、删除或添加新属性。以下是使用`Object.freeze()`方法冻结对象的示例：

```javascript
const obj = {
  prop1: 1,
  prop2: 'Hello',
};

Object.freeze(obj);

// 尝试更改属性的值
obj.prop1 = 2; // 不会生效，obj.prop1仍然为1

// 尝试删除属性
delete obj.prop2; // 不会生效，obj仍然包含prop2属性

// 尝试添加新属性
obj.prop3 = true; // 不会生效，obj不会添加新属性

console.log(obj);
```

在上述示例中，通过调用`Object.freeze(obj)`方法，将`obj`对象冻结，使其变为只读。此后，无论是更改、删除还是添加属性，都不会对对象产生任何影响。最后，通过`console.log(obj)`输出对象，可以看到对象保持不变，即使尝试进行更改。

需要注意的是，`Object.freeze()`方法只会冻结对象的直接属性，而不会冻结嵌套对象的属性。如果需要递归地冻结嵌套对象的属性，可以编写一个递归函数来处理。


**深度冻结**

要冻结嵌套属性，可以使用一个递归函数来处理。该函数会遍历对象的所有属性，并对每个属性进行冻结。以下是一个示例：

```javascript
function deepFreeze(obj) {
  // 首先冻结当前对象
  Object.freeze(obj);

  // 遍历对象的所有属性
  for (let key of Object.keys(obj)) {
    let value = obj[key];

    // 如果属性是对象类型，则递归调用deepFreeze函数
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  }

  return obj;
}

const obj = {
  prop1: 1,
  prop2: {
    nestedProp1: 'Hello',
    nestedProp2: [1, 2, 3],
  },
};

const frozenObj = deepFreeze(obj);

// 尝试更改嵌套属性的值
frozenObj.prop2.nestedProp1 = 'World'; // 不会生效，嵌套属性仍然为'Hello'

console.log(frozenObj);
```

在上述示例中，我们定义了一个名为`deepFreeze`的递归函数。该函数首先会对当前对象进行冻结（调用`Object.freeze(obj)`），然后遍历对象的所有属性。如果属性是对象类型，则递归调用`deepFreeze`函数，对嵌套对象进行冻结。

通过调用`deepFreeze(obj)`函数，我们将`obj`对象及其嵌套属性都冻结，并将结果赋值给`frozenObj`。尝试更改嵌套属性的值后，输出`frozenObj`，可以看到对象保持不变，嵌套属性的值没有被更改。

需要注意的是，`deepFreeze`函数并不会修改原始对象，而是返回一个新的冻结对象。如果需要修改原始对象，可以将冻结的属性逐个复制到一个新对象中。
