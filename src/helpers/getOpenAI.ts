import { Configuration, OpenAIApi } from 'openai';

export const getOpenAiInstance = () => {
  const configuration = new Configuration({
    apiKey:
      process.env.OPEN_AI_SECRET_KEY ||
      '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',
  });
  const openai = new OpenAIApi(configuration);
  return openai;
};
