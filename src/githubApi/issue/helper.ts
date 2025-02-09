import fs from "fs";
import h2m from "html-to-md";
import { flow } from "lodash";
import * as child_process from "child_process";
import util from "node:util";
import axios from "axios";
import * as path from "path";
import { tempFilePath, htmlPath as htmlPathStatic } from "../file/consts";

const execPromise = util.promisify(child_process.exec);

/**
 * 处理markdown内容，清理无用的文本
 * @param html HTML格式的字符串
 * @returns 处理后的markdown文本，主要做了以下处理:
 * 1. 移除各种语言的"Copy code"文本
 * 2. 修正代码块语言标记
 * 3. 修复转义字符
 * 4. 移除"复制代码"文本
 * 5. 调整标题层级
 */
export const formatMarkdown = (html: string): string => {
  let markdown = h2m(html);
  return flow(
    (value) => value.replace(/javascriptCopy code/gi, ""),
    (value) => value.replace(/htmlCopy code/gi, ""),
    (value) => value.replace(/cssCopy code/gi, ""),
    (value) => value.replace(/jsCopy code/gi, ""),
    (value) => value.replace(/jsonCopy code/gi, ""),
    (value) => value.replace(/shellCopy code/gi, ""),
    (value) => value.replace(/jsxCopy code/gi, ""),
    (value) => value.replace(/```js\njs/gi, "```js\n"),
    (value) => value.replace(/```javascript\njs/gi, "```javascript\n"),
    (value) => value.replace(/```typescript\ntypescript/gi, "```typescript\n"),
    (value) => value.replace(/\\. /gi, ". "),
    (value) => value.replace(/\\- /gi, "- "),
    (value) => value.replace(/复制代码/gi, ""),
    // value => value.replace(/\n### /gi, "\n#### "),
    (value) => value.replace(/\n## /gi, "\n### ")
  )(markdown);
};

/**
 * 将 html 文件转为 markdown 文件， 写入本地
 * @param path 写入文件的路径
 * @param htmlPath html 文件的路径
 * @returns null
 */
export const writeToTemp = async (path = tempFilePath, htmlPath = htmlPathStatic) => {
  const html = fs.readFileSync(htmlPath, { encoding: "utf-8" });

  // 使用新的cleanMarkdown函数处理markdown
  const markdown = formatMarkdown(html);

  if (markdown) fs.writeFileSync(path, markdown, { encoding: "utf-8" });

  return;
};

/**
 * 提交commit
 * @param title
 */
export const commitPush = async (title: string) => {
  // 提交 git commit
  const commandList = [`git commit -am "${title}"`, "git push"];

  // 遍历执行
  for (let i = 0; i < commandList.length; i++) {
    console.log("yanle - logger: 执行command", commandList[i]);
    await execPromise(commandList[i]);
  }

  // 输出结果
  console.log("yanle - logger: 完成提交到 github");
};

/**
 * 获取请求结果保存到本地
 * @param url
 */
export const getIssueByUrlWriteLocal = async (url: string) => {
  axios
    .request({
      url,
      method: "get",
    })
    .then((res: any) => {
      const body = res?.data?.body;
      fs.writeFileSync(path.resolve(__dirname, "./temp.md"), body, { encoding: "utf-8" });
    });
};

/**
 * 线性回归到 500
 * @param x
 * @returns
 */
export const calculateY = (x: number) => {
  return Math.ceil(x === 0 ? 0 : (1000 * x) / (x + 500));
};
