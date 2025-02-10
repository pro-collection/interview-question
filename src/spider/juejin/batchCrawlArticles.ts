import { PlaywrightCrawler } from "crawlee";
import fs from "fs";
import path from "path";
import { formatMarkdown } from "@src/githubApi/issue/helper";
import dayjs from "dayjs";
import jsonData from "../../../temp/juejin_interview/2025_01_11_21_36_38.json";
import { getFrontendArticles } from "./utils";

interface ArticleResult {
  url: string;
  success: boolean;
  error?: string;
  title?: string;
}

// 修改 appendToFile 函数
const appendToFile = (filePath: string, content: string) => {
  // 如果文件不存在，先创建一个空文件
  if (!fs.existsSync(filePath)) {
    // 创建一个文件头
    const fileHeader = `# 掘金文章合集\n创建时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}\n`;
    fs.writeFileSync(filePath, fileHeader, { encoding: "utf-8" });
  }
  // 追加内容
  fs.appendFileSync(filePath, content, { encoding: "utf-8" });
};

const crawlArticles = async (urls: string[], outputFilePath: string) => {
  const results: ArticleResult[] = [];

  // 确保输出目录存在
  const outputDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const crawler = new PlaywrightCrawler({
    headless: true,
    requestHandlerTimeoutSecs: 60,
    maxRequestsPerCrawl: urls.length,

    async requestHandler({ request, page, log }) {
      const url = request.url;
      try {
        log.info(`开始爬取文章: ${url}`);

        await page.waitForSelector("#article-root", { timeout: 10000 });
        const title = await page.title();
        log.info(`文章标题: ${title}`);

        const articleHtml = await page.$eval("#article-root", (el) => el.innerHTML);

        if (!articleHtml) {
          throw new Error("未找到文章内容");
        }

        const md = formatMarkdown(articleHtml);

        // 构建要追加的内容，包含分隔符和元数据
        const contentToAppend = `\n\n---\n# ${title}\n原文链接: ${url}\n爬取时间: ${dayjs().format(
          "YYYY-MM-DD HH:mm:ss"
        )}\n\n${md}\n`;

        // 追加到指定文件
        appendToFile(outputFilePath, contentToAppend);

        log.info(`文章爬取成功: ${url}`);
        results.push({ url, success: true, title });
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

  await crawler.run(urls);
  return results;
};

/**
 * 获取前端分类的文章数据并按点赞数排序
 * 并获取文章的url
 */
const articleUrls = getFrontendArticles(jsonData, "2025-01").map((article) => article.url);

// 指定输出文件路径
const outputFilePath = path.join(process.cwd(), "temp/material/2025.01.md");

crawlArticles(articleUrls, outputFilePath)
  .then((results) => {
    console.log("爬取完成!");
    console.log(`成功: ${results.filter((r) => r.success).length}`);
    console.log(`失败: ${results.filter((r) => !r.success).length}`);

    // 打印成功爬取的文章标题
    results
      .filter((r) => r.success)
      .forEach((r) => {
        console.log(`- ${r.title}`);
      });
  })
  .catch((error) => {
    console.error("爬取过程出错:", error);
  });
