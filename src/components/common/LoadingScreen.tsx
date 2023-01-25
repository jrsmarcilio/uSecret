import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/logo-usecret.png" width={30} height={30} alt="brand uSecret" className='absolute' />
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}