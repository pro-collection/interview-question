**关键词**：css 动效应用

主要是考察几个属性的使用

- `transform: rotateY` 用于 Y 轴旋转
- `transition` 用于过度动画

还有一个要点：

- 翻转卡牌的时候，正面在上， 要将背面隐藏； 背面在上， 要将正面隐藏；

**实现比较简单， 直接贴代码**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .card {
        display: flex;
      }

      .flip-card {
        float: left;
        position: relative;
        height: 36vmin;
        width: calc(40vmin / 1.4);
        background-color: white;
        padding: 20px;
        border-radius: calc(40vmin / 20);
        box-shadow: 0 calc(40vmin / 40) calc(40vmin / 10) 0 rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
        transform: rotateY(0deg);
      }

      .label:hover .flip-card {
        transform: rotateY(180deg);
        background-color: black;
        transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
      }

      .label:hover .flip-front {
        opacity: 0;
        display: none;
        transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
      }

      .label:hover .flip-end {
        opacity: 1;
        display: block;
        transform: rotateY(180deg);
        color: white;
        font-size: 20px;
        transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
      }

      .flip-front {
        width: 100%;
        height: 100%;
        opacity: 1;
        cursor: pointer;
      }

      .flip-end {
        width: 100%;
        height: 100%;
        opacity: 0;
        display: none;
        cursor: pointer;
      }

      .label {
        background-color: white;
        border-radius: calc(40vmin / 20);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="label">
        <div class="flip-card">
          <div class="flip-front">我是正面</div>
          <div class="flip-end">
            在上述代码中，我们创建了一个带有 card 类的容器，内部有一个 card-inner 元素，它包含了 card-front（正面）和
            card-back（背面）两个元素。 当鼠标悬停在 card 元素上时，通过 :hover 选择器将 card-inner 元素绕 Y 轴旋转 180
            度，实现翻牌效果。
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
