import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";
import { omit, toNumber } from "lodash";
import { filePath } from "@src/githubApi/file/consts";
import { input, confirm } from "@inquirer/prompts";

const remote = {
  title: "[低代码] 代码平台一般架构设计如何",
  key_world: [
    "代码平台",
  ],
  labels: [
    labels.engineering,
    company.alibaba,
  ],
  milestone: MileStone.master,
  body: () => fs.readFileSync(filePath, { encoding: "utf8" }),
};

const main = async () => {
  console.log(`yanle - logger: 使用关键词: `, remote.key_world.join("、"));

  if (remote.key_world.length) {
    let count = await search(remote.key_world);

    console.log("yanle - logger: 获取热度结果: ", count);

    const isConfirm = await confirm({ message: `获取到热度为：${count}, 请确认。(为「no」则可以重新修改热度, 为 「yes」则无需修改热度)` });

    if (!isConfirm) {
      const answer = await input({ message: "请输入复写热度评分: " });
      count = !!toNumber(answer) ? toNumber(answer) : count;
    }

    remote.title = count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;

    // 关键词
    const keyWordContent = `**关键词**：${remote.key_world.join("、")}\n\n`;
    const oldFile = fs.readFileSync(filePath, { encoding: "utf8" });
    fs.writeFileSync(filePath, keyWordContent + oldFile);
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
