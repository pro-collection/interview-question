import fs from "fs";
import h2m from "html-to-md";
import { flow } from "lodash";
import { WriteIssueOptions } from "./interface";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { labels, MileStone } from "@src/githubApi/issue/consts";

const htmlWriteIssue = async () => {
  const getHtml = fs.readFileSync("./demo.html", { encoding: "utf-8" });
  let markdown = h2m(getHtml);

  // 写入文件
  markdown = flow(
    value => value.replace(/javascriptCopy code/gi, ""),
    value => value.replace(/\\. /gi, '. '),
    value => value.replace(/\\- /gi, '- '),
  )(markdown);
  // if (/javascriptCopy code/gi.test(markdown)) markdown = markdown.replace(/javascriptCopy code/gi, "");
  if (markdown) fs.writeFileSync("./demo.md", markdown, { encoding: "utf-8" });

  // 直接用 html 写还是有一丢丢的问题， 需要认为改定一些内容才可
  const remote = {
    title: "实现：setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值",
    labels: [labels.js],
    milestone: MileStone.inProgress,
    body: fs.readFileSync("./demo.md", { encoding: "utf8" }),
  };

  const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
    ...options,
    ...repoConfig.interviewRepo,
  });

  write(remote).then((res: any) => {
    console.log("yanle - logger: html 写入文件成功", res.status);
  });
};

htmlWriteIssue();

export {};
