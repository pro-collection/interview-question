import { filter, forEach, get, join } from "lodash";
import path from "path";
import fs from "fs";

/**
 * 修正数据
 *
 * 将输入转为 markdown 格式， 写入到本地
 */
export const handleDataParseMD = (jsonData: any[], fileName: string, date: string) => {
  const data = filter(jsonData, (item) => {
    return item.date?.includes(date);
  });

  console.log(
    `[yanle] - 过滤之后的 date 有哪些: `,
    data.map((item) => item.name)
  );

  const tagObject: Record<string, string[]> = {};
  forEach(data, (item) => {
    const tag = get(item, "tags", "其他");

    const link = `- [${item.name}](${item.url})`;

    if (tagObject[tag]) {
      tagObject[tag]?.push(link);
    } else {
      tagObject[tag] = [link];
    }
  });

  console.log(`[yanle] - tag Object: `, JSON.stringify(tagObject, undefined, 2));

  const textString = Object.entries(tagObject)
    .map(([tag, list]) => {
      return `### ${tag}
${join(list, "\n")}`;
    })
    .join("\n\n");

  // const json = JSON.stringify(data);

  fs.writeFile(path.join(process.cwd(), `temp/juejin_interview/${fileName}.md`), textString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data written to file successfully.");
    }
  });
};
