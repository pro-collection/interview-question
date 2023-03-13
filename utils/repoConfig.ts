const { gitee_api_token } = require("./configToken.json");

export default {
  "interviewRepo": {
    "owner": "pro-collection",
    "repo": "interview-question",
    "header": {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  "booksWithInterviewRepo": {
    "owner": "pro-collection",
    "repo": "interview-question-books",
    "header": {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  "yanleleInfo": {
    "owner": "yanlele",
    "repo": "interview-question",
    "header": {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
  gitee: {
    access_token: gitee_api_token,
    interviewRepo: {
      "owner": "yanleweb",
      "repo": "interview-question",
    },
  },
};
