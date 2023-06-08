`typeof null` 的结果是 `"object"`。

这是 JavaScript 中的一个历史遗留问题。在 JavaScript 最初的实现中，将 JavaScript 的值分为了几种类型，其中 `null` 被当作一个空对象指针。为了与其他对象类型区分开，`typeof null` 返回了 `"object"`。

实际上，`null` 是一个表示空值的特殊值，它不是对象，也不是任何对象的实例。虽然 `typeof null` 返回了 `"object"`，但这并不表示 `null` 是对象的一种类型。

由于这个历史遗留问题，判断一个值是否为 `null` 通常需要使用 `value === null` 进行比较，而不是依赖 `typeof` 运算符的结果。
