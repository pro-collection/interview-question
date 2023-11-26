import fs from "fs";
import { UpdateIssueOptions, WriteIssueOptions } from "@src/githubApi/issue/interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels } from "@src/githubApi/otherRepo/nodeIndex/consts";

// 写入 github
const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...repoConfig.nodeIndex,
});

const update = (options: UpdateIssueOptions) => octokit.request(apiUrl.updateIssue, {
  ...options,
  ...repoConfig.nodeIndex,
});

const remote = {
  title: "git 常用命令汇总",
  labels: [
    labels.linuxDevops,
  ],
  body: () => fs.readFileSync(
    "/Users/yanle/code/self/node-index/books/知识库/02、技术生态圈/01、git常用命令汇总/README.md",
    { encoding: "utf8" },
  ),
};

// 创建 issue
const createIssue = async () => {
  // 输出 title
  console.log("yanle - logger: title", remote.title);

  // 写入远端
  const res = await write({
    ...remote,
    body: remote.body(),
  });

  // 写入 github
  console.log(`yanle - logger: 写入 github - ${remote.title}`, res?.status);
};

// 修改 issue
const updateIssue = async () => {
  // 输出 title
  console.log("yanle - logger: title", remote.title);

  // 写入远端
  const res = await update({
    ...remote,
    issue_number: -1,
    body: remote.body(),
  });

  // 写入 github
  console.log(`yanle - logger: 写入 github - ${remote.title}`, res?.status);
};

createIssue();
