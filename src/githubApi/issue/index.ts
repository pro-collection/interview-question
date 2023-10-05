import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";
import { omit } from "lodash";

const remote = {
  title: "在你的项目中， 使用过哪些 webpack plugin, 说一下他们的作用",
  key_world: [
    // "mini-css-extract-plugin作用",
    // "mini-css-extract-plugin使用",
  ],
  labels: [
    labels.engineering,
    company.alibaba,
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
