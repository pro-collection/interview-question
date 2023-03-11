import { getPackageJson, getTag } from "../releaseNote/request";
import * as fs from "fs";
import * as path from "path";
import { get } from "lodash";
import { base64ToString } from "../releaseNote/helper";
import { updateContentFile } from "./request";

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

  const bookPath = path.resolve(__dirname, "../../books");

  const writePath = `${bookPath}/${preTagRes.data.tag_name}_${preTagRes.data.name}.md`;

  // 文件写入本地
  fs.writeFileSync(writePath, preTagRes.data.body, { encoding: "utf-8" });

  const base64File = fs.readFileSync(writePath, { encoding: "base64" });
  console.log("yanle - logger: fs.readFileSync(writePath)");

  const updateFileRes = await updateContentFile(writePath, base64File);

  console.log("yanle - logger: updateFile success", updateFileRes.status);
};

main();

export {};
