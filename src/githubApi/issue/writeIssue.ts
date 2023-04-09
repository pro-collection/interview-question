import { WriteIssueOptions } from "./interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { MileStone } from "@src/githubApi/issue/consts";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { giteeMileStone } from "@src/giteeApi/issue/consts";
import { join } from "lodash";
import * as child_process from "child_process";


const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...repoConfig.interviewRepo,
});

export const writeIssue = async (remote: any) => {
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

  const [res1, res2] = await Promise.all(allPromise);

  // 写入 github
  console.log(`yanle - logger: 写入 github - ${remote.title}`, res1?.status);

  // 提交 git commit
  child_process.exec(`git commit -am "${remote.title}"`);
  child_process.exec("git push");
  console.log("yanle - logger: 完成提交到 github");
};

export {};
