> 作者备注
>
> 这个问题， 其实本质就是一个 package.json 配置里面的 bin 配置， 没有多大的价值

以下是使用 Node.js 创建一个全局命令行工具的步骤：

**一、创建项目结构**

1. 创建一个新的文件夹作为项目目录，例如`my-cli-tool`。
2. 在项目目录中，初始化一个新的 Node.js 项目，可以使用`npm init`或`yarn init`命令，根据提示填写项目的基本信息。

**二、安装必要的模块**

1. 安装`commander`模块，这是一个用于构建命令行界面的流行工具。

   - 使用 npm：`npm install commander --save`
   - 使用 yarn：`yarn add commander`

**三、编写命令行工具代码**

1. 创建一个主入口文件，例如`index.js`。
2. 在入口文件中，引入`commander`模块并进行配置：

   ```javascript
   const program = require("commander");

   program
     .version("1.0.0")
     .description("My awesome CLI tool")
     .option("-n, --name <value>", "Your name")
     .action((options) => {
       console.log(`Hello, ${options.name || "World"}!`);
     });

   program.parse(process.argv);
   ```

   在这个例子中，我们创建了一个命令行工具，它接受一个`--name`选项，并在执行时打印出问候语。

**四、设置全局安装**

1. 在项目的`package.json`文件中，添加一个`bin`字段，指定命令行工具的入口文件：

   ```json
   {
     "name": "my-cli-tool",
     "version": "1.0.0",
     "description": "My awesome CLI tool",
     "main": "index.js",
     "bin": {
       "my-tool": "./index.js"
     },
     "dependencies": {
       "commander": "^9.4.0"
     }
   }
   ```

   这里将命令行工具的名称设置为`my-tool`，对应的入口文件是`index.js`。

2. 使用`npm link`或`yarn link`命令将项目链接到全局环境中。这将使你的命令行工具在系统中可用。

   - 使用 npm：`npm link`
   - 使用 yarn：`yarn link`

**五、测试命令行工具**

1. 打开终端，输入`my-tool --name John`，如果一切正常，应该会看到输出`Hello, John!`。
