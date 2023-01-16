import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { ButtonStyles, StoryTextFieldStyles } from '@styles';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
interface IStoryInput {
  onStorySubmit?: (storyKeywords: string) => void;
  isLoading?: boolean;
}

const CirularProgressTemplate = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={25}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
        thickness={4}
      />
    </Box>
  );
};

const StoryInput: React.FC<IStoryInput> = (props) => {
  const { onStorySubmit, isLoading } = props;
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const storyInput = (event.target as unknown as HTMLInputElement[])[0]
      ?.value;
    onStorySubmit?.(storyInput);
  };
  return (
    <Box display={'flex'} width="100%" textAlign={'center'}>
      <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Enter keywords for your story"
          sx={StoryTextFieldStyles}
          InputProps={{
            id: 'storyInput',
            endAdornment: isLoading ? (
              <CirularProgressTemplate />
            ) : (
              <InputAdornment position="end">
                <Button sx={ButtonStyles} type="submit">
                  Generate Story
                </Button>
              </InputAdornment>
            ),
            startAdornment: (
              <Typography
                variant="body1"
                sx={{ color: '#000', width: '176px' }}
              >
                A story about
              </Typography>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default StoryInput;
