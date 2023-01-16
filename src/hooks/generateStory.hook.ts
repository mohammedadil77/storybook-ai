import { AxiosResponse } from 'axios';
import { CreateCompletionResponse } from 'openai';
import React, { useEffect, useState } from 'react';
import { getOpenAiInstance } from '../helpers/getOpenAI';

interface IStoryGenerator {
  prompt: string;
}

const useStoryGenerator = (props: IStoryGenerator): string => {
  const { prompt } = props;
  const [story, setStory] = useState<string>('');
  const openAi = getOpenAiInstance();

  const generateUserStory = async () => {
    try {
      if (!prompt?.length) return story;
      const storyGenerated = (await openAi.createCompletion({
        model: 'text-davinci-002',
        prompt,
        max_tokens: 1000,
      })) as AxiosResponse<CreateCompletionResponse, any>;
      setStory(storyGenerated?.data?.choices[0]?.text || '');
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    generateUserStory();
  }, [prompt]);
  return story;
};

export default useStoryGenerator;
