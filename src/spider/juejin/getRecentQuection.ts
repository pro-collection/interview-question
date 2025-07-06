/**
 * 掘金面试相关文章爬虫脚本
 * 功能：爬取掘金网站上与"面试"相关的热门文章，保存为JSON数据并生成Markdown文档
 * 技术栈：Crawlee + Playwright (用于处理JavaScript渲染的页面)
 */

/** 导入所需模块 */
import { Dataset, Log, PlaywrightCrawler } from "crawlee"; /** 从crawlee库导入数据集、日志和Playwright爬虫类 */
import { compact } from "lodash"; /** 从lodash库导入compact函数，用于过滤数组中的空值 */
import path from "path"; /** 导入path模块，用于处理文件路径 */
import fs from "fs"; /** 导入fs模块，用于文件系统操作 */
import day from "dayjs"; /** 导入dayjs模块，用于日期时间处理 */
import type { Page } from "playwright"; /** 导入Playwright的Page类型定义 */
import { handleDataParseMD } from "./utils"; /** 从本地utils模块导入数据解析和Markdown生成函数 */

/**
 * 滚动页面并获取数据的核心函数
 * @param {Page} page - Playwright的页面实例
 * @param {Log} log - Crawlee日志对象
 * @returns {Promise<{done: boolean, data: any[], error?: any}>} - 包含爬取结果的数据对象
 */
const scrollAndGetData = async (page: Page, log: Log) => {
  /** 存储所有爬取到的数据 */
  let allData: any[] = [];
  /** 当前滚动次数 */
  let scrollCount = 0;
  /** 最大滚动次数限制，防止无限滚动 */
  const MAX_SCROLL_COUNT = 20;

  try {
    /** 获取初始数据 */
    log.info("[开始获取初始数据]");
    /** 等待搜索API响应 */
    const initialResponsePromise = page.waitForResponse(
      (response) => response.url().includes("/search_api/v1/search"),
      { timeout: 10 * 1000 } /** 10秒超时 */
    );
    const initialResponse = await initialResponsePromise;
    const initialJson = await initialResponse.json();

    /** 解析初始响应数据，提取文章信息和分类 */
    const initialData = compact(
      initialJson.data?.map?.((item: any) => {
        if (item?.result_model?.article_info) {
          return {
            article_info: item?.result_model?.article_info,
            category_name: item?.result_model?.category?.category_name,
          };
        }
        return null;
      })
    );

    allData = [...allData, ...initialData];
    log.info(`[获取初始数据] - ${initialData.length}条`);

    /**
     * 递归滚动函数，用于加载更多数据
     * @returns {Promise<{done: boolean, data: any[], error?: any}>} - 包含爬取结果的数据对象
     */
    const scrollItem = async () => {
      try {
        /** 检查滚动次数是否达到上限 */
        scrollCount++;
        if (scrollCount > MAX_SCROLL_COUNT) {
          log.info(`[达到最大滚动次数] - ${MAX_SCROLL_COUNT}次`);
          return { done: true, data: allData };
        }
        log.info(`[当前滚动次数] - ${scrollCount}/${MAX_SCROLL_COUNT}`);

        /** 滚动到页面底部 */
        const currentHeight = await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
          return document.body.scrollHeight;
        });

        try {
          /** 等待新的搜索API响应 */
          const responsePromise = page.waitForResponse((response) => response.url().includes("/search_api/v1/search"), {
            timeout: 10 * 1000 /** 10秒超时 */,
          });

          const response = await responsePromise;
          const json = await response.json();

          /** 解析新响应数据 */
          const newData = compact(
            json.data?.map?.((item: any) => {
              if (item?.result_model?.article_info) {
                return {
                  article_info: item?.result_model?.article_info,
                  category_name: item?.result_model?.category?.category_name,
                };
              }
              return null;
            })
          );

          allData = [...allData, ...newData];
          log.info(`[获取到新数据] - ${newData.length}条`);

          /** 再次滚动检查页面高度变化 */
          const nextHeight = await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
            return document.body.scrollHeight;
          });

          log.info(`[当前高度] - ${currentHeight}`);
          log.info(`[新高度] - ${nextHeight}`);

          /** 如果高度增加，继续滚动加载更多数据 */
          if (nextHeight > currentHeight) {
            log.info(`[继续滚动获取下一页]`);
            return await scrollItem();
          }

          return { done: true, data: allData };
        } catch (requestError: any) {
          log.error("[请求超时] - 等待响应超过10秒，终止循环");
          return { done: true, data: allData, error: requestError };
        }
      } catch (error: any) {
        log.error("[错误] - 爬虫获取数据失败");
        return { done: true, data: allData, error };
      }
    };

    return await scrollItem();
  } catch (error: any) {
    log.error("[初始数据获取错误]");
    return { done: true, data: allData, error };
  }
};

/** 创建Playwright爬虫实例 */
const crawler = new PlaywrightCrawler({
  headless: true /** 非无头模式，可见浏览器窗口 */,
  requestHandlerTimeoutSecs: 60 * 100 /** 请求处理超时时间 */,
  requestHandler: async ({ page, log }) => {
    /** 获取所有数据，带重试机制 */
    /** 存储所有爬取到的数据 */
    let allData: any[] = [];
    /** 存储请求过程中出现的错误 */
    let error: any = null;
    /** 最大重试次数，防止无限重试 */
    const maxRetries = 10;
    /** 当前重试次数 */
    let currentRetry = 0;

    while (currentRetry < maxRetries) {
      const result = await scrollAndGetData(page, log);
      allData = result.data;
      error = result.error;

      if (!error) {
        break; /** 请求成功，退出重试循环 */
      }

      currentRetry++;
      log.warning(`[请求失败] - 将进行第${currentRetry}次重试（共${maxRetries}次）`);

      /** 如果已达到最大重试次数，不再重试 */
      if (currentRetry >= maxRetries) {
        log.error(`[请求失败] - 已达到最大重试次数${maxRetries}次，无法获取数据`);
        break;
      }
    }

    log.info(`[总共获取数据] - ${allData.length}条`);

    /** 如果最终仍有错误或数据为空，终止程序 */
    if (error || allData.length === 0) {
      if (error) {
        log.error("[错误信息] - scrollAndGetData 请求失败");
      } else {
        log.error("[错误信息] - 未获取到任何数据");
      }
      return;
    }

    /** 如果没有获取到数据，终止程序 */
    if (allData.length === 0) {
      log.error("[未获取到任何数据] - 终止程序");
      return;
    }

    /** 保存数据到数据集 */
    await Dataset.pushData(allData);

    /** 打开数据集准备导出 */
    const dataset = await Dataset.open("default");

    /** 生成文件名（使用当前日期时间） */
    const fileName = day().format("YYYY_MM_DD_HH_mm_ss");

    /** 导出数据到JSON文件 */
    await dataset.exportToJSON(fileName);

    log.info(`[yanle] - 开始移动文档`);

    /** 移动文件到指定目录 */
    fs.rename(
      path.join(process.cwd(), `storage/key_value_stores/default/${fileName}.json`),
      path.join(process.cwd(), `temp/juejin_interview/${fileName}.json`),
      (err) => {
        if (err) {
          log.error("移动文件时出错：", err);
        } else {
          log.info("文件移动成功！");
        }
      }
    );

    log.info(`[yanle] - 写入本地文档`);

    /** 生成markdown文档 */
    handleDataParseMD(allData, "2025_06");
  },
});

/** 启动爬虫，爬取掘金面试相关热门文章 */
crawler.run([
  "https://juejin.cn/search?query=%E9%9D%A2%E8%AF%95&fromSeo=0&fromHistory=0&fromSuggest=0&sort=2&period=3&type=2&enterFrom=home_page",
]);
