**关键词**：React HOC

**关键词**：husky 作用、husky 配置

Husky 是一个基于 Node 的 Git 钩子管理工具，用于在你的工作流程中强制执行 Git 钩子。Husky 允许你定义脚本，这些脚本会在不同的 Git 生命周期事件触发时自运行，比如在提交、推送或合并前。

使用 Husky 可以：

1. **保证提交质量**：Husky 可以在你提交代码之前运行代码校验，确保代码符合项目规范，提高代码质量。
2. **维护代码风格**：可以在提交时检查代码风格，确保代码风格一致性。
3. **自动化流程**：支持在推送前执行代码部署、测试脚本，让整个开发流程自动化。
4. **预防错误**：例如在允许推送到远程仓库之前检查代码中是否有遗留的更改。

Husky 的一些重要配置如下：

1. **`npm install husky@latest --save-dev`**: 安装 husky。
2. **`npx husky install`**: 在新建的项目管理下生成 husky 的配置文件。
3. **`npx husky add .husky/*.sh`**: 添加 Git 钩子脚本，这里的 `*.sh` 是你想触发的钩子点，例如：`pre-commit`、`commit-msg` 等。

Husky 支持的钩子包括：

- `apply-patch-msg`: 应用一个补丁到暂存区并生成提交信息时。
- `pre-applypatch`: 打补丁前。
- `post-applypatch`: 打补丁后。
- `pre-commit`: 提交前，常用于检查代码、分析代码风格等。
- `prepare-commit-msg`: 提交准备工作完成后，修改提交信息之前运行。
- `commit-msg`: 检查提交信息有效性。
- `post-commit`: 提交后。
- `pre-rebase`: 回滚操作开始前。
- `post-checkout`: 检出操作后（如切换分支）。
- `post-merge`: 合并和变基操作后。

记得在 `.husky` 文件夹里配置这些钩子脚本，你可以根据项目需求来写自己的 hook 脚本。比如，设置一个 `.husky/pre-commit` 脚本（可能是一个 shell 脚本和 Node.js 脚本的组合），当你尝试提交代码时，Husky 将会运行这个脚本作为 `pre-commit` 钩子。

在一些场景下的 `.husky/pre-commit` 脚本，你可以指定运行如下：

```bash
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint  # 运行 ESLint 检查代码
./node_modules/.bin/pretty-quick  # 格式化代码
./node_modules/.bin/tsc  # 检查 TypeScript
```

以上脚本将确保代码在提交前通过了 linter 检查，并通过 prettier 快速格式化以及 TypeScript 编译。

使用的时候，请确认你的项目已经有了 Node.js 环境，并且已经安装了 Husky 和相应的代码检查、格式化工具。
