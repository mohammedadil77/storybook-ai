import { generateStoryFromText } from '@services';
import { CreateCompletionResponse } from 'openai';
import { useEffect, useState } from 'react';

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
