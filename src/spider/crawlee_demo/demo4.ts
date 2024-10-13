// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  // headless: false,
  requestHandler: async ({ page }) => {
    // Wait for the actor cards to render.
    await page.waitForSelector(".article-item-link");
    // Execute a function in the browser which targets
    // the actor card elements and allows their manipulation.
    const categoryTexts = await page.$$eval(".article-item-link", (els) => {
      // Extract text content from the actor cards
      return els.map((el) => {
        return {
          url: el.getAttribute("href"),
          name: el.querySelector(".article-detail")?.firstChild?.textContent,
        };
      });
    });
    categoryTexts.forEach((text, i) => {
      console.log(`CATEGORY_${i + 1}: ${JSON.stringify(text, undefined, 2)}\n`);
    });
  },
});

// 前端热榜
crawler.run(["https://juejin.cn/hot/articles/6809637767543259144"]);
