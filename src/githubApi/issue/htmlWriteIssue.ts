import { join } from "lodash";
import { WriteIssueOptions } from "./interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { MileStone } from "@src/githubApi/issue/consts";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { giteeMileStone } from "@src/giteeApi/issue/consts";
import { writeToTemp } from "@src/githubApi/issue/helper";

export const htmlWriteIssue = async (remote: any) => {
  // 写入本地
  writeToTemp("./demo.md");

  const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
    ...options,
    ...repoConfig.interviewRepo,
  });

  const githubRes = await write(remote);
  console.log(`yanle - logger: 写入 github - ${remote.title}`, githubRes.status);

  // 写入 gitee
  await giteeWriteIssue({
    title: remote.title,
    body: remote.body,
    labels: join(remote.labels, ","),
    milestone: giteeMileStone[remote.milestone as MileStone],
  });
};

export {};
