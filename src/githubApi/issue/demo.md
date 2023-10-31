在Webpack中配置多入口应用并区分公共依赖，可以通过以下步骤进行配置：

1. 在Webpack配置文件中，使用entry属性指定多个入口文件，并为每个入口文件命名一个唯一的键名。例如：

```javascript
module.exports = {
  entry: {
    app1: './src/app1.js',
    app2: './src/app2.js'
  },
  // 其他配置项...
};
```

上面的配置指定了两个入口文件app1.js和app2.js，并为它们分别指定了键名app1和app2。

2. 使用SplitChunks插件进行公共依赖的提取。在Webpack配置文件中添加以下配置：

```javascript
module.exports = {
  // 其他配置项...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
};
```

上面的配置中，我们使用optimization.splitChunks.cacheGroups选项配置了一个名为commons的缓存组。该缓存组将对公共依赖进行提取，name属性指定了提取后文件的名称，chunks属性指定了提取的范围为所有类型的块（入口文件和异步加载的块），minChunks属性指定了至少被引用两次的模块才会被提取为公共依赖。

3. 添加output配置，指定打包后文件的输出路径和文件名。例如：

```javascript
module.exports = {
  // 其他配置项...
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

上面的配置中，使用[name]占位符来动态生成根据入口文件的键名生成对应的文件名。

通过以上配置，Webpack将会根据指定的多个入口文件进行打包，并在打包过程中自动提取公共依赖为一个独立的文件。例如，假设app1.js和app2.js都引用了lodash库，那么在打包后的结果中，lodash库将会被提取为commons.bundle.js文件，而app1.js和app2.js则分别生成对应的app1.bundle.js和app2.bundle.js。


**追问**
> 上面的配置， 最终会输出几个文件？ 

根据上述的打包配置，最终将会输出3个文件。假设配置的多入口应用有两个入口文件app1.js和app2.js，并且两个入口文件都引用了lodash库作为公共依赖。

根据上述的配置，Webpack将会进行以下操作：

1. 根据entry配置，将app1.js和app2.js作为入口文件进行打包。
2. 遇到公共依赖lodash库时，使用SplitChunks插件将其提取为独立的文件commons.bundle.js。
3. 根据output配置，将app1.js打包后生成app1.bundle.js，将app2.js打包后生成app2.bundle.js，将commons.bundle.js生成commons.bundle.js。
4. 最终，在输出路径下将会生成3个文件：app1.bundle.js、app2.bundle.js和commons.bundle.js。




