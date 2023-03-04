const { Octokit } = require("octokit");
const config = require("../configToken.json");
const { get, find } = require("lodash");

const octokit = new Octokit({
  auth: config.token,
});

const req = () => octokit.request(`GET /repos/${config.yanlele.owner}/${config.yanlele.repo}/issues`, {
  headers: config.header,
});

const main = async () => {
  const res = await req();

  const result = get(find(res.data, (item: any) => item.number === 6), 'body');
  console.log("yanle - logger: result: \n", result);
};

main();
