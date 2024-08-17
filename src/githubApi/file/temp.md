> 作者备注， 此文章属于转载
> 原文作者：有机后脑  
> 链接：https://juejin.cn/post/7360534173718167579  
> 来源：稀土掘金  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

### 瀑布流布局

当前主流的一些软件当中我们常常可以看见这样的一种布局,该布局可以将大小不一的图片完整的显示在页面上，并且在杂乱的布局中保持着一定的美感。（如下图:）

![Screenshot_2024-04-23-23-12-35-519_com.jingdong.a.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4e450f7ba984760833bb58e9ff2f5ce~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1440&h=3200&s=1715452&e=jpg&b=f7efed)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd2338600ce942ab8f0347d1bf8efbed~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1860&h=890&s=1332320&e=png&b=f8f4f3)

### HTML 与 CSS 部分

1. div#container 作为所有图片的容器
2. div.box 作为每个图片的容器
3. div.box-img 包裹 img 标签
4. img 负责显示图片
5. 多个 div.box 排列图片
6. 重复上述结构,排列了多行图片
7. 主容器使用相对定位占据文档流中的位置而其子标签 box 使用浮动式布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      #container {
        position: relative;
      }

      .box {
        float: left;
        padding: 5px;
      }

      .box-img {
        width: 150px;
        padding: 5px;
        border: 1px solid #dd9f9f;
      }

      img {
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div id="container">
      <div class="box">
        <div class="box-img">
          <img src="./img/1.webp" alt="" />
        </div>
      </div>
      ......省略了19个box
    </div>
    <script src="index.js"></script>
  </body>
</html>
```

此时的页面:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4948c01e92814e9583a34ea2ce4bbd42~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1928&h=1040&s=1053345&e=png&b=ffffff)

### JavaScript 部分

### 实现原理：

1.使用一个父容器 container 包裹子容器 box

2.图片容器 box-img 包裹在容器 box 中，用来展示

3.通过 js 获取父容器的 DOM 结构，再获取其子元素图片容器 box

4.将其按照瀑布流的规则使用绝对定位放置

5.获取屏幕大小计算该屏幕最多能放下几张图片，将前 n 张图片放在第一行

6.使用一个 heightArr 高度数组,在放置的时候记录每一列图片的高度,后面的图片放置在高度最低的那一列

### 图解:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2e0b52959ea49df9cb63ab2a5aa9bd2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=905&h=636&s=34819&e=png&b=ffffff)

### js 代码实现:

```javascript
//获取用户屏幕宽度，决定一行几张图
//操作下一张图，放到上一行最矮的列下
imgLocation("container", "box");

function imgLocation(parent, content) {
  var cparent = document.getElementById(parent);
  var ccontent = getChildElement(cparent, content); //document.querySelectorAll('#container .box')
  // console.log(ccontent)
  var imgWidth = ccontent[0].offsetWidth;
  var num = Math.floor(document.documentElement.clientWidth / imgWidth);
  cparent.style.width = `${imgWidth * num}px`;
  //要操作的是哪张，每一列的高度

  var BoxHeightArr = [];
  for (var i = 0; i < ccontent.length; i++) {
    if (i < num) {
      //记录第一行
      BoxHeightArr[i] = ccontent[i].offsetHeight;
    } else {
      //开始操作，找到最矮的高度及列数
      minHeight = Math.min.apply(null, BoxHeightArr);
      var minIndex = BoxHeightArr.indexOf(minHeight);

      //摆放图片位置
      ccontent[i].style.position = "absolute";
      ccontent[i].style.top = minHeight + "px";
      ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
      //更新这一列图片高度
      BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
    }
  }
  console.log(BoxHeightArr);
}

function getChildElement(parent, child) {
  //获取parent中所有child
  var childArr = [];
  var allChild = parent.getElementsByTagName("*");
  //找出所有box
  for (var i = 0; i < allChild.length; i++) {
    if (allChild[i].className == child) {
      childArr.push(allChild[i]);
    }
  }
  return childArr;
}
```

### 最终效果:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e9ec489a484120b12c43fe87b532e7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=911&s=1021235&e=png&b=fefcfc)
