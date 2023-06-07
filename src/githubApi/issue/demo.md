**关键词**：drag 拖拽 api、拖拽 api

### api

HTML5 Drag API 提供了一组用于实现拖放操作的接口和事件。以下是 HTML5 Drag API 中常用的一些接口和事件：

1. `draggable` 属性：将元素设置为可拖动。可以通过设置元素的 `draggable` 属性为 `true` 或 `false` 来控制元素是否可以被拖动。

2. `ondragstart` 事件：拖动操作开始时触发的事件，通常在此事件中设置被拖动的数据类型和数据内容。

3. `ondrag` 事件：拖动过程中持续触发的事件，可以在此事件中进行一些自定义的操作，如实时更新拖动元素的位置。

4. `ondragend` 事件：拖动操作结束时触发的事件，通常在此事件中执行一些清理操作，如移除拖动时设置的样式。

5. `ondragenter` 事件：拖动元素进入目标元素时触发的事件，可以在此事件中进行一些针对目标元素的操作，如改变目标元素的样式。

6. `ondragleave` 事件：拖动元素离开目标元素时触发的事件，可以在此事件中进行一些清除或还原目标元素的操作。

7. `ondragover` 事件：在目标元素上拖动时持续触发的事件，可以在此事件中阻止默认的拖放行为或执行一些自定义操作。

8. `ondrop` 事件：在目标元素上释放拖动元素时触发的事件，通常在此事件中处理拖放操作，如获取拖放数据并执行相应的操作。

以上是 HTML5 Drag API 中常用的接口和事件。通过使用这些接口和事件，可以实现灵活的拖拽功能并与其他元素进行交互。需要注意的是，拖放操作的实现还涉及到一些其他的 DOM 操作和事件处理。

### 应用举例

下面是一个使用 HTML5 Drag API 的简单示例，展示了如何实现拖拽功能：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .draggable {
        width: 100px;
        height: 100px;
        background-color: red;
        cursor: move;
      }

      .droppable {
        width: 200px;
        height: 200px;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="draggable" draggable="true">Drag Me</div>
    <div class="droppable">Drop Here</div>

    <script>
      const draggableElement = document.querySelector('.draggable');
      const droppableElement = document.querySelector('.droppable');

      draggableElement.addEventListener('dragstart', (event) => {
        // 设置拖动数据
        event.dataTransfer.setData('text/plain', 'Draggable Element');
      });

      droppableElement.addEventListener('dragover', (event) => {
        // 阻止默认的拖放行为
        event.preventDefault();
      });

      droppableElement.addEventListener('drop', (event) => {
        // 获取拖放数据
        const data = event.dataTransfer.getData('text/plain');

        // 在目标元素上执行操作
        droppableElement.textContent = data;
      });
    </script>
  </body>
</html>
```

在上面的示例中，`.draggable` 类的元素被设置为可拖动（`draggable="true"`），当开始拖动时，触发了 `dragstart` 事件，并设置了拖动数据。

`.droppable` 类的元素作为目标元素，它监听了 `dragover` 事件以阻止默认的拖放行为，并在 `drop` 事件中获取拖放数据并执行相应的操作。

通过以上代码，你可以在浏览器中看到一个红色的可拖动元素和一个蓝色的目标元素。你可以尝试将可拖动元素拖放到目标元素上，拖放完成后，目标元素的内容将会被设置为拖放的数据。
