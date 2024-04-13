import fs from "fs";
import { UpdateIssueOptions, WriteIssueOptions } from "@src/githubApi/issue/interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels } from "@src/githubApi/otherRepo/nodeIndex/consts";

// 写入 github
const write = (options: WriteIssueOptions) =>
  octokit.request(apiUrl.writeIssue, {
    ...options,
    ...repoConfig.nodeIndex,
  });

const update = (options: UpdateIssueOptions) =>
  octokit.request(apiUrl.updateIssue, {
    ...options,
    ...repoConfig.nodeIndex,
  });

const remote = {
  title: "自由职业程序员（独立开发者）应该具备的技能与软硬综合能力",
  labels: [labels.recommend],
  body: () =>
    fs.readFileSync(
      "books/发展与OKR/06、自我管理/03、思考/03、自由职业程序员（独立开发者）应该具备的技能与软硬综合能力/index.md",
      { encoding: "utf8" }
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
