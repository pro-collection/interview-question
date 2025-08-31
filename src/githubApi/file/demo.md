**关键词**：git diff

> 作者备注
>
> 这个比较冷门， 平常很多时候都用不上， 基本上可以当做科普了解
> 如果当面试官问到：代码有问题， 怎么排查是哪一个 commit 引入的， 可以参考以下的回答

`git diff` 是 Git 中用于**查看文件修改差异**的核心命令，能够展示不同版本、不同状态之间的代码变更，帮助你跟踪和理解代码的变化过程。

### 核心作用

比较不同版本或不同状态下的文件内容差异，主要场景包括：

- 工作区与暂存区的差异
- 暂存区与最新提交的差异
- 不同提交之间的差异
- 不同分支之间的差异

### 常用用法

#### 1. 查看工作区与暂存区的差异（最常用）

```bash
git diff
```

- 显示**工作区中已修改但未暂存**（未执行 `git add`）的文件与暂存区的差异
- 输出格式：`-` 表示删除的内容，`+` 表示新增的内容，行号用于定位位置

#### 2. 查看暂存区与最新提交的差异

```bash
git diff --cached  # 或 git diff --staged
```

- 显示**已暂存（执行过 `git add`）但未提交**的内容与最近一次提交（`HEAD`）的差异
- 常用于提交前确认暂存的内容是否正确

#### 3. 查看工作区与最新提交的差异

```bash
git diff HEAD
```

- 同时显示**未暂存**和**已暂存**的所有修改与最新提交的差异
- 相当于 `git diff`（工作区 vs 暂存区） + `git diff --cached`（暂存区 vs HEAD）的合并结果

#### 4. 比较两个提交之间的差异

```bash
git diff <提交ID1> <提交ID2>
```

- 示例：比较 `a1b2c3d` 和 `e4f5g6h` 两个提交的差异
  ```bash
  git diff a1b2c3d e4f5g6h
  ```
- 若只关心某个文件的差异，可在最后指定文件名：
  ```bash
  git diff a1b2c3d e4f5g6h src/index.js
  ```

#### 5. 比较两个分支之间的差异

```bash
git diff <分支1> <分支2>
```

- 示例：比较 `feature/login` 分支和 `main` 分支的差异
  ```bash
  git diff feature/login main
  ```

#### 6. 查看某次提交相对于上一次提交的差异

```bash
git diff <提交ID>^ <提交ID>  # ^ 表示该提交的父提交
# 简化写法：
git diff <提交ID>~1 <提交ID>
```

- 更简洁的方式：直接查看某次提交的修改内容
  ```bash
  git show <提交ID>  # 相当于 git diff <提交ID>^ <提交ID>
  ```

### 输出格式说明

`git diff` 的输出通常包含以下部分：

```diff
diff --git a/src/index.js b/src/index.js  # 比较的文件
index 1234567..abcdefg 100644            # 文件的索引信息
--- a/src/index.js                        # 源文件（旧版本）
+++ b/src/index.js                        # 目标文件（新版本）
@@ -5,7 +5,7 @@ function greet() {                # 差异所在的行范围
   console.log("Hello, world!");
-  console.log("This is old code");
+  console.log("This is new code");       # +表示新增内容
   return true;
 }
```

### 实用选项

- `-w`：忽略空白字符的差异（如空格、换行的调整）
  ```bash
  git diff -w  # 忽略空白差异
  ```
- `--stat`：只显示文件修改的统计信息（不显示具体内容）
  ```bash
  git diff --stat  # 例如：src/index.js | 2 +-（表示该文件有2行修改，1行新增1行删除）
  ```
- `-p`：显示完整的差异内容（默认就是这个行为，可省略）

### 总结

`git diff` 是代码审查和变更跟踪的重要工具，核心是通过比较不同“版本快照”之间的差异，帮助你：

- 提交前确认修改内容
- 回顾历史变更
- 了解分支之间的差异
- 排查代码问题

熟练使用 `git diff` 能大幅提升对代码变更的掌控力，是日常 Git 操作中不可或缺的命令。
