import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";

const remote = {
  title: "[React] Hooks 实现原理是什么, 简单描述一下",
  labels: [
    labels.frameWork,
    company.baidu,
  ],
  milestone: MileStone.inProgress,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
};

// html 写入远端
// htmlWriteIssue(remote);

// md 写入远端
writeIssue(remote);

// 写入本地 temp.md
// writeToTemp();
