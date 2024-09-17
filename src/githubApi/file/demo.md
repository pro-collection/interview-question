**关键词**：指令的含义

直接上图：
![directive.DtZKvoAo.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9d7bd9b5ac9245f29fc6b5fe0e65f4d1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pm05bCP56-G:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDEyNTAyMzM1Nzg5OTM2NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726640513&x-orig-sign=qOuHSrsmLnAlyBuGcjPCxflvsOg%3D)

在 Vue 中，`@submit.prevent="onSubmit"` 是一个指令修饰符的示例，它结合了事件侦听和事件修饰符的概念来提供一种声明式的方式处理表单提交事件，并自动阻止其默认行为。

这个指令可以分为几个部分来解释：

### `@submit`

- `@` 是一个简写符号，用于标识事件侦听器。它是 `v-on:` 的简写，因此 `@submit` 等同于 `v-on:submit`。
- `submit` 是要侦听的事件名称。在这里，它指的是 HTML 表单的提交事件。

### `.prevent`

- `.prevent` 是一个事件修饰符。事件修饰符用于指示 Vue 对触发的事件进行特定的处理。
- 在这种情况下，`.prevent` 修饰符告诉 Vue 阻止事件的默认行为。对于 `submit` 事件，其默认行为通常是将表单数据发送到服务器（根据 `action` 属性的值）并重新加载页面。使用 `.prevent` 可以防止这种默认行为，允许你通过 JavaScript 手动处理表单提交。

### `"onSubmit"`

- 这部分是对应的方法名称，当事件被触发时应该调用。在这个例子中，当表单提交事件被触发（同时默认行为被 `.prevent` 阻止）时，Vue 会调用组件中名为 `onSubmit` 的方法。
