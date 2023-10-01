**关键词**：SPA首屏、加快首屏加载

**统计首屏时间**

可以参考下面的文档：

- https://github.com/pro-collection/interview-question/issues/515
- https://github.com/pro-collection/interview-question/issues/516

**影响首屏可能得因素**

- 网络延时问题
- 资源文件体积是否过大
- 资源是否重复发送请求去加载了
- 加载脚本的时候，渲染内容堵塞了


**解决方案**

- 减小入口文件积
- 静态资源本地缓存
- UI框架按需加载
- 图片资源的压缩
- 组件重复打包
- 开启 GZip 压缩
- 使用 SSR
- 启用 CDN 加速
