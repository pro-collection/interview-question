import { apiUrl } from "../../apiUrl";
import { map } from "lodash";
import repoConfig from "../../repoConfig";
import { octokit } from "../../requestKit";
// import * as fs from "fs";
// import * as path from "path";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
});

const main = async () => {
  const res = await req();

  const titleList = map(res.data, item => item.title);
  console.log("yanle - logger: title", titleList);

  // const content = find(res.data, item => item.number === 3);
  // console.log("yanle - logger: content", content);
};

main();

export {};
