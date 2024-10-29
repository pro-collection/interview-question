具体描述如下

```js
// 实现 createObject 函数， 用例如下；

// 比如：
const obj = createObject({ name: "name" });

obj.name = "name2"; // 错误， 禁止修改；
obj.set("name", "name2"); // 正确方式， 允许修改；
obj.set("address.info", "chongqing"); // 正确方式， 允许添加属性。
```

**实现**
