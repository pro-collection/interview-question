**关键词**：git 仓库迁移

如果你想迁移仓库并保留原始仓库的所有提交历史、分支和标签，你可以使用以下步骤：

### 方法一：使用 `git clone` 和 `git push`

1. **在仓库 B 中创建新的仓库。**

2. **在本地克隆仓库 A：**
```bash
git clone --mirror <仓库 A URL>
cd <仓库 A 目录>
```

使用 `--mirror` 选项克隆仓库会保留所有分支、标签和提交历史。

3. **修改远程仓库地址为仓库 B：**
```bash
git remote set-url --push origin <仓库 B URL>
```

4. **推送到仓库 B：**
```bash
git push --mirror
```

### 方法二：使用 `git bundle`

1. **在仓库 A 中创建 bundle 文件：**
```bash
git bundle create repoA.bundle --all
```

2. **将 `repoA.bundle` 文件传输到仓库 B 所在位置。**

3. **在仓库 B 中克隆：**
```bash
git clone repoA.bundle <仓库 B 目录>
```

这两种方法都会保留所有分支、标签和提交历史。选择哪种方法取决于你的具体需求和迁移环境。

**注意：**
- 使用 `--mirror` 或 `--all` 选项在 `git clone` 或 `git bundle` 中时，会将所有的分支和标签复制到目标仓库。
- 在执行之前，请确保仓库 B 是空的或者是一个你可以覆盖的目标仓库，因为这些操作会覆盖目标仓库的内容。
- 如果仓库 A 中包含子模块，你可能需要额外处理子模块的迁移。
