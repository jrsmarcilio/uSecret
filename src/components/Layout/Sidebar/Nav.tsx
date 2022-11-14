import { useEffect, useState } from "react";

import AddModeratorIcon from '@mui/icons-material/AddModerator';
import EastIcon from '@mui/icons-material/East';
import KeyIcon from '@mui/icons-material/Key';
import PolicyIcon from '@mui/icons-material/Policy';
import WestIcon from '@mui/icons-material/West';

import NavItem from "./NavItem";

interface NavProps {
  sidebarOutsideClick?: boolean;
}

export default function Nav({ sidebarOutsideClick }: NavProps) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => setSidebarStatus(false);
  const sidebarOpen = () => setSidebarStatus(true);
  const subMenuToggle = () => setSubMenuToggleStatus(!subMenuToggleStatus);

  const childMenu = [
    {
      subMenuTitle: "child One",
      linkHref: "/"
    },
    {
      subMenuTitle: "child Two",
      linkHref: "/"
    },
    {
      subMenuTitle: "child Three",
      linkHref: "/"
    }
  ];

  useEffect(() => {
    if (sidebarOutsideClick) setSidebarStatus(false);
  }, [sidebarOutsideClick]);

  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
          {sidebarStatus ? (
            <WestIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarClose}
            />
          ) : (
            <EastIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarOpen}
            />
          )}
        </div>

        <NavItem
          hrefLink='/category'
          sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
        >
          <KeyIcon className="h-10" />
        </NavItem>

        <NavItem
          hrefLink='/sub-category'
          sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
        >
          <AddModeratorIcon className="h-10" />
        </NavItem>

        <NavItem
          hrefLink='#'
          sidebarStatus={sidebarStatus}
          menuTitle="Chiled Menu"
          subMenu={true}
          subMenuArray={childMenu}
        >
          <PolicyIcon className="h-10" />
        </NavItem>

      </nav>
    </>
  );
};
