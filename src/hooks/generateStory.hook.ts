import { AxiosResponse } from 'axios';
import { CreateCompletionResponse } from 'openai';
import React, { useEffect, useState } from 'react';
import { getOpenAiInstance } from '../helpers/getOpenAI';
import { generateStoryFromText } from '@services';

interface IStoryGenerator {
  prompt: string;
}

const useStoryGenerator = (
  props: IStoryGenerator,
): { story: string; isGenerating: boolean } => {
  const { prompt } = props;
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateUserStory = async () => {
    try {
      if (!prompt?.length) return story;
      setIsLoading(true);
      const openAi = getOpenAiInstance();
      const storyGenerated = (await generateStoryFromText(
        `A story about ${prompt}`,
      )) as CreateCompletionResponse;
      setStory(storyGenerated?.choices[0]?.text || '');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };
  useEffect(() => {
    setStory('');
    generateUserStory();
  }, [prompt]);
  return { story, isGenerating: isLoading };
};

export default useStoryGenerator;
