// 获取对应的 tag
import { getDataIssue, getTag } from "@src/githubApi/releaseNote/request";
import { filter, get } from "lodash";
import dayjs from "dayjs";

/**
 * 过滤时间问题
 */
const main = async () => {
  const preTagRes = await getTag("0.0.21");
  // console.log("yanle - logger: preTagRes", preTagRes);

  // 获取上一次时间戳
  // 上一次创建的时间
  const createDate = get(preTagRes, "data.created_at", "");

  const issueRes = await getDataIssue(createDate);

  // console.log("yanle - logger: issueRes", issueRes.data);

  const filterData = filter(issueRes.data, item => {
    // 必须要在上一次创建时间之后
    return dayjs(item.created_at).isAfter(createDate);
  });

  console.log("yanle - logger: filterData", {
    createDate,
    numberList: filterData.map(item => item.number),
    length: filterData.length,
  });
};

main();

export {};
