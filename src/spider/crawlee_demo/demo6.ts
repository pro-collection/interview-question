import { load } from "cheerio";
import { PlaywrightCrawler, Dataset } from "crawlee";
import h2md from "html-to-md";
import fs from "fs";

// 设置要爬取的目标域名和起始URL
const domain = "www.lodashjs.com/";
const startUrl = `https://${domain}`;

const copyHtml = (html: string, title: string) => {
  if (!html) {
    return "";
  }

  const content = h2md(html);

  return `## ${title}

${content}`;
};

// 创建一个新的爬虫实例
const crawler = new PlaywrightCrawler({
  // 处理每个页面的回调函数
  async requestHandler({ request, page, enqueueLinks, log }) {
    // 提取页面的HTML内容
    const html = await page.content();

    const $ = load(html);
    const title = $(".breadcrumbs__link").text();

    // 移除导航
    $("nav.theme-doc-breadcrumbs").remove();

    const article =
      $(
        "#__docusaurus_skipToContent_fallback > div > main > div > div > div.col.docItemCol_z5aJ > div > article"
      ).html() || "";

    const htmlWithMD = copyHtml(article, title);

    // 保存HTML内容到数据集
    await Dataset.pushData({
      url: request.url,
      html: htmlWithMD,
    });

    // 将 htmlWithMD 写入 demo6.md 文件
    const filePath = "/Users/yanle/code/self/interview-question/src/spider/crawlee_demo/demo6.md";
    fs.appendFile(filePath, htmlWithMD + "\n", (err) => {
      if (err) {
        log.error(`写入文件失败: ${err}`);
      } else {
        log.info(`已将内容写入文件: ${title}`);
      }
    });

    log.info(`已抓取: ${request.url}`);

    // 递归地抓取相同域名下的所有链接
    await enqueueLinks({
      strategy: "same-domain",
      // 可以在这里添加链接过滤器
      transformRequestFunction: (req) => {
        // 排除非HTML资源
        if (!req.url.match(/\.(jpg|jpeg|png|gif|pdf|docx|xlsx|css|js|svg|ico|woff|woff2|ttf|eot)$/i)) {
          return req;
        }
        return null; // 过滤掉不符合条件的链接
      },
    });
  },

  // 处理请求失败的回调函数
  failedRequestHandler({ request, log }) {
    log.error(`请求失败: ${request.url}`);
  },

  // 爬虫配置
  maxRequestsPerCrawl: 1000, // 限制最大请求数，防止无限爬取
  maxConcurrency: 10, // 最大并发请求数
  navigationTimeoutSecs: 60, // 页面加载超时时间
});

const main = async () => {
  // 启动爬虫
  await crawler.run([startUrl]);
  console.log("yanle log 爬取完成！HTML内容已保存到数据集。");
};

main();
