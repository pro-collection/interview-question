import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";
import { base64ToString, stringToBase64 } from "./helper";
import { split, toNumber, join, replace } from "lodash";

const path = "package.json";

// 获取 package.json
const getPackageJson = () => octokit.request(apiUrl.getContent, {
  ...repoConfig.interviewRepo,
  path,
});

const updatePackageJson = (content: string) => octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
  ...repoConfig.interviewRepo,
  path,
  message: "update package version with github api runner",
  committer: {
    name: "yanlele",
    email: "331393627@qq.com",
  },
  content: "bXkgbmV3IGZpbGUgY29udGVudHM=",
});

const main = async () => {
  // 获取 package.json
  const res = await getPackageJson();
  let packageString = base64ToString(res.data.content);
  const packageJson = JSON.parse(packageString);
  const currentVersion = Reflect.get(packageJson, "version");

  // package.json 版本自增
  const [a, b, c] = split(currentVersion, ".");
  const patch = toNumber(c) + 1;
  const newVersion = join([a, b, patch]);

  // 替换旧 version
  packageString = replace(packageString, `"version": "${currentVersion}"`, `"version": "${newVersion}"`);

  // 提交
  await updatePackageJson(stringToBase64(packageString));

};


// 创建 tag

// 获取当前发布的 issue

// 整理格式

// 发布 release note

export {};
