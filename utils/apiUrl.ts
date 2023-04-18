export const apiUrl = {
  getIssue: "GET /repos/{owner}/{repo}/issues",

  writeIssue: "POST /repos/{owner}/{repo}/issues",

  updateIssue: "PATCH /repos/{owner}/{repo}/issues/{issue_number}",

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

  // https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-issues-and-pull-requests
  searchIssue: (queryString: string, created: string) =>
    `https://api.github.com/search/issues?q=${queryString}+state:open+created:>${created}&per_page=1`,
};

/**
 * api 文档： https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoStargazers?ex=no
 */
export const giteeApiUrl = {
  // post 请求
  // 文档 https://gitee.com/api/v5/swagger#/postV5ReposOwnerIssues
  createIssue: (owner: string) => `https://gitee.com/api/v5/repos/${owner}/issues`,

  // get 请求
  // https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoIssues
  getIssue: (owner: string, repo: string) => `https://gitee.com/api/v5/repos/${owner}/${repo}/issues`,
};

