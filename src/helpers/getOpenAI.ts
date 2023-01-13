import { Configuration, OpenAIApi } from 'openai';

export const getOpenAiInstance = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);
  return openai;
};
