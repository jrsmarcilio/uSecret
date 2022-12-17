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
import api from '../../services/api';

import { ImageRoot } from '@/interfaces/unsplash.interface';
import { useEffect } from 'react';
import axios from 'axios';

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
  const [background, setBackground] = useState<ImageRoot>();
  const router = useRouter()

  useEffect(() => {
    const fetchBackground = async () => {
      const background = await axios.get('/api/unsplash');
      setBackground(background.data);
    };
    if (!background) fetchBackground();
  });

  const handleChange =
    (prop: keyof LoginProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorExists(false);
      setErrorMessage("");
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      setErrorExists(true);
      setErrorMessage("fields email and password must be provided.")
    };
    setLoading(true);

    const response = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email: values.email, password: values.password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("🚀 ~ file: index.tsx:77 ~ response", response)
    
    const data = await response.json();
    console.log("🚀 ~ file: index.tsx:80 ~ data", data)

    if (data.message) {
      setErrorExists(true);
      setErrorMessage(data.message);
      return;
    }

    localStorage.setItem('token', data.token);
    router.push('/dashboard');

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Head>
        <title>Login for uSecret</title>
      </Head>

      <div className="w-1/2 h-screen bg-blue-500">
        <div className="flex flex-col justify-center items-center h-full">
          {background && (
            <Image
              className="object-cover w-full h-full"
              src={background.urls.full}
              alt={background.alt_description}
              width={background.width}
              height={background.height}
            />
          )}
        </div>
      </div>

      <main className="w-1/2 h-screen flex flex-col justify-center items-center p-12">

        <div className='flex flex-col justify-center items-center p-12 shadow-lg shadow-blue-500/50 border-2 border-neutral-100"'>
          <div className="flex flex-col justify-center items-center">
            <Image className="h-12 w-auto mb-2" src={logoImage} alt="uSecret brand" />
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
            <Button className="bg-blue-500 mt-4 w-80 h-12" type="submit" color="primary" variant="contained" onClick={handleSubmit}>Sign Up</Button>
          </div>
          
          {errorExists && (<div className="m-0 text-red-600"><p className="m-0">{errorMessage}</p></div>)}

          <div className='w-80 m-2'>
            <p className="text-gray-500">
              Don't have an account?
              <Link href="/signup" className="text-lg text-blue-500 ml-2">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}