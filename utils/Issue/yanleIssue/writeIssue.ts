import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";

const config = require("../../configToken.json");

const remote = [
  {
    title: "【中】JS 有哪些迭代器，该如何使用？",
    labels: ["JavaScript"],
    body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  },
];

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...config.yanleleInfo,
});

write(remote[0])
  .then((res: any) => {
    console.log("yanle - logger: res", res);
  })
  .catch((e: Error) => {
    console.log("yanle - logger: e", e);
  });
