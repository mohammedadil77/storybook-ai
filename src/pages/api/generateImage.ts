import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAiInstance } from '../../helpers/getOpenAI';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Open AI secret key', process.env.OPEN_AI_SECRET_KEY);

  let openai = getOpenAiInstance();
  try {
    const response = await openai.createImage({
      prompt: 'A cute baby sea otter',
      n: 2,
      size: '1024x1024',
    });
    console.log('image response', response.data);
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  } catch (e) {
    return res.status(401).send(e);
  }
};
