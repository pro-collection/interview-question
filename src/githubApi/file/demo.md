**关键词**：自动化 changelog

在编写 npm 包时，可以使用自动化工具来生成 changelog 和自动更新 tag。以下是你可以使用的一些流行的工具以及它们的基本用法。

1. **semantic-release**: 这是一个全自动的版本管理和包发布工具。它能根据 commit 信息来自动决定版本号、生成变更日志（changelog）以及发布。

   要使用 semantic-release，你需要按照以下步骤操作：

   - 安装 semantic-release 工具：

     ```sh
     npm install -D semantic-release
     ```

   - 在项目中添加配置文件 (`semantic-release.config.js`) 或在 `package.json` 中配置。
   - 在 CI 工具中（例如 GitHub Actions、Travis CI）配置发布脚本。
   - 遵循规范化的 commit 消息风格（如 Angular 规范），因为 semantic-release 会根据 commit 消息来确定版本号和生成 changelog。

2. **standard-version**: 如果你更希望进行半自动化的版本管理，standard-version 是一个很好的替代选择。它可以自动地根据 commit 记录来生成 changelog。

   使用 standard-version 的大致步骤如下：

   - 安装 standard-version 工具：

     ```sh
     npm install --save-dev standard-version
     ```

   - 在 `package.json` 中配置脚本：

     ```json
     {
       "scripts": {
         "release": "standard-version"
       }
     }
     ```

   - 当你准备发布新版本时，运行以下命令：

     ```sh
     npm run release
     ```

   - standard-version 会自动根据 commit 消息创建一个新的 tag，并更新 changelog。然后，你可以手动推送这些改动到仓库。

在这两种情况下，都推荐使用遵循某种规范的 commit 消息，如 Conventional Commits 规范，这样可以让工具更准确地解析 commit 消息来进行版本管理。此外，确保你的 CI/CD 系统有足够的权限来推送 tags 到远程仓库。
