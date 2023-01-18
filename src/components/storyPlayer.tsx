/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close';
import { Box, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

interface IStoryPlayer {
  startStory?: boolean;
  onClose?: () => void;
  storyImages?: string[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const StoryPlayer: React.FC<IStoryPlayer> = (props) => {
  let { startStory = false, onClose, storyImages = [] } = props;

  const [bookMode, setBookMode] = useState(false);

  const ImageSlideShow = ({ fadeImages }: any) => {
    return (
      <div className="slide-container">
        <Fade canSwipe={true} pauseOnHover={true} duration={5000}>
          {fadeImages?.map(
            (
              imageData: {
                prompt: string;
                url: string | undefined;
              },
              i: React.Key | number,
            ) => {
              return (
                <div
                  className="each-fade"
                  key={i}
                  style={{ marginTop: '20px' }}
                >
                  <img src={imageData?.url} alt="StoryImage" />
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 700, mt: '100px' }}
                  >
                    {`"${imageData?.prompt}" `}
                  </Typography>
                </div>
              );
            },
          )}
        </Fade>
      </div>
    );
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={startStory}
        onClose={() => {}}
        TransitionComponent={Transition}
        keepMounted
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => onClose && onClose()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Story Player
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setBookMode(!bookMode)}
            >
              Enter Video Mode
            </Button>

            <Tooltip title="Play Story Music">
              <IconButton>
                <VolumeUpIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2, m: 2, textAlign: 'center' }}>
          <ImageSlideShow fadeImages={storyImages} />
        </Box>
      </Dialog>
    </div>
  );
};
