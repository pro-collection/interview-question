import { labels, MileStone } from "../consts";
import fs from "fs";
import h2m from "html-to-md";
import { WriteIssueOptions } from "./interface";
import { octokit } from "../../requestKit";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";

const htmlWriteIssue = async () => {
  const getHtml = fs.readFileSync("./demo.html", { encoding: "utf-8" });
  let markdown = h2m(getHtml);

  // 写入文件
  //
  if (/javascriptCopy code/gi.test(markdown)) markdown = markdown.replace(/javascriptCopy code/gi, "");
  if (markdown) fs.writeFileSync("./demo.md", markdown, { encoding: "utf-8" });

  // 直接用 html 写还是有一丢丢的问题， 需要认为改定一些内容才可
  const remote = {
    title: "express middleware 工作原理是什么？？",
    labels: [labels.node],
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
