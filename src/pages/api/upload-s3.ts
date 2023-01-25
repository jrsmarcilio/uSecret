// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type TUploadS3 = {
  url: string;
  fields: {
    key: string;
    policy: string;
    'x-amz-algorithm': string;
    'x-amz-credential': string;
    'x-amz-date': string;
    'x-amz-signature': string;
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  if (method === 'GET') {
    const { data } = await axios.get<TUploadS3>('http://localhost:3333/upload-s3');
    return response.status(200).json(data);
  } else if (method === 'POST') {
    const { url, fields } = request.body;
    const { data } = await axios.post(url, fields);
    return response.status(200).json(data);
  }
}
