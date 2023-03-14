import { getReleaseContent } from "./helper";
import { split, toNumber, join, replace, get } from "lodash";
import {
  createRelease,
  createTagObjectRequest,
  createTagRequest,
  getDataIssue,
  getPackageJson, getTag,
  updatePackageJson,
} from "./request";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { base64ToString, stringToBase64 } from "@utils/helper";
import path from "path";
import fs from "fs";
import { updateContentFile } from "@src/githubApi/writeTagForLocal/request";

dayjs.extend(utc);
dayjs.extend(timezone);

const main = async () => {
  // 获取 package.json
  const res = await getPackageJson();
  console.log("yanle - logger: 获取 package json 完成");
  const sha = get(res, "data.sha");
  let packageString = base64ToString(get(res, "data.content"));
  const packageJson = JSON.parse(packageString);
  const currentVersion = Reflect.get(packageJson, "version");

  // 获取对应的 tag
  const preTagRes = await getTag(currentVersion);

  // 获取上一次时间戳
  const createDate = get(preTagRes, "data.created_at", "");

  // @ts-ignore
  const currentTZ = dayjs.tz.guess();

  // @ts-ignore
  const preDate = dayjs.tz(createDate, currentTZ).format("YYYY.MM.DD");

  // package.json 版本自增
  const [a, b, c] = split(currentVersion, ".");
  const patch = toNumber(c) + 1;
  const newVersion = join([a, b, patch], ".");

  // 替换旧 version
  packageString = replace(packageString, `"version": "${currentVersion}"`, `"version": "${newVersion}"`);

  // 提交更新版本
  const updateRes = await updatePackageJson(stringToBase64(packageString), { sha });
  console.log("yanle - logger: 更新 package.json version 完成");
  const commitSHA = get(updateRes, "data.commit.sha");

  // 创建 tag obj
  await createTagObjectRequest(newVersion, commitSHA);
  console.log("yanle - logger: 创建 tag object 完成");

  // create tag
  await createTagRequest(newVersion, commitSHA);

  // 获取最新的 issue
  const issueRes = await getDataIssue(createDate);
  console.log("yanle - logger: 获取历史 issue 完成");

  const currentDate = dayjs().format("YYYY.MM.DD");

  const date = preDate !== currentDate ? `${preDate} - ${currentDate}` : currentDate;
  const tag_name = newVersion;

  // 获取一共有多少个题目
  const issueLength = get(issueRes.data, "length");

  const issueLenDesc = issueLength ? `（${issueLength}道题）` : "";
  const releaseName = `${date} 更新收集面试问题${issueLenDesc}`;
  const releaseBody = getReleaseContent(issueRes.data, releaseName);

  await createRelease({ tag_name, name: releaseName, body: releaseBody });
  console.log("yanle - logger: 创建 Release 完成");

  /* ==============================  写入本地 - Start ============================== */
  // 写入本地

  const contentHasBody = getReleaseContent(issueRes.data, releaseName, true);
  const bookPath = path.resolve(__dirname, "../../../books");
  const writePath = `${bookPath}/${newVersion}.md`;
  // 文件写入本地
  console.log("yanle - logger: 开始写入本地");
  fs.writeFileSync(writePath, contentHasBody, { encoding: "utf-8" });
  console.log("yanle - logger: 写入本地完成");

  // todo 这里始终报错
  // const base64File = fs.readFileSync(writePath, { encoding: "base64" });
  // console.log("yanle - logger: 读取本地文件完成");

  // 提交到 github
  // const updateFileRes = await updateContentFile(writePath, base64File);

  // console.log("yanle - logger: 提交到 github 完成", updateFileRes.status);
  /* ==============================  写入本地 - End   ============================== */
};

main();

export {};