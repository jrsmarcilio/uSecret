import { Fragment, useState } from 'react';


import Button from '@mui/material/Button';

import CardControll from '@/components/CardControll';
import DialogSecretAdd from '@/components/DialogSecretAdd';
import Layout from '@/components/Layout/Layout';
import ListSecret from '@/components/ListSecret';
import TitlePage from "@/components/TitlePage";
import { useProfile } from '@/context/profile';
import SecretService from '@/services/secret.service';
import { List } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Checkbox, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { toast, TypeOptions } from 'react-toastify';
import CardSecretItem from '@/components/CardSecretItem';

export default function Vault() {
  const [checkedAccount, setCheckedAccount] = useState<number[]>([]);
  const notify = (message: string, type: TypeOptions) => toast(message, { type });
  const { rootProfile, setRootProfile } = useProfile();
  const [showSecretDeleted, setShowSecretDeleted] = useState(false);

  const handleDeleteSecret = () => {
    SecretService.deleteMultiple(checkedAccount).then(() => {
      notify('Secrets deleted successfully', 'success');
      setRootProfile({
        ...rootProfile,
        accounts: rootProfile.accounts.filter(account => !checkedAccount.includes(account.id || 0))
      });
      setCheckedAccount([]);
    }).catch(({ response }) => {
      response.data.errors.map((err: { param: string, msg: string }) => notify(`${err.param} ${err.msg}`, 'error'));
    });
  }

  const handleShowSecretDeleted = () => {
    setShowSecretDeleted(!showSecretDeleted);
  }

  const ButtonDeleteSecret = () => {
    return (
      <Button
        sx={{
          mt: 2,
          color: 'error.main',
          borderColor: 'error.main',
          '&:hover': {
            color: 'error.dark',
            borderColor: 'error.dark',
          },
        }}
        type='button'
        variant="outlined"
        onClick={handleDeleteSecret}
        fullWidth
      >Deletar Secret{checkedAccount.length === 1 ? '' : 's'}
      </Button>
    )
  }
  const ButtonEnableDeletedSecret = () => {
    return (
      <Button
        sx={{
          mt: 2,
          color: 'error.main',
          borderColor: 'error.main',
          '&:hover': {
            color: 'error.dark',
            borderColor: 'error.dark',
          },
        }}
        type='button'
        variant="outlined"
        onClick={handleShowSecretDeleted}
        fullWidth
        endIcon={showSecretDeleted ? <VisibilityOffIcon /> : <VisibilityIcon />}
      >Show Secret Deleted
      </Button>
    )
  }

  return (
    <Layout title='Vault for uSecret'>

      <main className="p-6 sm:p-10 space-y-6">
        <TitlePage title="Cofre" subtitle="Mobile UX/UI Design course" />

        <section className="grid content-center md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
          <CardControll title='Filtro' size='sm'>
            <DialogSecretAdd title='Adicionar Secret' />
            {checkedAccount.length > 0 && <ButtonDeleteSecret />}
            <ButtonEnableDeletedSecret />
          </CardControll>
          <ListSecret filterDeleted={showSecretDeleted} checked={checkedAccount} setChecked={setCheckedAccount} size='lg' title='Itens do Cofre' />
          <CardControll title='Secrets Favorite' size='lg'>
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'auto', maxHeight: '24rem' }}>
              {rootProfile.accounts && rootProfile.accounts.filter((item) => item.favorite).map((item, index) => {
                return (
                  <ListItemButton sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                    '&:hover': {
                      backgroundColor: '#F0F8FF',
                    },
                  }} key={index}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 1rem',
                    }} width="100%">
                      <CardSecretItem key={item.id || 0} {...item} />
                    </Box>
                  </ListItemButton>
                );
              })
              }
            </List>
          </CardControll>
        </section>

      </main>
    </Layout>
  );
}