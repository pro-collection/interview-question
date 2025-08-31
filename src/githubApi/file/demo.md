**关键词**：css 动画

> 作者备注
>
> 这个问题主要是对 css 动画的考察， 比直接问 animation 和 transform 属性有意义。

可以利用 CSS 的 `animation 和 transform` 属性，通过旋转一个带有渐变边框的元素来实现。

这个转圈 `loading` 动画的核心实现思路如下：

1. **创建圆形元素**：

   - 使用 `width` 和 `height` 设置相同的尺寸
   - 通过 `border-radius: 50%` 将方形元素变成圆形

2. **设计边框样式**：

   - 设置一个较粗的边框（`border`）
   - 让大部分边框保持半透明（`rgba(255, 255, 255, 0.3)`）
   - 只让顶部边框使用实色（`border-top-color`），形成旋转时的流动效果

3. **添加旋转动画**：
   - 定义 `spin` 动画，通过 `transform: rotate(360deg)` 实现 360 度旋转
   - 使用 `animation` 属性应用动画，设置 `1s` 为一个周期，`ease-in-out` 缓动效果，`infinite` 无限循环

**直接上代码**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Loading Spinner</title>
    <style>
      /* 基础样式设置 */
      body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f2f5;
      }

      /* 加载动画容器 */
      .loading-spinner {
        /* 动画大小 */
        width: 50px;
        height: 50px;

        /* 创建圆形边框 */
        border: 5px solid rgba(255, 255, 255, 0.3); /* 浅色边框 */
        border-top-color: #1677ff; /* 高亮边框（旋转时形成流动效果） */
        border-radius: 50%; /* 圆形 */

        /* 旋转动画 */
        animation: spin 1s ease-in-out infinite;
      }

      /* 旋转动画定义 */
      @keyframes spin {
        to {
          /* 360度旋转 */
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <!-- 加载动画元素 -->
    <div class="loading-spinner"></div>
  </body>
</html>
```
