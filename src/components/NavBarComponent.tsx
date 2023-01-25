import { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import Image from "next/image";

export default function NavBarComponent() {
  const router = useRouter();
  const [activeHref, setActiveHref] = useState<string>(router.pathname);

  const handleStyle = (href: string) => {
    if (activeHref === href) return 'block mt-4 lg:inline-block lg:mt-0 font-bold text-white';
    return "block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white";
  };

  useEffect(() => {
    setActiveHref(router.pathname);
  }, [router.pathname]);
  

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image className="fill-current h-8 w-8 mr-2" width="54" height="54" src="logo-usecret.png" alt="uSecret Logo" />
        <span className="font-semibold text-xl tracking-tight">
          uSecret
        </span>
      </div>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="#responsive-header" className={`mr-4 ${handleStyle('/home')}`}>Home</Link>
          <Link href="/vault" className={`mr-4 ${handleStyle('/vault')}`}>Vault</Link>
          <Link href="#responsive-header" className={`${handleStyle('/tools')}`}>Tools</Link>
        </div>
        <div>
          <Link
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
          >
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}