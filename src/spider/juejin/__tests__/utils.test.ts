import { formatArticleData, getFrontendArticles } from "../utils";

describe("formatArticleData 文章数据格式化函数", () => {
  it("应该正确格式化文章数据并按分类和点赞数排序", () => {
    // 模拟输入数据
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
      {
        article_info: {
          title: "过期文章",
          article_id: "1234567893",
          digg_count: 300,
          ctime: "1704067200", // 2024-01-01
        },
        category_name: "前端",
      },
    ];

    const targetDate = "2024-02";
    const result = formatArticleData(mockJsonData, targetDate);

    // 预期输出
    const expectedOutput = {
      前端: [
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
      ],
      后端: [
        {
          title: "后端文章1",
          url: "https://juejin.cn/post/1234567892",
          diggCount: 150,
        },
      ],
    };

    // 断言测试
    expect(result).toEqual(expectedOutput);

    // 额外的具体断言
    expect(Object.keys(result)).toHaveLength(2); // 应该有两个分类
    expect(result["前端"]).toHaveLength(2); // 前端分类应该有2篇文章
    expect(result["后端"]).toHaveLength(1); // 后端分类应该有1篇文章

    // 验证排序是否正确（点赞数降序）
    expect(result["前端"][0].diggCount).toBeGreaterThan(result["前端"][1].diggCount);
  });

  it("应该正确处理空数组输入", () => {
    const result = formatArticleData([], "2024-02");
    expect(result).toEqual({});
  });

  it("应该过滤掉不属于目标月份的文章", () => {
    const mockJsonData = [
      {
        article_info: {
          title: "上个月的文章",
          article_id: "1234567890",
          digg_count: 100,
          ctime: "1704067200", // 2024-01-01
        },
        category_name: "前端",
      },
    ];

    const result = formatArticleData(mockJsonData, "2024-02");
    expect(result).toEqual({});
  });
});

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
});
