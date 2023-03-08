export const apiUrl = {
  getIssue: "GET /repos/{owner}/{repo}/issues",
  writeIssue: "POST /repos/{owner}/{repo}/issues",
  getContent: "GET /repos/{owner}/{repo}/contents/{path}",
  updateContent: "PUT /repos/{owner}/{repo}/contents/{path}",

  createTagObj: "POST /repos/{owner}/{repo}/git/tags",

  // 关联 tag 和 commit
  createRef: "POST /repos/{owner}/{repo}/git/refs",

  // 创建 release
  createRelease: "POST /repos/{owner}/{repo}/releases",
};

