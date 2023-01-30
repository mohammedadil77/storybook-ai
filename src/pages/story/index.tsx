import { StoryInput } from '@components';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { StoryViewer } from '../../components';
import { StoryPlayer } from '../../components/storyPlayer';
import { getImages } from '../../helpers/imagePromises';
import { useStoryGenerator } from '../../hooks';

const Home = () => {
  const [storyValue, setStoryValue] = useState<string>('');
  const [storyImages, setStoryImages] = useState<string[]>([]);
  const [openStoryPlayer, setOpenStoryPlayer] = useState<boolean>(false);
  const [isStoryImagesGenerating, setIsStoryImagesGenerating] =
    useState<boolean>(false);

  const generatedStory = useStoryGenerator({ prompt: storyValue });
  const handleRegenerateStory = () => {
    let tempStory = JSON.stringify(storyValue);
    setStoryValue('');
    setStoryValue(tempStory);
  };

  const generateImagesFromStory = async (storyData: any) => {
    setIsStoryImagesGenerating(true);
    let storySentences = storyData?.replace(/(\r\n|\n|\r)/gm, '')?.split('.');
    if (!storySentences.length) {
      return;
    }
    let imageResponses: any = await axios.all(await getImages(storySentences));
    let storyPictures = imageResponses?.map((story: any) => {
      return {
        url: story?.data?.data?.data[0]?.url,
        prompt: story.data?.prompt,
      };
    });
    setStoryImages(storyPictures);
    setIsStoryImagesGenerating(false);
    setOpenStoryPlayer(!openStoryPlayer);
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
      {openStoryPlayer && storyImages?.length && (
        <StoryPlayer
          startStory={openStoryPlayer}
          onClose={() => setOpenStoryPlayer(false)}
          storyImages={storyImages}
          story={generatedStory.story}
        />
      )}
      <Box sx={{ textAlign: 'center', width: '900px' }}>
        <Typography variant="h2">Storybook AI</Typography>

        <Box sx={{ mt: 5 }}>
          <StoryInput
            onStorySubmit={setStoryValue}
            isLoading={generatedStory.isGenerating}
          />
        </Box>

        <Box sx={{ mt: 5 }}>
          <StoryViewer
            story={generatedStory.story}
            onCancel={() => {
              setStoryValue('');
            }}
            onRegenerateStory={handleRegenerateStory}
          />

          {generatedStory?.story?.length > 1 && (
            <Box sx={{ mt: 5 }}>
              <Button
                onClick={async () => {
                  generateImagesFromStory(generatedStory.story);
                }}
                endIcon={
                  isStoryImagesGenerating && <CircularProgress size={25} />
                }
              >
                {isStoryImagesGenerating
                  ? 'Generating Story visuals'
                  : 'Start Story Player'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
