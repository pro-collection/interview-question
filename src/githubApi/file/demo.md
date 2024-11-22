**关键词**：proxy set 拦截器

1. **可以拦截数组变化**
   - `Proxy`可以有效地拦截数组的变化。当对数组进行各种操作，如修改元素、添加或删除元素等，`Proxy`都能够捕获这些操作并进行拦截。
2. **拦截数组的读取和设置操作**
   - 对于数组元素的读取和设置操作，可以通过`get`和`set`拦截器来实现。
   - **`get`拦截器示例**：
     - 假设我们要拦截对数组元素的读取操作，以记录哪些元素被访问了。
     ```javascript
     let array = [1, 2, 3];
     let proxyArray = new Proxy(array, {
       get(target, property, receiver) {
         console.log(`正在读取数组元素${property}`);
         return target[property];
       },
     });
     let element = proxyArray[1];
     ```
     - 在这个例子中，当通过`proxyArray[1]`读取数组元素时，`get`拦截器会被触发。它会先打印出`正在读取数组元素1`，然后返回数组中索引为`1`的元素（即`2`）。
   - **`set`拦截器示例**：
     - 假如我们想要拦截对数组元素的设置操作，比如限制数组元素的取值范围。
     ```javascript
     let array = [1, 2, 3];
     let proxyArray = new Proxy(array, {
       set(target, property, value, receiver) {
         if (value < 0) {
           throw new Error("数组元素不能小于0");
         }
         target[property] = value;
         return true;
       },
     });
     proxyArray[0] = -1;
     ```
     - 这里，当尝试将`proxyArray[0]`设置为`-1`时，`set`拦截器会被触发。由于`-1`小于`0`，会抛出一个错误`数组元素不能小于0`。
3. **拦截数组的方法调用**
   - 数组有许多方法，如`push`、`pop`、`shift`、`unshift`、`splice`等。可以通过`Proxy`的`apply`拦截器来拦截这些方法的调用。
   - **`apply`拦截器示例**：
     - 假设我们要记录数组的`push`方法的调用情况。
     ```javascript
     let array = [1, 2, 3];
     let proxyArray = new Proxy(array, {
       apply(target, thisArg, argumentsList) {
         if (target.push === argumentsList[0]) {
           console.log("正在调用数组的push方法");
         }
         return target.apply(thisArg, argumentsList);
       },
     });
     proxyArray.push(4);
     ```
     - 在这个例子中，当调用`proxyArray.push(4)`时，`apply`拦截器会被触发。它会先打印出`正在调用数组的push方法`，然后执行正常的`push`操作，将`4`添加到数组中。
