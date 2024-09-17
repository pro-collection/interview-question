**关键词**：事件修饰符、.exact 作用

`.exact` 修饰符在 Vue 事件处理中起着非常特定的作用。它允许控制触发事件处理器的确切方式，确保只有在指定的系统修饰键（如 `ctrl`、`alt`、`shift`、`meta`）组合完全匹配时，事件处理函数才会被触发。这意味着，如果你绑定了 `.exact` 修饰符到一个事件上，只有在没有其他未指定的修饰键被按下的情况下，该事件才会被触发。

### 使用场景

`.exact` 修饰符非常有用，尤其是在你想要精确控制事件触发条件的时候。例如，你可能有以下场景：

- 当用户严格只按下 `ctrl` 键时触发一个动作，如果用户同时按下了 `ctrl` 和 `shift`，则不触发。

### 示例

```html
<!-- 只有当没有任何其他键被同时按下时，点击才会调用 doThis -->
<button @click.exact="doThis">No Modifier Key</button>

<!-- 只有当仅按下 ctrl 键时点击才会调用 doThat -->
<button @click.ctrl.exact="doThat">Ctrl + Click Only</button>
```

在第一个例子中，点击按钮将只在没有按下 `ctrl`、`alt`、`shift` 或 `meta` 键的情况下触发 `doThis` 方法。在第二个例子中，`doThat` 方法只会在严格按下 `ctrl` 键时触发点击事件。
