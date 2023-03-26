import fs from "fs";
import h2m from "html-to-md";
import { flow, escapeRegExp } from "lodash";
import { WriteIssueOptions } from "./interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels, MileStone } from "@src/githubApi/issue/consts";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { giteeMileStone } from "@src/giteeApi/issue/consts";

const htmlWriteIssue = async () => {
  const getHtml = fs.readFileSync("./demo.html", { encoding: "utf-8" });

  let markdown = h2m(getHtml);

  // 写入文件
  markdown = flow(
    value => value.replace(/javascriptCopy code/gi, ""),
    value => value.replace(/\\. /gi, ". "),
    value => value.replace(/\\- /gi, "- "),
    value => value.replace(/复制代码/gi, ""),
    value => value.replace(/\n### /gi, "\n#### "),
    value => value.replace(/\n## /gi, "\n### "),
  )(markdown);
  // if (/javascriptCopy code/gi.test(markdown)) markdown = markdown.replace(/javascriptCopy code/gi, "");

  if (markdown) fs.writeFileSync("./demo.md", markdown, { encoding: "utf-8" });

  // 直接用 html 写还是有一丢丢的问题， 需要认为改定一些内容才可
  // const remote = {
  //   title: "HTTP 与 HTTPS 的区别？",
  //   labels: [labels.network],
  //   milestone: MileStone.inProgress,
  //   body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  // };
  //
  // const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  //   ...options,
  //   ...repoConfig.interviewRepo,
  // });
  //
  // const githubRes = await write(remote);
  // console.log(`yanle - logger: 写入 github - ${remote.title}`, githubRes.status);
  //
  // // 写入 gitee
  // await giteeWriteIssue({
  //   title: remote.title,
  //   body: remote.body,
  //   labels: remote.labels.join(","),
  //   milestone: giteeMileStone[remote.milestone],
  // });
};

htmlWriteIssue();

export {};
