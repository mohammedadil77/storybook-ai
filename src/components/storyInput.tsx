import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { ButtonStyles, StoryTextFieldStyles } from '@styles';

interface IStoryInput {
  onStorySubmit?: (storyKeywords: string) => void;
}

const StoryInput: React.FC<IStoryInput> = (props) => {
  const { onStorySubmit } = props;
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
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={ButtonStyles} type="submit">
                  Generate Story
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default StoryInput;
