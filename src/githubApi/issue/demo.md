## 什么是 npm script

npm 允许在package.json文件里面，使用scripts字段定义脚本命令。

```awk
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

上面代码是`package.json`文件的一个片段，里面的scripts字段是一个对象。它的每一个属性，对应一段脚本。比如，build命令对应的脚本是`node build.js`。

命令行下使用`npm run`命令，就可以执行这段脚本。

```crmsh

$ npm run build
# 等同于执行
$ node build.js
```

这些定义在`package.json`里面的脚本，就称为npm脚本。它的优点很多。

* 项目的相关脚本，可以集中在一个地方。
* 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。
* 用户不需要知道怎么测试你的项目，只要运行npm run test即可。
* 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

```applescript
$ npm run
```

---

### 原理

npm run 实际上是 npm run-script 命令的简写

* 从 package.json 文件中读取 scripts 对象里面的全部配置；
* 以传给 npm run 的第一个参数作为键，如dev，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；

每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run新建的这个 Shell，会将当前目录的node\_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

这意味着，当前目录的node\_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。

```json
"test": "mocha test"
```

### 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```json
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，\*表示任意文件名，\*\*表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```json
"test": "tap test/\*.js"
```

---

### 传参

给 npm script 传递参数 给 npm script 传递参数 eslint 内置了代码风格自动修复模式，只需给它传入 --fix 参数即可，在 scripts 中声明检查代码命令的同时你可能也需要声明修复代码的命令，面对这种需求，大多数同学可能会忍不住复制粘贴，如下：

```diff
@@ -5,6 +5,7 @@
     "lint:js": "eslint *.js",
+    "lint:js:fix": "eslint *.js --fix",
```

在 lint:js 命令比较短的时候复制粘贴的方法简单粗暴有效，但是当 lint:js 命令变的很长之后，难免后续会有人改了 lint:js 而忘记修改 lint:js:fix（别问我为啥，我就是踩着坑过来的），更健壮的做法是，在运行 npm script 时给定额外的参数，代码修改如下：

```diff
@@ -5,6 +5,7 @@
     "lint:js": "eslint *.js",
+    "lint:js:fix": "npm run lint:js -- --fix",
```

要格外注意 --fix 参数前面的 -- 分隔符，意指要给 npm run lint:js 实际指向的命令传递额外的参数。

---

### 注释

```swift
"test": "# 运行所有代码检查和单元测试 .    npm-run-all --parallel lint:* mocha"
```

或者在单独的文件中可以自由给它添加注释

---

### 日志

```dockerfile
npm run test --loglevel silent
npm run test --slient
npm run test -s
```

这个日志级别，只有命令本身的输出，读起来非常的简洁

```dockerfile
npm run test --loglevel verbose
npm run test --verbose
npm run test -d
```

这个日志级别，详细打印出了每个步骤的参数、返回值

---

### 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。

```routeros
$ npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```routeros
$ npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：`npm-run-all`、`script-runner`

```awk
// 串行
{
-    "test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown"
+    "test": "npm-run-all lint:js lint:css lint:json lint:markdown"
   },
// 并行 --parallel
{
-    "test": "npm-run-all lint:*"
+    "test": "npm-run-all --parallel lint:* mocha"
}
```

---

### 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```1c

"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

---

### 钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

```smalltalk
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

npm run prebuild && npm run build && npm run postbuild 因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

```json

"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

```
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

npm 提供一个npm\_lifecycle\_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码。请看下面的例子。

```arcade
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

注意，prepublish这个钩子不仅会在npm publish命令之前运行，还会在npm install（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子prepare，行为等同于prepublish，而从 npm 5 开始，prepublish将只在npm publish命令之前运行。

---

### 简写形式

四个常用的 npm 脚本有简写形式。

```routeros
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写
```

npm start、npm stop和npm restart都比较好理解，而npm restart是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

```crmsh
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

---

### 变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

运行 `npm run env`能拿到完整的变量列表

使用`npm run env | grep npm_package | sort` 拿到部分排序后的环境变量

通过npm\_package\_前缀，npm 脚本可以拿到package.json里面的字段。比如，下面是一个package.json。

```json
{
  "name": "foo",
  "version": "1.2.5",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

那么，变量npm\_package\_name返回foo，变量npm\_package\_version返回1.2.5。

```arcade
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量process.env对象，拿到package.json的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`$npm_package_scripts_start`

---

### 结合 npm script 和 git-hooks

Git 在代码版本管理之外，也提供了类似 npm script 里 pre、post 的钩子机制，叫做 Git Hooks，钩子机制能让我们在代码 commit、push 之前（后）做自己想做的事情。

前端社区里有多种结合 npm script 和 git-hooks 的方案，比如 [pre-commit](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fobserving%2Fpre-commit "https://github.com/observing/pre-commit")、[husky](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fhusky "https://github.com/typicode/husky")，相比较而言 husky 更好用，它支持更多的 Git Hooks 种类，再结合 [lint-staged](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fokonet%2Flint-staged "https://github.com/okonet/lint-staged") 使用就更好了。

[了解更多](https://juejin.cn/post/6844903479283040269 "https://juejin.cn/post/6844903479283040269")

---

### 常用脚本示例

```awk
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```