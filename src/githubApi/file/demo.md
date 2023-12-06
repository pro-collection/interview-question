**关键词**：css 加载阻塞渲染

# css加载会造成阻塞吗？

js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗？                    
为了完成本次测试，先来科普一下，如何利用chrome来设置下载速度


打开chrome控制台(按下F12),可以看到下图，重点在我画红圈的地方                    
![01](https://pic1.zhimg.com/v2-00bec3ea167ad4320a7e60fa0e405978_r.jpg)

2. 点击我画红圈的地方(No throttling),会看到下图,我们选择GPRS这个选项                      
![02](https://pic2.zhimg.com/v2-3b76909c0db211e6def82107ddaaabc9_r.jpg)

3. 这样，我们对资源的下载速度上限就会被限制成20kb/s，好，那接下来就进入我们的正题

### css加载会阻塞DOM树的解析渲染吗？
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      h1 {
        color: red !important
      }
    </style>
    <script>
      function h () {
        console.log(document.querySelectorAll('h1'))
      }
      setTimeout(h, 0)
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <h1>这是红色的</h1>
  </body>
</html>
```
假设： css加载会阻塞DOM树解析和渲染

假设下的结果: 在bootstrap.css还没加载完之前，下面的内容不会被解析渲染。那么我们一开始看到的应该是白屏，h1不会显示出来。
并且此时console.log的结果应该是一个空数组。                     
实际结果:如下图                    
![03](https://pic2.zhimg.com/v2-d27c590e677526132cc102b967cb06b9_b.gif)

#### css会阻塞DOM树解析？

由上图我们可以看到，当bootstrap.css还没加载完成的时候，h1并没有显示，但是此时控制台输出如下                           
![04](https://pic1.zhimg.com/80/v2-655b4eabed2a09aaa75662cd971cb7fc_hd.jpg)

可以得知，此时DOM树至少已经解析完成到了h1那里，而此时css还没加载完成，也就说明，**css并不会阻塞DOM树的解析**。

#### css加载会阻塞DOM树渲染？
由上图，我们也可以看到，当css还没加载出来的时候，页面显示白屏，直到css加载完成之后，红色字体才显示出来，也就是说，
下面的内容虽然解析了，但是并没有被渲染出来。所以，**css加载会阻塞DOM树渲染**。


#### 个人对这种机制的评价
其实我觉得，这可能也是浏览器的一种优化机制。因为你加载css的时候，
可能会修改下面DOM节点的样式，如果css加载不阻塞DOM树渲染的话，那么当css加载完之后，
DOM树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。所以干脆就先把DOM树的结构先解析完，把可以做的工作做完，
然后等你css加载完之后，在根据最终的样式来渲染DOM树，这种做法性能方面确实会比较好一点。

### css加载会阻塞js运行吗？
由上面的推论，我们可以得出，css加载不会阻塞DOM树解析，但是会阻塞DOM树渲染。那么，css加载会不会阻塞js执行呢?
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      console.log('before css')
      var startDate = new Date()
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
    <h1>这是红色的</h1>
    <script>
      var endDate = new Date()
      console.log('after css')
      console.log('经过了' + (endDate -startDate) + 'ms')
    </script>
  </body>
</html>
```
假设: css加载会阻塞后面的js运行

预期结果: 在link后面的js代码，应该要在css加载完成后才会运行

实际结果:
![05](https://pic1.zhimg.com/v2-08c57cc17672558749803febff606468_b.gif)

由上图我们可以看出，位于css加载语句前的那个js代码先执行了，
但是位于css加载语句后面的代码迟迟没有执行，直到css加载完成后，它才执行。
这也就说明了，**css加载会阻塞后面的js语句的执行**。详细结果看下图(css加载用了5600+ms):                  
![06](https://pic3.zhimg.com/80/v2-00254fb0bd3edd4f25fcc093681a2006_hd.jpg)


### 结论
由上所述，我们可以得出以下结论:
- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:
- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

### 其他补充
浏览器渲染是合并dom和cssom的过程，和js完全不一样。
浏览器实现是，尽量等待dom和cssom解析完成，再开始合并渲染。
如果dom解析完成但是css文件超时，或者css太慢，浏览器也会先渲染dom，等css下载完成再另一次渲染。
而为什么会阻塞js，大部分原因都是因为js一般是在页面load完成之后才执行。
如果css都没加载完成js自然不会执行。以上属个人见解，实际情况自行测试。

浏览器对CSS阻塞渲染有两种处理方式，要么等css解析完一起渲染，chrome就是这么做的，但是会造成白屏；
要么先把无样式的dom渲染出来等css解析好了再渲染一次，Firefox就是这么做的，但是会造成无样式内容闪烁。


参考文章
- [css加载会造成阻塞吗？](https://zhuanlan.zhihu.com/p/43282197?utm_source=qq&utm_medium=social&utm_oi=746007294986174464)
