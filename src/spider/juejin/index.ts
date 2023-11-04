import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { htmlPath } from "@src/githubApi/file/consts";


const main = async () => {
  const res = await axios.get("https://juejin.cn/post/7239241544959885369");
  const content = res?.data;

  const $ = cheerio.load(content);

  const articleHtml = $("#article-root").html() || "";

  if (!articleHtml) {
    console.log("yanle - logger: 没有获取到  html 文件， 写入失败");
  }

  // html 写入本地
  fs.writeFileSync(htmlPath, articleHtml, { encoding: "utf-8" });

  // html 转 markdown
  await writeToTemp();
};

// main().then();

console.log("yanle - logger: htmlPath", htmlPath);
