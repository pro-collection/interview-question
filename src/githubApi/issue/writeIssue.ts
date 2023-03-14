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
  title: "一个 tcp 连接能发几个 http 请求？",
  labels: [labels.network],
  milestone: MileStone.inProgress,
  body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  // body: fs.readFileSync('/Users/yanle/code/self/node-index/books/专题知识库/02、ECMAScript最新语法/10、Iterator 和 for...of 循环/README.md', { encoding: "utf8" }),
};


const main = async () => {
  // 写入 github
  const githubRes = await write(remote);
  console.log("yanle - logger: 写入 github - ", githubRes.status);

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
