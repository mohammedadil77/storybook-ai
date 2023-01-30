import React, { useEffect, useState } from 'react';

interface StoryAudioProps {
  story?: string;
  start?: boolean;
  onEnd?: () => void;
}

const useStoryAudio = (props: StoryAudioProps) => {
  const { story = '', start = true, onEnd } = props;

  const endSpeech = () => speechSynthesis?.cancel();

  useEffect(() => {
    if (speechSynthesis?.speaking) endSpeech();
    if (!start || !story.length) return endSpeech();
    initiateSpeech(story);
    return () => endSpeech();
  }, [start, story]);

  function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }

  function initiateSpeech(text: string) {
    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking) return;
      let speakData = new SpeechSynthesisUtterance(text);
      speakData.onend = () => onEnd?.();
      speakData.volume = 1; // From 0 to 1
      speakData.rate = 1; // From 0.1 to 10
      speakData.pitch = 2; // From 0 to 2
      speakData.lang = 'en';
      speakData.voice = getVoices()[1];
      speechSynthesis.speak(speakData);
    } else {
      console.log('Audio is not available');
    }
  }
};

export default useStoryAudio;
