**关键词**：模版引擎

### 前端模板引擎实现原理

前端模板引擎是一种用于处理 HTML 字符串的工具，它允许开发人员在 HTML 中嵌入特殊语法，然后使用模板引擎把数据与这些语法结合，生成最终的 HTML 字符串。这种方式有助于实现数据与表示的分离，使得代码更易于维护。

前端模板引擎的实现原理通常包括以下几个步骤：

1. **编译模板**：将模板字符串解析成模板语法（如变量、循环、条件等）和普通文本。这个过程通常涉及到词法分析和语法分析两个阶段。词法分析将模板字符串切分成多个标记（Token），再通过语法分析将这些标记组织成抽象语法树（AST）。

2. **生成代码**：将抽象语法树转换成 JavaScript 代码。这个过程通常包括将语法节点（AST Nodes）转换成相应的 JavaScript 语句，以渲染数据的形式。

3. **执行代码**：对生成的 JavaScript 代码进行求值，通过传入模板数据，渲染最终的 HTML 字符串。

下面是一个简单的模板引擎实现示例：

```javascript
function simpleTemplateEngine(template, data) {
const variableRegex = /{{\s*([\w]+)\s*}}/g; // 匹配变量插值

let match;
let lastIndex = 0;
let result = '';

while ((match = variableRegex.exec(template)) !== null) {
result += template.slice(lastIndex, match.index); // 添加文本
result += data[match[1]]; // 添加变量值
lastIndex = match.index + match[0].length;
}

result += template.slice(lastIndex); // 添加尾部文本
return result;
}

// 使用示例
const template = 'Hello, {{name}}! Today is {{day}}.';
const data = {
name: 'John',
day: 'Monday',
};

console.log(simpleTemplateEngine(template, data)); // 输出：Hello, John! Today is Monday.
```

这个简化的示例仅支持变量插值，完整的模板引擎需要考虑循环、条件、自定义函数等更复杂的语法和性能优化。在实际项目中，可以选择成熟的模板引擎库，例如 Handlebars、Mustache 或者 Lodash 的 `template` 函数。


### 如何在模板引擎中实现条件判断

要在模板引擎中实现条件判断，你需要扩展模板引擎的语法支持和解析能力。以 Handlebars 为例，其中的 `if` 和 `else` 助手语法可以实现条件判断。首先，我们需要修改匹配变量的正则表达式以识别条件判断语句。接着，在解析过程中，根据条件判断结果添加相应的内容。

以下代码实现了一个简化的模板引擎，支持条件判断：

```javascript
function parseTemplate(template, data) {
  const tokenRegex = /{{\s*(\/?[\w\s]+\/?)\s*}}/g; // 匹配模板语法 token
  const keywords = /^(if|\/if|else)$/;
  let result = '';
  const stack = [];

  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(template)) !== null) {
    let staticContent = template.substring(lastIndex, match.index);
    result += staticContent;
    lastIndex = match.index + match[0].length;

    const token = match[1].trim();
    const keywordMatch = token.match(keywords);

    if (!keywordMatch) { // 处理变量插值
      result += data[token];
      continue;
    }

    switch (keywordMatch[0]) {
    case 'if':
      stack.push('if');
      const ifCondition = data[token.split(' ')[1]];
      if (ifCondition) {
        tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data);
      }
      break;
    case 'else':
      stack.push('else');
      tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data);
      break;
    case '/if':
      stack.pop();
      break;
    }
  }

  result += template.substring(lastIndex);
  return result;
}

function processSubTemplate(stack, tokenRegex, template, data) {
  let subTemplate = '';
  let cursor = tokenRegex.lastIndex;

  while (stack.length && cursor < template.length) {
    cursor++;
    const char = template[cursor];
    subTemplate += char;

    if (char === '}' && template[cursor - 1] === '}') {
      const lastTwo = template.substring(cursor - 2, cursor);
      if (lastTwo === '{{') {
        const match = subTemplate.match(/{{\s*(\/?[\w\s]+\/?)\s*}}/);
        if (match) {
          const token = match[1].trim();
          const keywordMatch = token.match(/^(if|\/if|else)$/);
          if (keywordMatch) {
            if (keywordMatch[0] === stack[stack.length - 1]) {
              stack.pop();
            } else {
              stack.push(keywordMatch[0]);
            }
          }
        }
      }
    }
  }

  if (stack[stack.length - 1] === 'else') {
    stack.pop();
  }

  return subTemplate.length;
}

// 使用示例
const template = `
  {{name}},
  {{if isMember}}
    Welcome back, {{name}}!
  {{else}}
    Please join us!
  {{/if}}
`;

const data = {
  name: "John",
  isMember: true,
};

console.log(parseTemplate(template, data).trim());
```

这个简化示例说明了如何在模板中实现条件判断。不过请注意，这个实现并没有经过优化，性能可能不佳。在实际项目中，推荐使用成熟的模板引擎库，如 Handlebars、Mustache 等。
