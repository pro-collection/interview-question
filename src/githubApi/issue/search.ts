import { apiUrl } from "@utils/apiUrl";
import { get } from "lodash";
import dayjs from "dayjs";
import axios from "axios";

const request = (q: string, created: string) => axios.request({
  url: apiUrl.searchIssue(q, created),
  method: "get",
});

export const search = async (search: string) => {
  const created = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const res = await request(search, created);
  return get(res, "data.total_count", 0);
};

