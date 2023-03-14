import { find, map, get, sortBy } from "lodash";
import dayjs from "dayjs";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { giteeMileStone } from "@src/giteeApi/issue/consts";
import { WriteRequestOptions } from "@src/giteeApi/issue/interface";

import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
import { getDataIssue, getTag } from "@src/githubApi/releaseNote/request";
import { getReleaseContent } from "@src/githubApi/releaseNote/helper";
import { writeContentForLocal } from "@src/githubApi/writeTagForLocal";
// import * as fs from "fs";
import * as path from "path";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
  since: dayjs("2023-03-01").format("YYYY-MM-DDTHH:mm:ssZ"),
});

const getIssueByDate = (preDate: string, page: number = 1) => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 15,
  page,
  since: dayjs(preDate).format("YYYY-MM-DDTHH:mm:ssZ"),
});

const main = async () => {
  const res = await req();

  // const titleList = map(sortBy(res.data, sortItem => sortItem.number), item => {
  //   const milestoneNumber = get(giteeMileStone, item.milestone?.number);
  //   const labels = map(item.labels, label => label.name).join(",");
  //   const returnData: WriteRequestOptions = {
  //     title: item.title,
  //     body: item.body,
  //     // number: item.number,
  //   };
  //
  //   if (milestoneNumber) returnData.milestone = milestoneNumber;
  //   if (labels) returnData.labels = labels;
  //
  //   return returnData;
  // });
  //
  // console.log("yanle - logger: titleList", titleList);

  // console.log("yanle - logger: title", titleList);
  //
  // const content = find(res.data, item => item.number === 3);
  // console.log("yanle - logger: content", content);

  // 写入 title
  // for (const item of titleList) {
  //   console.log('yanle - logger: 开始写入 - ', item.title);
  //   await giteeWriteIssue(item);
  // }


  // 获取对应的 tag
  const preTagRes = await getTag("0.0.14");

  // 获取上一次时间戳
  const createDate = get(preTagRes, "data.created_at", "");

  // @ts-ignore
  // const currentTZ = dayjs.tz.guess();

  // @ts-ignore
  // const preDate = dayjs.tz(createDate, currentTZ).format("YYYY.MM.DD");

  // 获取最新的 issue
  const issueRes = await getIssueByDate(createDate, 3);
  const releaseName = `2023.03.09 - 2023.03.15 更新收集面试问题（45道题）【下】`;
  const releaseBody = getReleaseContent(issueRes.data, releaseName, true);
  const filePath = path.resolve(__dirname, "../../../books");
  const fileName = "0.0.15_下";

  await writeContentForLocal({ path: filePath, fileName, content: releaseBody });
};

main();

export {};
