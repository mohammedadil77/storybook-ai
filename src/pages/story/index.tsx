import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StoryViewer, UserInput } from '../../components';
import { StoryImages } from '../../components/story_images';
import { StoryText, StoryInput } from '@components';
import { generateStoryFromText } from '../../services/story.service';
import { useStoryGenerator } from '../../hooks';

const Home = () => {
  const [storyValue, setStoryValue] = useState<string>('');

  const generatedStory = useStoryGenerator({ prompt: storyValue });
  const handleRegenerateStory = () => {
    let tempStory = JSON.stringify(storyValue);
    setStoryValue('');
    setStoryValue(tempStory);
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
      <Box sx={{ textAlign: 'center', width: '900px' }}>
        <Typography variant="h2">Storybook AI</Typography>
        {/* <UserInput
          storyValue={storyValue}
          onStoryChange={(updatedValue) => setStoryValue(updatedValue)}
        /> */}
        <Box sx={{ mt: 5 }}>
          <StoryInput
            onStorySubmit={setStoryValue}
            isLoading={generatedStory.isGenerating}
          />
        </Box>

        {/* <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => createStory()}
          endIcon={isLoading && <CircularProgress size={25} />}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Story'}
        </Button> */}

        <Box sx={{ mt: 5 }}>
          {/* <StoryText storyData={generatedStory} /> */}
          <StoryViewer
            story={generatedStory.story}
            onCancel={() => {
              setStoryValue('');
            }}
            onRegenerateStory={handleRegenerateStory}
          />
          {generatedStory && <StoryImages storyResult={generatedStory.story} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
