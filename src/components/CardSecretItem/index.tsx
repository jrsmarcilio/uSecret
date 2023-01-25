import Link from 'next/link';
import { useState, Fragment } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyIcon from '@mui/icons-material/Key';
import { toast } from 'react-toastify';

import useCopyToClipboard from '@/usehooks-ts/useCopyToClipboard';
import { Account } from '@/interfaces/root.interface';
import { api } from '@/services/api';
import { TypeOptions } from 'react-toastify';
import SecretService from '@/services/secret.service';
import { useProfile } from '@/context/profile';

export default function CardSecretItem(account: Account) {
  const { password, username, id, type: credential, deleted } = account;
  const notify = (message: string, type: TypeOptions) => toast(message, { type });
  const { rootProfile, setRootProfile } = useProfile();

  const [_, setTextCopy] = useCopyToClipboard();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleExcludeAccount = () => {
    if (id) {
      SecretService.deleteAccount(id).then(() => {
        notify('Secret deleted successfully', 'success');
      }).catch(({ response }) => {
        notify('Falha ao excluir a conta!', 'error');
        response.data.errors.map((err: { param: string, msg: string }) => notify(`${err.param} ${err.msg}`, 'error'));
      });
    }
  }

  const handleRestoreSecret = () => {
    if (account.id) {
      SecretService.updateSecret({ ...account, deleted: false }, account.id).then(() => {
        notify('Secret restored successfully', 'success');
        setRootProfile({ ...rootProfile, accounts: rootProfile.accounts.map((acc: Account) => acc.id === account.id ? { ...acc, deleted: false } : acc) });
      }).catch((error) => {
        const { response } = error;
        notify('Falha ao restaurar a conta!', 'error');
        if (response.data.message) notify(response.data.message, 'error');
        else {
          const { response } = error;
          response.data.errors.map((err: { param: string, msg: string }) => notify(`${err.param} ${err.msg}`, 'error'));
        }
      });
    }
  }

  return (
    <ListItem
      sx={{ width: '100%' }}
      key={`list-label-${id}`}
      secondaryAction={
        <Fragment>
          <IconButton
            className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg relative"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            className="mt-28 ml-4"
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          >
            <MenuItem disabled={deleted} onClick={() => setTextCopy(username)}>Copiar Nome de Usuário</MenuItem>
            <MenuItem disabled={deleted} onClick={() => setTextCopy(password)}>Copiar Senha</MenuItem>
            <MenuItem disabled onClick={handleClose}>Abrir</MenuItem>
            <MenuItem disabled onClick={handleClose}>Anexos</MenuItem>
            <MenuItem disabled onClick={handleClose}>Clonar</MenuItem>
            <MenuItem disabled={deleted} onClick={handleExcludeAccount}>Excluir</MenuItem>
            {/* {deleted && <MenuItem onClick={handleRestoreSecret}>Restaurar</MenuItem>} */}
          </Menu>
        </Fragment>
      }
      disablePadding
    >
      <ListItemAvatar className='ml-8 mt-0'>{deleted ? <DeleteIcon /> : <KeyIcon />}</ListItemAvatar>

      <ListItemText id={`checkbox-list-secondary-label-${id}`} primary={
        <div className="flex flex-col ml-2">
          <Link href="/profile">
            <span className="text-sm font-medium text-slate-900 hover:underline hover:text-blue-700">{username}</span>
          </Link>
          <span className="text-sm text-slate-500 truncate">{credential}</span>
        </div>
      } />
    </ListItem>
  );
}