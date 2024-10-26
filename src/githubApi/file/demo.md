**关键词**：前端 CICD

前端应用的持续集成与持续部署（CI/CD）可以通过以下几种方式实现：

**一、使用 Jenkins**

1. 持续集成：

   - Jenkins 可以监听代码仓库（如 Git）的变化，当有新的代码提交时，自动触发构建任务。
   - 对于前端项目，可以配置 Jenkins 执行构建命令，如使用 npm 或 yarn 安装依赖、运行构建脚本等。
   - 例如，可以创建一个自由风格的项目，配置源代码管理为你的 Git 仓库地址，并在构建步骤中添加“Execute shell”，输入构建命令，如`npm install && npm run build`。

2. 持续部署：
   - 构建成功后，Jenkins 可以将构建生成的静态文件部署到目标服务器上。
   - 可以使用插件（如 Publish Over SSH）将文件传输到远程服务器，并执行部署脚本。
   - 例如，配置插件连接到目标服务器，设置部署目录，然后在构建后操作中选择“Send build artifacts over SSH”，指定要传输的文件和目标服务器信息。

**二、使用 GitLab CI/CD**

1. 持续集成：

   - 在`.gitlab-ci.yml`文件中定义一系列的阶段（stages）和任务（jobs）。
   - 当代码推送到 GitLab 仓库时，GitLab Runner 会自动执行这些任务。
   - 对于前端项目，可以定义一个`build` job，在其中执行构建命令。
   - 例如：

     ```yaml
     stages:
       - build

     build:
       stage: build
       script:
         - npm install
         - npm run build
     ```

2. 持续部署：

   - 可以在`.gitlab-ci.yml`中定义`deploy` job，将构建生成的静态文件部署到服务器上。
   - 可以使用 SSH 密钥或其他部署工具来实现部署。
   - 例如：

     ```yaml
     stages:
       - build
       - deploy

     build:
       stage: build
       script:
         - npm install
         - npm run build

     deploy:
       stage: deploy
       script:
         - scp -r dist/* user@server:/path/to/deploy
     ```

**三、使用 GitHub Actions**

1. 持续集成：

   - 在`.github/workflows`目录下创建一个 YAML 文件来定义工作流。
   - 当代码推送到 GitHub 仓库时，GitHub Actions 会自动执行工作流中的任务。
   - 对于前端项目，可以在工作流中执行构建命令。
   - 例如：

     ```yaml
     name: CI/CD for Frontend App

     on:
       push:
         branches:
           - main

     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Install dependencies
             run: npm install
           - name: Build
             run: npm run build
     ```

2. 持续部署：

   - 可以在工作流中添加部署步骤，使用 SSH、FTP 等方式将静态文件部署到服务器上。
   - 或者使用云服务提供商的部署服务，如 AWS Amplify、Netlify 等。
   - 例如：

     ```yaml
     name: CI/CD for Frontend App

     on:
       push:
         branches:
           - main

     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Install dependencies
             run: npm install
           - name: Build
             run: npm run build

       deploy:
         needs: build
         runs-on: ubuntu-latest
         steps:
           - name: Deploy to Server
             run: scp -r dist/* user@server:/path/to/deploy
     ```

**四、使用 Travis CI**

1. 持续集成：

   - 在项目根目录下创建一个`.travis.yml`文件来定义构建配置。
   - 当代码推送到支持的代码仓库（如 GitHub）时，Travis CI 会自动触发构建。
   - 对于前端项目，可以在配置文件中指定构建命令。
   - 例如：

     ```yaml
     language: node_js
     node_js:
       - 12

     script:
       - npm install
       - npm run build
     ```

2. 持续部署：

   - 可以在构建成功后，使用部署工具或脚本将静态文件部署到服务器上。
   - 例如，可以在`.travis.yml`中添加部署步骤，使用 SSH 或其他方式进行部署。
   - ```yaml
     language: node_js
     node_js:
       - 12

     script:
       - npm install
       - npm run build

     after_success:
       - scp -r dist/* user@server:/path/to/deploy
     ```
