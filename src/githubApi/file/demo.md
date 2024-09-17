**关键词**：事件修饰符

在 Vue 中，事件修饰符是一些由点 (.) 开头的特殊后缀，用于指示 Vue 对 DOM 事件进行某种特殊处理。Vue 提供了一系列的默认事件修饰符来帮助开发者更方便地处理一些常见的 DOM 事件行为。

下面是 Vue 3 中提供的一些默认事件修饰符：

| 事件修饰符 | 描述                                                                     |
| ---------- | ------------------------------------------------------------------------ |
| `.stop`    | 调用 `event.stopPropagation()` 阻止事件冒泡。                            |
| `.prevent` | 调用 `event.preventDefault()` 阻止默认事件行为。                         |
| `.capture` | 使用事件捕获模式添加事件监听器，而不是冒泡模式。                         |
| `.self`    | 仅当事件是从事件绑定的元素本身触发时才触发回调。                         |
| `.once`    | 事件只触发一次，之后移除事件监听器。                                     |
| `.passive` | 以 `{ passive: true }` 模式添加监听器，表示不会调用 `preventDefault()`。 |

这些修饰符可以单独使用，也可以组合使用。以下是一些示例：

```html
<!-- 阻止点击事件冒泡 -->
<button @click.stop="doThis">Stop Propagation</button>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit">Prevent Default</form>

<!-- 修饰符链 -->
<a @click.stop.prevent="doThat">Stop Propagation and Prevent Default</a>

<!-- 只在 @click.self 表达式中的元素本身（而非子元素）触发时调用 doThat -->
<div @click.self="doThat">Only Trigger on Self</div>

<!-- 点击事件将只触发一次 -->
<button @click.once="doOnce">Trigger Once</button>
```

使用这些事件修饰符可以使你的事件处理逻辑更简洁和直观，同时也能够实现一些复杂的事件处理方式。
