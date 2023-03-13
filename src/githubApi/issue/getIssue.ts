import { find, map, get, sortBy } from "lodash";
import dayjs from "dayjs";
import { octokit } from "@utils/requestKit";
import { apiUrl } from "@utils/apiUrl";
import repoConfig from "@utils/repoConfig";
import { mileStone } from "@src/giteeApi/issue/consts";
import { WriteRequestOptions } from "@src/giteeApi/issue/interface";
import { giteeWriteIssue } from "@src/giteeApi/issue/writeIssue";
// import * as fs from "fs";
// import * as path from "path";

const req = () => octokit.request(apiUrl.getIssue, {
  ...repoConfig.interviewRepo,
  per_page: 100,
  since: dayjs("2023-03-01").format("YYYY-MM-DDTHH:mm:ssZ"),
});

const main = async () => {
  const res = await req();

  const titleList = map(sortBy(res.data, sortItem => sortItem.number), item => {
    const milestoneNumber = get(mileStone, item.milestone?.number);
    const labels = map(item.labels, label => label.name).join(",");
    const returnData: WriteRequestOptions = {
      title: item.title,
      body: item.body,
      // number: item.number,
    };

    if (milestoneNumber) returnData.milestone = milestoneNumber;
    if (labels) returnData.labels = labels;

    return returnData;
  });
  // console.log("yanle - logger: title", titleList);
  //
  // const content = find(res.data, item => item.number === 3);
  // console.log("yanle - logger: content", content);

  for (const item of titleList) {
    console.log('yanle - logger: 开始写入', item.title);
    await giteeWriteIssue(item);
  }
};

main();

export {};
