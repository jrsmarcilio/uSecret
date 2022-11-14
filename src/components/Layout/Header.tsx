import MenuIcon from '@mui/icons-material/Menu';
import LogOutButton from './Header/LogOutButton';
import Notifications from './Header/Notifications';
import SearchBox from './Header/SearchBox';
import UserMenu from './Header/UserMenu';

interface HeaderProps {
  mobileNavsidebar: boolean;
  setMobileNavsidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderComponent({ mobileNavsidebar, setMobileNavsidebar }: HeaderProps) {
  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
      <MenuIcon className='h-12 stroke-slate-600 cursor-pointer sm:hidden' onClick={() => setMobileNavsidebar(!mobileNavsidebar)} />
      <SearchBox />
      <div className="flex flex-shrink-0 items-center ml-auto">
        <UserMenu />
        <div className="border-l pl-3 ml-3 space-x-1">
          <Notifications />
          <LogOutButton />
        </div>
      </div>
    </header>
  );
};