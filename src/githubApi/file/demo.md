**关键词**：响应式 api

在 Vue 3 的响应式系统中，处理深层嵌套的数据时，`ref` 和 `reactive` 在行为上有一些细微但重要的区别，特别是当涉及到对象、数组以及 JavaScript 内置的数据结构（如 Map 和 Set）时。这些区别主要体现在如何使嵌套的数据成为响应式的，以及如何维护这些响应性。

### 处理深层嵌套的数据

无论是使用 `ref` 还是 `reactive`，Vue 会尝试使给定的数据结构及其嵌套的所有子结构变成响应式的。但是，具体的实现机制有所不同。

#### `reactive`

- `reactive` 对象默认深度响应式。当你使用 `reactive` 使一个对象变成响应式时，这个对象的所有嵌套对象和数组也会自动变成响应式的。这意味着你可以在任意深度的嵌套数据上进行修改，并且这些修改将会触发视图更新。
- 对于 JavaScript 的内置数据结构，如 Map 和 Set，Vue 3 也提供了响应式支持，但它们必须通过 `reactive` 方法来创建或转换为响应式的。

```javascript
const state = reactive({
  nested: {
    count: 0,
  },
  numbers: [1, 2, 3],
  map: new Map(),
});

state.nested.count++; // 触发视图更新
state.numbers.push(4); // 触发视图更新
state.map.set("key", "value"); // 触发视图更新
```

#### `ref`

- 使用 `ref` 创建响应式数据时，如果 `ref` 被赋值为一个对象或数组，Vue 会将该对象或数组内部转换为深度响应式。然而，这种转换仅发生在赋值操作时，如果后续对该对象或数组进行再嵌套，新增的嵌套不会自动转换为响应式。
- 对于内置数据结构如 Map 和 Set，`ref` 可以存储它们，但不会使它们或其内容变成响应式的。如果你需要在模板中直接绑定这些数据结构的响应式变化，使用 `reactive` 会是更好的选择。

```javascript
const nestedObj = ref({
  nested: {
    count: 0,
  },
});

nestedObj.value.nested.count++; // 触发视图更新

const map = ref(new Map());
map.value.set("key", "value"); // 不会触发视图更新，除非重新赋值给 map.value
```

### 总结

当处理深层嵌套的对象、数组或内置数据结构时：

- `reactive` 默认提供深度响应式，并且可以使 Map、Set 等内置数据结构变为响应式。
- `ref` 在赋值对象或数组时自动将其转换为响应式，但不适用于 Map 或 Set 等内置数据结构的深度响应。

一般情况下，对于复杂或深层嵌套的数据结构，`reactive` 更加适合。对于基本数据类型或不太复杂的嵌套数据，`ref` 可以提供方便的响应式转换。
