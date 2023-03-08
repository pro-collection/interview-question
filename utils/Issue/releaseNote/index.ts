import { base64ToString, stringToBase64 } from "./helper";
import { split, toNumber, join, replace, get } from "lodash";
import { createTagObjectRequest, createTagRequest, getPackageJson, updatePackageJson } from "./request";
import { octokit } from "../main";
import repoConfig from "../../repoConfig";

const main = async () => {
  // 获取 package.json
  const res = await getPackageJson();
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
  const commitSHA = get(updateRes, "data.commit.sha");

  // 创建 tag obj
  await createTagObjectRequest(newVersion, commitSHA);

  // create tag
  await createTagRequest(newVersion, commitSHA);
};

main();


// 创建 tag

// 获取当前发布的 issue

// 整理格式

// 发布 release note

export {};
