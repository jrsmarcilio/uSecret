import { Fragment, useEffect, useState } from "react";

import GroupIcon from '@mui/icons-material/Group';
import EastIcon from '@mui/icons-material/East';
import KeyIcon from '@mui/icons-material/Key';
import PolicyIcon from '@mui/icons-material/Policy';
import WestIcon from '@mui/icons-material/West';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

import NavItem from "./NavItem";
import { useAuth } from "@/context/auth";

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

  const { user } = useAuth();
  const [permission, setPermission] = useState<string>(user?.isAdmin ? 'admin' : 'user');

  useEffect(() => {
    if (sidebarOutsideClick) setSidebarStatus(false);
  }, [sidebarOutsideClick]);

  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
          {sidebarStatus ?
            (
              <WestIcon className="inline-block h-12 cursor-pointer" onClick={sidebarClose} />
            ) : (
              <EastIcon className="inline-block h-12 cursor-pointer" onClick={sidebarOpen} />
            )
          }
        </div>

        <NavItem hrefLink='/vault' sidebarStatus={sidebarStatus} menuTitle="Cofre" subMenu={false}>
          <ArticleIcon className="h-10" />
        </NavItem>

        {
          user?.isAdmin && (
            <Fragment>
              <NavItem hrefLink='/groups' sidebarStatus={sidebarStatus} menuTitle="Groups" subMenu={false}>
                <GroupIcon className="h-10" />
              </NavItem>

              <NavItem hrefLink='/users' sidebarStatus={sidebarStatus} menuTitle="Users" subMenu={false}>
                <PersonIcon className="h-10" />
              </NavItem>
            </Fragment>
          )
        }

        {/* <NavItem hrefLink='#' sidebarStatus={sidebarStatus} menuTitle="Chiled Menu" subMenu={true} subMenuArray={childMenu}>
          <PolicyIcon className="h-10" />
        </NavItem> */}
      </nav>
    </>
  );
};
