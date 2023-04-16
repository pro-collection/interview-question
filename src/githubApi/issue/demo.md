`webpack` 中的 `externals` 配置项用于指定在打包时需要排除掉的模块，这些模块会被视为外部依赖，即不会被打包进最终的输出文件中，而是通过其他方式引入。

使用 `externals` 配置项可以使得打包后的代码文件更小，同时也可以在运行时从外部获取依赖，例如通过 CDN、全局变量或者通过 `require` 的方式等。

举个例子，假设我们需要在项目中引入 `jquery` 库，但我们并不想在打包的过程中将其打包进最终的输出文件中，而是从外部引入。我们可以通过以下的配置来实现：

```js
module.exports = {
  // ...
  externals: {
    jquery: 'jQuery'
  }
};
```

这里的 `externals` 配置项告诉 `webpack` 在打包时忽略 `jquery` 模块的引用，而在代码运行时，我们需要手动将 `jquery` 通过 `script` 标签引入，并将其暴露在全局变量 `jQuery` 下，例如：

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
  window.jQuery = jQuery;
</script>
```

这样在代码中引入 `jquery` 模块时，`webpack` 就会将其作为外部依赖进行处理，而不是将其打包进输出文件中。

需要注意的是，使用 `externals` 配置项需要谨慎，因为如果在运行时无法正确获取到指定的外部依赖，就会导致代码运行出错。