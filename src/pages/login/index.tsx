import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import logoImage from '../../../public/logo-usecret.png';
import { api } from '../../services/api';

interface LoginProps {
  email: string;
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const defaultValues: LoginProps = { email: '', password: '', showPassword: false };
  const [values, setValues] = useState<LoginProps>(defaultValues);
  const [errorExists, setErrorExists] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const handleChange =
    (prop: keyof LoginProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleToDashboard = () => router.push('/dashboard');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!values.email || !values.password) return;
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email: values.email, password: values.password });
      const { token } = data;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (error: any) {
      router.push('/dashboard');
      setErrorExists(true);
      setErrorMessage(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Head>
        <title>Login for uSecret</title>
      </Head>

      <main className="container w-128 flex flex-col justify-center items-center p-12 shadow-lg shadow-blue-500/50 border-2 border-neutral-100">

        <div className="flex flex-col justify-center items-center">
          <Image className="h-12 w-auto mb-2" src={logoImage} alt="uSecret brand"></Image>
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-500">Sign in to uSecret to continue</p>
        </div>

        <div className="flex flex-col justify-center items-center w-full m-8">
          <TextField className="w-80" defaultValue={values.email} onChange={handleChange('email')} label="Email" variant="outlined" />
          <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              defaultValue={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button onClick={handleToDashboard} className="bg-blue-500 mt-4 w-80 h-12" type="submit" color="primary" variant="contained">Sign Up</Button>
        </div>
        {errorExists && (<div className="m-0"><p className="m-0">{errorMessage}</p></div>)}

        <div className="w-80 m-2">
          <p className="text-gray-500">
            Don`t have an account?
            <Link href="/signup" className="text-lg text-blue-500 ml-2">Sign up</Link>
          </p>
        </div>

      </main>
    </div>

  );
}