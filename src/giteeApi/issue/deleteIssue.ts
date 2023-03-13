import { apiUrl, giteeApiUrl } from "@utils/apiUrl";
import { giteeApi } from "@utils/requestKit";
import repoConfig from "@utils/repoConfig";

const { owner, repo } = repoConfig.gitee.interviewRepo;
const { access_token } = repoConfig.gitee;

const deleteIssue = async () => {
  const formData = new FormData();
  formData.append("_method", "delete");
  formData.append("authenticity_token", "sjMlSpbWj3/JuLm1fSAEYE8iU3DTB4lr5M/Rus+VYFwMbFHokhVpHbFV4cteAE2j65Gr+Kvyrk+4Abai6bat3g==");
  formData.append("access_token", access_token);

  const res = await giteeApi.post(giteeApiUrl.deleteIssue("I6MS96"), formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("yanle - logger: res", res.status);
};

deleteIssue();

export {};
