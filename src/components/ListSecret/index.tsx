import React, { Fragment, useEffect, useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useProfile } from '@/context/profile';
import { Account } from '@/interfaces/root.interface';
import { Box, Button, Checkbox, ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import CardSecretItem from '../CardSecretItem';
import SearchBox from '../Layout/Header/SearchBox';
import DialogSecretAdd from '../DialogSecretAdd';

interface ListSecretProps {
  size: "sm" | "lg";
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  checked: number[];
  setChecked: React.Dispatch<React.SetStateAction<number[]>>;
  filterDeleted?: boolean;
}

export default function ListSecret({ size, title, children, filterDeleted, checked, setChecked }: ListSecretProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [items, setItems] = useState<Account[]>([]);
  const { rootProfile } = useProfile();

  const handleFilter = () => {
    setOpen(!open);
    setItems(items.reverse());
  }

  useEffect(() => {
    if (rootProfile) setItems(rootProfile.accounts);
  }, [rootProfile]);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

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
    <div className={`bg-white shadow rounded-lg ${size === 'sm' ? 'row-span-3' : 'md:col-span-2 md:row-span-2'}`}>

      <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
        <span>{title}</span>
        <div>
          <Button
            className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
            onClick={handleFilter}
          >
            {open ? (
              <React.Fragment>
                <span className='text-xs mr-2'>Descending</span>
                <ExpandLessIcon className="hidden sm:block h-6 w-6 text-gray-300" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className="text-xs mr-2">Ascending</span>
                <ExpandMoreIcon className="hidden sm:block h-6 w-6 text-gray-300" />
              </React.Fragment>
            )}
          </Button>
        </div>
      </div>

      <SearchBox handleChange={handleChangeSearch} />

      <List dense sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'auto', maxHeight: '24rem' }}>
        {items && items.filter((item) => !item.deleted && item.username.toLowerCase().includes(filter.toLowerCase())).map((item, index) => {
          return (
            <ListItemButton sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              '&:hover': {
                backgroundColor: '#F0F8FF',
              },
            }} key={index}
              onClick={() => console.log('selected')}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
              }} width="100%">
                <Checkbox
                  sx={{ color: '#1E90FF', marginLeft: 1, '&.Mui-checked': { color: '#1E90FF' } }}
                  edge="start"
                  checked={checked.indexOf(item.id || 0) !== -1}
                  tabIndex={-1}
                  disableRipple
                  onChange={handleToggle(item.id || 0)}
                />
                <CardSecretItem key={item.id || 0} {...item} />
              </Box>
              <DialogSecretAdd title={''} />
            </ListItemButton>
          );
        })
        }
      </List>
    </div>
  );
}