import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";

const remote = {
  title: "this指向与对象继承数组方法：输出以下代码执行的结果并解释为什么？",
  labels: [labels.js, company.jd],
  milestone: MileStone.senior,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
  // body: () => fs.readFileSync('/Users/yanle/code/self/node-index/books/知识库/01、前端技术知识/05、flex布局的学习/README.md', { encoding: "utf8" }),
};

// html 写入远端
// htmlWriteIssue(remote);

// md 写入远端
writeIssue(remote);

// 写入本地 temp.md
// writeToTemp();
