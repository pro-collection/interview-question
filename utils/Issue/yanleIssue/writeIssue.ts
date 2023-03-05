import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { labels, MileStone } from "../consts";

const config = require("../../configToken.json");

const remote = [
  {
    title: "手写 async 函数？",
    labels: [labels.js],
    milestone: MileStone.senior,
    body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  },
];

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...config.yanleleInfo,
});

write(remote[0])
  .then((res: any) => {
    console.log("yanle - logger: res", res.status);
  })
  .catch((e: Error) => {
    console.log("yanle - logger: e", e);
  });
