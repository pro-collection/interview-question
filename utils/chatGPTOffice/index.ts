// 使用官方 api

const { Configuration, OpenAIApi } = require("openai");
const config = require("../configToken.json");

const configuration = new Configuration({
  apiKey: config.openai_api_key,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "代理的方式有哪些？",
  });

  console.log(completion.data.choices[0].text);
};

main();

export {};
