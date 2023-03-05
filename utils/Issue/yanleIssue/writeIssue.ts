import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { MileStone } from "../consts";

const config = require("../../configToken.json");

const remote = [
  {
    title: "ajax如何获取下载进度?",
    labels: ["JavaScript"],
    milestone: MileStone.inProgress,
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
