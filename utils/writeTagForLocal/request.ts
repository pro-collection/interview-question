import { octokit } from "../requestKit";
import { apiUrl } from "../apiUrl";
import repoConfig from "../repoConfig";
import dayjs from "dayjs";

/**
 * @param path 更新文件的 path
 * @param content 更新文件的内容， base 64 格式更新
 */
export const updateContentFile = (path: string, content: string) => {
  return octokit.request(apiUrl.updateContent, {
    ...repoConfig.interviewRepo,
    path,
    message: `update - file: ${dayjs().format("YYYY-MM-DDTHH:mm:ssZ")}`,
    committer: {
      name: "yanlele",
      email: "331393627@qq.com",
    },
    content,
  })
}
