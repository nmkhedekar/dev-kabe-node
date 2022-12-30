const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = { openai };