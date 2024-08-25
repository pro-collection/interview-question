**关键词**：电梯导航、混动导航

> 作者备注， 这个问题实际上是介于中等难度和 高难度之间的问题， 主要看怎么回答
> 文本回答涉及到了 IntersectionObserver + scrollIntoView 实现， 可以归为 「高」里面

具体 api 本文不再介绍， 可以直接翻看 MDN 即可

思路很简单， 利用 scrollIntoView 进行导航滚动、利用 IntersectionObserver 进行可视区判断；

具体实现：

- 第一步：点击右边的导航菜单，利用 scrollIntoView 方法使内容区域对应的元素出现在可视区域中。

```javascript
let rightBox = document.querySelector(".rightBox");
rightBox.addEventListener(
  "click",
  function (e) {
    let target = e.target || e.srcElement;
    if (target && !target.classList.contains("rightBox")) {
      document.querySelector("." + target.className.replace("Li", "")).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  },
  false
);
```

- 第二步：页面容器滚动时，当目标元素出现在检测区域内则联动改变对应导航的样式。

```javascript
let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      let target = document.querySelector("." + entry.target.className + "Li");

      if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
        document.querySelectorAll("li").forEach((el) => {
          if (el.classList.contains("active")) {
            el.classList.remove("active");
          }
        });

        if (!target.classList.contains("active")) {
          target.classList.add("active");
        }
      }
    });
  },
  {
    threshold: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
  }
);
```

完整效果请看下面链接： https://codepen.io/xingba-coder/pen/ZEdKRKJ

**参考文档**：https://juejin.cn/post/7399982698846404649
