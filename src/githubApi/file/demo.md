**关键词**：Vue2 中双向绑、Vue2 中双向绑监控数组

在 Vue 2 中，双向数据绑定的核心是 `Object.defineProperty()`，它允许 Vue 对每个属性进行 getter 和 setter 的拦截，从而实现响应式系统。对于普通的响应式属性来说，这一切都很简单，因为属性的 getter 和 setter 可以很容易地更改并通知 Vue 更新视图。

但是，由于 JavaScript 的限制，使用 `Object.defineProperty()` 注册响应式属性时并不能完美地跟踪数组索引的变化。而 Vue 需要能够捕捉对数组元素的修改，因此它采用了一种特殊的策略来实现对数组的响应式处理。

### Vue 是如何监控数组的？

1. **拦截数组的变异方法**：Vue 使用一个数组的代理隔着来拦截七个变异数组方法（`push`、`pop`、`shift`、`unshift`、`splice`）和 `sort` 方法以及 `reverse` 方法。对这些方法的调用会被重新定义，以保证当它们被调用时，视图会重新渲染。

2. **Vue.set 和 Vue.delete**：Vue 提供了两个全局函数 `Vue.set` 和 `Vue.delete`，这些函数确保任何对数组进行的直接设置或删除操作都能够触发视图更新。

3. **不直接使用索引赋值**：直接进行索引赋值操作（如 `vm.items[indexOfItem] = newValue`）不会触发视图更新，因为这是一种不能被 `Object.defineProperty` 拦截的操作。为了避免这个陷阱，你应该使用 `Vue.set` 代替索引赋值。

4. **附加属性**：Vue 会为每个项目的数组添加一些附加属性，这些属性可以触发一些视图渲染。

### 使用例子

以下是两个响应式数组操作的示例：

```javascript
// 展示Vue.set的使用
Vue.set(vm.items, indexOfItem, newValue);

// 展示Vue.delete的使用
Vue.delete(vm.items, indexOfItem);
```

使用这些方法可以确保 Vue 的观察者模式能够检测到数组的变化，这点对于在循环中使用的内联数组是非常有用的。

### 注意事项

尽管 Vue 2 通过重新定义数组的变异方法和提供 `Vue.set` 和 `Vue.delete` 方法来实现对数组的响应式更新，但刀片开发人员在操作数组时还是需要谨慎以避免那些一开始就不会被 Vue 捕获的数组操作。

总结来说，Vue 对数组的响应式更新比对象要复杂，因为数组需要通过一种特殊的机制来捕获变异操作而不是普通的属性赋值。这是 Vue 响应式系统比较高级的部分，也是为什么在 Vue 2 中推荐使用 Vue 提供的方法来操作数组的核心原因。
