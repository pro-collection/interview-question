import { apiUrl } from "../apiUrl";
import repoConfig from "../repoConfig";
import dayjs from "dayjs";
import { octokit } from "../requestKit";
import { CreateReleaseParams } from "./interface";

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
  message: `update: ${dayjs().format("YYYY-MM-DDTHH:mm:ssZ")}`,
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
    message: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
    object: sha, // commit sha
    type: "commit",
  });
};

/**
 * create tag
 * @param tag
 * @param sha
 */
export const createTagRequest = (tag: string, sha: string) => {
  return octokit.request(apiUrl.createRef, {
    ...repoConfig.interviewRepo,
    sha,
    ref: `refs/tags/${tag}`,
  });
};

/**
 * 获取要求时间范围的 issue
 */
export const getDataIssue = (preDate: string) => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
  page: 1,
  since: dayjs(preDate).format("YYYY-MM-DDTHH:mm:ssZ"),
});

/**
 * createRelease
 * @param params
 */
export const createRelease = (params: CreateReleaseParams) => octokit.request(apiUrl.createRelease, {
  ...repoConfig.interviewRepo,
  ...params,
});



