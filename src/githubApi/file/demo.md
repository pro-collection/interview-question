**关键词**：eslint 和 git 结合校验

要让 ESLint 只校验在 Merge Request (MR)、Pull Request (PR)或代码提交中变更的文件，可以采用几种方法。下面是几个可能的方案：

### 1. 命令行 Git 和 ESLint 组合使用

通过组合`git`命令和`eslint`命令来实现。首先，使用`git diff`获取变更的文件列表，然后将这些文件传递给`eslint`进行校验。

```bash
# 获取master分支与当前分支变更的文件列表，然后对这些文件执行eslint校验
git diff --name-only --diff-filter=d master | grep '\.js$' | xargs eslint
```

这里的命令解释：

- `git diff --name-only --diff-filter=d master`：获取相对于`master`分支变更的文件列表，`--diff-filter=d`表示排除已删除的文件。
- `grep '\.js$'`：过滤出`.js`结尾的文件。
- `xargs eslint`：将过滤后的文件列表作为参数传递给`eslint`命令。

注意：这个命令以`master`分支作为对比对象，如果你需要对比其他分支，请将`master`替换为相应的分支名。

### 2. 使用 lint-staged 运行 ESLint

[lint-staged](https://github.com/okonet/lint-staged) 是一个在 git 暂存文件上运行 linters 的工具，它非常适合与 pre-commit 钩子结合使用，确保只有符合代码规范的代码才能被提交。

首先，安装`lint-staged`和`husky`（用于管理 git 钩子的工具）：

```bash
npm install lint-staged husky --save-dev
```

然后，你可以在项目的`package.json`文件中配置`lint-staged`：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"]
  }
}
```

这样配置后，每次执行`git commit`操作时，`husky`会触发`pre-commit`钩子，运行`lint-staged`，再由`lint-staged`运行 ESLint 检查所有暂存的`.js`文件。通过这种方式，只有变更的并且被 git track 的文件会被 ESLint 校验。

### 3. CI/CD 中集成 ESLint

在持续集成/持续部署 (CI/CD) 流程中，你也可以配置脚本使用类似于第一个方案的命令，只校验在 MR/PR 中变更的文件。具体实现方式会依赖于你使用的 CI/CD 工具（如 GitLab CI、GitHub Actions、Jenkins 等）。

通过在 CI/CD 流程中加入这一步，可以确保只有通过 ESLint 校验的代码变更才能合并到主分支。
