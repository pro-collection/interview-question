1. **`ESLint`配置规则软性禁止**：通过配置`.eslintrc.json`文件，添加`"no-console": "warn"`规则，使代码中使用`console`的地方会划上黄色波浪线警示，能一定程度削减`console.log`数量，但无法真正阻止其使用。
2. **`git commit`编写规则限制提交**：找到项目中的`.git/hooks`文件夹下的`pre-commit.sample`文件，将其内容修改为若提交代码中包含`console.log`则报错提交失败，并将文件重命名为`pre-commit`。但该规则可被`git commit -m 'xxx' --no-verify`指令绕过。
3. **依托于 cicd 的自动检测**: 在流水线部署的时候跑 eslint, 如果 console.log 代码增加， 就 拒绝部署即可；
4. **使用插件删除**
   - **`VSCODE`插件**：可在插件商店搜索`remove-console`并安装，找到有`console.log`的文件使用插件删除，但效果可能不太理想。
   - **`Webpack`插件**
     - 可使用`terser-webpack-plugin`，在项目基于`create-react-app`脚手架时可直接搜到，在使用处配置`drop_console: true`，能在打包后去除全部`console.log`。

参考文档：

- https://juejin.cn/post/7417710863711649832
