**关键词**：选项式 API 和组合式 API 区别

### 选项式 API (Options API)

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

```html
<script>
  export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
      return {
        count: 0,
      };
    },

    // methods 是一些用来更改状态与触发更新的函数
    // 它们可以在模板中作为事件处理器绑定
    methods: {
      increment() {
        this.count++;
      },
    },

    // 生命周期钩子会在组件生命周期的各个不同阶段被调用
    // 例如这个函数就会在组件挂载完成后被调用
    mounted() {
      console.log(`The initial count is ${this.count}.`);
    },
  };
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 组合式 API (Composition API)

通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

下面是使用了组合式 API 与` <script setup>` 改造后和上面的模板完全一样的组件：

```html
<script setup>
  import { ref, onMounted } from "vue";

  // 响应式状态
  const count = ref(0);

  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++;
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`);
  });
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 如何取舍

在 Vue.js 开发中，选择使用选项式 API 或组合式 API 取决于多个因素，包括项目的规模、团队的熟悉度、组件复杂性，以及对 TypeScript 的需求。下面是一些建议，帮助你决定在特定情况下应该采用哪种 API 风格：

**考虑项目规模和复杂性**

- 对于**简单或中等复杂度的项目**，特别是如果你已经习惯于 Vue 2 的开发模式，选项式 API 可能更加简单直接。它提供了一个清晰的结构，将组件的不同方面（如数据、方法、计算属性等）分隔开，易于理解和上手。

- 对于**大型项目或具有复杂组件逻辑的项目**，组合式 API 更能展现其优势。它能够更好地组织和复用逻辑，尤其是当你需要处理跨组件的共享逻辑时。通过使用组合式 API，可以将相关的逻辑紧密地放在一起，而不是分散在选项式 API 的各个区域。这降低了大型项目的维护难度。

**考虑团队熟悉度**

- 如果你的团队已经对选项式 API 比较熟悉，且没有遇到因结构导致的维护问题，那么可能没有必要强制迁移到组合式 API。但是，鼓励团队了解和探索组合式 API，以便于未来可能的迁移或混合使用。

- 对于新项目或新团队，考虑从一开始就采用组合式 API，尤其是在团队成员对其感兴趣或组件逻辑预期较为复杂的情况下。这样可以从项目初期就充分利用组合式 API 的优点。

**考虑对 TypeScript 的支持**

- 组合式 API 对 TypeScript 的支持更友好，如果你的项目或团队打算使用 TypeScript，那么组合式 API 是更好的选择。它提供了类型推导和更清晰的类型定义，使得 TypeScript 代码更加健壮和易于维护。

**考虑代码复用和逻辑抽象**

- 当有大量需要跨组件复用的逻辑时，组合式 API 提供了更灵活和强大的方式来组织这些逻辑。通过自定义组合函数，可以更容易地在组件之间共享逻辑，减少代码重复。
