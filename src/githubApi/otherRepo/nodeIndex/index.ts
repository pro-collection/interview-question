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
  title: "TypeScript 内置的类型方法和工具类型",
  labels: [
    labels.application,
  ],
  body: () => fs.readFileSync(
    "/Users/yanle/code/self/interview-question/src/githubApi/file/demo.md",
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

  // 写入 github 完成
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
