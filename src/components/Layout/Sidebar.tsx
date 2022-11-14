import { MutableRefObject, useRef } from 'react';

import OutsideClick from '../../utils/outsideClick';
import Logo from './Sidebar/Logo';
import Nav from './Sidebar/Nav';
import SettingButton from './Sidebar/SettingButton';

interface SidebarProps {
	mobileNavSidebar?: boolean;
}

export default function Sidebar({ mobileNavSidebar }: SidebarProps) {
	const sidebarRef = useRef() as MutableRefObject<HTMLButtonElement>;
	const sidebarOutsideClick = OutsideClick(sidebarRef);
	return (
		<aside className={`${mobileNavSidebar ? 'block' : 'hidden'} sm:flex sm:flex-col z-50`} ref={sidebarRef}>
			<Logo />
			<div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
				<Nav sidebarOutsideClick={sidebarOutsideClick} />
				<SettingButton />
			</div>
		</aside>
	);
};