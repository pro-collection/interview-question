import { apiUrl } from "../../apiUrl";

const config = require("../../configToken.json");
import { octokit } from "../main";
import { get, find } from "lodash";


const req = () => octokit.request(apiUrl.getIssue, {
  ...config.yanleleInfo,
});

const main = async () => {
  const res = await req();

  const result = get(find(res.data, (item: any) => item.number === 6), "body");
  console.log("yanle - logger: result: \n", result);
};

main();
