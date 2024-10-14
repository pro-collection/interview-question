// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { Dataset, PlaywrightCrawler } from "crawlee";
import { compact, get, map, replace, split, toNumber, trim } from "lodash";
import path from "path";
import fs from "fs";
import day from "dayjs";
import type { Page } from "playwright";
import dayjs from "dayjs";

const delay = (time: number = 3 * 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      return resolve("delay");
    }, time);
  });

const scrollFn = async (page: Page) => {
  const scrollItem = () =>
    page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
      return document.body.scrollHeight;
    });

  const height = await scrollItem();

  await delay();

  const nextHeight = await scrollItem();
  console.log(`[yanle] - height`, height);
  console.log(`[yanle] - nextHeight`, nextHeight);
  if (nextHeight > height) {
    console.log(`[yanle] - next page`);
    return await scrollFn(page);
  }

  return { done: true };
};

const crawler = new PlaywrightCrawler({
  headless: false,
  requestHandler: async ({ page, log }) => {
    // Wait for the actor cards to render.
    await page.waitForSelector("a.entry-link");

    // 滚动到底部
    await scrollFn(page);

    // Execute a function in the browser which targets
    // the actor card elements and allows their manipulation.
    const linkElementList = await page.$$eval("a.entry-link", (els) => {
      // Extract text content from the actor cards
      return els.map((el) => {
        return {
          url: el.getAttribute("href"),
          name: el.querySelector("a.title")?.firstChild?.textContent || "",
          tags: el.querySelector("li.tag")?.textContent || "",
          date: el.querySelector(".meta-list li:nth-child(2)")?.textContent || "",
        };
      });
    });

    const linkElementObject = map(linkElementList, (item) => {
      // 单位 - 小时/天/月
      const dayString = trim(item.date).replace("\n", "");

      const getDate = () => {
        if (dayString.includes("小时")) {
          const hour = toNumber(get(dayString.split("小时"), 0));
          return dayjs().subtract(hour, "hour").format("YYYY-MM-DD");
        }

        if (dayString.includes("天")) {
          const hour = toNumber(get(dayString.split("天"), 0));
          return dayjs().subtract(hour, "day").format("YYYY-MM-DD");
        }

        if (dayString.includes("月")) {
          const hour = toNumber(get(dayString.split("天"), 0));
          return dayjs().subtract(hour, "month").format("YYYY-MM");
        }
      };

      return {
        ...item,
        // tags: compact(item.tags?.split(" ")).map((tagText) => replace(tagText, "\n", "")),
        tags: compact(item.tags?.split(" "))
          .filter((item) => item !== "\n")
          .map((tagText) => replace(tagText, "\n", "")),
        url: `https://juejin.cn${get(split(item.url, "?"), 0)}`,
        date: getDate(),
      };
    });

    await Dataset.pushData(linkElementObject);

    // Open a named dataset
    const dataset = await Dataset.open("default");

    const fileName = day().format("YYYY_MM_01");
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
  "https://juejin.cn/search?query=%E9%9D%A2%E8%AF%95&fromSeo=0&fromHistory=1&fromSuggest=0&enterFrom=home_page&type=0&period=2&sort=1",
]);
