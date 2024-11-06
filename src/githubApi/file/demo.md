**关键词**：事件委托应用场景

> 这个问题属于一个典型的「事件委托」的应用场景
>
> 如果知识背诵八股文的同学， 可能这个问题就尴尬了

当把事件委托注册在 `body` 上时，可以通过以下方法针对性地触发不同子元素的特定行为：

**一、利用事件对象的属性判断目标元素**

1. `event.target` 属性：

   - 当事件在 `body` 上触发时，可以通过 `event.target` 来获取实际触发事件的元素。
   - 例如：
     ```javascript
     document.body.addEventListener("click", function (event) {
       const target = event.target;
       if (target.classList.contains("button1")) {
         // 处理按钮 1 的点击事件
       } else if (target.classList.contains("button2")) {
         // 处理按钮 2 的点击事件
       }
     });
     ```
   - 在这个例子中，通过检查 `event.target` 的 `classList` 来确定点击的是哪个特定的按钮，然后执行相应的处理逻辑。

2. `matches()` 方法：
   - 可以使用 `event.target.matches(selector)` 方法来检查目标元素是否与特定的 CSS 选择器匹配。
   - 例如：
     ```javascript
     document.body.addEventListener("click", function (event) {
       const target = event.target;
       if (target.matches("#element1")) {
         // 处理元素 1 的点击事件
       } else if (target.matches(".class2")) {
         // 处理具有特定类名的元素的点击事件
       }
     });
     ```
   - 这里使用 `matches()` 方法来判断点击的元素是否与特定的 ID 或类名选择器匹配，从而执行相应的操作。

**二、使用数据属性进行区分**

1. 设置 `data-*` 属性：
   - 可以在 HTML 元素上设置自定义的 `data-*` 属性来标识不同的元素，并在事件处理函数中根据这些属性进行区分。
   - 例如：
     ```html
     <button data-action="action1">Button 1</button> <button data-action="action2">Button 2</button>
     ```
   - 然后在 JavaScript 中：
     ```javascript
     document.body.addEventListener("click", function (event) {
       const target = event.target;
       if (target.dataset.action === "action1") {
         // 处理按钮 1 的点击事件
       } else if (target.dataset.action === "action2") {
         // 处理按钮 2 的点击事件
       }
     });
     ```
   - 在这个例子中，通过检查元素的 `data-action` 属性的值来确定执行哪个特定的操作。

通过这些方法，可以在事件委托到 `body` 的情况下，有针对性地处理不同子元素的事件，提高代码的效率和可维护性。
