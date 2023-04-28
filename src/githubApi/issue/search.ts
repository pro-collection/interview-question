import { apiUrl } from "@utils/apiUrl";
import { get, sum } from "lodash";
import dayjs from "dayjs";
import axios from "axios";

const request = (q: string, created: string) => {
  const url = apiUrl.searchIssue(q, created);
  console.log("yanle - logger: 获取热度 URL", url);
  return axios.request({
    url,
    method: "get",
  });
};

export const search = async (search: string[]) => {
  const created = dayjs().subtract(1, "year").format("YYYY-MM-DD");

  const promiseList = [];
  for (let i = 0; i < search.length; i++) {
    promiseList.push(request(search[i], created).then(res => get(res, "data.total_count", 0)));
  }
  const res = await Promise.all(promiseList);
  for (let i = 0; i < res.length; i++) {
    console.log(`yanle - logger: 关键词： ${search[i]}, 对应搜索热度： ${res[i]}`);
  }
  return sum(res);
};

