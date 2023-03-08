import { apiUrl } from "../../apiUrl";
import { map } from "lodash";
import repoConfig from "../../repoConfig";
import { octokit } from "../../requestKit";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
});

const main = async () => {
  const res = await req();

  const titleList = map(res.data, item => item.title);
  console.log("yanle - logger: title", titleList);
};

main();

export {};
