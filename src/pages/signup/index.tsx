import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { createRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import logoImage from '../../../public/logo-usecret.png';
import Banner from '../../components/Banner';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import api from '../api/cup'

interface SignUpProps {
  email: string;
  token: string;
  password: string;
  showPassword: boolean;
  emailInvalid: boolean;
  tokenInvalid: boolean;
}

export default function Signup() {
  const recaptchaRef = createRef<ReCAPTCHA>();
  const defaultValues: SignUpProps = { email: '', token: '', password: '', showPassword: false, emailInvalid: false, tokenInvalid: false };
  const [values, setValues] = useState<SignUpProps>(defaultValues);
  const [stepForm, setStepForm] = useState(1);

  const handleChange =
    (prop: keyof SignUpProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!values.token) return;
    const data = {
      name: "Marcilio",
      email: values.email,
      password: values.password,
      passwordConfirm: values.password,
      
    }
    fetch('/api/cup', { method: 'POST', body: JSON.stringify(data) }).then((res) => res.json()).then((data) => console.log(data));
  }

  const handleNextStep = () => {
    if (!values.token || !values.email) return;
    setStepForm(2);
  }

  const reCAPTCHAChange = (value: any) => {
    if (!value) return;
    setValues({ ...values, token: value });
    recaptchaRef.current?.execute();
  }

  return (

    <div className="flex justify-center items-center w-screen h-screen">
      <Head>
        <title>Sign Up for uSecret</title>
      </Head>

      <main className="w-1/2 h-screen flex flex-col justify-center items-center p-12">

        <Box
          onSubmit={handleSubmit}
          className="container flex justify-center items-center h-screen w-screen"
          component="form"
          sx={{ '& > :not(style)': { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <div className="w-128  h-auto flex flex-col justify-center items-center p-12 shadow-lg shadow-blue-500/50">

            <div className="flex flex-row justify-center items-center w-full">
              <Image className="h-12 w-auto" src={logoImage} alt="uSecret brand"></Image>
              <h1 className="text-2xl font-bold text-gray-800 m-4">uSecret</h1>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
              <p className="text-gray-500">Sign up for uSecret to continue</p>
            </div>

            <div className="flex flex-col justify-center items-center w-full m-8">

              {stepForm === 1 && (
                <>
                  <TextField className="w-80" onChange={handleChange('email')} label="Email" variant="outlined" />
                  
                  {values.emailInvalid && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                  )}

                  <ReCAPTCHA
                    className="flex justify-center w-80 m-4"
                    ref={recaptchaRef}
                    size="normal"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={reCAPTCHAChange}
                  />

                  {values.tokenInvalid && (
                    <p className="text-red-500 text-sm">Please verify that you are not a robot</p>
                  )}

                  <Button className="bg-blue-500 mt-4 w-80 h-12" color="primary" variant="contained" onClick={handleNextStep}>Continue</Button>
                </>
              )}

              {stepForm === 2 && (
                <>
                  <TextField className="w-80" defaultValue={values.email} onChange={handleChange('email')} label="Email" variant="outlined" />
                  <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
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
                  <Button className="bg-blue-500 mt-4 w-80 h-12" type="submit" color="primary" variant="contained">Sign Up</Button>
                </>
              )}

              <div className='w-80 m-2'>
                <p className="text-gray-500">
                  Already have an account?
                  <Link href="/signin" className="text-lg text-blue-500 ml-2">Log in</Link>
                </p>
              </div>

            </div>

          </div>
        </Box>
      </main>

      <Banner />
    </div>
  );
}