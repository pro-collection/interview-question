**关键词**：侦听器 watch

Vue 3 提供了一个灵活的响应式系统，其中 `watch` 函数是实现细粒度数据观察和响应的重要工具。`watch` 能够侦听 Vue 应用中的响应式数据的变化，并在数据变化时执行相应的回调函数。这个功能在 Vue 2 中以 `watch` 选项的形式存在，而在 Vue 3 的组合式 API 中，则是作为 `watch` 函数来使用。

### 使用 `watch` 侦听 Refs

`watch`函数可以用来侦听一个引用类型（ref）的变化：

```javascript
import { ref, watch } from "vue";

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`新值：${newValue}，旧值：${oldValue}`);
});
```

在上面的例子中，当 `count` 的值变化时，回调函数就会被调用，并打印新旧值。

### 使用 `watch` 侦听响应式对象

除了侦听引用类型，`watch` 还可以侦听响应式对象的属性变化：

```javascript
import { reactive, watch } from "vue";

const state = reactive({ count: 0 });

watch(
  () => state.count,
  (newValue, oldValue) => {
    console.log(`新值：${newValue}，旧值：${oldValue}`);
  }
);
```

记住，当侦听响应式对象的某个属性时，你需要使用一个函数来返回这个属性的当前值。

### 侦听多个源

`watch` 还可以同时侦听多个数据源：

```javascript
watch([ref1, ref2], ([newVal1, newVal2], [oldVal1, oldVal2]) => {
  // 处理逻辑
});
```

### 深度侦听

通过设置 `watch` 的选项 `{ deep: true }`，可以进行深度侦听，即侦听对象内嵌属性的变化：

```javascript
watch(obj, callback, { deep: true });
```

### 清理和停止监听

`watch` 函数返回一个停止监听的函数，可以用来在合适的时机停止侦听：

```javascript
const stopWatching = watch(dataSource, callback);
// 停止侦听
stopWatching();
```

### watchEffect

除了 `watch`，Vue 3 也引入了 `watchEffect` 函数。`watchEffect` 自动跟踪其回调函数中使用的响应式引用和响应式对象的属性，并在它们变化时运行回调函数。它不需要显式声明侦听的数据源，这让它更简单易用，但在某些情况下，它可能不如 `watch` 那么精确控制。
