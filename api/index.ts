import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

const {
  AUTHORIZATION_TOKEN,
  GITHUB_USER,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  ACTIONS_EVENT_TYPE,
} = process.env;

export default async (request: NowRequest, response: NowResponse) => {
  const { authorization } = request.headers;

  if (authorization !== `Bearer ${AUTHORIZATION_TOKEN}`) {
    response.status(403).send('Authorization failed');
    return;
  }

  try {
    await axios.post(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPOSITORY}/dispatches`,
      {
        event_type: ACTIONS_EVENT_TYPE,
      },
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    response.status(200).send('success');
  } catch (error) {
    response.status(422).send(error);
  }
};
