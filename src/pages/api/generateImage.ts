import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAiInstance } from '../../helpers/getOpenAI';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let openai = getOpenAiInstance();
  try {
    const response = await openai.createImage({
      prompt: req?.body?.prompt || 'Pikachu on snow',
      n: req?.body?.no_of_images || 1,
      size: '512x512',
    });

    let formattedResponse = {
      prompt: req?.body?.prompt || '',
      data: response.data,
    };
    res.status(200).send(formattedResponse);
    return;
  } catch (e) {
    return res.status(401).send(e);
  }
};
