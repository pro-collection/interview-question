import * as fs from "fs";
import * as path from "path";
import { get } from "lodash";
import { updateContentFile } from "./request";
import { base64ToString } from "@utils/helper";
import { getPackageJson, getTag } from "@src/githubApi/releaseNote/request";

/**
 * 读取最近的文档 然后写入本地 markdown
 */
const main = async () => {
  const res = await getPackageJson();
  console.log("yanle - logger: 获取 package json 完成");
  let packageString = base64ToString(get(res, "data.content"));
  const packageJson = JSON.parse(packageString);
  const currentVersion = Reflect.get(packageJson, "version");

  // 获取对应的 tag
  const preTagRes = await getTag(currentVersion);

  const bookPath = path.resolve(__dirname, "../../../books");
  const writePath = `${bookPath}/${currentVersion}.md`;

  // 文件写入本地
  fs.writeFileSync(writePath, preTagRes.data.body, { encoding: "utf-8" });

  console.log('yanle - logger: path', writePath);
  const base64File = fs.readFileSync(writePath, { encoding: "base64" });
  console.log("yanle - logger: fs.readFileSync(writePath)");

  const updateFileRes = await updateContentFile(`books/${currentVersion}.md`, base64File);

  console.log("yanle - logger: updateFile success", updateFileRes.status);
};

main();

export {};
