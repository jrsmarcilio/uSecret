import Link from 'next/link';
import { useState, Fragment } from 'react';

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

interface CardSecretItemProps {
  value: number;
  label: string;
  subLabel: string;
  avatar?: { src: string; alt: string};
}

export default function CardSecretItem({ avatar, label, subLabel, value }: CardSecretItemProps) {
  const [checked, setChecked] = useState([1]);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ListItem
      sx={{ width: '100%' }}
      key={value}
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
            <MenuItem onClick={handleClose}>Copiar Nome de Usuário</MenuItem>
            <MenuItem onClick={handleClose}>Copiar Senha</MenuItem>
            <MenuItem onClick={handleClose}>Abrir</MenuItem>
            <MenuItem onClick={handleClose}>Anexos</MenuItem>
            <MenuItem onClick={handleClose}>Clonar</MenuItem>
            <MenuItem onClick={handleClose}>Excluir</MenuItem>
          </Menu>
        </Fragment>
      }
      disablePadding
    >
      <ListItemButton className='mt-2'>

        <Checkbox
          sx={{ color: '#1E90FF', marginLeft: 1, '&.Mui-checked': { color: '#1E90FF' } }}
          edge="start"
          checked={checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${value}` }}
          onChange={handleToggle(value)}
        />

        <ListItemAvatar className='ml-8'>
          <Avatar alt={`Avatar n°${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
        </ListItemAvatar>

        <ListItemText id={`checkbox-list-secondary-label-${value}`} primary={
          <div className="flex flex-col ml-2">
            <Link href="/profile">
              <span className="text-gray-900 font-semibold hover:underline hover:text-blue-700">{label}</span>
            </Link>
            <span className="text-gray-600">{subLabel}</span>
          </div>
        } />

      </ListItemButton>
    </ListItem>
  );
}