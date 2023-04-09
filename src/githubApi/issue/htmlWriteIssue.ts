import { join, isFunction } from "lodash";
import { WriteIssueOptions } from "./interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { MileStone } from "@src/githubApi/issue/consts";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { giteeMileStone } from "@src/giteeApi/issue/consts";
import { commitPush, writeToTemp } from "@src/githubApi/issue/helper";

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...repoConfig.interviewRepo,
});

export const htmlWriteIssue = async (remote: any) => {
  // 写入本地
  await writeToTemp("./demo.md");

  const allPromise = [
    write({
      ...remote,
      body: remote.body(),
    }),
    giteeWriteIssue({
      title: remote.title,
      body: remote.body(),
      labels: join(remote.labels, ","),
      milestone: giteeMileStone[remote.milestone as MileStone],
    }),
  ];

  const [githubRes] = await Promise.all(allPromise);
  console.log(`yanle - logger: 写入 github - ${remote.title}`, githubRes?.status);

  await commitPush(remote.title);
};

export {};
