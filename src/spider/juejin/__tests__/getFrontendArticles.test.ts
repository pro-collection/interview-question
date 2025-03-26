import { getFrontendArticles } from "../utils";

describe("getFrontendArticles 获取前端文章函数", () => {
  it("应该正确获取前端分类的文章并按点赞数排序", () => {
    const mockJsonData = [
      {
        article_info: {
          title: "前端文章1",
          article_id: "1234567890",
          digg_count: 100,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "前端",
      },
      {
        article_info: {
          title: "前端文章2",
          article_id: "1234567891",
          digg_count: 200,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "前端",
      },
      {
        article_info: {
          title: "后端文章1",
          article_id: "1234567892",
          digg_count: 150,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "后端",
      },
    ];

    const targetDate = "2024-02";
    const result = getFrontendArticles(mockJsonData, targetDate);

    const expectedOutput = [
      {
        title: "前端文章2",
        url: "https://juejin.cn/post/1234567891",
        diggCount: 200,
      },
      {
        title: "前端文章1",
        url: "https://juejin.cn/post/1234567890",
        diggCount: 100,
      },
    ];

    // 断言测试
    expect(result).toEqual(expectedOutput);
    expect(result).toHaveLength(2);
    expect(result[0].diggCount).toBeGreaterThan(result[1].diggCount);
  });

  it("应该正确处理没有前端文章的情况", () => {
    const mockJsonData = [
      {
        article_info: {
          title: "后端文章1",
          article_id: "1234567892",
          digg_count: 150,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "后端",
      },
    ];

    const result = getFrontendArticles(mockJsonData, "2024-02");
    expect(result).toEqual([]);
  });

  it("应该正确处理空数组输入", () => {
    const result = getFrontendArticles([], "2024-02");
    expect(result).toEqual([]);
  });

  it("应该过滤掉不属于目标月份的前端文章", () => {
    const mockJsonData = [
      {
        article_info: {
          title: "过期前端文章",
          article_id: "1234567890",
          digg_count: 100,
          ctime: "1704067200", // 2024-01-01
        },
        category_name: "前端",
      },
      {
        article_info: {
          title: "当月前端文章",
          article_id: "1234567891",
          digg_count: 200,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "前端",
      },
    ];

    const result = getFrontendArticles(mockJsonData, "2024-02");

    const expectedOutput = [
      {
        title: "当月前端文章",
        url: "https://juejin.cn/post/1234567891",
        diggCount: 200,
      },
    ];

    expect(result).toEqual(expectedOutput);
    expect(result).toHaveLength(1);
  });
});
