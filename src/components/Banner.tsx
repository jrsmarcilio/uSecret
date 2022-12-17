import getConfig from 'next/config';
import { useEffect, useState } from "react";

import { apiUnsplash } from "../services/api";
import Toast, { ToastProps } from "./Toast";
import Image from 'next/image';
import Loading from './Loading';

type BannerProps = {
  title?: string;
  urlImage?: string;
  gradient?: string;
}

interface BannerUnsplash {
  url: string
  alt: string
  height: number
  width: number
}

export default function Banner({ gradient, title, urlImage }: BannerProps) {
  const [banner, setBanner] = useState<BannerUnsplash>({ url: '', alt: '', height: 0, width: 0 });
  const querys = ['key-secret', 'security', 'vault']
  const [query, setQuery] = useState<string>(querys[Math.floor(Math.random() * querys.length)]);
  const [toast, setToast] = useState<ToastProps>({
    handleClose: () => setToast({ ...toast, open: false }),
    message: "",
    open: false,
    severity: "success"
  });

  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  useEffect(() => {
    // random query string
    function fetchUnsplashAPI() {
      apiUnsplash.get(`/photos/random?query=${query}&client_id=mFY51AEfO4auSowiPKHKluHhYeA1IE5MBCf7EDfKONA`)
        .then((response: any) => {
          setBanner({
            url: response.data.urls.regular,
            alt: response.data.alt_description,
            height: response.data.height,
            width: response.data.width
          });
        }
        ).catch(error => setToast({ ...toast, message: error.message, open: true, severity: "error" }));
    }
    fetchUnsplashAPI();
  }, [])


  return (
    <div className="h-screen w-screen bg-gradient-to-b from-indigo-500 via-transparent to-indigo-900">
      {
        banner.url ?
          <div className="w-full h-full z-10 opacity-40">
            <Image
              src={banner.url}
              alt={banner.alt}
              
              width={banner.width}
              height={banner.height}
              className="object-cover h-screen w-auto hover:object-scale-down bg-cover bg-center bg-no-repeat"
            />
          </div>
          : <div className="w-full h-full flex items-center justify-center"><Loading /></div>
      }
      <Toast {...toast} />
    </div>
  );
}