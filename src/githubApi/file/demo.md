**关键词**：vue 内置组件

在 Vue 中，有一些内置组件，主要包括以下几个：

**一、`<component>`动态组件**

1. 作用：用于根据条件动态地渲染不同的组件。
2. 使用方法：

   ```vue
   <template>
     <div>
       <component :is="currentComponent"></component>
       <button @click="toggleComponent">Toggle Component</button>
     </div>
   </template>

   <script setup>
   import ComponentA from "./ComponentA.vue";
   import ComponentB from "./ComponentB.vue";

   let currentComponent = ComponentA;

   const toggleComponent = () => {
     currentComponent = currentComponent === ComponentA ? ComponentB : ComponentA;
   };
   </script>
   ```

**二、`<transition>`过渡组件**

1. 作用：为元素或组件的插入、更新和移除添加过渡效果。
2. 使用方法：

   ```vue
   <template>
     <div>
       <transition name="fade">
         <p v-if="show">Hello World</p>
       </transition>
       <button @click="toggleShow">Toggle</button>
     </div>
   </template>

   <script setup>
   import { ref } from "vue";

   const show = ref(true);
   const toggleShow = () => {
     show.value = !show.value;
   };
   </script>

   <style>
   .fade-enter-active,
   .fade-leave-active {
     transition: opacity 0.5s;
   }
   .fade-enter-from,
   .fade-leave-to {
     opacity: 0;
   }
   </style>
   ```

**三、`<teleport>`传送门组件**

1. 作用：将一个组件的模板内容渲染到指定的 DOM 节点位置，而不是在组件自身的位置。
2. 使用方法：

   ```vue
   <template>
     <div>
       <teleport to="body">
         <div class="modal">This is a modal content.</div>
       </teleport>
     </div>
   </template>

   <style>
   .modal {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: white;
     padding: 20px;
     border: 1px solid #ccc;
   }
   </style>
   ```

**四、`<keep-alive>`缓存组件**

1. 作用：在组件切换时缓存不活动的组件实例，避免重复渲染，提高性能。
2. 使用方法：

   ```vue
   <template>
     <div>
       <keep-alive>
         <component :is="currentComponent"></component>
       </keep-alive>
       <button @click="toggleComponent">Toggle Component</button>
     </div>
   </template>

   <script setup>
   import ComponentA from "./ComponentA.vue";
   import ComponentB from "./ComponentB.vue";

   let currentComponent = ComponentA;

   const toggleComponent = () => {
     currentComponent = currentComponent === ComponentA ? ComponentB : ComponentA;
   };
   </script>
   ```
