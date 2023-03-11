import { labels, MileStone } from "../consts";
import fs from "fs";
import h2m from "html-to-md";
import { WriteIssueOptions } from "./interface";
import { octokit } from "../../requestKit";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";

const htmlWriteIssue = async () => {
  const getHtml = fs.readFileSync("./demo.html", { encoding: "utf-8" });
  const markdown = h2m(getHtml);

  // 写入文件
  if (markdown) fs.writeFileSync("./demo.md", markdown, { encoding: "utf-8" });

  const remote = {
    title: "重绘与重排的区别？",
    labels: [labels.chrome],
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
