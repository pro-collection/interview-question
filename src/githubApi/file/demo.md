**关键词**：z-index 生效情况

设置了`z-index: 999`的元素不一定会置于`z-index: 0`的元素之上。

**一、z-index 的作用机制**

1. `z-index`属性用于控制元素在 z 轴上的堆叠顺序，即决定了元素在垂直于屏幕平面的方向上的前后显示顺序。
2. 只有当元素的定位属性（如`position: relative`、`position: absolute`、`position: fixed`）被设置时，`z-index`才会生效。

**二、影响堆叠顺序的其他因素**

1. 元素的堆叠上下文：

   - 元素会根据其所在的堆叠上下文进行堆叠。堆叠上下文是一个三维的概念，包含一组元素，这些元素按照特定的规则进行堆叠。
   - 创建堆叠上下文的因素包括：设置了定位属性和`z-index`的元素、`opacity`小于 1 的元素、`transform`属性不为`none`的元素等。
   - 如果一个元素处于一个具有更高堆叠顺序的堆叠上下文中，即使它的`z-index`值较低，也可能会被置于另一个堆叠上下文中具有较低`z-index`值的元素之下。

2. 元素的 HTML 结构顺序：
   - 在没有设置`z-index`或堆叠上下文的情况下，元素的堆叠顺序通常遵循 HTML 结构的顺序。后出现的元素会覆盖先出现的元素。

**三、示例说明**

1. 以下是一个示例代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .parent {
        position: relative;
        z-index: 1;
      }

      .child1 {
        position: absolute;
        z-index: 999;
        background-color: red;
        width: 100px;
        height: 100px;
      }

      .child2 {
        position: absolute;
        z-index: 0;
        background-color: blue;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>

  <body>
    <div class="parent">
      <div class="child1"></div>
      <div class="child2"></div>
    </div>
  </body>
</html>
```

在这个例子中，`.child1`设置了`z-index: 999`，`.child2`设置了`z-index: 0`，并且它们都在一个具有`z-index: 1`的父元素中。由于父元素创建了一个堆叠上下文，`.child1`和`.child2`会在这个堆叠上下文中按照它们的`z-index`值进行堆叠，所以`.child1`会显示在`.child2`之上。

但是，如果将父元素的`z-index`值设置为 0，或者去除父元素的定位属性，那么`.child1`和`.child2`的堆叠顺序可能会发生变化，具体取决于浏览器的默认行为和 HTML 结构的顺序。
