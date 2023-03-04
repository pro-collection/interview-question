import { octokit } from "../main";
import { apiUrl } from "../../apiUrl";
import { WriteIssueOptions } from "./interface";

const config = require("../../configToken.json");

const remote = [
  {
    title: "【初】JS数据类型有哪些,区别是什么？ - todo",
    labels: ["JavaScript"],
  },
];

const write = (options: WriteIssueOptions) => octokit.request(apiUrl.writeIssue, {
  ...options,
  ...config.yanleleInfo,
});

write({
  title: "【中】网络模型分层大概有哪些层级？",
  body: "todo",
  labels: [
    "网络",
  ],
});
