// Import puppeteer
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { includes } from "lodash";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1460,
      height: 900,
    },
  });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto("https://www.zhipin.com/web/geek/job?query=rust&city=101270100");

  // 等待这个请求
  page
    .waitForResponse(() => true)
    .then(async (res) => {
      // console.log(`[yanle] - res url`, res.url());
      console.log(`[yanle] - res`, await res?.text?.());
    });

  const queryPath =
    "#wrap > div.page-job-wrapper > div.page-job-inner > div > div.job-list-wrapper > div.search-job-result > ul > li:nth-child(1)";
  await page.waitForSelector(queryPath);

  const html = await page.content();
  // console.log(`[yanle] - html`, html);

  // const $ = cheerio.load(html);

  // Close browser.
  await browser.close();
})();
