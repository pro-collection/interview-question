import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";

const remote = {
  title: "[React] 开发过程中有哪些性能优化手段？",
  key_world: "react 优化",
  labels: [
    labels.frameWork,
    company.mi,
  ],
  milestone: MileStone.senior,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
};

const main = async () => {
  console.log(`yanle - logger: 使用关键词 【${remote.key_world}】 去获取关键词热度`);

  const count = await search(remote.key_world);
  remote.title = count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;

  // 输出 title
  console.log("yanle - logger: title", remote.title);

  // html 写入远端
  // htmlWriteIssue(remote);

  // md 写入远端
  writeIssue(remote);

  // 写入本地 temp.md
  // writeToTemp();
};

main();
