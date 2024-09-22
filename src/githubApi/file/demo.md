**关键词**：vue3 Provide

Vue 3 中的 `provide` 和 `inject` 功能提供了一种方法，允许祖先组件将数据“提供”给它的所有后代组件，无论后代组件位于组件树的何处，而不必通过所有的组件层层传递属性（props）。这对于深层嵌套的组件或跨多个组件共享状态特别有用。

### 基本用法

#### 在祖先组件中提供数据

你可以在任何组件中使用 `provide` 选项来提供数据。`provide` 选项应该是一个对象或返回对象的函数，其中的每个属性都可以被子组件注入。从 Vue 3 开始，`provide` 和 `inject` 绑定现在是响应式的。

在 Vue 3 中，建议在 `setup()` 函数中使用 `provide` 函数，因为 `setup` 是组合式 API 的入口点。

```javascript
import { provide } from "vue";

export default {
  setup() {
    // 提供 'theme' 数据
    provide("theme", "dark");
  },
};
```

#### 在后代组件中注入数据

后代组件可以使用 `inject` 选项来接收数据。`inject` 选项应该是一个字符串数组，列出需要注入的属性名。

```javascript
import { inject } from "vue";

export default {
  setup() {
    const theme = inject("theme");
    return { theme };
  },
};
```

### 案例

假设你正在开发一个应用，该应用有一个主题切换功能，你可以在顶层组件中提供当前主题，而所有子组件都可以注入这个主题信息，而不必通过层层传递。

### 响应式提供

如果要提供的数据是响应式的，并且希望后代组件能够响应数据的变化，你需要使用 Vue 的响应式系统函数，例如 `reactive` 或 `ref`。

```javascript
import { provide, reactive } from "vue";

export default {
  setup() {
    const theme = reactive({ color: "dark" });
    provide("theme", theme);
  },
};
```

后代组件同样可以如上所示通过 `inject` 获取这个响应式的数据。

### 注意事项

- `provide` 和 `inject` 提供的依赖关系不是可靠的，并且不应该在业务逻辑中频繁使用，以避免复杂的跨组件通讯导致应用难以维护。它通常被用于开发可复用的插件或高阶组件。
- 使用这两个选项时，注入的数据在后代组件中并不是响应式的，除非使用了 Vue 的响应式系统（如 `reactive`、`ref`）来提供这些数据。
- 如果 `inject` 未找到提供的键，则它默认返回 `undefined`。你可以通过提供第二个参数作为默认值来改变这一行为。

总的来说，`provide` 和 `inject` 是 Vue 3 中解决跨多个组件共享状态问题的一个非常有用的功能，尤其适用于开发高阶组件或插件时使用。
