// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { Dataset, PlaywrightCrawler } from "crawlee";
import { compact } from "lodash";
import path from "path";
import fs from "fs";
import day from "dayjs";
import type { Page } from "playwright";
import { handleDataParseMD } from "./utils";

// 修改滚动函数，增加数据获取逻辑
const scrollAndGetData = async (page: Page) => {
  let allData: any[] = [];
  let scrollCount = 0;
  const MAX_SCROLL_COUNT = 20;

  try {
    // 获取初始数据
    console.log("[开始获取初始数据]");
    const initialResponsePromise = page.waitForResponse(
      (response) => response.url().includes("/search_api/v1/search"),
      { timeout: 10 * 1000 }
    );
    const initialResponse = await initialResponsePromise;
    const initialJson = await initialResponse.json();

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
    console.log(`[获取初始数据] - ${initialData.length}条`);

    const scrollItem = async () => {
      try {
        // 检查滚动次数
        scrollCount++;
        if (scrollCount > MAX_SCROLL_COUNT) {
          console.log(`[达到最大滚动次数] - ${MAX_SCROLL_COUNT}次`);
          return { done: true, data: allData };
        }
        console.log(`[当前滚动次数] - ${scrollCount}/${MAX_SCROLL_COUNT}`);

        // 滚动到底部
        const currentHeight = await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
          return document.body.scrollHeight;
        });

        try {
          // 等待 API 响应，如果 10 秒内没有响应就终止整个循环
          const responsePromise = page.waitForResponse((response) => response.url().includes("/search_api/v1/search"), {
            timeout: 10 * 1000,
          });

          const response = await responsePromise;
          const json = await response.json();

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
          console.log(`[获取到新数据] - ${newData.length}条`);

          // 再次滚动检查新高度
          const nextHeight = await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
            return document.body.scrollHeight;
          });

          console.log(`[当前高度] - ${currentHeight}`);
          console.log(`[新高度] - ${nextHeight}`);

          if (nextHeight > currentHeight) {
            console.log(`[继续滚动获取下一页]`);
            return await scrollItem();
          }

          return { done: true, data: allData };
        } catch (requestError: any) {
          console.log("[请求超时] - 等待响应超过10秒，终止循环");
          return { done: true, data: allData, error: requestError };
        }
      } catch (error: any) {
        console.log("[错误] - ", error?.message);
        return { done: true, data: allData, error };
      }
    };

    return await scrollItem();
  } catch (error: any) {
    console.log("[初始数据获取错误] - ", error?.message);
    return { done: true, data: allData, error };
  }
};

const crawler = new PlaywrightCrawler({
  headless: false,
  requestHandlerTimeoutSecs: 60 * 100,
  requestHandler: async ({ page, log }) => {
    // 获取所有数据
    const { data: allData, error } = await scrollAndGetData(page);
    console.log(`[总共获取数据] - ${allData.length}条`);
    if (error) {
      console.log("[错误信息] - ", error?.message);
    }

    // 保存数据到数据集
    await Dataset.pushData(allData);

    // 打开数据集准备导出
    const dataset = await Dataset.open("default");

    // 生成文件名（使用当前日期）
    const fileName = day().format("YYYY_MM_DD_HH_mm_ss");

    // 导出数据到JSON文件
    await dataset.exportToJSON(fileName);

    console.log(`[yanle] - 开始移动文档`);

    // 移动文件到指定目录
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

    console.log(`[yanle] - 写入本地文档`);

    // 生成markdown文档
    handleDataParseMD(allData, "2025_02");
  },
});

// 前端热榜
crawler.run([
  "https://juejin.cn/search?query=%E9%9D%A2%E8%AF%95&fromSeo=0&fromHistory=0&fromSuggest=0&sort=2&period=3&enterFrom=home_page",
]);
