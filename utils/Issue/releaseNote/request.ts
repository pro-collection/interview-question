import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";
import dayjs from "dayjs";

const path = "package.json";

// 获取 package.json
export const getPackageJson = () => octokit.request(apiUrl.getContent, {
  ...repoConfig.interviewRepo,
  path,
});

export const updatePackageJson = (content: string, extend: object) => octokit.request(apiUrl.updateContent, {
  ...repoConfig.interviewRepo,
  path,
  message: "update package version with github api runner",
  committer: {
    name: "yanlele",
    email: "331393627@qq.com",
  },
  content,
  ...extend,
});

export const createTagObjectRequest = (sha: string) => {
  return octokit.request(apiUrl.createTag, {
    ...repoConfig.interviewRepo,
    tag: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    message: "auto tag",
    object: sha,
    type: "commit",
  });
};
