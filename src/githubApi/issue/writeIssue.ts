import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels, MileStone } from "@src/githubApi/issue/consts";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { giteeMileStone } from "@src/giteeApi/issue/consts";

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...repoConfig.interviewRepo,
});

const remote = {
  title: "箭头函数和普通函数的区别？",
  labels: [labels.js],
  milestone: MileStone.inProgress,
  body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  // body: fs.readFileSync('/Users/yanle/code/self/node-index/books/知识库/01、前端技术知识/05、flex布局的学习/README.md', { encoding: "utf8" }),
};


const main = async () => {
  // 写入 github
  const githubRes = await write(remote);
  console.log(`yanle - logger: 写入 github - ${remote.title}`, githubRes.status);

  // 写入 gitee
  await giteeWriteIssue({
    title: remote.title,
    body: remote.body,
    labels: remote.labels.join(","),
    milestone: giteeMileStone[remote.milestone],
  });
};

main();

export {}
