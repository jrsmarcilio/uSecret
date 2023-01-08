import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
	sidebarStatus: boolean;
	menuTitle: string;
	subMenu: boolean;
	subMenuArray?: SubMenuProps[];
	hrefLink: string;
	children: any;
}

interface SubMenuProps {
	subMenuTitle: string;
	linkHref: string;
}

export default function NavItem({ sidebarStatus, menuTitle, subMenu, subMenuArray, hrefLink, children }: NavItemProps) {
	const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);
	const subMenuToggle = () => setSubMenuToggleStatus(!subMenuToggleStatus);

	useEffect(() => {
		if (!sidebarStatus) setSubMenuToggleStatus(false);
	}, [sidebarStatus]);

	return (
		<>
			<Link href={hrefLink}>
				<span className="w-full inline-flex items-center justify-between py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-3 cursor-pointer relative group" onClick={subMenuToggle}>
					{children}
					<span className={`${sidebarStatus ? 'text-base ml-2' : 'sr-only'}`}>{menuTitle}</span>
					<span className={`${sidebarStatus ? 'hidden' : 'hidden group-hover:block'} w-full absolute left-0 -bottom-5 bg-yellow-500 text-white p-1 text-xs text-center`}>{menuTitle}</span>
				</span>
			</Link>
			{subMenu && (
				<ul className={`${subMenuToggleStatus ? '' : 'hidden'} text-white space-y-2 ml-7`}>
					{subMenuArray && subMenuArray.map((subMenu, index) => (
						<Link href={subMenu.linkHref} key={index}>
							<li className='cursor-pointer active:text-orange-400 hover:text-purple-500' key={index}>{subMenu.subMenuTitle}</li>
						</Link>
					))}
				</ul>
			)}
		</>
	);
}