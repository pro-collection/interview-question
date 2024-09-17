**关键词**：`<script setup>` 作用

在 Vue 3 中，`<script setup>` 是一种新的组件编写方式，旨在使组件的编写更为简洁明了。它是 Composition API 的一个语法糖，提供了一种更为简洁和易用的方式来定义组件。使用 `<script setup>` 可以带来几个主要好处：

### 1. 更简洁的代码

通过 `<script setup>`，你可以直接在 `<script>` 标签内使用 Composition API（如 `ref`, `reactive`, `computed`, `watch`, 等），而无需明确地定义 `setup()` 函数。这减少了引导性的样板代码，使得组件的逻辑更加紧凑和易读。

### 2. 更好的类型推断

对于使用 TypeScript 的项目，`<script setup>` 提供了更好的类型推断支持。在 `<script setup>` 中声明的变量和函数会自动被视为组件的一部分，使得类型推断更为直接和准确。

### 3. 易于使用 Composition API 特性

使用 `<script setup>`，所有顶级的绑定（如变量、函数等）都自动认为是组件的一部分，并且可以在模板中直接使用，无需返回对象。

### 4. 简化 Props 和 Emits 定义

`<script setup>` 提供了特殊的编译时 `defineProps` 和 `defineEmits` 函数，允许你以更声明式的方式定义组件的 props 和 emits，同时也提供了类型推断的好处。

### 示例

为了展示 `<script setup>` 如何使 Vue 3 组件代码更加简洁，让我们对比传统的 Composition API 用法和使用 `<script setup>` 语法的用法。

**使用传统 Composition API 的组件**

```html
<template>
  <button @click="increment">{{ count }}</button>
</template>

<script>
  import { ref, defineComponent } from "vue";

  export default defineComponent({
    setup() {
      const count = ref(0);

      function increment() {
        count.value++;
      }

      return { count, increment };
    },
  });
</script>
```

在这个例子中，我们首先需要从 `vue` 导入 `ref` 和 `defineComponent`。然后，我们通过 `defineComponent` 函数定义组件，并在 `setup` 函数中定义响应式状态和函数，最后返回这些响应式状态和函数以在模板中使用它们。

**使用 `<script setup>` 的组件**

```html
<template>
  <button @click="increment">{{ count }}</button>
</template>

<script setup>
  import { ref } from "vue";

  const count = ref(0);

  function increment() {
    count.value++;
  }
</script>
```

当使用 `<script setup>` 时，我们不需要使用 `defineComponent` 来定义组件或在 `setup` 函数中返回响应式状态和方法。相反，我们可以直接定义响应式状态和函数，这些都会自动被视为组件的一部分，并且可以在模板中直接使用。
