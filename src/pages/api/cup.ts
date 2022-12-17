// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface User {
  name: string
  email: string
  password: string
  passwordConfirm?: string
}

export interface UserRequest {
  status: string
  message: string
  data: Data
}

export interface Data {
  token: string
}

interface ErrorRequest {
  status: string
  message: string
}

const BASE_URL = 'http://api.cup2022.ir/api/v1'

export default function handler(req: NextApiRequest, res: NextApiResponse<UserRequest | ErrorRequest>) {
  const { email, name, password, passwordConfirm } = JSON.parse(req.body);
  console.log("🚀 ~ file: cup.ts ~ line 30 ~ body", { email, name, password, passwordConfirm })
  fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "marcilio",
      email: "emailqualquer@gmail.com",
      password: "12345678",
      passwordConfirm: "12345678"
    })
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(500).json({ status: 'error', message: error.message })
    });
}
