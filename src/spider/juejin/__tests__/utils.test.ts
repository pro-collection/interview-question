import { formatArticleData } from "../utils";

describe("formatArticleData", () => {
  it("should correctly format and sort article data by category", () => {
    // Mock input data
    const mockJsonData = [
      {
        article_info: {
          title: "Article 1",
          article_id: "1234567890",
          digg_count: 100,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "前端",
      },
      {
        article_info: {
          title: "Article 2",
          article_id: "1234567891",
          digg_count: 200,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "前端",
      },
      {
        article_info: {
          title: "Article 3",
          article_id: "1234567892",
          digg_count: 150,
          ctime: "1706745600", // 2024-02-01
        },
        category_name: "后端",
      },
      {
        article_info: {
          title: "Old Article",
          article_id: "1234567893",
          digg_count: 300,
          ctime: "1704067200", // 2024-01-01
        },
        category_name: "前端",
      },
    ];

    const targetDate = "2024-02";
    const result = formatArticleData(mockJsonData, targetDate);

    // Expected output
    const expectedOutput = {
      前端: [
        {
          title: "Article 2",
          url: "https://juejin.cn/post/1234567891",
          diggCount: 200,
        },
        {
          title: "Article 1",
          url: "https://juejin.cn/post/1234567890",
          diggCount: 100,
        },
      ],
      后端: [
        {
          title: "Article 3",
          url: "https://juejin.cn/post/1234567892",
          diggCount: 150,
        },
      ],
    };

    // Assertions
    expect(result).toEqual(expectedOutput);

    // Additional specific assertions
    expect(Object.keys(result)).toHaveLength(2);
    expect(result["前端"]).toHaveLength(2);
    expect(result["后端"]).toHaveLength(1);

    // Verify sorting
    expect(result["前端"][0].diggCount).toBeGreaterThan(result["前端"][1].diggCount);
  });

  it("should handle empty input array", () => {
    const result = formatArticleData([], "2024-02");
    expect(result).toEqual({});
  });

  it("should filter out articles from different months", () => {
    const mockJsonData = [
      {
        article_info: {
          title: "Wrong Month Article",
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
