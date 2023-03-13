import { giteeApi } from "@utils/requestKit";
import { giteeApiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { mileStone } from "@src/giteeApi/issue/consts";
import { labels } from "@src/githubApi/issue/consts";

const { owner, repo } = repoConfig.gitee.interviewRepo;
const { access_token } = repoConfig.gitee;

export const writeRequest = () => giteeApi.post(giteeApiUrl.createIssue(owner), {
  access_token,
  owner,
  repo,
  title: "测试一下",
  body: `## 一下哈`,
  milestone: mileStone.base,
  labels: [labels.js].join(","),
});

const giteeWriteIssue = async () => {
  const res = await writeRequest();
  console.log("yanle - logger: res", res);
};

giteeWriteIssue();
