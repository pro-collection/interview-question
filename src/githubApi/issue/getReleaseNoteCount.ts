import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { base64ToString, stringToBase64 } from "@utils/helper";
import { filter, findLastIndex, get, map } from "lodash";
import { getDataIssue, getPackageJson, getTag } from "../releaseNote/request";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 获取当前版本 issue 数量
 */
export const getIssueContentWithCurrentVersion = async () => {
  // 获取 package.json
  const res = await getPackageJson();
  console.log("yanle - logger: 获取 package json 完成");
  const sha = get(res, "data.sha");
  let packageString = base64ToString(get(res, "data.content"));
  const packageJson = JSON.parse(packageString);
  const currentVersion = Reflect.get(packageJson, "version");

  // 获取对应的 tag
  const preTagRes = await getTag(currentVersion);

  // 获取上一次时间戳
  const createDate = get(preTagRes, "data.created_at", "");

  // 获取最新的 issue
  const issueRes = await getDataIssue(createDate);

  // 通过创建时间 过滤
  const filterData = filter(issueRes?.data, (item) => {
    // 必须要在上一次创建时间之后
    return dayjs(item.created_at).isAfter(createDate);
  });

  return {
    issueList: filterData,
  };
};
