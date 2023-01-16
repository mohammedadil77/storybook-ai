import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { WithTransition } from '../hoc/withTransition';

const StoryText = ({ storyData = 'No Story yet!' }) => {
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #FFFFFF',
        height: storyData ? '100%' : '400px',
      }}
    >
      <WithTransition>
        <Typography variant="subtitle2">{storyData}</Typography>
      </WithTransition>
    </Box>
  );
};

export default StoryText;
