import { find, map } from "lodash";
import dayjs from "dayjs";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
// import * as fs from "fs";
// import * as path from "path";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
  since: dayjs('2023-03-01').format("YYYY-MM-DDTHH:mm:ssZ"),
});

const main = async () => {
  const res = await req();

  const titleList = map(res.data, item => item.title);
  console.log("yanle - logger: title", titleList);

  const content = find(res.data, item => item.number === 3);
  console.log("yanle - logger: content", content);
};

main();

export {};
