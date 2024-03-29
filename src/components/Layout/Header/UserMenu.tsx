import Image from 'next/image';
import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '@/context/auth';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { user, isAuthenticated, logout: handleLogout } = useAuth();

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);


  return (
    <div>
      <Button
        className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg relative"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
          <span className="font-semibold">{user?.name}</span>
          <span className="text-sm text-gray-600">{user?.profile}</span>
        </div>
        <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
          <Image
            src={user?.avatar || '/static/images/avatar/1.jpg'}
            alt={`Avatar of ${user?.name ? user?.name : 'User'}`}
            className="h-full w-full object-cover"
            width={48}
            height={48}
          />
        </span>
        {open ?
          <ExpandMoreIcon className="hidden sm:block h-6 w-6 text-gray-300" /> :
          <ExpandLessIcon className="hidden sm:block h-6 w-6 text-gray-300" />
        }
      </Button>
      <Menu
        className="mt-16"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

