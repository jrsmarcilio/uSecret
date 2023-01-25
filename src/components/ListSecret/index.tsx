import React, { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Button } from '@mui/material';
import List from '@mui/material/List';
import CardSecretItem from '../CardSecretItem';

interface ListSecretProps {
  size: "sm" | "lg";
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

export default function ListSecret({ size, title, children }: ListSecretProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleFilter = () => setOpen(!open);

    return (
      <div className={`bg-white shadow rounded-lg ${size === 'sm' ? 'row-span-3' : 'md:col-span-2 md:row-span-2'}`}>

        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
          <span>Itens do Cofre</span>
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

        <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <CardSecretItem label='Calvin Steward' subLabel='ustore' value={value} key={value} />
              );
            })}
          </List>
        </div>
      </div>
    );
  }