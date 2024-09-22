**关键词**：vue3 动态插槽名

在 Vue 3 中，动态插槽名允许在运行时根据特定的条件动态地确定插槽的名称，从而为组件的渲染提供了更大的灵活性。

### **一、基本概念**

通常情况下，插槽名在组件定义时是固定的。但在某些场景中，可能需要根据不同的情况动态地选择要渲染的插槽。Vue 3 引入了动态插槽名的特性，使得可以在运行时动态地确定插槽的名称。

### **二、使用方法**

1. 在子组件中接收动态插槽：

   ```vue
   <template>
     <div>
       <slot :name="dynamicSlotName"></slot>
     </div>
   </template>

   <script setup>
   import { ref } from "vue";
   const dynamicSlotName = ref("defaultSlot");
   </script>
   ```

   在这个子组件中，通过`ref`定义了一个名为`dynamicSlotName`的响应式变量，用于动态确定插槽的名称。

2. 在父组件中使用动态插槽名：

   ```vue
   <template>
     <ChildComponent>
       <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
         <!-- 根据不同的插槽名渲染不同的内容 -->
         <p v-if="slotName === 'slot1'">Content for slot1</p>
         <p v-else-if="slotName === 'slot2'">Content for slot2</p>
       </template>
     </ChildComponent>
   </template>

   <script setup>
   import { ref } from "vue";
   const slotNames = ref(["slot1", "slot2"]);
   </script>
   ```

   在父组件中，使用`v-for`循环遍历一个包含插槽名的数组，并根据不同的插槽名渲染不同的内容。通过这种方式，可以动态地将内容传递给子组件的不同插槽。

### **三、优势**

1. 灵活性：可以根据不同的条件动态地选择要渲染的插槽，使得组件能够适应各种复杂的场景。
2. 可扩展性：在需要根据不同的情况展示不同的内容时，动态插槽名提供了一种简洁而强大的方式，无需为每个可能的情况创建单独的组件。
3. 代码复用：通过动态插槽名，可以在不同的组件中复用相同的逻辑，只需要在父组件中根据不同的需求传递不同的插槽名即可。
