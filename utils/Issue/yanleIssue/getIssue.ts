import { apiUrl } from "../../apiUrl";
import * as fs from "fs";

const config = require("../../configToken.json");
import { octokit } from "../main";
import { get, find } from "lodash";
import repoConfig from "../../repoConfig";

const req = () => octokit.request(apiUrl.getIssue, {
  // ...repoConfig.interviewRepo,
  ...config.yanleleInfo,
  per_page: 100,
});

const main = async () => {
  const res = await req();

  fs.writeFileSync("./issue.json", JSON.stringify(res.data), {encoding: "utf8"});
};

main();

export {};
