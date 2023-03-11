import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { labels, MileStone } from "../consts";
import repoConfig from "../../repoConfig";
import { octokit } from "../../requestKit";

const remote = [
  {
    title: "纯 TS 项目工程中, 如何使用 alias path?",
    labels: [labels.js],
    milestone: MileStone.senior,
    body: fs.readFileSync('./demo.md', { encoding: "utf8" }),
    // body: fs.readFileSync('/Users/yanle/code/self/node-index/books/专题知识库/02、ECMAScript最新语法/10、Iterator 和 for...of 循环/README.md', { encoding: "utf8" }),
  },
];

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...repoConfig.interviewRepo,
});

write(remote[0])
  .then((res: any) => {
    console.log("yanle - logger: res", res.status);
  })
  .catch((e: Error) => {
    console.log("yanle - logger: e", e);
  });
