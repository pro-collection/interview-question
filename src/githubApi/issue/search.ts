import { apiUrl } from "@utils/apiUrl";
import { get } from "lodash";
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

export const search = async (search: string) => {
  const created = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const res = await request(search, '2020-04-23');
  return get(res, "data.total_count", 0);
};

