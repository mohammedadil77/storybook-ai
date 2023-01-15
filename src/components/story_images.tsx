/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button } from '@mui/material';
import { generateImages } from '../services/story.service';
import { useState } from 'react';

interface IStoryImages {
  storyResult: string;
}

export const StoryImages = ({ storyResult }: IStoryImages) => {
  const [imageResults, setImageResults] = useState<any>([]);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={async () => {
          let imageResponse = await generateImages(storyResult?.split('.')[0]);
          setImageResults(imageResponse?.data);
        }}
      >
        {' '}
        Generate visuals for Story
      </Button>

      <ImageList cols={3} sx={{ mt: 1 }}>
        {imageResults.map(
          (item: { url: any }, i: React.Key | null | undefined) => (
            <ImageListItem key={i}>
              <img
                src={item?.url}
                srcSet={item?.url}
                alt={'testImage'}
                loading="lazy"
              />
            </ImageListItem>
          ),
        )}
      </ImageList>
    </>
  );
};
