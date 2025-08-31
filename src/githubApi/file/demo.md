**关键词**：git stash

`git stash` 是 Git 中一个非常实用的命令，用于**临时保存工作区和暂存区的修改**，让你可以在不提交当前变更的情况下，切换到其他分支或进行其他操作，之后还能恢复这些临时保存的变更。

### 核心作用

当你正在一个分支上开发，突然需要切换到其他分支（比如修复紧急 Bug），但当前工作还没完成不想提交时，`git stash` 可以：

- 把工作区和暂存区的所有修改（包括新增、修改、删除的文件）暂存到一个“栈”中
- 让工作区回到最近一次提交的干净状态（与 `git reset --hard HEAD` 效果类似，但变更被临时保存了）
- 之后可以随时从“栈”中恢复这些变更，继续之前的工作

### 常用命令

1. **暂存当前变更**

   ```bash
   git stash
   # 或添加描述（推荐，方便区分多个stash）
   git stash save "描述信息：例如「首页导航栏修改」"
   ```

   执行后，工作区会恢复到干净状态，变更被存入 stash 栈。

2. **查看所有暂存的变更**

   ```bash
   git stash list
   ```

   输出类似：

   ```
   stash@{0}: On feature/login: 修复登录按钮样式
   stash@{1}: On develop: 临时添加调试日志
   ```

   `stash@{n}` 是每个暂存的唯一标识，`n` 越小表示越新。

3. **恢复暂存的变更**

   - 恢复最新的 stash（`stash@{0}`），且保留 stash 记录：
     ```bash
     git stash apply
     ```
   - 恢复指定的 stash（例如 `stash@{1}`）：
     ```bash
     git stash apply stash@{1}
     ```
   - 恢复最新的 stash 并删除该 stash 记录（推荐用完即删的场景）：
     ```bash
     git stash pop
     ```

4. **删除暂存的变更**

   - 删除最新的 stash：
     ```bash
     git stash drop
     ```
   - 删除指定的 stash：
     ```bash
     git stash drop stash@{1}
     ```
   - 删除所有 stash：
     ```bash
     git stash clear
     ```

5. **查看 stash 中的具体修改**  
   查看最新 stash 与当前工作区的差异：
   ```bash
   git stash show
   ```
   查看详细差异（显示具体修改的内容）：
   ```bash
   git stash show -p
   ```

### 注意事项

- `git stash` 只会暂存**已跟踪文件**（即已被 Git 管理的文件）的修改，以及**已添加到暂存区的新增文件**。未跟踪的全新文件（未执行过 `git add`）不会被暂存，需要先执行 `git add` 或使用 `git stash -u`（`-u` 表示包括未跟踪文件）。
- 恢复 stash 时，如果当前工作区有修改，可能会出现冲突，需要手动解决。
- stash 存储在本地仓库，不会被推送到远程，切换电脑后无法获取。

简单来说，`git stash` 就像一个“剪贴板”，让你可以临时“剪切”当前工作状态，稍后再“粘贴”回来，非常适合处理多任务切换的场景。
