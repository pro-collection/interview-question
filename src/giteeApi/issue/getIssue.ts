import { giteeApiUrl } from "@utils/apiUrl";
import { giteeApi } from "@utils/requestKit";
import { access_token, owner, repo } from "@src/giteeApi/issue/consts";
import dayjs from "dayjs";

// 发起请求
export const getIssueRequest = (preDate: string) => giteeApi.get(giteeApiUrl.getIssue(owner, repo), {
  params: {
    access_token,
    owner,
    repo,
    per_page: 100,
    page: 1,
    since: dayjs(preDate).format("YYYY-MM-DDTHH:mm:ssZ"),
  },
});
