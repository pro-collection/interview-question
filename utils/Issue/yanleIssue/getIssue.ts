import { apiUrl } from "../../apiUrl";

import { octokit } from "../main";
import { map } from "lodash";
import repoConfig from "../../repoConfig";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
});

const main = async () => {
  const res = await req();

  const titleList = map(res.data, item => item.title);
  console.log('yanle - logger: title', titleList);
};

main();

export {};
