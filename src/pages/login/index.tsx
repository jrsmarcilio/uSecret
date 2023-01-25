import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import { AuthContext } from '@/context/auth';
import { ImageRoot, ToastProps } from '@/interfaces';
import { loginSchema } from '@/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>();

  const { getValues, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  const [toast, showToast] = useState<ToastProps | null>(null);
  const [background, setBackground] = useState<ImageRoot>();

  const { isLoading, login: handleLogin, loginRoot: handleRootLogin } = useContext(AuthContext);

  useEffect(() => {
    const fetchBackground = async () => {
      const background = await axios.get('/api/unsplash');
      setBackground(background.data);
    };
    // if (!background) fetchBackground();
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const onSubmit = async (login: any) => {
    if (!login) {
      showToast({
        message: 'Please fill all fields',
        severity: 'error',
        open: true,
        handleClose() { showToast(null) }
      });
      return;
    };

    const { username, password } = login;

    if (username.includes("@")) handleRootLogin({ email: username, password });
    else handleLogin(login);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Head>
        <title>Login for uSecret</title>
      </Head>

      <Banner />
      {toast && <Toast {...toast} />}
      {isLoading && <Loading />}

      <main className="w-1/2 h-screen flex flex-col justify-center items-center p-12">

        <div className='flex flex-col justify-center items-center p-12 shadow-lg shadow-blue-500/50 border-2 border-neutral-100"'>
          <div className="flex flex-col justify-center items-center">
            <Image className="h-12 w-auto mb-2" src="/logo-usecret.png" alt="uSecret brand" width={48} height={48} />
            <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
            <p className="text-gray-500">Login to uSecret to continue</p>
          </div>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              m: 2,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField className="w-80" defaultValue={getValues('password')} {...register('username')} label="username" variant="outlined" fullWidth />
            {errors.username && <p className="text-red-600">{String(errors.username.message)}</p>}
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
            <Button className="bg-blue-500 mt-4 w-80 h-12" type="submit" color="primary" variant="contained">Login</Button>
          </Box>

          <div className='w-80 m-2'>
            <p className="text-gray-500">
              {String("Don't have an account ?")}
              <Link href="/signup" className="text-lg text-blue-500 ml-2">Sign up</Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}