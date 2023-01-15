import { Grow, Slide } from '@mui/material';
import React from 'react';

export const WithTransition = ({
  children,
  type = 'grow',
  direction = 'up',
}: any) => {
  if (type === 'slide') {
    return (
      <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
        {children}
      </Slide>
    );
  }
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }}>
      {children}
    </Grow>
  );
};
