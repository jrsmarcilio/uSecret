import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Input, SelectChangeEvent, Stack, Typography } from '@mui/material';
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

import { useProfile } from '@/context/profile';
import { TValidationError } from '@/interfaces/error.interface';
import SecretService from '@/services/secret.service';
import useCopyToClipboard from '@/usehooks-ts/useCopyToClipboard';
import { toast, TypeOptions } from 'react-toastify';
import DialogAlert from '../DialogAlert';
import { User, Account } from '@/interfaces';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const defaultValues: User = {
  email: "",
  password: "",
  username: "",
  avatar: "",
  fullname: "",
  profileId: 0,
  userGroupId: 0,
  rootId: 0,
};

type DialogUserProps = {
  title: string;
  user?: User;
}

export default function DialogUserAdd({ user, title }: DialogUserProps) {
  const router = useRouter();
  const { rootProfile, setRootProfile } = useProfile();
  const { setValue, getValues, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: user ? user : defaultValues
  });
  const [open, setOpen] = useState(false);
  const notify = (message: string, type: TypeOptions) => toast(message, { type });
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState<boolean>();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const [image, setImage] = useState('');

  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setValue('avatar', file);
  };

  const randomImage = useCallback(async () => {
    const response = await fetch('api/randomUser');
    const { data } = await response.json();
    setImage(data.image);
    setValue('avatar', data.image);
  }, [setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <Box>
      <Button type='button' variant="outlined" onClick={handleClickOpen} fullWidth>
        {title}
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

            <TextField fullWidth label="Email" {...register('email')} />

            <TextField fullWidth label="Nome do usuário" {...register('username')} />

            <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                defaultValue={getValues('password')}
                {...register('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && <p className="text-red-600">{String(errors.password.message)}</p>}
            </FormControl>

            <TextField fullWidth label="Nome completo" {...register('username')} />

            <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>
              <Avatar
                alt="Avatar user"
                src={image}
                sx={{ width: 100, height: 100 }}
              />
              <Button variant="outlined" onClick={randomImage}>Gerar avatar</Button>

              <Typography variant="caption" display="block" gutterBottom>
                ou
              </Typography>

              <input accept="image/*" id="icon-button-file" type="file" onChange={uploadImage} />
            </Stack>

            {/* <FormControl fullWidth>
              <Select {...register('type')} value={getValues('type')}>
                <MenuItem value={0} disabled><em>Que tipo de secret é este?</em></MenuItem>
                <MenuItem value={10}>Credencial</MenuItem>
                <MenuItem value={20} disabled>Cartão <em>(new feature)</em></MenuItem>
                <MenuItem value={30} disabled>Identidade <em>(new feature)</em></MenuItem>
                <MenuItem value={40} disabled>Nota Segura <em>(new feature)</em></MenuItem>
              </Select>
            </FormControl> */}


            {/* <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, marginTop: '1rem' }}>
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
            </Box> */}

            {/* <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem' }}>
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
            </FormControl> */}

            {/* <TextField fullWidth label="Key authenticate" {...register('authKey')} /> */}

            {/* <TextField fullWidth label="Notes" {...register('notes')} multiline rows={4} sx={{ marginTop: '1rem' }} /> */}

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