import { forEach, isEmpty, join, map, reduce, sortBy } from "lodash";

export function base64ToString(b64: string) {
  return Buffer.from(b64, "base64").toString();
}

export function stringToBase64(str: string) {
  return Buffer.from(str).toString("base64");
}

/**
 * 获取 创建 release note 的 文本 body
 * @param issueList
 * @param date
 */
export const getReleaseNoteBody = (issueList: any[], date: string) => {
  const list = map(issueList, item => {
    return {
      title: item.title,
      url: item.html_url,
      labels: map(item.labels, label => label.name),
      level: item.milestone.title,
      number: item.number,
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
${item.number}.${item.title}【${join(item.labels, "、")}】
回答连接：${item.url}   
    `;
  });

  const reduceToString = (list: any[]) => reduce(itemTitle(sortBy(list, "number")), (prev, current) => prev + current);

  // 需要将 list 写成一个 markdown
  const content =
    `
# ${date} 更新内容

${isEmpty(base) ? "" : "## 初级开发者相关问题"}
${reduceToString(base)}


${isEmpty(inProgress) ? "" : "## 中级开发者相关问题"}
${reduceToString(inProgress)}


${isEmpty(senior) ? "" : "## 高级开发者相关问题"}
${reduceToString(senior)}


${isEmpty(master) ? "" : "## 资深开发者相关问题"}
${reduceToString(master)}
`;

  return content;
}
