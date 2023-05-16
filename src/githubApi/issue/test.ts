import { search } from "@src/githubApi/issue/search";

search(["forwardRef"]).then(res => {
  console.log("yanle - logger: res", res?.toLocaleString() || res);
});
