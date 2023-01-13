import axios from 'axios';

export const generateStoryFromText = async (text: string) => {
  try {
    const storyResponse = await axios.post('/api/generateStory', {
      story: text,
    });
    return storyResponse.data;
  } catch (err) {
    console.log('Something went wrong', err);
    return err;
  }
};

export const generateImages = async (text: string) => {
  try {
    const storyImageResponse = await axios.post('/api/generateImage', {
      prompt: text.trim(),
      no_of_images: 3,
    });
    return storyImageResponse.data;
  } catch (err) {
    console.log('Something went wrong', err);
    return err;
  }
};
