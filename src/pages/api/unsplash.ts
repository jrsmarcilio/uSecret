// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { ImageRoot } from '@/interfaces/unsplash.interface'

const API_UNSPLASH = process.env.UNSPLASH_API;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageRoot>
) {
  const wallpapers = await axios.get(`${API_UNSPLASH}/collections/eNxz0j6U1SA/photos?client_id=${UNSPLASH_ACCESS_KEY}`);
  const randomWallpaper: ImageRoot = wallpapers.data[Math.floor(Math.random() * wallpapers.data.length)];
  res.status(200).json(randomWallpaper);
}
