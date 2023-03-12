export const apiUrl = {
  getIssue: "GET /repos/{owner}/{repo}/issues",
  writeIssue: "POST /repos/{owner}/{repo}/issues",

  getContent: "GET /repos/{owner}/{repo}/contents/{path}",

  // api 文档 https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
  updateContent: "PUT /repos/{owner}/{repo}/contents/{path}",

  createTagObj: "POST /repos/{owner}/{repo}/git/tags",

  // 关联 tag 和 commit
  createRef: "POST /repos/{owner}/{repo}/git/refs",

  // 创建 release
  createRelease: "POST /repos/{owner}/{repo}/releases",

  // 获取一个 release
  getRelease: "GET /repos/{owner}/{repo}/releases/{release_id}",

  // 获取一个 tag
  getTag: "GET /repos/{owner}/{repo}/releases/tags/{tag}",

  // 更新一个 tag
  // api https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#update-an-issue
  updateTag: "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
};

/**
 * api 文档： https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoStargazers?ex=no
 */
export const giteeApiUrl = {

};

