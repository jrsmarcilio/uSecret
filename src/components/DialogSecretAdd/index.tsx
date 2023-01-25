import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useAuth } from '@/context/auth';
import { useProfile } from '@/context/profile';
import { TValidationError } from '@/interfaces/error.interface';
import { Account } from '@/interfaces/root.interface';
import SecretService from '@/services/secret.service';
import useCopyToClipboard from '@/usehooks-ts/useCopyToClipboard';
import { toast, TypeOptions } from 'react-toastify';
import DialogAlert from '../DialogAlert';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface SecretCredentialProps { name: string; credentialType: string; folder: string; username: string; password: string; url: string; notes: string; authKey: string; expiresIn?: number, showPassword: boolean, favorite: boolean; }

const defaultValues: Account = {
  name: '',
  type: '10',
  username: '',
  password: '',
  url: '',
  notes: '',
  deleted: false,
  favorite: false,
  private: false,
};

const EnumType = {
  10: 'CREDENCIAL',
  20: 'CARTAO',
  30: 'IDENTIDADE',
  40: 'NOTA_SEGURA'
};

type DialogSecretProps = {
  title: string;
  account?: Account;
  children?: React.ReactElement | React.ReactElement[]
}


export default function DialogSecretAdd({ account, title, children }: DialogSecretProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { rootProfile, setRootProfile } = useProfile();
  const { setValue, getValues, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: account ? account : defaultValues
  });
  const [_, setTextCopy] = useCopyToClipboard();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const notify = (message: string, type: TypeOptions) => toast(message, { type });
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleOpenNewTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (getValues('url') !== '' && getValues('url').includes('http')) window.open(getValues('url'), '_blank', "noopener");
    else window.open(`https://${getValues('url')}`, '_blank');
  };

  const onSubmit = (data: any) => {
    SecretService.createSecret({ ...data, type: EnumType[getValues('type') as unknown as keyof typeof EnumType] }).then((response) => {
      notify('Secret criado com sucesso!', 'success');
      setRootProfile({
        users: rootProfile?.users || [],
        accounts: [...rootProfile?.accounts || [], data],
        profiles: rootProfile?.profiles || [],
        tags: rootProfile?.tags || [],
        userGroups: rootProfile?.userGroups || [],
      });
      router.push('/vault');
    }).catch((error) => {
      const { errors }: { errors: TValidationError[] } = error;
      errors.map((err) => notify(`${err.param} - ${err.msg}`, 'error'));
    });
    setOpen(false);
  };

  const handleDeleteSecret = () => setOpenAlert(true);

  return (
    <Box>
      <Button type='button' variant="outlined" onClick={handleClickOpen} fullWidth>
        {title ? title : children}
      </Button>

      <Dialog open={open} onClose={handleClose} sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '600px',
          borderRadius: '0.5rem',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          p: '1rem',
        },
      }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', m: 0, p: 2 }}>
          {title}

          <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: 4 }}>
            <DialogAlert
              title="Deletar Secret"
              message="Tem certeza que deseja deletar este secret?"
              onConfirm={handleDeleteSecret}
              handleClose={handleCloseAlert}
              open={openAlert}
              childen={
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpenAlert}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
            <IconButton
              aria-label="favorite"
              onClick={() => setValue('favorite', !getValues('favorite'))}
            >
              {getValues('favorite') ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Box>

          <IconButton aria-label="close" onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          p: '1rem',
          marginTop: '1rem',
        }}>
          <Box noValidate
            autoComplete="off"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ '& .MuiTextField-root': { marginTop: 1, marginRight: 1 } }}>
            <FormControl fullWidth>
              <Select {...register('type')} value={getValues('type')}>
                <MenuItem value={0} disabled><em>Que tipo de secret é este?</em></MenuItem>
                <MenuItem value={10}>Credencial</MenuItem>
                <MenuItem value={20} disabled>Cartão <em>(new feature)</em></MenuItem>
                <MenuItem value={30} disabled>Identidade <em>(new feature)</em></MenuItem>
                <MenuItem value={40} disabled>Nota Segura <em>(new feature)</em></MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label="Nome" {...register('name')} />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, marginTop: '1rem' }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  type='text'
                  defaultValue={getValues('username')}
                  {...register('username')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setTextCopy(getValues('username'))} edge="end">
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Username"
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  defaultValue={getValues('password')}
                  {...register('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ marginRight: 1 }}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <IconButton onClick={() => setTextCopy(getValues('password'))} edge="end">
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>

            <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem' }}>
              <InputLabel>URI</InputLabel>
              <OutlinedInput
                type='text'
                defaultValue={getValues('url')}
                {...register('url')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ marginRight: 1 }}
                      onClick={handleOpenNewTab}
                      edge="end"
                    >
                      <OpenInNewIcon />
                    </IconButton>
                    <IconButton onClick={() => setTextCopy(getValues('url'))} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="URI"
              />
            </FormControl>

            {/* <TextField fullWidth label="Key authenticate" {...register('authKey')} /> */}

            <TextField fullWidth label="Notes" {...register('notes')} multiline rows={4} sx={{ marginTop: '1rem' }} />

            <DialogActions>
              <Button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleClose}
                type="reset"
              >
                Cancel
              </Button>
              <Button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                autoFocus
                type="submit"
              >Save changes</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}