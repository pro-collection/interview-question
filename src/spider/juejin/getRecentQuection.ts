// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { Dataset, PlaywrightCrawler } from "crawlee";
import { compact, get, map, replace, split } from "lodash";
import path from "path";
import fs from "fs";
import day from "dayjs";

const crawler = new PlaywrightCrawler({
  // headless: false,
  requestHandler: async ({ page }) => {
    // Wait for the actor cards to render.
    await page.waitForSelector("a.entry-link");
    // Execute a function in the browser which targets
    // the actor card elements and allows their manipulation.
    const linkElementList = await page.$$eval("a.entry-link", (els) => {
      // Extract text content from the actor cards
      return els.map((el) => {
        return {
          url: el.getAttribute("href"),
          name: el.querySelector("a.title")?.firstChild?.textContent,
          tags: el.querySelector("li.tag")?.textContent,
        };
      });
    });

    const linkElementObject = map(linkElementList, (item) => ({
      ...item,
      // tags: compact(item.tags?.split(" ")).map((tagText) => replace(tagText, "\n", "")),
      tags: compact(item.tags?.split(" "))
        .filter((item) => item !== "\n")
        .map((tagText) => replace(tagText, "\n", "")),
      url: `https://juejin.cn${get(split(item.url, "?"), 0)}`,
    }));

    await Dataset.pushData(linkElementObject);

    // Open a named dataset
    const dataset = await Dataset.open("default");

    const fileName = day().format("YYYY_MM_DD");
    await dataset.exportToJSON(fileName);

    // 移动文件
    fs.rename(
      path.join(process.cwd(), `storage/key_value_stores/default/${fileName}.json`),
      path.join(process.cwd(), `temp/juejin_interview/${fileName}.json`),
      (err) => {
        if (err) {
          console.error("移动文件时出错：", err);
        } else {
          console.log("文件移动成功！");
        }
      }
    );
  },
});

// 前端热榜
crawler.run([
  "https://juejin.cn/search?query=%E9%9D%A2%E8%AF%95&fromSeo=0&fromHistory=0&fromSuggest=0&period=1&sort=1",
]);
