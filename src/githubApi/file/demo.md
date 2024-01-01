**关键词**：图片优化

图片作为网页和移动应用中不可或缺的元素之一，对于用户体验和网站性能都有着重要的影响。

加载速度是用户体验的关键因素之一，而大尺寸的图片会增加网页加载时间，导致用户等待时间过长，从而影响用户的满意度和留存率。通过优化图片，我们可以显著减少页面加载时间，提供更快速流畅的使用体验。

图片优化是提升用户体验、提高网站性能、减少流量消耗和增加搜索引擎曝光度的关键因素。为了提供更出色的用户体验，同时也提升网站的性能。总结了一下通用的图片优化首手段。

### 1. 选择合适的图片格式

以下是对常用的图片格式jpg、png和webp进行深度对比的表格：

| 特性     | JPG              | PNG              | WebP             |
|---------|------------------|------------------|------------------|
| 压缩算法 | 有损压缩         | 无损压缩         | 有损压缩         |
| 透明度   | 不支持透明度     | 支持透明度       | 支持透明度       |
| 图片质量 | 可调整质量       | 无法调整质量     | 可调整质量       |
| 文件大小 | 相对较小         | 相对较大         | 相对较小         |
| 浏览器支持 | 支持在所有主流浏览器上显示 | 支持在所有主流浏览器上显示 | 部分浏览器支持    |
| 动画支持 | 不支持动画       | 不支持动画       | 支持动画         |
| 兼容性   | 兼容性较好       | 兼容性较好       | 兼容性较差       |

请注意，这个表格只是对这些格式的一般特征进行了总结，并不代表所有情况。实际情况可能因图像内容、压缩设置和浏览器支持等因素而有所不同。因此，在选择图像格式时，您应根据具体要求和应用场景进行评估和选择。

### 2. 图片压缩
主要介绍 webpack 对图片进行压缩，可以使用以下步骤：

1. 安装依赖：首先，确保你已经在项目中安装了webpack和相关的loader。可以使用以下命令安装所需的loader：
```
npm install --save-dev file-loader image-webpack-loader
```

2. 配置Webpack：在Webpack的配置文件中进行相关配置。以下是一个简单的示例：
```javascript
const path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
```
上述配置中，我们使用`file-loader`将图片复制到输出目录，并使用`image-webpack-loader`对图片进行压缩和优化。

3. 运行Webpack：现在，当你运行Webpack时，它将自动使用`image-webpack-loader`对匹配到的图片进行压缩和优化。压缩后的图片将被复制到输出目录中。

### 3. 雪碧图

Web图片优化的雪碧图（CSS Sprites）是一种将多个小图片合并为一个大图片的技术。通过将多个小图片合并成一张大图片，可以减少浏览器发送的请求次数，从而提高页面加载速度。

雪碧图的原理是通过CSS的`background-image`和`background-position`属性，将所需的小图片显示在指定的位置上。这样，只需加载一张大图，就可以显示多个小图片，减少了网络请求的数量，提高了页面加载速度。

听上去好像很麻烦， **实际上可以使用 webpack 插件 `webpack-spritesmith`** 完成自动化处理雪碧图合成，我们在使用过程中正常使用即可。

以下是使用`webpack-spritesmith`插件来自动处理雪碧图的步骤：

1. 安装插件：使用npm或yarn安装`webpack-spritesmith`插件。
```bash
npm install webpack-spritesmith --save-dev
```

2. 配置Webpack：在Webpack配置文件中，引入`webpack-spritesmith`插件，并配置相应的选项。

```javascript
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  // ...其他配置

  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'path/to/sprites'), // 需要合并的小图片所在的目录
        glob: '*.png' // 小图片的文件名格式
      },
      target: {
        image: path.resolve(__dirname, 'path/to/output/sprite.png'), // 生成的雪碧图的路径和文件名
        css: path.resolve(__dirname, 'path/to/output/sprite.css') // 生成的CSS样式表的路径和文件名
      },
      apiOptions: {
        cssImageRef: 'path/to/output/sprite.png' // CSS样式表中引用雪碧图的路径
      }
    })
  ]
}
```

3. 使用雪碧图：在HTML中，使用生成的CSS样式类来显示相应的小图片。Webpack会自动处理雪碧图的合并和CSS样式的生成。例如：

然后，你可以按照以下方法在CSS中引用雪碧图：

CSS方式：
```css
div {
  background: url(path/to/output/sprite.png) no-repeat;
}

.icon-facebook {
  /* 设置小图标在雪碧图中的位置和大小 */
  width: 32px;
  height: 32px;
  background-position: 0 0; /* 该小图标在雪碧图中的位置 */
}

.icon-twitter {
  width: 32px;
  height: 32px;
  background-position: -32px 0; /* 该小图标在雪碧图中的位置 */
}

.icon-instagram {
  width: 32px;
  height: 32px;
  background-position: -64px 0; /* 该小图标在雪碧图中的位置 */
}
```

在HTML中，你可以像下面这样使用对应的CSS类来显示相应的小图标：

```html
<div class="icon icon-facebook"></div>
<div class="icon icon-twitter"></div>
<div class="icon icon-instagram"></div>
```

这样，Webpack会根据配置自动处理雪碧图，并生成对应的雪碧图和CSS样式表。CSS中的`background`属性会引用生成的雪碧图，并通过`background-position`来指定显示的小图标在雪碧图中的位置。

确保在CSS中指定了每个小图标在雪碧图中的位置和大小，以便正确显示。

使用Webpack自动处理雪碧图可以简化开发流程，并且可以根据需要自定义配置。`webpack-spritesmith`是一个常用的Webpack插件，可以帮助自动处理雪碧图。

### 4. 图标类型资源推荐使用 iconfont

如果你有很多图标类型的图片资源，并且想使用`iconfont`来处理这些资源，可以按照以下步骤进行处理：

- 获取图标资源：首先，你需要获取你想要的图标资源。你可以从`iconfont`网站或其他图标库中选择和下载符合需求的图标。这个没有啥好说的， 直接推荐: https://www.iconfont.cn/

- 生成字体文件：接下来，你需要将这些图标转换成字体文件。你可以使用`iconfont`提供的在线转换工具，将图标文件上传并生成字体文件（包括`.ttf`、`.eot`、`.woff`和`.svg`格式）。

- 引入字体文件：将生成的字体文件下载到本地，并在你的项目中引入。通常，你需要在CSS文件中通过`@font-face`规则引入字体文件，并为字体定义一个唯一的名称。

- 使用图标：一旦字体文件引入成功，你可以在CSS中通过设置`content`属性来使用图标。每个图标都会有一个对应的Unicode代码，你可以在`iconfont`提供的网站或字体文件中找到对应图标的Unicode代码，并通过设置`content`属性的值为该Unicode代码来使用图标。

以下是一个简单的示例，以帮助你更好地理解：

```css
@font-face {
  font-family: 'iconfont';
  src: url('path/to/iconfont.eot'); /* 引入字体文件 */
  /* 其他格式的字体文件 */
}

.icon {
  font-family: 'iconfont'; /* 使用定义的字体名称 */
  font-size: 16px; /* 图标大小 */
  line-height: 1; /* 图标行高 */
}

.icon-facebook::before {
  content: '\e001'; /* 使用Unicode代码表示想要显示的图标 */
}

.icon-twitter::before {
  content: '\e002'; /* 使用Unicode代码表示想要显示的图标 */
}

.icon-instagram::before {
  content: '\e003'; /* 使用Unicode代码表示想要显示的图标 */
}
```

在上述示例中，我们首先通过`@font-face`引入了字体文件，并为字体定义了一个名称`iconfont`。然后，我们使用该名称作为`font-family`属性的值，以便在`.icon`类中使用该字体。最后，我们通过在`::before`伪元素中设置`content`属性为图标的Unicode代码，来显示相应的图标。

在HTML中，你可以像下面这样使用对应的CSS类来显示相应的图标：

```html
<span class="icon icon-facebook"></span>
<span class="icon icon-twitter"></span>
<span class="icon icon-instagram"></span>
```

通过上述步骤，你可以使用`iconfont`来处理你的图标资源，并在项目中方便地使用它们。确保在CSS中设置了图标的字体大小和行高，以便正确显示图标。


### 5. 使用 base64 格式

**实际开发过程中， 为何会考虑 base64 ？**

使用Base64图片的优势有以下几点：

- **减少HTTP请求数量**：通常情况下，每个网页都需要加载多张图片，因此会发送多个HTTP请求来获取这些图片文件。使用Base64图片可以将图片数据嵌入到CSS或HTML文件中，减少了对服务器的请求次数，从而提高网页加载速度。

- **减少图片文件的大小**：Base64是一种编码方式，可以将二进制数据转换成文本字符串。通过使用Base64，可以将图片文件转换成文本字符串，并将其嵌入到CSS或HTML文件中。相比于直接引用图片文件，Base64编码的字符串通常会更小，因此可以减少图片文件的大小，从而减少了网页的总体积，加快了网页加载速度。

- **简化部署和维护**：将图片数据嵌入到CSS或HTML文件中，可以减少文件的数量和复杂性，使得部署和维护变得更加简单和方便。此外，也不需要处理图片文件的路径和引用相关的问题。

- **实现一些特殊效果**：通过Base64图片，可以实现一些特殊的效果，例如页面背景渐变、图标的使用等。这样可以避免使用额外的图片文件，简化了开发过程。

上面虽然说饿了挺多有点， 但是劣势也是很明显：

- **增加了文本文件的体积**：因为Base64编码将二进制数据转换成文本字符串，所以会增加CSS或HTML文件的体积。在图片较大或数量较多时，这可能会导致文件变得庞大，从而导致网页加载速度变慢。

- **缓存问题**：由于Base64图片被嵌入到了CSS或HTML文件中，如果图片内容有更新，那么整个文件都需要重新加载，而无法使用缓存。相比于独立的图片文件，Base64图片对缓存的利用效率较低。

使用Base64图片在一些特定的场景下可以提供一些优势，但也需要权衡其带来的一些缺点。在实际开发中，可以根据具体的需求和情况，选择是否使用Base64图片。 所以**建议复用性很强, 变更率较低， 且 小于 10KB 的图片文件， 可以考虑 base64**

**如何使用**？ 有要介绍一下  webpack 插件了： `url-loader` 或 `file-loader`

**要使用Webpack将图片自动转换为Base64编码，您需要执行以下步骤**：

1. 安装依赖：首先，确保您已经安装了`url-loader`或`file-loader`，它们是Webpack的两个常用的加载器。

```bash
npm install url-loader --save-dev
```

2. 配置Webpack：在Webpack的配置文件中，添加对图片文件的处理规则。您可以在`module.rules`数组中添加一个新的规则，以匹配图片文件的后缀。

```javascript
module.exports = {
 // ...
 module: {
   rules: [
     // ...
     {
       test: /\.(png|jpe?g|gif)$/i,
       use: [
         {
           loader: 'url-loader',
           options: {
             limit: 8192, // 设置图片大小的阈值，小于该值的图片会被转为Base64
             outputPath: 'images', // 输出路径
             publicPath: 'images', // 资源路径
           },
         },
       ],
     },
   ],
 },
 // ...
};
```

   在上面的示例中，配置了一个处理`png`、`jpeg`、`jpg`和`gif`格式图片的规则。使用`url-loader`加载器，并设置了一些选项，例如`limit`限制了图片大小的阈值，小于该值的图片将会被转换为Base64编码。

3. 在代码中引用图片：在您的代码中，可以像引用普通图片一样引用图片文件，Webpack会根据配置自动将其转换为Base64编码。

```javascript
import imgSrc from './path/to/image.png';

const imgElement = document.createElement('img');
imgElement.src = imgSrc;
document.body.appendChild(imgElement);
```

4. 构建项目：最后，使用Webpack构建项目，它会根据配置自动将符合规则的图片文件转换为Base64编码，并将其嵌入到生成的输出文件中。

```bash
npx webpack
```

这样，Webpack就会自动将图片转换为Base64编码，并将其嵌入到生成的输出文件中。请注意，在使用Base64图片时，需要权衡文件大小和性能，适度使用Base64编码，避免过大的文件导致网页加载变慢。


### 6. 使用 CDN 加载图片

CND 加载图片优势非常明显：

- 加速网页加载速度：CDN通过将图片资源分布在全球的多个节点上，使用户能从离自己最近的节点获取资源，从而大大减少了网络延迟和加载时间。这可以提高网页的加载速度和用户体验。

- 减轻服务器负载：CDN充当了一个缓冲层，当用户请求图片资源时，CDN会将图片资源从源服务器获取并缓存在节点中，下次再有用户请求同一资源时，CDN会直接从节点返回，减少了对源服务器的请求，分担了服务器的负载。

- 提高并发性能：CDN节点分布在不同地区，用户请求图片资源时可以从离他们最近的节点获取，这可以减少网络拥塞和并发请求，提高了并发性能。

- 节省带宽成本：CDN的节点之间会自动选择最优路径，有效利用了带宽资源，减少了数据传输的成本，尤其在大量图片资源请求时，能够带来显著的成本节省。

- 提供高可用性：CDN通过分布式存储和负载均衡技术，提供了高可用性和容错能力。即使某个节点或源服务器发生故障，CDN会自动切换到其他可用节点，确保用户能够正常访问图片资源。

总之，使用CDN加载图片可以提高网页加载速度、降低服务器负载、提高并发性能、节省带宽成本，并提供高可用性，从而改善用户体验和网站性能。


### 7. 图片懒加载

图片懒加载是一种在网站或应用中延迟加载图片的技术。它的主要目的是减少页面的初始加载时间，并提高用户的浏览体验。

- 原理：图片懒加载的原理是只在用户需要时加载图片，而不是在页面初始加载时全部加载。这通常通过将图片的真实地址存储在自定义属性（例如`data-src`）中，而不是在`src`属性中。然后，在图片进入浏览器视图时，通过JavaScript动态将`data-src`的值赋给`src`属性，触发图片的加载。

- 优势：图片懒加载可以显著减少初始页面的加载时间，特别是当页面中有大量图片时。它使页面加载变得更快，提高了用户的浏览体验。此外，懒加载还可以节省带宽和减轻服务器负载，因为只有当图片进入视图时才会加载。

- 实现方法：图片懒加载可以通过纯JavaScript实现，也可以使用现成的JavaScript库，如`LazyLoad.js、Intersection Observer API等`。这些库提供了方便的API和配置选项，可以自定义懒加载的行为和效果。

- 最佳实践：在使用图片懒加载时，可以考虑一些最佳实践。例如，设置一个占位符或加载中的动画，以提供更好的用户体验。另外，确保在不支持JavaScript的情况下仍然可用，并为可访问性提供替代文本（alt属性）。此外，对于移动设备，可以考虑使用响应式图片来适应不同的屏幕分辨率。

**实现举例**：

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

### 8. 图片预加载

图片预加载是一种在网站或应用中提前加载图片资源的技术。它的主要目的是在用户实际需要加载图片之前，将其提前下载到浏览器缓存中。

图片预加载通常是在页面加载过程中或在特定事件触发前异步加载图片资源。 通过使用 `JavaScript`，可以在网页DOM元素中创建一个新的`Image`对象，并将要预加载的图片的URL赋值给该对象的`src`属性。 浏览器在加载过程中会提前下载这些图片，并将其缓存起来，以备将来使用。

图片预加载可以使用原生JavaScript实现，也可以使用现成的JavaScript库，如`Preload.js、LazyLoad.js`等。这些库提供了方便的API和配置选项，可以灵活地控制预加载的行为和效果。

实现图片预加载可以使用原生JavaScript或使用专门的JavaScript库。**下面分别介绍两种方式的实现方法**：

1. 使用原生JavaScript实现图片预加载：

```javascript
function preloadImage(url) {
 return new Promise(function(resolve, reject) {
   var img = new Image();
   img.onload = resolve;
   img.onerror = reject;
   img.src = url;
 });
}

// 调用预加载函数
preloadImage('image.jpg')
 .then(function() {
   console.log('图片加载成功');
   // 在此处可以执行加载成功后的操作，例如显示图片等
 })
 .catch(function() {
   console.error('图片加载失败');
   // 在此处可以执行加载失败后的操作，例如显示错误信息等
 });
```

在上述代码中，我们定义了一个`preloadImage`函数，它使用`Image`对象来加载图片资源。通过`onload`事件和`onerror`事件来监听图片加载完成和加载错误的情况，并使用Promise对象进行异步处理。

2. 使用JavaScript库实现图片预加载：

使用JavaScript库可以更简便地实现图片预加载，并提供更多的配置选项和功能。以下以Preload.js库为例进行说明：

首先，在HTML文件中引入Preload.js库：

```html
<script src="preload.js"></script>
```

然后，在JavaScript代码中使用Preload.js库来进行图片预加载：

```javascript
var preload = new createjs.LoadQueue();
preload.on("complete", handleComplete);
preload.on("error", handleError);
preload.loadFile('image.jpg');

function handleComplete() {
 console.log('图片加载成功');
 // 在此处可以执行加载成功后的操作，例如显示图片等
}

function handleError() {
 console.error('图片加载失败');
 // 在此处可以执行加载失败后的操作，例如显示错误信息等
}
```

在上述代码中，我们首先创建一个`LoadQueue`对象，并使用`on`方法来监听加载完成和加载错误的事件。然后使用`loadFile`方法来指定要预加载的图片资源的URL。

当图片加载完成时，`handleComplete`函数会被调用，我们可以在此处执行加载成功后的操作。当图片加载错误时，`handleError`函数会被调用，我们可以在此处执行加载失败后的操作。

以上是两种常用的实现图片预加载的方法，根据具体需求和项目情况选择合适的方式来实现图片预加载。

### 9. 响应式加载图片
要在不同分辨率的设备上显示不同尺寸的图片，你可以使用`<picture>`元素和`<source>`元素来实现响应式图片。以下是一个示例：

```html
<picture>
  <source media="(min-width: 1200px)" srcset="large-image.jpg">
  <source media="(min-width: 768px)" srcset="medium-image.jpg">
  <source srcset="small-image.jpg">
  <img src="fallback-image.jpg" alt="Fallback Image">
</picture>
```

在上面的示例中，`<picture>`元素内部有多个`<source>`元素，每个`<source>`元素通过`srcset`属性指定了对应分辨率下的图片链接。`media`属性可以用来指定在哪个分辨率下应用对应的图片。如果没有任何`<source>`元素匹配当前设备的分辨率，那么就会使用`<img>`元素的`src`属性指定的图片链接。

可以根据不同分辨率的设备，提供不同尺寸和质量的图片，以优化用户的视觉体验和页面加载性能。

有可以使用 webpack `responsive-loader` 来实现自动根据设备分辨率加载不同的倍图：

依赖安装:
```
npm install responsive-loader sharp --save-dev
```

webpack 配置示范
```js
module.exports = {
  entry: {...},
  output: {...},
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|webp)$/i,
         use: [
          {
            loader: "responsive-loader",
            options: {
              adapter: require('responsive-loader/sharp'),
              sizes: [320, 640, 960, 1200, 1800, 2400],
              placeholder: true,
              placeholderSize: 20
            },
          },
        ],
      }
    ]
  },
}
```

在CSS中使用它(如果使用多个大小，则只使用第一个调整大小的图像)
```css
.myImage {
  background: url('myImage.jpg?size=1140');
}

@media (max-width: 480px) {
  .myImage {
    background: url('myImage.jpg?size=480');
  }
}
```

导入图片到 JS 中：
```js
import responsiveImage from 'img/myImage.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';
import responsiveImageWebp from 'img/myImage.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp';

// Outputs
// responsiveImage.srcSet => '2fefae46cb857bc750fa5e5eed4a0cde-300.jpg 300w,2fefae46cb857bc750fa5e5eed4a0cde-600.jpg 600w,2fefae46cb857bc750fa5e5eed4a0cde-600.jpg 600w ...'
// responsiveImage.images => [{height: 150, path: '2fefae46cb857bc750fa5e5eed4a0cde-300.jpg', width: 300}, {height: 300, path: '2fefae46cb857bc750fa5e5eed4a0cde-600.jpg', width: 600} ...]
// responsiveImage.src => '2fefae46cb857bc750fa5e5eed4a0cde-2048.jpg'
// responsiveImage.toString() => '2fefae46cb857bc750fa5e5eed4a0cde-2048.jpg'
...
  <picture>
    <source srcSet={responsiveImageWebp.srcSet} type='image/webp' sizes='(min-width: 1024px) 1024px, 100vw'/>
    <img
      src={responsiveImage.src}
      srcSet={responsiveImage.srcSet}
      width={responsiveImage.width}
      height={responsiveImage.height}
      sizes='(min-width: 1024px) 1024px, 100vw'
      loading="lazy"
    />
  </picture>
...
```

### 10. 渐进式加载图片
实现渐进式加载的主要思想是先加载一张较低分辨率的模糊图片，然后逐步加载更高分辨率的图片。

下面是实现渐进式加载图片的一般步骤：

1. 创建一张模糊的低分辨率图片。可以使用图片处理工具将原始图片进行模糊处理，或者使用低分辨率的缩略图作为初始图片。

2. 使用`<img>`标签将低分辨率的图片设置为`src`属性。这将立即加载并显示这张低分辨率的图片。

3. 在加载低分辨率图片时，同时加载高分辨率的原始图片。可以将高分辨率图片的URL设置为`data-src`等自定义属性，或者使用JavaScript动态加载高清图片。

4. 使用JavaScript监听图片的加载事件，在高分辨率图片加载完成后，将其替换低分辨率图片的`src`属性，以实现渐进式加载的效果。

下面是一个示例代码，演示了如何实现渐进式加载图片：

```html
<!-- HTML -->
<img src="blur-image.jpg" data-src="high-res-image.jpg" alt="Image">

<script>
// JavaScript
const image = document.querySelector('img');

// 监听高分辨率图片加载完成事件
image.addEventListener('load', () => {
  // 替换低分辨率图片的src属性
  image.src = image.dataset.src;
});
</script>
```

在上面的示例中，一开始会显示一张模糊的低分辨率图片，然后在高分辨率图片加载完成后，将其替换为高分辨率图片，实现了渐进式加载的效果。

渐进式加载图片可以减少用户等待时间，提供更好的用户体验。然而，需要注意的是，为了实现渐进式加载，需要额外加载高分辨率的图片，这可能会增加页面加载时间和网络带宽消耗。因此，开发者需要在性能和用户体验之间进行权衡，并根据实际情况进行选择和优化。




