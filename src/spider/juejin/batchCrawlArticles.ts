import { PlaywrightCrawler } from "crawlee";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { writeToTemp } from "@src/githubApi/issue/helper";
import { htmlPath, tempFilePath } from "@src/githubApi/file/consts";
import dayjs from "dayjs";

interface ArticleResult {
  url: string;
  success: boolean;
  error?: string;
}

const crawlArticles = async (urls: string[]) => {
  const results: ArticleResult[] = [];

  // 创建输出目录
  const outputDir = path.join(process.cwd(), "temp/juejin_articles");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const crawler = new PlaywrightCrawler({
    headless: true, // 无头模式运行
    requestHandlerTimeoutSecs: 60,
    maxRequestsPerCrawl: urls.length,

    async requestHandler({ request, page, log }) {
      const url = request.url;
      try {
        log.info(`开始爬取文章: ${url}`);

        // 等待文章内容加载
        await page.waitForSelector("#article-root", { timeout: 10000 });

        // 获取文章内容
        const articleHtml = await page.$eval("#article-root", (el) => el.innerHTML);

        if (!articleHtml) {
          throw new Error("未找到文章内容");
        }

        // 生成唯一文件名
        const timestamp = dayjs().format("YYYYMMDD_HHmmss");
        const articleId = url.split("/").pop() || "unknown";
        const fileName = `${articleId}_${timestamp}`;

        // 保存HTML文件
        const htmlFilePath = path.join(outputDir, `${fileName}.html`);
        fs.writeFileSync(htmlFilePath, articleHtml, { encoding: "utf-8" });

        // 转换为Markdown并保存
        const mdFilePath = path.join(outputDir, `${fileName}.md`);
        await writeToTemp(mdFilePath, htmlFilePath);

        log.info(`文章爬取成功: ${url}`);
        results.push({ url, success: true });
      } catch (error) {
        log.error(`文章爬取失败: ${url}`, { error });
        results.push({
          url,
          success: false,
          error: error instanceof Error ? error.message : "未知错误",
        });
      }
    },
  });

  // 开始爬取
  await crawler.run(urls);

  // 生成报告
  const reportPath = path.join(outputDir, `crawl_report_${dayjs().format("YYYYMMDD_HHmmss")}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), "utf-8");

  return results;
};

// 使用示例
const articleUrls = [
  "https://juejin.cn/post/7354940230301057033",
  "https://juejin.cn/post/7354248123380776991",
  // 添加更多文章链接...
];

crawlArticles(articleUrls)
  .then((results) => {
    console.log("爬取完成!");
    console.log(`成功: ${results.filter((r) => r.success).length}`);
    console.log(`失败: ${results.filter((r) => !r.success).length}`);
  })
  .catch((error) => {
    console.error("爬取过程出错:", error);
  });
