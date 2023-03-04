import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";

const config = require("../../configToken.json");

const remote = [
  {
    title: "【中】详细讲一下 Symbol 数据类型特征与实际使用案例？",
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
