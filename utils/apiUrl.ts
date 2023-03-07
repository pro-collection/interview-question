export const apiUrl = {
  getIssue: "GET /repos/{owner}/{repo}/issues",
  writeIssue: "POST /repos/{owner}/{repo}/issues",
  getContent: "GET /repos/{owner}/{repo}/contents/{path}",
  updateContent: "PUT /repos/{owner}/{repo}/contents/{path}",
  createTagObj: "POST /repos/{owner}/{repo}/git/tags",
  createTag: "GET /repos/{owner}/{repo}/git/tags/{tag_sha}",
};
