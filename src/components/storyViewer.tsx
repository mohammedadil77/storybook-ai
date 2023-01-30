import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import {
  cancelStoryContainerStyles,
  regenerateStoryContainerStyles,
  storyBodyStyles,
  storyViewerContainerStyles,
  storyViewerHeaderStyles,
} from '@styles';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useStoryAudio } from '@hooks';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';

interface IStoryViewer {
  story: string;
  onCancel?: () => void;
  onRegenerateStory?: () => void;
}

const StoryViewer: React.FC<IStoryViewer> = (props) => {
  const { story } = props;
  const [startAudio, setStartAudio] = useState<boolean>(false);
  story?.replaceAll('\n', '.');

  const handleSpeechEnd = () => setStartAudio(false);

  useStoryAudio({ story, start: startAudio, onEnd: handleSpeechEnd });

  if (!story?.length) return <></>;
  return (
    <Box sx={storyViewerContainerStyles}>
      <Box id="storyviewer-header" sx={storyViewerHeaderStyles}>
        <Tooltip
          title={startAudio ? 'Stop story audio' : 'Listen to story'}
          arrow
        >
          <IconButton
            onClick={() => {
              setStartAudio((prev) => !prev);
            }}
          >
            {startAudio ? (
              <VoiceOverOffIcon sx={{ color: '#FFF', fontSize: '18px' }} />
            ) : (
              <RecordVoiceOverIcon sx={{ color: '#FFF', fontSize: '18px' }} />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title={'Regenerate story'} arrow>
          <IconButton
            sx={regenerateStoryContainerStyles}
            onClick={props.onRegenerateStory}
          >
            <RestartAltIcon sx={{ color: '#FFF', fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Cancel'} arrow>
          <IconButton sx={cancelStoryContainerStyles} onClick={props.onCancel}>
            <CloseIcon sx={{ color: '#FFF', fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={storyBodyStyles}>
        <Typography variant="h6" sx={{ color: '#000', fontSize: '17px' }}>
          <Typewriter
            words={[story]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={30}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default StoryViewer;
