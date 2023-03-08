import { base64ToString, stringToBase64 } from "./helper";
import { split, toNumber, join, replace, get } from "lodash";
import { createTagObjectRequest, createTagRequest, getPackageJson, updatePackageJson } from "./request";

const main = async () => {
  // 获取 package.json
  const res = await getPackageJson();
  console.log("yanle - logger: 获取 package json 完成");
  const sha = get(res, "data.sha");
  let packageString = base64ToString(get(res, "data.content"));
  const packageJson = JSON.parse(packageString);
  const currentVersion = Reflect.get(packageJson, "version");

  // package.json 版本自增
  const [a, b, c] = split(currentVersion, ".");
  const patch = toNumber(c) + 1;
  const newVersion = join([a, b, patch], ".");

  // 替换旧 version
  packageString = replace(packageString, `"version": "${currentVersion}"`, `"version": "${newVersion}"`);

  // 提交
  const updateRes = await updatePackageJson(stringToBase64(packageString), { sha });
  console.log("yanle - logger: 更新 package.json version 完成");
  const commitSHA = get(updateRes, "data.commit.sha");

  // 创建 tag obj
  await createTagObjectRequest(newVersion, commitSHA);
  console.log("yanle - logger: 创建 tag object 完成");

  // create tag
  await createTagRequest(newVersion, commitSHA);
  console.log('yanle - logger: 创建 tag 完成');

  // 获取上一个 tag 的时间

  // 获取最新的 issue

};

main();


// 创建 tag

// 获取当前发布的 issue

// 整理格式

// 发布 release note

export {};
