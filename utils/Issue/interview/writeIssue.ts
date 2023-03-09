import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";
import * as fs from "fs";
import { labels, MileStone } from "../consts";
import repoConfig from "../../repoConfig";
import { octokit } from "../../requestKit";

const remote = [
  {
    title: "process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序？",
    labels: [labels.js],
    milestone: MileStone.inProgress,
    body: fs.readFileSync('./demo.md', { encoding: "utf8" }),
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
