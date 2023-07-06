**关键词**：统计指定目录下代码行数

要实现一个命令行工具来统计输入目录下指定代码的行数，你可以使用Node.js的`fs`模块来读取文件内容并进行行数统计。以下是一个简单的实现示例：

```javascript
const fs = require('fs');
const path = require('path');

function countLinesInDirectory(dirPath, fileExtension) {
  let totalLines = 0;

  function countLinesInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    totalLines += lines.length;
  }

  function processDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile() && path.extname(file) === fileExtension) {
        countLinesInFile(filePath);
      } else if (stats.isDirectory()) {
        processDirectory(filePath);
      }
    });
  }

  processDirectory(dirPath);

  return totalLines;
}

// 命令行参数，第一个参数是目录路径，第二个参数是文件扩展名
const [_, __, dirPath, fileExtension] = process.argv;

const linesCount = countLinesInDirectory(dirPath, fileExtension);
console.log(`Total lines of ${fileExtension} files in ${dirPath}: ${linesCount}`);
```

你可以将上述代码保存为一个JavaScript文件，比如`line-counter.js`。然后，在终端中运行以下命令：

```
node line-counter.js /path/to/directory .js
```

其中`/path/to/directory`是你要统计的目录路径，`.js`是你要统计的文件扩展名。运行命令后，程序将会输出指定文件类型在指定目录中的总行数。

你可以根据需要自定义输出格式、文件过滤规则等。此示例只是一个基本的实现，你可以根据具体需求进行扩展和优化。
