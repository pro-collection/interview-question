**关键词**：ref、toRef、toRefs 区别

在 Vue 3 中，`ref`、`toRef` 和 `toRefs` 是 Vue Composition API 提供的函数，用于处理响应式数据。

1. `ref(value: T): Ref<T>`：创建一个响应式数据引用。接收一个初始值作为参数，并返回一个包含该值的响应式引用。`Ref` 是一个包装对象，它的 `.value` 属性用于访问和修改引用的值。

使用 `ref` 创建响应式数据引用：
```javascript
import { ref } from 'vue';

const count = ref(0); // 创建一个初始值为 0 的响应式引用

console.log(count.value); // 输出: 0

count.value++; // 修改引用的值
console.log(count.value); // 输出: 1
```

2. `toRef(object: object, key: string | symbol): ToRef`：创建一个指向另一个响应式对象的响应式引用。接收一个响应式对象和其属性名作为参数，并返回一个指向该属性的响应式引用。`ToRef` 是一个只读的响应式引用。

使用 `toRef` 创建指向另一个响应式对象的引用：
```javascript
import { ref, reactive, toRef } from 'vue';

const state = reactive({
  name: 'John',
  age: 30
});

const nameRef = toRef(state, 'name'); // 创建指向 state.name 的引用

console.log(nameRef.value); // 输出: "John"

state.name = 'Mike'; // 修改原始对象的属性值
console.log(nameRef.value); // 输出: "Mike"

nameRef.value = 'Amy'; // 修改引用的值
console.log(state.name); // 输出: "Amy"
```

3. `toRefs(object: T): ToRefs<T>`：将一个响应式对象的所有属性转换为响应式引用。接收一个响应式对象作为参数，并返回一个包含所有属性的响应式引用对象。`ToRefs` 是一个对象，每个属性都是一个只读的响应式引用。

使用 `toRefs` 将对象的所有属性转换为响应式引用：
```javascript
import { reactive, toRefs } from 'vue';

const state = reactive({
  name: 'John',
  age: 30
});

const refs = toRefs(state); // 将 state 中的所有属性转换为响应式引用

console.log(refs.name.value); // 输出: "John"
console.log(refs.age.value); // 输出: 30

state.name = 'Mike'; // 修改原始对象的属性值
console.log(refs.name.value); // 输出: "Mike"

refs.age.value = 25; // 修改引用的值
console.log(state.age); // 输出: 25
```

这些函数是 Vue 3 Composition API 中用于创建和处理响应式数据的重要工具。通过它们，我们可以更灵活地管理和使用响应式数据。
