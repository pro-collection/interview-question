const { Octokit } = require("octokit");
const config = require("../configToken.json");

export const octokit = new Octokit({
  auth: config.token,
});

