import { MutableRefObject, useEffect, useRef, useState } from "react";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OutsideClick from '../../../utils/outsideClick';

export default function UserMenu() {
  const [userMenuStatus, setUserMenuStatus] = useState<boolean>(false);
  const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const buttonOutsideClick = OutsideClick(buttonRef);

  const userMenuHandle = () => (!userMenuStatus);

  useEffect(() => {
    if (buttonOutsideClick) setUserMenuStatus(false);
  }, [buttonOutsideClick]);

  return (
    <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg relative" onClick={userMenuHandle} ref={buttonRef}>
      <span className="sr-only">User Menu</span>
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
        <span className="font-semibold">Daenerys Targaryen</span>
        <span className="text-sm text-gray-600">Suport</span>
      </div>
      <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="user profile photo"
          className="h-full w-full object-cover"
        />
      </span>
      {userMenuStatus &&
        <div className='absolute right-0 sm:-bottom-16 bg-slate-500 px-2 py-1 space-x-2 text-yellow-50 w-full -bottom-28'>
          <a className='block hover:bg-gray-50 hover:text-black'>user Profile</a>
          <a className='block hover:bg-gray-50 hover:text-black'>user setting</a>
        </div>
      }
      {userMenuStatus ?
        <ExpandMoreIcon className="hidden sm:block h-6 w-6 text-gray-300" /> :
        <ExpandLessIcon className="hidden sm:block h-6 w-6 text-gray-300" />
      }
    </button>
  );
};
