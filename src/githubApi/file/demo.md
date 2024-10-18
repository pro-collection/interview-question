**关键词**：vue3 监听数组变化

在 Vue 3 中，可以通过以下几种方式监听数组的变化：

**一、使用`watch`函数监听数组引用变化**

1. 直接监听数组变量：

   - 可以使用`watch`函数来监听一个数组变量的变化。当数组被重新赋值时，`watch`会触发。

   ```javascript
   import { reactive, watch } from "vue";

   const state = reactive({
     arr: [1, 2, 3],
   });

   watch(
     () => state.arr,
     (newValue, oldValue) => {
       console.log("数组变化了", newValue, oldValue);
     }
   );
   ```

   - 在这个例子中，当`state.arr`数组被重新赋值时，`watch`函数中的回调函数会被执行，打印出新旧值。

2. 监听特定属性的数组：

   - 如果你只想监听数组中的特定属性，可以使用`watch`函数结合函数返回值来实现。

   ```javascript
   import { reactive, watch } from "vue";

   const state = reactive({
     arr: [1, 2, 3],
     otherProperty: "some value",
   });

   watch(
     () => state.arr.length,
     (newValue, oldValue) => {
       console.log("数组长度变化了", newValue, oldValue);
     }
   );
   ```

   - 这里监听了数组的长度属性，当数组的长度发生变化时，回调函数会被执行。

**二、使用`watchEffect`函数自动追踪数组变化**

`watchEffect`函数会立即执行传入的函数，并在其依赖的响应式数据发生变化时重新执行。

```javascript
import { reactive, watchEffect } from "vue";

const state = reactive({
  arr: [1, 2, 3],
});

watchEffect(() => {
  console.log("数组变化了", state.arr);
});
```

在这个例子中，每当`state.arr`数组发生变化时，`watchEffect`中的函数会自动重新执行，打印出数组的当前值。

**三、使用`computed`计算属性间接监听数组变化**

可以通过创建一个计算属性来间接监听数组的变化。

```javascript
import { reactive, computed } from "vue";

const state = reactive({
  arr: [1, 2, 3],
});

const arrLength = computed(() => state.arr.length);

arrLength.value; // 触发计算属性的求值

// 当数组变化时，计算属性会自动更新，你可以在其他地方监听这个计算属性的变化
```

可以在需要的地方监听计算属性`arrLength`的变化，从而间接得知数组的变化。

---

Vue 3 对于数组的某些操作（如`push`、`pop`、`shift`、`unshift`、`splice`等）是可以自动响应的，但对于直接通过索引赋值等操作可能需要特殊处理才能正确响应。
