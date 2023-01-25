import Image from 'next/image';
import Link from 'next/link';

import { useContext, useState } from 'react';
import logoImage from '../../../public/logo-usecret.png';

import { defaultUser } from '@/interfaces/userInterface';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { StoreContext } from '@/context/store';
import AccountForm from './AccountForm';
import InformationForm from './InformationForm';
import ProfileForm from './ProfileForm';
import { useEffect } from 'react';

function getSteps(): string[] {
  return ['Information', 'Account', 'Profile'];
}

export default function StepperForm() {
  const {
    information: { information, setInformation, informationForm },
    account: { account, setAccount, accountForm },
    profile: { profile, setProfile, profileForm },
  } = useContext<any>(StoreContext)

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const onSubmit = (data: any) => {
    if (activeStep === 0) setInformation(data);
    else if (activeStep === 1) setAccount(data);
    else if (activeStep === 2) setProfile(data);
    handleNext();
  };

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleReset = () => {
    setInformation(defaultUser);
    setAccount(defaultUser);
    setProfile(defaultUser);
    setActiveStep(0);
  }

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <InformationForm />;
      case 1:
        return <AccountForm />;
      case 2:
        return <ProfileForm />;
      default:
        return 'Finnish Registration';
    }
  }


  return (
    <Box
      onSubmit={
        activeStep === 0 ? informationForm.handleSubmit(onSubmit) : activeStep === 1 ? accountForm.handleSubmit(onSubmit) : profileForm.handleSubmit(onSubmit)
      }
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

          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', marginBottom: 4 }}>
            {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>

          {activeStep === steps.length ? (
            <div>
              <p className="text-2xl font-medium text-gray-800">All steps completed</p>
              <p className="text-gray-500">User registered Successfully</p>
              <Button
                className='bg-red-500 w-60 mr-2 mt-8 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleReset}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full">
              {getStepContent(activeStep)}
              <div className="flex flex-row justify-center items-center w-full">
                <Button
                  className='bg-red-500 w-60 mr-2 mt-8 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button className="bg-blue-500 w-60 ml-2 mt-8 text-white font-bold py-2 px-4 rounded" type="submit" color="primary" variant="contained">
                  {activeStep === steps.length - 2 ? 'Sign Up' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className='w-80 m-2'>
          <p className="text-gray-500">
            Already have an account?
            <Link href="/login" className="text-lg text-blue-500 ml-2 hover:underline">Log in</Link>
          </p>
        </div>

      </div>
    </Box>





    //       (
    //         <div className="flex flex-col justify-center items-center w-full">
    //           <TextField className="w-80" onChange={handleChange('fullname')} label="Full Name" variant="outlined" />
    //           <TextField className="w-80" onChange={handleChange('email')} label="Email" variant="outlined" />
    //         </div>
    //       ) : (
    //         <div className="flex flex-col justify-center items-center w-full">
    //           {/* username: string
    //                   password: string
    //                   passwordConfirm: string */}
    //           <TextField className="w-80" onChange={handleChange('username')} label="Username" variant="outlined" />

    //           <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
    //             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    //             <OutlinedInput
    //               type={showPassword ? 'text' : 'password'}
    //               name="password"
    //               ref={register({
    //                 required: "You must specify a password",
    //                 minLength: {
    //                   value: 8,
    //                   message: "Password must have at least 8 characters"
    //                 }
    //               })}
    //               endAdornment={
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge="end"
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //               label="Password"
    //             />
    //             {errors.password && <p>{errors.password.message}</p>}
    //           </FormControl>

    //           <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
    //             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    //             <OutlinedInput
    //               type={showPassword ? 'text' : 'password'}
    //               name="password"
    //               ref={register({ validate: (value: string) => value === password.current || "The passwords do not match" })}
    //               endAdornment={
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge="end"
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //               label="Password"
    //             />
    //             {errors.password && <p>{errors.password.message}</p>}
    //           </FormControl>
    //         </div>
    //       )}

    //       {stepForm === 1 && (
    //         <>
    //           <TextField className="w-80" onChange={handleChange('email')} label="Email" variant="outlined" />

    //           {values.emailInvalid && (
    //             <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
    //           )}

    //           <ReCAPTCHA
    //             className="flex justify-center w-80 m-4"
    //             ref={recaptchaRef}
    //             size="normal"
    //             sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    //             onChange={reCAPTCHAChange}
    //           />

    //           {values.tokenInvalid && (
    //             <p className="text-red-500 text-sm">Please verify that you are not a robot</p>
    //           )}

    //           <Button className="bg-blue-500 mt-4 w-80 h-12" color="primary" variant="contained" onClick={handleNextStep}>Continue</Button>
    //         </>
    //       )}

    //       {stepForm === 2 && (
    //         <>
    //           <TextField className="w-80" defaultValue={values.email} onChange={handleChange('email')} label="Email" variant="outlined" />
    //           <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
    //             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    //             <OutlinedInput
    //               type={values.showPassword ? 'text' : 'password'}
    //               value={values.password}
    //               onChange={handleChange('password')}
    //               endAdornment={
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge="end"
    //                   >
    //                     {values.showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //               label="Password"
    //             />
    //           </FormControl>
    //           <Button className="bg-blue-500 mt-4 w-80 h-12" type="submit" color="primary" variant="contained">Sign Up</Button>
    //         </>
    //       )}

    //       <div className='w-80 m-2'>
    //         <p className="text-gray-500">
    //           Already have an account?
    //           <Link href="/login" className="text-lg text-blue-500 ml-2">Log in</Link>
    //         </p>
    //       </div>

    //     </div>

    //   </div>
    // </Box>
  );
}