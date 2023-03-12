import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels, MileStone } from "@src/githubApi/issue/consts";

const remote = [
  {
    title: "实现：setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值",
    labels: [labels.js],
    milestone: MileStone.inProgress,
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
