import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" >
      <span className="inline-flex items-center justify-center h-20 w-full bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" width="42" height="48" fill="none"><path fill="url(#a)" d="M0 0h41.838v48H0z" />
<title>uSecret</title>
      </span>
    </Link>
  );
}