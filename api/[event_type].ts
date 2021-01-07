import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

const {
  AUTHORIZATION_TOKEN,
  GITHUB_USER,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
} = process.env;

export default async (request: NowRequest, response: NowResponse) => {
  const { authorization } = request.headers;
  const { event_type } = request.query;

  if (authorization !== `Bearer ${AUTHORIZATION_TOKEN}`) {
    response.status(403).send('Authorization failed');
    return;
  }

  if (!event_type) {
    response.status(400).send('event_type is not defined');
    return;
  }

  try {
    await axios.post(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPOSITORY}/dispatches`,
      {
        event_type,
      },
      {
        headers: {
          accept: 'application/vnd.github.v3+json',
          authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    response.status(200).send({
      target: `${GITHUB_USER}/${GITHUB_REPOSITORY}`,
      event_type,
    });
  } catch (error) {
    response.status(422).send(error);
  }
};
