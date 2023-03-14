import { MileStone } from "@src/githubApi/issue/consts";
import repoConfig from "@utils/repoConfig";

export const giteeMileStone = {
  [MileStone.base]: 184143, // 初级
  [MileStone.inProgress]: 184144, // 中级
  [MileStone.senior]: 184145, // 高级别
  [MileStone.master]: 184146, // 资深
};

const { owner, repo } = repoConfig.gitee.interviewRepo;
const { access_token } = repoConfig.gitee;

export { owner, repo, access_token };
