import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { labels, MileStone } from "../consts";
import repoConfig from "../../repoConfig";
import { octokit } from "../../requestKit";

const remote = [
  {
    title: "从哪些方面可以对网站性能优化？",
    labels: [labels.chrome],
    milestone: MileStone.senior,
    body: fs.readFileSync('./demo.md', { encoding: "utf8" }),
    // body: fs.readFileSync('/Users/yanle/code/self/node-index/books/专题知识库/05、基础知识点专题/other/15、node内存优化/README.md', { encoding: "utf8" }),
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
