// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid';

type SignIn = {
  email: string;
  password: string;
}

const users: SignIn = {
  email: "jrsmarcilio@usecret.com",
  password: "123456"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token?: string, message?: string }>
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email !== users.email || password !== users.password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = v4();
    res.status(200).json({ token });
  }
}
