const { gitee_api_token } = require("./configToken.json");

const repoConfig = {
  interviewRepo: {
    owner: "pro-collection",
    repo: "interview-question",
    header: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  booksWithInterviewRepo: {
    owner: "pro-collection",
    repo: "interview-question-books",
    header: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  nodeIndex: {
    owner: "yanlele",
    repo: "node-index",
    header: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  yanleleInfo: {
    owner: "yanlele",
    repo: "interview-question",
    header: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  gitee: {
    access_token: gitee_api_token,
    interviewRepo: {
      owner: "yanleweb",
      repo: "interview-question",
    },
  },
};

export default repoConfig;
