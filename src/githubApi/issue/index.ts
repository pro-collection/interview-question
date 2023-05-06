import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";
import { omit } from "lodash";

const remote = {
  title: "如何做 promise 缓存？上一次调用函数的 promise 没有返回， 那么下一次调用函数依然返回上一个 promise",
  key_world: [
    // "memo useMemo",
    // "js new Function 执行性能",
    // "js new Function 使用场景",
  ],
  labels: [
    labels.js,
    // company.baidu,
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

  // html 写入远端
  // htmlWriteIssue(remote);

  // md 写入远端
  writeIssue(omit(remote, "key_world"));

  // 写入本地 temp.md
  // writeToTemp();
};

main();
