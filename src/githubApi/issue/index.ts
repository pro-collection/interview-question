import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";

const remote = {
  title: "数字千分化的实现方式有哪些？用代码实现一下",
  key_world: "数字千分化",
  labels: [
    labels.js,
    // company.baidu,
  ],
  milestone: MileStone.inProgress,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
};

const main = async () => {
  const count = await search(remote.key_world);
  remote.title = count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;

  // 输出 title
  console.log("yanle - logger: title", remote.title);

  // html 写入远端
  htmlWriteIssue(remote);

  // md 写入远端
  // writeIssue(remote);

  // 写入本地 temp.md
  // writeToTemp();
};

main();
