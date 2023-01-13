import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface IUserInput {
  storyValue: string;
  onStoryChange: (story: string) => void;
}

export default function UserInput({ storyValue, onStoryChange }: IUserInput) {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 10 }}>
      <TextField
        id="outlined-basic"
        label="Enter prompt"
        variant="outlined"
        fullWidth
        helperText={'ex : A story on boy running up a hill'}
        onChange={(e) => {
          onStoryChange(e.target.value);
        }}
        value={storyValue}
      />
    </Box>
  );
}
