import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";

const remote = {
  title: "如何实现网页加载进度条？",
  key_world: "",
  labels: [
    labels.application,
    company.baidu,
  ],
  milestone: MileStone.inProgress,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
};

const main = async () => {
  const count = await search(remote.key_world);
  remote.title = count && remote.key_world ? `${remote.title}【热度: ${count}】` : remote.title;

  // html 写入远端
  // htmlWriteIssue(remote);

  // md 写入远端
  writeIssue(remote);

  // 写入本地 temp.md
  // writeToTemp();
};

main();
