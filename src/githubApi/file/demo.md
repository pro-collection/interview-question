**关键词**：结构复制对象

**浅拷贝**

举例：

```javascript
const obj = {
  prop1: "value1",
  prop2: {
    nestedProp: "nestedValue",
  },
};

// 使用扩展运算符进行复制
const obj2 = { ...obj };

console.log("原始对象 obj:", obj);
console.log("复制后的对象 obj2:", obj2);

// 修改基本类型属性
obj2.prop1 = "newValue1";
console.log("修改基本类型属性后：");
console.log("原始对象 obj:", obj);
console.log("复制后的对象 obj2:", obj2);

// 修改嵌套对象的属性
obj2.prop2.nestedProp = "newNestedValue";
console.log("修改嵌套对象属性后：");
console.log("原始对象 obj:", obj);
console.log("复制后的对象 obj2:", obj2);
```

解释如下：

1. 首先定义了一个对象`obj`，它包含一个基本类型属性`prop1`和一个嵌套对象属性`prop2`。
2. 使用扩展运算符`{...obj}`创建了一个新的对象`obj2`，这看起来像是对`obj`进行了复制。
3. 当修改`obj2`的基本类型属性`prop1`时，原始对象`obj`的`prop1`不受影响。这是因为基本类型的值在复制时是按值复制的。
4. 然而，当修改`obj2`的嵌套对象属性`prop2.nestedProp`时，原始对象`obj`的`prop2.nestedProp`也被修改了。这是因为扩展运算符对于嵌套对象只是复制了引用，而不是创建一个全新的嵌套对象副本，所以这是浅拷贝的行为。
