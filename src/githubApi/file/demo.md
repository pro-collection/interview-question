**关键词**：commit 规范

Commit lint 是一种实践，用于在代码库中规范化提交信息的格式。这种做法通常有助于团队成员理解代码库的历史记录，以及自动化生成变更日志。下面是实施 Commit lint 的一些基本步骤：

1. **选择 Commit 信息规范：** 首先，你需要选择一个提交信息的规范，最常见的是[Conventional Commits](https://www.conventionalcommits.org/)，它具有明确的结构和规则。

2. **配置 Linter 工具：** [commitlint](https://commitlint.js.org/#/) 是一个流行的工具，用于检查提交信息是否符合规定的格式。安装 commitlint，通常是作为项目的开发依赖。

   ```bash
   npm install --save-dev @commitlint/{config-conventional,cli}
   ```

3. **设置 commitlint 配置：** 在你的项目根目录下创建一个名为 `commitlint.config.js` 的文件，并且导入你选择的规范：

   ```javascript
   module.exports = { extends: ["@commitlint/config-conventional"] };
   ```

4. **安装钩子（Hook）管理工具：** [Husky](https://typicode.github.io/husky/#/) 是一个钩子管理工具，它可以助你轻松的在 Git 挂钩中添加脚本（例如，在 commit 之前检查提交信息格式）。

   ```bash
   npm install husky --save-dev
   ```

5. **配置 Husky 来使用 commitlint**:

   - 初始化 husky：

   ```bash
   npx husky install
   ```

   - 添加 `commit-msg` 钩子来使用 commitlint。执行非交互式的命令配置钩子脚本：

   ```bash
   npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
   ```

   这行代码会在`.husky/commit-msg`文件中创建一个钩子，并且在你试图创建提交时，会调用 commitlint 来检查你的提交信息。

6. **提交代码：** 当你提交代码时，Husky 会触发 `commit-msg` 钩子调用 commitlint 检查提交信息。如果信息不符合规范，提交将被拒绝，并显示错误信息。

7. **配置 CI/CD 流水线：** 为了确保规范被强制执行，可以在 CI/CD 流水线中添加一步来执行 commitlint。这样，如果提交的信息不符合规范，构建将会失败。
