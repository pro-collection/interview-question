import { Octokit } from "octokit";
import axios from "axios";
import repoConfig from "@utils/repoConfig";

const config = require("./configToken.json");


export const octokit = new Octokit({
  auth: config.token,
});

export const giteeApi = axios.create({
  params: {
    access_token: config.gitee_api_token,
  },
  data: {
    access_token: config.gitee_api_token,
  },
});
