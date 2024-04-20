**关键词**：Husky 和 lint-staged、git hooks

Husky 和 lint-staged 都是与 Git 钩子 (hooks) 配合使用的 Node.js 库，但它们的用途和工作方式有所不同：

1. **Husky**：

   - Husky 是一个 Git 钩子管理器，它允许你触发自定义脚本在 git 事件发生时运行，如 `pre-commit`, `pre-push`, `post-merge` 等。
   - 它的主要目的是自动化你的版本控制工作流程，例如在提交 (commit) 前运行代码检查、格式化代码或执行测试，以确保代码库的质量和一致性。

2. **lint-staged**：
   - lint-staged 是一个运行在 Husky 钩子之上的工具，它专门用于对暂存区 (staged) 文件的检查。
   - 当你运行 `git commit` 并且 Husky 触发 `pre-commit` 钩子时，lint-staged 会检查你即将提交的代码（即 `git add` 后的文件列表），并运行你配置好的检查脚本，如代码格式化程序、linter 或其他工具。
   - 它的目的是确保在提交之前，只有没有检查错误的代码会被提交。

简而言之，Husky 是一个可以触发多种钩子事件的工具，而 lint-staged 是一种专门用于检查 Git 暂存区文件的工具。它们通常是配合使用的，因为 lint-staged 需要通过 Husky 来触发钩子。在你初始化项目并配置 CI/CD 流程时，通常会同时用到它们。
