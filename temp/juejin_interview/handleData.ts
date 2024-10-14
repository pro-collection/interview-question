import { filter, forEach, get, join, map, toNumber, trim } from "lodash";
// @ts-expect-error
import jsonData from "./2024_10_01.json";
import fs from "fs";

/**
 * 修正数据
 */
const handleData = () => {
  const data = filter(jsonData, (item) => {
    return item.date?.includes("2024-09");
  });

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

  const textString = Object.entries(tagObject)
    .map(([tag, list]) => {
      return `### ${tag}
${join(list, "\n")}`;
    })
    .join("\n\n");

  // const json = JSON.stringify(data);

  fs.writeFile("./temp/juejin_interview/2024_10_01.md", textString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data written to file successfully.");
    }
  });
};

handleData();
