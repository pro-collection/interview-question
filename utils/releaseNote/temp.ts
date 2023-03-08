import dayjs from "dayjs";
import { getDataIssue } from "./request";
import { map, forEach, isEmpty, join, reduce, sortBy } from "lodash";


// console.log("yanle - logger: dayjs().format(\"YYYY-MM-DDTHH:MM:SSZ\")", dayjs().format());

const temp = {
  url: "https://api.github.com/repos/pro-collection/interview-question/issues/3",
  repository_url: "https://api.github.com/repos/pro-collection/interview-question",
  labels_url: "https://api.github.com/repos/pro-collection/interview-question/issues/3/labels{/name}",
  comments_url: "https://api.github.com/repos/pro-collection/interview-question/issues/3/comments",
  events_url: "https://api.github.com/repos/pro-collection/interview-question/issues/3/events",
  html_url: "https://github.com/pro-collection/interview-question/issues/3",
  id: 1611649701,
  node_id: "I_kwDOJGDC6c5gD9Kl",
  number: 3,
  title: "ES6 Generator 了解多少？",
  user: {
    login: "yanlele",
    id: 22188674,
    node_id: "MDQ6VXNlcjIyMTg4Njc0",
    avatar_url: "https://avatars.githubusercontent.com/u/22188674?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/yanlele",
    html_url: "https://github.com/yanlele",
    followers_url: "https://api.github.com/users/yanlele/followers",
    following_url: "https://api.github.com/users/yanlele/following{/other_user}",
    gists_url: "https://api.github.com/users/yanlele/gists{/gist_id}",
    starred_url: "https://api.github.com/users/yanlele/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/yanlele/subscriptions",
    organizations_url: "https://api.github.com/users/yanlele/orgs",
    repos_url: "https://api.github.com/users/yanlele/repos",
    events_url: "https://api.github.com/users/yanlele/events{/privacy}",
    received_events_url: "https://api.github.com/users/yanlele/received_events",
    type: "User",
    site_admin: false,
  },
  labels: [
    {
      id: 5232521368,
      node_id: "LA_kwDOJGDC6c8AAAABN-HwmA",
      url: "https://api.github.com/repos/pro-collection/interview-question/labels/JavaScript",
      name: "JavaScript",
      color: "A4D8FB",
      default: false,
      description: "JavaScript 语法部分",
    },
  ],
  state: "open",
  locked: false,
  assignee: null,
  assignees: [],
  milestone: {
    url: "https://api.github.com/repos/pro-collection/interview-question/milestones/2",
    html_url: "https://github.com/pro-collection/interview-question/milestone/2",
    labels_url: "https://api.github.com/repos/pro-collection/interview-question/milestones/2/labels",
    id: 9124545,
    node_id: "MI_kwDOJGDC6c4AizrB",
    number: 2,
    title: "中",
    description: "中级程序面试问题",
    creator: {
      login: "yanlele",
      id: 22188674,
      node_id: "MDQ6VXNlcjIyMTg4Njc0",
      avatar_url: "https://avatars.githubusercontent.com/u/22188674?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/yanlele",
      html_url: "https://github.com/yanlele",
      followers_url: "https://api.github.com/users/yanlele/followers",
      following_url: "https://api.github.com/users/yanlele/following{/other_user}",
      gists_url: "https://api.github.com/users/yanlele/gists{/gist_id}",
      starred_url: "https://api.github.com/users/yanlele/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/yanlele/subscriptions",
      organizations_url: "https://api.github.com/users/yanlele/orgs",
      repos_url: "https://api.github.com/users/yanlele/repos",
      events_url: "https://api.github.com/users/yanlele/events{/privacy}",
      received_events_url: "https://api.github.com/users/yanlele/received_events",
      type: "User",
      site_admin: false,
    },
    open_issues: 23,
    closed_issues: 0,
    state: "open",
    created_at: "2023-03-06T15:00:15Z",
    updated_at: "2023-03-06T15:20:54Z",
    due_on: null,
    closed_at: null,
  },
  comments: 0,
  created_at: "2023-03-06T15:19:21Z",
  updated_at: "2023-03-06T15:19:22Z",
  closed_at: null,
  author_association: "MEMBER",
  active_lock_reason: null,
  body: "",
  reactions: {
    url: "https://api.github.com/repos/pro-collection/interview-question/issues/3/reactions",
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
  timeline_url: "https://api.github.com/repos/pro-collection/interview-question/issues/3/timeline",
  performed_via_github_app: null,
  state_reason: null,
};


const tempRun = async () => {
  const res = await getDataIssue();
  const list = map(res.data, item => {
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
# 2023-03-08 更新内容

${isEmpty(base) ? "" : "## 初级开发者相关问题"}
${reduceToString(base)}


${isEmpty(inProgress) ? "" : "## 中级开发者相关问题"}
${reduceToString(inProgress)}


${isEmpty(senior) ? "" : "## 高级开发者相关问题"}
${reduceToString(senior)}


${isEmpty(master) ? "" : "## 资深开发者相关问题"}
${reduceToString(master)}
`;

  console.log("yanle - logger: content", content);
};

tempRun();
