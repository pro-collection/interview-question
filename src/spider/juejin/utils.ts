import path from "path";
import fs from "fs";

/**
 * 从文件名解析年月
 * @param fileName - 格式为 "YYYY_MM" 的文件名,如 "2024_12"
 * @returns 格式为 "YYYY-MM" 的日期字符串,如 "2024-12"
 * @example
 * parseYearMonthFromFileName("2024_12") // returns "2024-12"
 */
const parseYearMonthFromFileName = (fileName: string) => {
  // 将文件名按下划线分割成年和月
  const [year, month] = fileName.split("_");
  // 返回格式化的年月字符串
  return `${year}-${month}`;
};

/**
 * 将Unix时间戳转换为 YYYY-MM 格式的日期字符串
 * @param timestamp - Unix时间戳字符串
 * @returns 格式为 "YYYY-MM" 的日期字符串
 * @example
 * timestampToYearMonth("1703980800") // returns "2024-01"
 */
const timestampToYearMonth = (timestamp: string) => {
  // 将时间戳转换为Date对象
  const date = new Date(parseInt(timestamp) * 1000);
  // 返回格式化的年月字符串,月份补零
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

/**
 * 格式化文章数据,按分类整理并排序
 * @param jsonData - 原始文章数据数组
 * @param targetDate - 目标日期,格式为 "YYYY-MM"
 * @returns 按分类整理的文章数据对象
 */
const formatArticleData = (jsonData: any[], targetDate: string) => {
  // 创建一个对象来存储不同分类的文章
  const categoryArticles: Record<
    string,
    Array<{
      title: string; // 文章标题
      url: string; // 文章链接
      diggCount: number; // 点赞数
    }>
  > = {};

  // 遍历并处理每篇文章
  jsonData.forEach((item) => {
    const article = item.article_info;
    const categoryName = item.category_name;

    // 检查文章创建时间是否匹配目标月份
    const createTime = timestampToYearMonth(article.ctime);
    if (createTime !== targetDate) {
      return;
    }

    // 构建文章数据对象
    const articleData = {
      title: article.title,
      url: `https://juejin.cn/post/${article.article_id}`,
      diggCount: article.digg_count,
    };

    // 将文章添加到对应分类中
    if (!categoryArticles[categoryName]) {
      categoryArticles[categoryName] = [];
    }
    categoryArticles[categoryName].push(articleData);
  });

  // 对每个分类中的文章按点赞数降序排序
  Object.keys(categoryArticles).forEach((category) => {
    categoryArticles[category].sort((a, b) => b.diggCount - a.diggCount);
  });

  return categoryArticles;
};

/**
 * 生成Markdown格式的内容
 * @param categoryArticles - 按分类整理的文章数据对象
 * @returns Markdown格式的字符串
 */
const generateMarkdown = (categoryArticles: Record<string, Array<any>>) => {
  let markdown = "";

  // 遍历每个分类
  Object.entries(categoryArticles).forEach(([category, articles]) => {
    if (articles.length > 0) {
      // 添加分类标题
      markdown += `### ${category}\n`;
      // 添加该分类下的所有文章
      articles.forEach((article) => {
        markdown += `- \`点赞量: ${article.diggCount}\` - [${article.title}](${article.url})\n`;
      });
      markdown += "\n";
    }
  });

  return markdown;
};

/**
 * 主函数：处理数据并生成Markdown文件
 * @param jsonData - 原始文章数据数组
 * @param fileName - 输出文件名(不含扩展名),格式为 "YYYY_MM"
 */
export const handleDataParseMD = (jsonData: any[], fileName: string) => {
  // 从文件名解析目标日期
  const targetDate = parseYearMonthFromFileName(fileName);

  // 格式化文章数据
  const categoryArticles = formatArticleData(jsonData, targetDate);

  // 生成Markdown内容
  const markdownContent = generateMarkdown(categoryArticles);

  // 构建输出文件路径
  const filePath = path.join(process.cwd(), `temp/juejin_interview/${fileName}.md`);

  // 将内容写入文件
  fs.writeFile(filePath, markdownContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data written to file successfully.");
    }
  });
};

// 使用示例
// handleDataParseMD(jsonData, "2024_12");
