import { base64ToString, getReleaseNoteBody, stringToBase64 } from "./helper";
import { split, toNumber, join, replace, get, map } from "lodash";
import {
  createRelease,
  createTagObjectRequest,
  createTagRequest,
  getDataIssue,
  getPackageJson,
  updatePackageJson,
} from "./request";

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

  // todo 获取上一个 tag 的时间

  // 获取最新的 issue
  const issueRes = await getDataIssue("2023.03.01");
  console.log('yanle - logger: 获取历史 issue 完成');

  const date = "2023.03.08";
  const tag_name = newVersion;
  const releaseBody = getReleaseNoteBody(issueRes.data, date);
  const releaseName = `${date} 更新面试问题`;
  await createRelease({ tag_name, name: releaseName, body: releaseBody });
  console.log("yanle - logger: 创建 Release 完成");
};

main();

export {};
