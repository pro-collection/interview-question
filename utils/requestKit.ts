import { Octokit } from "octokit";
import axios from "axios";
const config = require("./configToken.json");

export const octokit = new Octokit({
  auth: config.token,
});

export const giteeApi = axios.create();
