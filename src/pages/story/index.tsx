import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { UserInput } from '../../components';
import { StoryImages } from '../../components/story_images';
import { StoryText } from '../../components/story_text';
import { generateStoryFromText } from '../../services/story.service';

const Home = () => {
  const [storyValue, setStoryValue] = useState<string>('A Story on ');
  const [storyResult, setStoryResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createStory = async () => {
    setIsLoading(true);
    let story = await generateStoryFromText(storyValue);
    console.log('Story ****', story?.choices[0]?.text);
    setStoryResult(story?.choices[0]?.text);
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        p: 2,
        maxWidth: '1700px',
      }}
    >
      <Box sx={{ textAlign: 'center', width: '600px' }}>
        <Typography variant="h2">Storybook AI</Typography>
        <UserInput
          storyValue={storyValue}
          onStoryChange={(updatedValue) => setStoryValue(updatedValue)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => createStory()}
          endIcon={isLoading && <CircularProgress size={25} />}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Story'}
        </Button>

        <Box sx={{ mt: 5 }}>
          <StoryText storyData={storyResult} />
          {storyResult && <StoryImages storyResult={storyResult} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
