import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";

const remote = {
  title: "如何实现洋葱模式？",
  labels: [labels.frameWork],
  milestone: MileStone.senior,
  body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  // body: fs.readFileSync('/Users/yanle/code/self/node-index/books/知识库/01、前端技术知识/05、flex布局的学习/README.md', { encoding: "utf8" }),
};

// html 写入远端
htmlWriteIssue(remote);

// 写入本地 temp.md
writeToTemp();

// md 写入远端
writeIssue(remote);
