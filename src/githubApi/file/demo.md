**关键词**：盒模型

### 盒模型

CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。

**在标准盒模型性中**

![画板 (5)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bdd6da8a5db4f188a9a7d79c30ebcb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:  
宽 = `width + padding2 + border2 + margin2`  
高 = `height + padding2 + border2 + margin2`

盒模型实际大小:  
宽 = `width + padding2 + border2`  
高 = `height + padding2 + border2`

**在 IE 盒模型性中**

![画板 (4)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bc8aaa0306845e4a03ef9e78f55a9d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:  
宽 = `width + margin2`  
高 = `height + margin2`

盒模型实际大小:  
宽 = `width`  
高 = `height`

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

- `box-sizeing: content-box`表示标准盒模型
- `box-sizeing: border-box`表示 IE 盒模型
