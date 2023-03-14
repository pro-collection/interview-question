import { forEach, isEmpty, join, map, reduce, sortBy } from "lodash";

/**
 * 获取 创建 release note 的 文本 body
 * @param issueList
 * @param releaseName
 */
export const getReleaseNoteBody = (issueList: any[], releaseName: string) => {
  const list = map(issueList, item => {
    return {
      title: item.title,
      url: item.html_url,
      labels: map(item.labels, label => label.name),
      level: item.milestone.title,
      number: item.number,
      body: item.body,
    };
  });

  const base: any[] = [];
  const inProgress: any[] = [];
  const senior: any[] = [];
  const master: any[] = [];

  forEach(list, item => {
    switch (item.level) {
      case "初":
        base.push(item);
        break;
      case "中":
        inProgress.push(item);
        break;
      case "高":
        senior.push(item);
        break;
      case "资深":
        master.push(item);
        break;
      default:
        break;
    }
  });

  const itemTitle = (list: any[]) => map(list, item => {
    return `
## ${item.number}.${item.title}【${join(item.labels, "、")}】     
**回答**: 
${item.body}
           
`;
  });

  const reduceToString = (list: any[]) => reduce(itemTitle(sortBy(list, "number")), (prev, current) => prev + current, "");

  // 需要将 list 写成一个 markdown
  const content =
    `> ${releaseName}
获取更多面试问题可以访问
github 地址: https://github.com/pro-collection/interview-question/issues
gitee 地址: https://gitee.com/yanleweb/interview-question/issues

    
${isEmpty(base) ? "" : `# 初级开发者相关问题【共计 ${base.length} 道题】`}
${reduceToString(base)}


${isEmpty(inProgress) ? "" : `# 中级开发者相关问题【共计 ${inProgress.length} 道题】`}
${reduceToString(inProgress)}


${isEmpty(senior) ? "" : `# 高级开发者相关问题【共计 ${senior.length} 道题】`}
${reduceToString(senior)}


${isEmpty(master) ? "" : `# 资深开发者相关问题【共计 ${master.length} 道题】`}
${reduceToString(master)}
`;

  return content;
};
