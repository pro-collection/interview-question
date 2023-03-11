// To use ESM in CommonJS, you can use a dynamic import
const importDynamic = new Function("modulePath", "return import(modulePath)");
const config = require("../../../utils/configToken.json");

const main = async () => {
  const { ChatGPTUnofficialProxyAPI } = await importDynamic("chatgpt");
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: config.chatGpt_access_token,
    apiReverseProxyUrl: "https://gpt.pawan.krd/backend-api/conversation",
    debug: true,
  });

  api.sendMessage("JS 实现 Promise", {
    timeoutMs: 6 * 60 * 1000,
    debug: true,
  })
    .then((res: any) => {
      console.log(res.text);
    });
};

main();

export {};

