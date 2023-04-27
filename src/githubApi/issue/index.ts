import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";

const remote = {
  title: "[React] React15 架构存在什么样的问题？",
  key_world: [
    "react15 架构",
    "react 架构",
    "react Reconciler",
    "react 渲染器",
    "react 协调器",
  ],
  labels: [
    labels.frameWork,
    // company.tencent,
  ],
  milestone: MileStone.master,
  body: () => fs.readFileSync("./demo.md", { encoding: "utf8" }),
};

const main = async () => {
  console.log(`yanle - logger: 使用关键词: `, remote.key_world.join("、"));

  if (remote.key_world.length) {
    const count = await search(remote.key_world);
    remote.title = count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;

    // 关键词
    const keyWordContent = `**关键词**：${remote.key_world.join("、")}\n\n`;
    const oldFile = fs.readFileSync("./demo.md", { encoding: "utf8" });
    fs.writeFileSync("./demo.md", keyWordContent + oldFile);
    console.log("yanle - logger: 关键词写入文档完成");
  }

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
