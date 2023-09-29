**关键词**：Object对象api

| 方法/属性                      | 描述                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `Object.keys(obj)`             | 返回一个由给定对象的所有可枚举自身属性的名称组成的数组         |
| `Object.values(obj)`           | 返回一个给定对象所有可枚举属性值的数组                         |
| `Object.entries(obj)`          | 返回一个给定对象自身可枚举属性的 [key, value] 数组            |
| `Object.assign(target, ...sources)` | 将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象   |
| `Object.create(proto, [propertiesObject])` | 使用指定的原型对象和属性创建一个新对象                      |
| `Object.defineProperty(obj, prop, descriptor)` | 定义对象中的新属性或修改现有属性的配置                      |
| `Object.getOwnPropertyDescriptor(obj, prop)` | 返回指定对象上一个自有属性对应的属性描述符                  |
| `Object.freeze(obj)`           | 冻结一个对象，使其属性无法修改、添加或删除                     |
| `Object.is(value1, value2)`    | 判断两个值是否相同                                           |
| `Object.seal(obj)`             | 封闭一个对象，防止向对象添加新属性，但允许修改或删除现有属性    |
| `Object.getPrototypeOf(obj)`   | 返回指定对象的原型（`__proto__`）                            |
| `Object.setPrototypeOf(obj, proto)` | 设置指定对象的原型（`__proto__`）                            |
