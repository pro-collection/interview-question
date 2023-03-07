import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import repoConfig from "../../repoConfig";
import dayjs from "dayjs";

const path = "package.json";

/**
 * 获取 package.json
 */
export const getPackageJson = () => octokit.request(apiUrl.getContent, {
  ...repoConfig.interviewRepo,
  path,
});

/**
 * update package
 * @param content
 * @param extend
 */
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

/**
 * create tag obj
 * @param tag
 * @param sha
 */
export const createTagObjectRequest = (tag: string, sha: string) => {
  return octokit.request(apiUrl.createTagObj, {
    ...repoConfig.interviewRepo,
    tag,
    message: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    object: sha,
    type: "commit",
  });
};

/**
 * create tag
 * @param tagSha
 */
export const createTagRequest = (tagSha: string) => {
  return octokit.request(apiUrl.createTag, {
    ...repoConfig.interviewRepo,
    tag_sha: tagSha,
  });
};
