**关键词**：eslint 插件编写

以下是一个可以检测特定字符串并支持参数传递的 ESLint 插件开发步骤：

**一、创建插件项目**

1. 创建一个新的目录来存放插件项目，例如`eslint-plugin-custom-string-check`。
2. 在该目录下，运行`npm init`初始化一个 npm 项目。

**二、插件结构**

1. 在项目目录下创建一个`index.js`文件作为插件的入口文件。

2. 定义插件对象：

```javascript
module.exports = {
  rules: {},
};
```

**三、实现规则**

1. 定义规则函数，接收一个参数`options`，这个参数可以包含你要检测的字符串。

```javascript
module.exports = {
  rules: {
    "check-custom-string": (context, options) => {
      return {
        Program(node) {
          const sourceCode = context.getSourceCode();
          const text = sourceCode.getText();
          const targetString = options && options.stringToCheck ? options.stringToCheck : null;
          if (targetString && text.includes(targetString)) {
            context.report({
              node,
              message: `Found custom string "${targetString}".`,
            });
          }
        },
      };
    },
  },
};
```

**四、测试插件**

1. 在项目目录下创建一个`tests`目录。
2. 在`tests`目录下创建一个测试文件，例如`test.js`。

```javascript
const ruleTester = require("eslint").RuleTester;
const rule = require("../index").rules["check-custom-string"];

const ruleTester = new RuleTester();
ruleTester.run("check-custom-string", rule, {
  valid: [
    {
      code: 'const message = "This is a test.";',
      options: { stringToCheck: "errorMessage" },
    },
  ],
  invalid: [
    {
      code: 'const errorMessage = "This is an error.";',
      options: { stringToCheck: "errorMessage" },
      errors: [
        {
          message: 'Found custom string "errorMessage".',
        },
      ],
    },
  ],
});
```

**五、使用插件**

1. 在你的项目中安装这个插件：

```bash
npm install /path/to/your/plugin/eslint-plugin-custom-string-check --save-dev
```

2. 在项目的`.eslintrc`文件中配置插件：

```json
{
  "plugins": ["custom-string-check"],
  "rules": {
    "custom-string-check/check-custom-string": ["error", { "stringToCheck": "yourTargetString" }]
  }
}
```
