请实现一个函数 `deepOmitNil`，要求如下：

1. 功能：递归处理一个可能包含嵌套结构的对象（或数组），移除所有层级中值为 `null` 或 `undefined` 的属性
2. 要求：
   - 支持对象和数组的嵌套结构
   - 对于对象：移除值为 `null`/`undefined` 的属性，保留其他属性并继续递归处理属性值
   - 对于数组：递归处理每个元素，同时过滤掉值为 `null`/`undefined` 的元素
   - 不改变原始数据结构，返回处理后的新数据
3. 示例：

   ```javascript
   // 输入
   const data = {
     name: 'test',
     age: null,
     info: {
       address: undefined,
       contact: {
         phone: null,
         email: 'test@example.com'
       }
     },
     list: [1, null, { id: undefined, value: 2 }, undefined, 3]
   };

   // 输出
   {
     name: 'test',
     info: {
       contact: {
         email: 'test@example.com'
       }
     },
     list: [1, { value: 2 }, 3]
   }
   ```

请用 JavaScript 实现该函数，可使用 Lodash 工具库辅助开发。

### 解法

```javascript
function deepOmitNil(value) {
  // 处理null和undefined的情况
  if (value === null || value === undefined) {
    return null;
  }

  // 处理数组：递归处理每个元素，并过滤掉null和undefined
  if (Array.isArray(value)) {
    return value.map((item) => deepOmitNil(item)).filter((item) => item !== null && item !== undefined);
  }

  // 处理普通对象：检查是否为纯粹的对象（排除数组、null等）
  if (Object.prototype.toString.call(value) === "[object Object]") {
    const result = {};
    // 遍历对象自身属性
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const processedValue = deepOmitNil(value[key]);
        if (processedValue !== null && processedValue !== undefined) {
          result[key] = processedValue;
        }
      }
    }
    return result;
  }

  // 其他类型直接返回（如字符串、数字、布尔值等）
  return value;
}

// 示例用法
const data = {
  name: "test",
  age: null,
  info: {
    address: undefined,
    contact: {
      phone: null,
      email: "test@example.com",
    },
  },
  list: [1, null, { id: undefined, value: 2 }, undefined, 3],
};

console.log(deepOmitNil(data));
```
