**关键词**：webpack 配置代码优化

当 Webpack 配置代码变得冗长和难以管理时，可以采取以下方法来优化配置：

- **配置文件拆分**

将配置文件分成多个部分，每个文件只负责一部分逻辑。比如基础配置、开发环境配置、生产环境配置等。

```js
// webpack.base.js - 存放共同的配置项
// webpack.dev.js - 开发环境特定的配置项
// webpack.prod.js - 生产环境特定的配置项
```

- **使用环境变量**

通过环境变量来区分不同的配置环境，使用 `webpack-merge` 或 `env-cmd` 这样的库来合并配置。

```js
// 通过环境变量确定不同的配置文件
const env = process.env.NODE_ENV;

let config;
if (env === "production") {
  config = require("./webpack.prod.js");
} else {
  config = require("./webpack.dev.js");
}

module.exports = config;
```

- **模块化配置**

将常用的 loader、plugins、entry 等配置项封装成函数或者模块，然后在主配置文件中引入。

```js
// loaders.js - 存放所有loader的配置
// plugins.js - 存放所有plugins的配置
// entries.js - 存放入口文件配置

// webpack.config.js
const loaders = require("./loaders");
const plugins = require("./plugins");
const entries = require("./entries");

module.exports = {
  module: {
    rules: loaders.getRules(),
  },
  plugins: plugins.getPlugins(),
  entry: entries.getEntries(),
  // ...
};
```

- **使用 webpack-merge 抽离通用配置**

检查配置中的重复部分，将它们抽象成共用的配置， 再使用 `webpack-merge` 来合并多个配置文件，保持配置的清晰和可维护性。

```js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const devConfig = require("./webpack.dev.js");

module.exports = merge(baseConfig, devConfig);
```

- **统一管理插件和加载器**

如果项目中使用了大量插件和加载器，请考虑将它们的实例化和配置逻辑封装在单独的函数或文件中。 然后根据不同的环境， 直接 pick 不同的配置即可。 可以达到配置的 loader 和 plugin 集中管理。
