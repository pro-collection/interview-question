**关键词**：防止对象篡改

在 JavaScript 中，可以通过以下几种方式防止对象被篡改：

**一、使用`Object.freeze()`**

1. 功能：

   - 完全冻结一个对象，使其不能添加新属性、删除现有属性或修改现有属性的值。
   - 对嵌套对象也会进行深度冻结。

2. 示例：

   ```javascript
   const obj = {
     prop1: "value1",
     prop2: { nestedProp: "nestedValue" },
   };
   Object.freeze(obj);

   // 以下操作都会抛出错误
   obj.newProp = "newValue";
   delete obj.prop1;
   obj.prop1 = "newValue1";
   obj.prop2.nestedProp = "newNestedValue";
   ```

**二、使用`Object.seal()`**

1. 功能：

   - 密封一个对象，阻止添加新属性和删除现有属性，但可以修改现有属性的值。
   - 对嵌套对象不进行深度密封。

2. 示例：

   ```javascript
   const obj = {
     prop1: "value1",
     prop2: { nestedProp: "nestedValue" },
   };
   Object.seal(obj);

   // 以下操作会抛出错误或不被允许
   obj.newProp = "newValue";
   delete obj.prop1;

   // 这个操作是允许的
   obj.prop1 = "newValue1";
   obj.prop2.nestedProp = "newNestedValue";
   ```

**三、使用`const`声明对象引用**

1. 功能：

   - 使用`const`声明的变量不能被重新赋值，但对象本身的属性仍然可以被修改，除非使用上述冻结或密封的方法。

2. 示例：

   ```javascript
   const obj = { prop: "value" };
   // 以下操作会报错
   obj = { newProp: "newValue" };

   // 这个操作是允许的
   obj.prop = "newValue1";
   ```

**四、使用代理（Proxy）进行拦截**

1. 功能：

   - 通过创建一个代理对象，可以拦截对目标对象的各种操作，如属性访问、赋值、删除等，并根据需要进行控制。

2. 示例：

   ```javascript
   const targetObject = { prop: "value" };
   const handler = {
     set(target, key, value) {
       throw new Error("Object is immutable.");
     },
     deleteProperty(target, key) {
       throw new Error("Object is immutable.");
     },
   };
   const immutableObject = new Proxy(targetObject, handler);

   // 以下操作都会抛出错误
   immutableObject.prop = "newValue";
   delete immutableObject.prop;
   ```
