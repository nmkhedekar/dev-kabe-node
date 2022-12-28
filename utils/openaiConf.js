const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = { openai };