// Import puppeteer
import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1460,
      height: 900,
    },
  });

  // Create a page
  const page = await browser.newPage();

  //   拦截请求
  // await page.setRequestInterception(true);
  // page.on("request", (interceptedRequest) => {
  //   if (interceptedRequest.isInterceptResolutionHandled()) return;

  //   if (interceptedRequest.url().includes("wapi/zpgeek/search/joblist.json")) {
  //     console.log(`[yanle] - interceptedRequest`, interceptedRequest);
  //   }

  //   interceptedRequest.continue();
  // });

  // await page.setRequestInterception(true);
  page.on("response", async (response) => {
    if (response.url().includes("wapi/zpgeek/search/joblist.json")) {
      const text = await response.text();
      console.log(`[yanle] - text`, text);
    }
  });

  // Go to your site
  await page.goto("https://www.zhipin.com/web/geek/job?query=rust&city=101270100");

  // await page.waitForResponse();
  const element = await page.waitForSelector("body");

  // console.log(`[yanle] - element`, element);

  // Close browser.
  await browser.close();
})();
