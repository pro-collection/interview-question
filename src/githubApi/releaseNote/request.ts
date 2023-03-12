import dayjs from "dayjs";
import { CreateReleaseParams } from "./interface";
import { apiUrl } from "@utils/apiUrl";
import { octokit } from "@utils/requestKit";
import repoConfig from "@utils/repoConfig";

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
  message: `update - package.json: ${dayjs().format("YYYY-MM-DDTHH:mm:ssZ")}`,
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


/**
 * 获取一个 tag
 */
export const getTag = (tag: string) => octokit.request(apiUrl.getTag, {
  ...repoConfig.interviewRepo,
  tag,
});
//
// getTag("0.0.13").then((res: any) => {
//   // console.log('yanle - logger: res', res);
//   const createDate = get(res, "data.created_at", "");
//   console.log('yanle - logger: createDate', createDate);
//   let preDate = dayjs(createDate).format("YYYY.MM.DD");
//   console.log("yanle - logger: preDate", preDate);
//
//   // @ts-ignore
//   const currentTZ = dayjs.tz.guess();
//
//   // @ts-ignore
//   preDate = dayjs.tz(createDate, currentTZ).format('YYYY.MM.DD');
//   console.log('yanle - logger: next preDate', preDate);
// });
