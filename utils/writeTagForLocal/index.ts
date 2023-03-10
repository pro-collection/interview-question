import { getPackageJson, getTag } from "../releaseNote/request";
import * as fs from "fs";
import * as path from "path";
import { get } from "lodash";
import { base64ToString } from "../releaseNote/helper";

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


  fs.writeFileSync(`${bookPath}/${preTagRes.data.tag_name}_${preTagRes.data.name}.md`, preTagRes.data.body, { encoding: "utf-8" });
};

main();

export {};
