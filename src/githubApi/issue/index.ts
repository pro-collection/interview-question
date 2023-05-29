import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";
import { omit } from "lodash";

const remote = {
  title: "如何编写一个 babel 插件",
  key_world: [
    "babel插件",
    "babel插件api",
    "babel插件代码示例",
  ],
  labels: [
    labels.engineering,
    company.netEase,
  ],
  milestone: MileStone.senior,
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

  // md 写入远端
  writeIssue(omit(remote, "key_world"));
};

// 写入本地 temp.md
// writeToTemp();

// html 写入远端
// htmlWriteIssue(remote);

// 直接写入远端
main();
