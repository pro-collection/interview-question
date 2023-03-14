import * as fs from "fs";
import { updateContentFile } from "./request";
import { WriteContentForLocalOptions } from "@src/githubApi/writeTagForLocal/interface";

/**
 * 读取最近的文档 然后写入本地 markdown
 */
export const writeContentForLocal = async (options: WriteContentForLocalOptions) => {
  const { path, fileName, content } = options;
  const writePath = `${path}/${fileName}.md`;
  // 文件写入本地
  console.log("yanle - logger: 开始写入本地");
  fs.writeFileSync(writePath, content, { encoding: "utf-8" });
  console.log("yanle - logger: 写入本地完成");

  const base64File = fs.readFileSync(writePath, { encoding: "base64" });
  console.log("yanle - logger: 读取本地文件完成");

  // 提交到 github
  const updateFileRes = await updateContentFile(`books/${fileName}.md`, base64File);

  console.log("yanle - logger: 提交到 github 完成", updateFileRes.status);
};

export {};
