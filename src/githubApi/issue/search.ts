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
  console.log('yanle - logger: query', query);
  const res = await request(query);
  console.log('yanle - logger: res', res.data);
  return get(res, "data.total_count", 0);
};

search("forwardRef").then(res => {
  console.log('yanle - logger: res', res);
})
