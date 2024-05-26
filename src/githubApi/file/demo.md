**关键词**：webpack 多入口共享模块

默认情况下，每个入口 chunk 保存了全部其用的模块(modules)。使用 dependOn 选项你可以与另一个入口 chunk 共享模块:

```js
module.exports = {
  //...
  entry: {
    app: { import: "./app.js", dependOn: "react-vendors" },
    "react-vendors": ["react", "react-dom", "prop-types"],
  },
};
```

app 这个 chunk 就不会包含 react-vendors 拥有的模块了.

dependOn 选项的也可以为字符串数组：

```js
module.exports = {
  //...
  entry: {
    moment: { import: "moment-mini", runtime: "runtime" },
    reactvendors: { import: ["react", "react-dom"], runtime: "runtime" },
    testapp: {
      import: "./wwwroot/component/TestApp.tsx",
      dependOn: ["reactvendors", "moment"],
    },
  },
};
```

此外，你还可以使用数组为每个入口指定多个文件：

```js
module.exports = {
  //...
  entry: {
    app: { import: ["./app.js", "./app2.js"], dependOn: "react-vendors" },
    "react-vendors": ["react", "react-dom", "prop-types"],
  },
};
```

**看一个完整案例**

```js
module.exports = {
  //...
  entry: {
    home: "./home.js",
    shared: ["react", "react-dom", "redux", "react-redux"],
    catalog: {
      import: "./catalog.js",
      filename: "pages/catalog.js",
      dependOn: "shared",
      chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    },
    personal: {
      import: "./personal.js",
      filename: "pages/personal.js",
      dependOn: "shared",
      chunkLoading: "jsonp",
      asyncChunks: true, // Create async chunks that are loaded on demand.
      layer: "name of layer", // set the layer for an entry point
    },
  },
};
```
