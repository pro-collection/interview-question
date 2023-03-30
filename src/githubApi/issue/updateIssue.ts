import { UpdateIssueOptions } from "@src/githubApi/issue/interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";

// 更新
const update = (options: UpdateIssueOptions) => octokit.request(apiUrl.updateIssue, {
  ...options,
  ...repoConfig.interviewRepo,
});

// 更新 issue
export const updateIssue = async (remote: any) => {
  const promiseList = [
    // 写入 github
    () => update({
      ...remote,
      body: remote.body(),
    }),

  ];


};
