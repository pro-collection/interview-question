**关键词**：深度遍历对象

实现一个这样的函数，我们需要考虑几个关键点：

1. **深度遍历**：使用递归遍历对象的所有层级。
2. **修改数据**：在遍历过程中允许修改对象的数据。
3. **返回新对象**：保持原对象不变，对每个属性或值进行操作，将修改后的结果存储在新的对象中返回。

以下是一个简单示例，展示了如何实现上述功能：

```javascript
function deepTraverseAndModify(object, modifierFunction) {
  // 验证 object 是对象或数组，否则直接返回
  if (typeof object !== "object" || object === null) {
    return object;
  }

  // 如果传入的是数组，遍历数组每个元素
  if (Array.isArray(object)) {
    return object.map((item) => deepTraverseAndModify(item, modifierFunction));
  }

  // 初始化一个新对象来存储修改后的对象
  const modifiedObject = {};

  // 遍历对象的每个属性
  Object.keys(object).forEach((key) => {
    const originalValue = object[key];

    // 判断属性值是否是对象或数组，如果是，递归调用自身，否则直接应用修改函数
    const modifiedValue =
      typeof originalValue === "object" && originalValue !== null
        ? deepTraverseAndModify(originalValue, modifierFunction)
        : modifierFunction(originalValue, key);

    modifiedObject[key] = modifiedValue;
  });

  return modifiedObject;
}

// 使用示例
const originalObject = {
  a: 1,
  b: [1, 2, { c: true, d: [3, 4] }],
  e: { f: 5, g: 6 },
};

const modifiedObject = deepTraverseAndModify(originalObject, (value, key) => {
  // 示例：将所有数字加 10
  if (typeof value === "number") {
    return value + 10;
  }
  return value;
});

console.log("Original:", originalObject);
console.log("Modified:", modifiedObject);
```

在这个例子中：

- `deepTraverseAndModify` 函数通过递归遍历接受两个参数：要遍历的对象和一个修改函数（`modifierFunction`），这个修改函数对每个遇到的值进行操作。
- 如果当前项是对象或数组，函数会递归调用自身；否则，会对其值应用 `modifierFunction` 函数进行修改。
- 使用 `Object.keys()` 遍历对象属性，并通过映射修改值，确保返回一个新的对象，不会修改原始输入。

通过这种方式，我们不仅可以深度遍历 JavaScript 对象，还能在遍历过程中修改对象的数据，并最终得到一个全新的对象。
