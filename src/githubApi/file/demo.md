**关键词**：多 slot 场景

Vue 支持多个插槽（`slot`），使得组件的内容分发更加灵活。在 Vue 3 中，你可以通过具名插槽来实现这一点，这允许你定义多个插槽，并在父组件中指定对应的内容填充到子组件的不同部位。

### 定义具名插槽

在子组件中，你可以使用 `<slot>` 元素来定义一个或多个插槽，并通过 `name` 属性为每个插槽命名。未命名的插槽被视为默认插槽，它会接收所有未匹配到具名插槽的内容。

```html
<!-- 子组件 -->
<template>
  <div>
    <header>
      <!-- 定义一个名为 "header" 的插槽 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 默认插槽 -->
      <slot></slot>
    </main>
    <footer>
      <!-- 定义一个名为 "footer" 的插槽 -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

### 使用具名插槽

在父组件中，你可以通过 `<template>` 元素结合 `v-slot` 指令（或缩写 `#`）来指定填充到具名插槽的内容。对于默认插槽，直接放在子组件标签内部的内容即可。

```html
<!-- 父组件 -->
<template>
  <div id="app">
    <MyComponent>
      <!-- 使用 v-slot 指定插槽内容 -->
      <template v-slot:header>
        <h1>这里是头部内容</h1>
      </template>

      <!-- 默认插槽内容 -->
      <p>这里是主体内容</p>

      <!-- 使用缩写 # 指定插槽内容 -->
      <template #footer>
        <footer>这里是尾部内容</footer>
      </template>
    </MyComponent>
  </div>
</template>
```

### 作用域插槽

除了普通的具名插槽之外，Vue 还支持作用域插槽（scoped slots）。这是一种特殊类型的插槽，它允许子组件传递数据回到插槽内容中，这样，父组件就可以访问子组件的数据了。

```html
<!-- 子组件 -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- 使用作用域插槽传递数据 -->
      <slot name="item" :item-data="item">{{ item.text }}</slot>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { id: 1, text: "Item 1" },
          { id: 2, text: "Item 2" },
        ],
      };
    },
  };
</script>
```

父组件可以这样使用作用域插槽：

```html
<!-- 父组件 -->
<MyComponent>
  <template #item="{ itemData }">
    <span>{{ itemData.text }}</span>
  </template>
</MyComponent>
```

在这里，`itemData` 是子组件传递给插槽的数据对象，父组件通过解构它来访问插槽数据。
