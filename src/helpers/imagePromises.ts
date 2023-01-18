import axios from 'axios';

export const getImages = (stories: any) => {
  let storyCalls = [];
  for (let i = 0; i < stories.length; i++) {
    let calls = axios({
      method: 'post',
      url: '/api/generateImage',
      data: {
        prompt: stories[i],
        no_of_images: 1,
        size: '1024x1024',
      },
    });
    storyCalls.push(calls);
  }
  return storyCalls;
};
