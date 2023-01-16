import { Box, Typography } from '@mui/material';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { storyViewerContainerStyles } from '@styles';

interface IStoryViewer {
  story: string;
}

const StoryViewer: React.FC<IStoryViewer> = (props) => {
  const { story } = props;
  if (!story?.length) return <></>;
  story?.replaceAll('\n', '.');
  return (
    <Box sx={storyViewerContainerStyles}>
      <Typography variant="h6" sx={{ color: '#000', fontSize: '17px' }}>
        <Typewriter
          words={[story]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={30}
          deleteSpeed={0}
          delaySpeed={1000}
          //   onLoopDone={handleDone}
          //   onType={handleType}
        />
      </Typography>
    </Box>
  );
};

export default StoryViewer;
