import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";

// package.json 版本自增

// 获取 package.json

function base64ToString(b64: string) {
  return Buffer.from(b64, "base64").toString();
}

function stringToBase64(str: string) {
  return Buffer.from(str).toString("base64");
}


const getPackageJson = () => octokit.request(apiUrl.getContent, {
  ...repoConfig.interviewRepo,
  path: "package.json",
});

getPackageJson().then((res: any) => {
  console.log("yanle - logger: res.data", base64ToString(res.data.content));
});


// 创建 tag

// 获取当前发布的 issue

// 整理格式

// 发布 release note
