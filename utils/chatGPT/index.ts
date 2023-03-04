// To use ESM in CommonJS, you can use a dynamic import
const importDynamic = new Function("modulePath", "return import(modulePath)");
const config = require("../configToken.json");

const main = async () => {
  const { ChatGPTUnofficialProxyAPI } = await importDynamic("chatgpt");
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: config.chatGpt_access_token,
    // apiReverseProxyUrl: 'http://127.0.0.1:1081/'
  });

  api.sendMessage("Hello World!!", {
    timeoutMs: 5 * 60 * 1000,
  })
    .then((res: any) => {
      console.log(res.text);
    });
};

main();

