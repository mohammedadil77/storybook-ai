import { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAiInstance } from '../../helpers/getOpenAI';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Open AI secret key', process.env.OPEN_AI_SECRET_KEY);
  let openai = getOpenAiInstance();
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Say this is a test',
      max_tokens: 7,
      temperature: 0,
    });

    console.log('response', response.data);
    return res.status(200).send('Test');
  } catch (e) {
    return res.status(401).send(e);
  }
};
