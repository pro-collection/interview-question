#### 代码如下
```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj);
```
执行结果如何， 为什么？


#### 执行结果
代码的执行结果是：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

在代码中，我们创建了一个名为 `obj` 的对象，它包含了一些属性和方法：

* `2` 和 `3` 是对象的属性名，对应的属性值分别为 `3` 和 `4`。
* `length` 属性的值为 `2`。
* `splice` 和 `push` 是对象的两个方法，它们均继承自 `Array.prototype`。

接下来，我们先调用了 `obj.push(1)` 方法，将值 `1` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 4, length: 3, splice: [Function: splice], push: [Function: push] }
```

接着，我们又调用了 `obj.push(2)` 方法，将值 `2` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

可以看出，`obj` 对象的属性值发生了变化。这是因为在调用 `obj.push(1)` 方法时，由于 `obj` 对象继承了 `Array.prototype.push` 方法，因此 `push` 方法中的 `this` 指向的是 `obj` 对象本身，因此将值 `1` 加入到了 `obj` 对象的第二个属性位置上（即 `obj[2] = 1`）。而在调用 `obj.push(2)` 方法时，`push` 方法同样将值 `2` 加入到了 `obj` 对象的第三个属性位置上（即 `obj[3] = 2`）。因此最终得到的 `obj` 对象的状态为 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。

#### 追问：上面的代码中 obj.push(1)， 为什么会加入到第二个属性位置上？

在 JavaScript 中，数组是一种特殊的对象，其属性名是非负整数，称之为索引(index)，因此可以通过数组语法来访问这些属性。另外，对于非数组对象，其属性名可以是任意字符串。

在给数组对象添加属性时，如果属性名是非负整数，那么会被当作数组元素，会自动维护 `length` 属性；如果属性名是其他字符串，那么则被当作普通的对象属性。

根据这个规则，上述代码中的 `obj` 对象添加了两个属性 `2: 3` 和 `3: 4`，它们的属性名都是非负整数，因此被当作数组元素，被计入了 `length` 属性。而在执行 `obj.push(1)` 时，会向数组中添加一个新的元素，该元素的下标是数组的 `length` 属性值，也就是 `2`，因此添加到了第二个属性位置上。接着执行 `obj.push(2)` 时，同样会向数组中添加一个新的元素，该元素的下标是 `3`，也就是数组的第三个属性位置上。

最终，输出结果为：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

其中，属性 `2` 和 `3` 被分别赋值为 `1` 和 `2`，而原来的值被覆盖了。因此，最终的结果是 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。
