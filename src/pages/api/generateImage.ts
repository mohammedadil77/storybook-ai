import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAiInstance } from '../../helpers/getOpenAI';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let openai = getOpenAiInstance();
  try {
    const response = await openai.createImage({
      prompt: req?.body?.prompt || 'A cute baby sea otter',
      n: req?.body?.no_of_images || 2,
      size: '1024x1024',
    });
    res.status(200).send(response.data);
    return;
  } catch (e) {
    return res.status(401).send(e);
  }
};
