**关键词**：构建 react 应用

### 利用 webpack 初始化基本应用构建

要在Webpack配置中添加对Less和Ant Design组件库的支持，需要进行以下步骤：

1. 安装所需的依赖。

```bash
npm install less less-loader antd
```

2. 在Webpack配置文件中添加对Less的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  },

  // ...其他配置
};
```

3. 在入口文件中引入Ant Design的样式文件。

```javascript
// 入口文件 index.js

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // 引入Ant Design的样式文件
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

现在你可以在React组件中使用Ant Design的组件和样式了。例如，在`App.js`中使用Ant Design的Button组件：

```javascript
// App.js

import React from 'react';
import { Button } from 'antd';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <Button type="primary">Click me</Button>
    </div>
  );
}

export default App;
```

重新运行Webpack开发服务器，你应该能够看到Ant Design的Button组件正常显示在页面上。

以上是一种简单的配置方法，你还可以根据需要进行更高级的配置，例如按需加载、自定义主题等。有关更多信息，请参阅Webpack和Ant Design的官方文档。

### 使用 less 应该如何配置， 同时支持 css module 和 非 css module

如果你想在Webpack配置中同时支持Less和CSS Module（局部作用域的CSS），可以使用以下配置。

1. 安装所需的依赖。

```bash
npm install less less-loader css-loader style-loader
```

2. 在Webpack配置文件中添加对Less和CSS的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        exclude: /\.module\.less$/, // 排除CSS Module的Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      },
      {
        test: /\.module\.less$/, // 匹配CSS Module的Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          {
            loader: 'css-loader', // 解析CSS文件
            options: {
              modules: true // 启用CSS Module
            }
          },
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  },

  // ...其他配置
};
```

现在，你可以同时使用普通的Less文件和CSS Module的Less文件。例如，`styles.module.less`是一个CSS Module的Less文件，`styles.less`是一个普通的Less文件。

```less
/* styles.module.less */

.container {
  background-color: red;
}
```

```less
/* styles.less */

.text {
  color: blue;
}
```

在React组件中使用这些样式：

```javascript
import React from 'react';
import styles from './styles.module.less'; // 导入CSS Module的样式
import './styles.less'; // 导入普通的Less样式

function App() {
  return (
    <div className={styles.container}>
      <h1 className="text">Hello, React!</h1>
    </div>
  );
}

export default App;
```

这样，`styles.container`将应用CSS Module的样式，`.text`将应用普通的Less样式。

重新运行Webpack开发服务器，你应该能够看到样式正常应用到组件中。

### 如何引入 antd 组件并且支持按需加载

要引入antd组件并支持按需加载，你需要进行以下配置。

1. 安装antd和babel插件。

```bash
npm install antd babel-plugin-import --save
```

2. 在.babelrc文件中配置babel插件。

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}
```

3. 在Webpack配置文件中添加对Less和CSS的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        exclude: /node_modules/,
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  },

  // ...其他配置
};
```

4. 在你的组件中引入antd组件。

```javascript
import React from 'react';
import { Button } from 'antd';

function App() {
  return <Button type="primary">Hello, Antd!</Button>;
}

export default App;
```

现在，你可以使用antd组件并且只加载你需要的组件样式。Webpack会根据需要自动按需加载antd组件的样式文件。
