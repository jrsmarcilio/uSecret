// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { ImageRoot } from '@/interfaces/unsplash.interface'

const API_UNSPLASH = 'https://api.unsplash.com/collections/eNxz0j6U1SA/photos';
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
console.log("🚀 ~ file: api.ts:5 ~ UNSPLASH_ACCESS_KEY", UNSPLASH_ACCESS_KEY)
const UNSPLASH_SECRET_KEY = process.env.UNSPLASH_SECRET_KEY;
console.log("🚀 ~ file: api.ts:7 ~ UNSPLASH_SECRET_KEY", UNSPLASH_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageRoot>
) {
  const wallpapers = await axios.get(`${API_UNSPLASH}?client_id=${UNSPLASH_ACCESS_KEY}`);
  const randomWallpaper: ImageRoot = wallpapers.data[Math.floor(Math.random() * wallpapers.data.length)];
  res.status(200).json(randomWallpaper);
}
