import path from "path";
import { getFrontendArticles } from "../utils";
import jsonData from "../../../../temp/juejin_interview/2025_02_03_10_29_51.json";

describe("getFrontendArticles 集成测试", () => {
  it("应该能正确读取并解析实际的JSON文件数据", () => {
    // 从文件名中提取日期
    const fileName = "2025_01";
    const [year, month] = fileName.split("_");
    const targetDate = `${year}-${month}`;

    // 获取前端文章
    const frontendArticles = getFrontendArticles(jsonData, targetDate);

    // 输出调试信息

    console.log(
      `[getFrontendArticles 集成测试 - 应该能正确读取并解析实际的JSON文件数据] | 获取到的前端文章数量: ${frontendArticles.length}`
    );

    // 基本验证
    expect(Array.isArray(frontendArticles)).toBe(true);
    expect(frontendArticles.length).toBeGreaterThan(0);

    // 验证数据结构
    frontendArticles.forEach((article) => {
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("url");
      expect(article).toHaveProperty("diggCount");
      expect(typeof article.title).toBe("string");
      expect(typeof article.url).toBe("string");
      expect(typeof article.diggCount).toBe("number");
      expect(article.url).toMatch(/^https:\/\/juejin\.cn\/post\//);
    });

    // 验证排序（点赞数降序）
    for (let i = 0; i < frontendArticles.length - 1; i++) {
      expect(frontendArticles[i].diggCount).toBeGreaterThanOrEqual(frontendArticles[i + 1].diggCount);
    }
  });

  it("应该能处理文件不存在的情况", () => {
    expect(() => {
      require("../../../../temp/juejin_interview/non_existent_file.json");
    }).toThrow();
  });
});
