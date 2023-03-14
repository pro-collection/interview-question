import { giteeApi } from "@utils/requestKit";
import { giteeApiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { giteeMileStone } from "@src/giteeApi/issue/consts";
import { labels, MileStone } from "@src/githubApi/issue/consts";
import { WriteRequestOptions } from "@src/giteeApi/issue/interface";

const { owner, repo } = repoConfig.gitee.interviewRepo;
const { access_token } = repoConfig.gitee;

export const writeRequest = (options: WriteRequestOptions) => giteeApi.post(giteeApiUrl.createIssue(owner), {
  access_token,
  owner,
  repo,
  ...options,
});

// const params = {
//   title: "测试一下",
//   body: `## 一下哈`,
//   milestone: giteeMileStone[MileStone.base],
//   labels: [labels.js].join(","),
// };

export const giteeWriteIssue = async (options: WriteRequestOptions) => {
  const res = await writeRequest(options);
  console.log(`yanle - logger: 写入 gitee - ${options.title} `, res.status);
};

// giteeWriteIssue(params);
