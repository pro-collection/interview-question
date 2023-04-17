import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { get } from "lodash";
import dayjs from "dayjs";

const request = (q: string) => octokit.request(`${apiUrl.searchIssue}?q=${q}`, {
  ...repoConfig.interviewRepo,
});

export const search = async (search: string) => {
  const created = dayjs().subtract(6, "month").format("YYYY-MM-DD");
  const query = `${search}+created:>${created}&page=1&per_page=1`;
  const res = await request(query);
  return get(res, "data.total_count", 0);
};

// search("网页加载进度条").then(res => {
//   console.log('yanle - logger: res', res);
// })
