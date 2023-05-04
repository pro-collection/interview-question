**关键词**：图片懒加载、Intersection Observer API

图片懒加载可以延迟图片的加载，只有当图片即将进入视口范围时才进行加载。这可以大大减轻页面的加载时间，并降低带宽消耗，提高了用户的体验。以下是一些常见的实现方法：

1. Intersection Observer API

`Intersection Observer API` 是一种用于异步检查文档中元素与视口叠加程度的API。可以将其用于检测图片是否已经进入视口，并根据需要进行相应的处理。

```js
let observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      observer.unobserve(lazyImage);
    }
  });
});

const lazyImages = [...document.querySelectorAll(".lazy")];
lazyImages.forEach(function (image) {
  observer.observe(image);
});
```

2. 自定义监听器

或者，可以通过自定义监听器来实现懒加载。其中，应该避免在滚动事件处理程序中频繁进行图片加载，因为这可能会影响性能。相反，使用自定义监听器只会在滚动停止时进行图片加载。

```js
function lazyLoad() {
  const images = document.querySelectorAll(".lazy");
  const scrollTop = window.pageYOffset;
  images.forEach((img) => {
    if (img.offsetTop < window.innerHeight + scrollTop) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  });
}

let lazyLoadThrottleTimeout;
document.addEventListener("scroll", function () {
  if (lazyLoadThrottleTimeout) {
    clearTimeout(lazyLoadThrottleTimeout);
  }
  lazyLoadThrottleTimeout = setTimeout(lazyLoad, 20);
});
```

在这个例子中，我们使用了 `setTimeout()` 函数来延迟图片的加载，以避免在滚动事件的频繁触发中对性能的影响。

无论使用哪种方法，都需要为需要懒加载的图片设置占位符，并将未加载的图片路径保存在 `data` 属性中，以便在需要时进行加载。这些占位符可以是简单的 div 或样式类，用于预留图片的空间，避免页面布局的混乱。

```html
<!-- 占位符示例 -->
<div class="lazy-placeholder" style="background-color: #ddd;height: 500px;"></div>

<!-- 图片示例 -->
<img class="lazy" data-src="path/to/image.jpg" alt="预览图" />
```

总体来说，图片懒加载是一种这很简单，但非常实用的优化技术，能够显著提高网页的性能和用户体验。
