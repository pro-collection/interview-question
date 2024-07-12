**关键词**：animation 帧动画、animation steps 属性

主要是对 css 动画的一个实际应用考察

以下是一个使用 CSS 实现简单打字机效果的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .typewriter {
        width: 300px;
        border-right: 4px solid black;
        animation: typing 4s steps(30), blink 0.5s step-end infinite;
        white-space: nowrap;
        overflow: hidden;
      }

      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 300px;
        }
      }

      @keyframes blink {
        50% {
          border-color: transparent;
        }
      }
    </style>
  </head>

  <body>
    <p class="typewriter">这是一个打字机效果的文本</p>
  </body>
</html>
```

在上述代码中，`.typewriter` 类的元素用于实现打字机效果。

`animation: typing 4s steps(30), blink 0.5s step-end infinite;` 定义了两个动画：

- `typing` 动画用于模拟文字逐个出现的效果，从宽度为 `0` 逐渐增加到 `300px`，`steps(30)` 表示分 30 步完成动画，使文字出现有逐个显示的效果。

- `blink` 动画用于模拟光标闪烁效果，每 `0.5s` 闪烁一次，在 `50%` 进度时，光标（通过右边框实现）变为透明来模拟闪烁。
