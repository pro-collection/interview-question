import { htmlWriteIssue } from "@src/githubApi/issue/htmlWriteIssue";
import { calculateY, writeToTemp } from "@src/githubApi/issue/helper";
import { company, labels, MileStone } from "@src/githubApi/issue/consts";
import fs from "fs";
import { writeIssue } from "@src/githubApi/issue/writeIssue";
import { search } from "@src/githubApi/issue/search";
import { omit, toNumber } from "lodash";
import { filePath } from "@src/githubApi/file/consts";
import { input, confirm } from "@inquirer/prompts";

const remote = {
  title: "前端静态资源加载超时，Nginx 可通过哪些配置优化？",
  key_world: [
    //
    "nginx 加载超时优化",
  ],
  labels: [
    labels.application,
    // labels.node,
    company.alibaba,
    // xx
  ],
  milestone: MileStone.senior,
  body: () => fs.readFileSync(filePath, { encoding: "utf8" }),
};

const main = async () => {
  console.log(`yanle - logger: 使用关键词: `, remote.key_world.join("、"));

  if (remote.key_world.length) {
    let count = await search(remote.key_world);

    // 线性回归的结果
    count = calculateY(count);

    console.log("yanle - logger: 获取热度结果: ", count);

    const isConfirm = await confirm({
      message: `获取到热度为：${count}, 请确认。(为「no」则可以重新修改热度, 为 「yes」则无需修改热度)`,
    });

    if (!isConfirm) {
      const answer = await input({ message: "请输入复写热度评分: " });
      count = !!toNumber(answer) ? toNumber(answer) : count;
    }

    remote.title =
      count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;

    // 关键词
    const keyWordContent = `**关键词**：${remote.key_world.join("、")}\n\n`;
    const oldFile = fs.readFileSync(filePath, { encoding: "utf8" });
    fs.writeFileSync(filePath, keyWordContent + oldFile);
    console.log("yanle - logger: 关键词写入文档完成");
  } else {
    const isConfirm = await confirm({
      message: `是否自定义热度, 请确认。(为「yes」需要自定义热度, 为「no」则无需自定义热度)`,
    });

    if (isConfirm) {
      const answer = await input({ message: "请输入复写热度评分: " });
      const count = !!toNumber(answer) ? toNumber(answer) : 0;

      if (count) {
        remote.title =
          count && remote.key_world ? `${remote.title}【热度: ${count?.toLocaleString() || count}】` : remote.title;
      }
    }
  }

  // 输出 title
  console.log("yanle - logger: title", remote.title);

  // md 写入远端
  writeIssue(omit(remote, "key_world"));
};

// 将 demo.html 写入本地 temp.md
// writeToTemp();

// html 写入远端
// htmlWriteIssue(remote);

// 直接写入远端
main();
