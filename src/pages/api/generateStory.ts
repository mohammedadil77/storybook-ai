import { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAiInstance } from '../../helpers/getOpenAI';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let openai = getOpenAiInstance();
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req?.body?.story || 'Test Story',
      temperature: 0.6,
      max_tokens: 500,
      top_p: 1,
    });
    return res.status(200).send(response.data);
  } catch (e) {
    return res.status(401).send(e);
  }
};
