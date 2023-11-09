**关键词**：computed 和 watch 区别

在 Vue 中，`computed` 和 `watch` 是两种用于监听和响应数据变化的方式。

`computed` 是计算属性，它是基于响应式数据进行计算得到的一个新的派生属性。计算属性可以接收其他响应式数据作为依赖，并且只有当依赖数据发生变化时，计算属性才会重新计算。计算属性的值会被缓存，只有在依赖数据变化时才会重新计算，这样可以提高性能。计算属性的定义方式是使用 `computed` 函数或者在 Vue 组件中使用 `get` 和 `set` 方法。

下面是一个使用计算属性的示例：

```javascript
import { reactive, computed } from 'vue';

const state = reactive({
  firstName: 'John',
  lastName: 'Doe'
});

const fullName = computed(() => {
  return `${state.firstName} ${state.lastName}`;
});

console.log(fullName.value); // 输出: "John Doe"

state.firstName = 'Mike'; // 修改firstName
console.log(fullName.value); // 输出: "Mike Doe"
```

`watch` 是用于监听特定响应式数据的变化，并在数据变化时执行相应的操作。`watch` 可以监听单个数据的变化，也可以监听多个数据的变化。当被监听的数据发生变化时，`watch` 的回调函数会被执行。`watch` 还支持深度监听对象的变化以及异步操作。

下面是一个使用 `watch` 的示例：

```javascript
import { reactive, watch } from 'vue';

const state = reactive({
  count: 0
});

watch(() => state.count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`);
});

state.count++; // 输出: "count 从 0 变为 1"
```

以上是 `computed` 和 `watch` 的基本用法。通过使用这两种方式，我们可以根据需要监听和响应数据的变化，实现更加灵活的逻辑和交互。
