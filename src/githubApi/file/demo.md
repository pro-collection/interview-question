**关键词**：vue3 复用逻辑

在 Vue 3 中，可以通过以下几种方式提升复用逻辑：

**一、组合式函数（Composables）**

1. 定义与使用：

   - 组合式函数是一个封装了可复用逻辑的函数，可以接收参数并返回响应式数据和方法。例如：

     ```javascript
     import { ref } from "vue";

     export function useCounter(initialValue = 0) {
       const count = ref(initialValue);
       const increment = () => count.value++;
       const decrement = () => count.value--;

       return { count, increment, decrement };
     }
     ```

   - 在组件中使用组合式函数：

     ```vue
     <script setup>
     import { useCounter } from "./path/to/composable";

     const { count, increment, decrement } = useCounter();
     </script>

     <template>
       <div>
         Count: {{ count }}
         <button @click="increment">Increment</button>
         <button @click="decrement">Decrement</button>
       </div>
     </template>
     ```

2. 优势：
   - 可维护性高：将可复用的逻辑封装在独立的函数中，使得代码更易于理解和维护。
   - 可测试性强：可以单独对组合式函数进行测试，而不需要依赖于整个组件。
   - 易于复用：可以在多个组件中导入和使用相同的组合式函数。

**二、自定义指令**

1. 定义与使用：

   - 自定义指令可以在元素上应用特定的行为。例如：

     ```javascript
     const focusDirective = {
       mounted(el) {
         el.focus();
       },
     };

     export default focusDirective;
     ```

   - 在组件中使用自定义指令：

     ```vue
     <script setup>
     import focusDirective from "./path/to/directive";
     </script>

     <template>
       <input v-focus />
     </template>
     ```

2. 优势：
   - 特定行为复用：对于一些需要在多个元素上重复应用的特定行为，可以通过自定义指令进行复用。
   - 解耦逻辑：将特定的行为从组件的逻辑中分离出来，使得组件更加专注于业务逻辑。

**三、混入（Mixins）**

1. 定义与使用：

   - 混入是一种可以将多个组件的可复用选项合并到一个对象中的方式。例如：

     ```javascript
     const myMixin = {
       data() {
         return {
           commonData: "This is common data",
         };
       },
       methods: {
         commonMethod() {
           console.log("This is a common method");
         },
       },
     };

     export default myMixin;
     ```

   - 在组件中使用混入：

     ```vue
     <script setup>
     import myMixin from "./path/to/mixin";

     export default {
       mixins: [myMixin],
     };
     </script>

     <template>
       <div>
         {{ commonData }}
         <button @click="commonMethod">Call common method</button>
       </div>
     </template>
     ```

2. 优势：
   - 代码复用：可以将一些通用的属性、方法或生命周期钩子合并到多个组件中。
   - 减少重复代码：避免在多个组件中重复编写相同的逻辑。

**四、函数式组件**

1. 定义与使用：

   - 函数式组件是一个无状态、无实例的组件，它接收 props 并返回一个 VNode。例如：

     ```vue
     <script setup>
     import { h } from "vue";

     const MyFunctionalComponent = (props) => {
       return h("div", {}, props.message);
     };

     export default MyFunctionalComponent;
     </script>
     ```

   - 在其他组件中使用函数式组件：

     ```vue
     <script setup>
     import MyFunctionalComponent from "./path/to/functionalComponent";
     </script>

     <template>
       <MyFunctionalComponent message="Hello from functional component" />
     </template>
     ```

2. 优势：
   - 轻量级：函数式组件没有实例化的开销，性能更高。
   - 简洁性：对于一些简单的展示性组件，可以使用函数式组件来简化代码。
