import { useState, useEffect } from "react";
import axios from 'axios';
import { ImageRoot } from "@/interfaces/unsplash.interface";

export default function Banner() {
  const [background, setBackground] = useState<ImageRoot>();

  useEffect(() => {
    const fetchBackground = async () => {
      const background = await axios.get('/api/unsplash');
      setBackground(background.data);
    };
    if (!background) fetchBackground();
  });

  return (
    <div className="hidden lg:block w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background?.urls.full})` }}></div>
  );
}