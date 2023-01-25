import { useContext, useState } from 'react';

import { StoreContext } from "@/context/store";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';

export default function AccountForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    account: {
      account: { password, confirmPassword, username },
      accountForm: { register, errors }
    }
  } = useContext<any>(StoreContext)


  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  return (
    <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>
      <TextField className="w-80" {...register('username')} error={!!errors.username} defaultValue={username} name="username" label="Username" variant="outlined" />
      {errors.username && <p className='text-red-500 text-xs italic'>{String(errors.username?.message)}</p>}

      <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          name="password"
          {...register('password')}
          error={!!errors.password}
          defaultValue={password}
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
        {errors.password && <p className='text-red-500 text-xs italic'>{String(errors.password?.message)}</p>}
      </FormControl>

      <FormControl className="w-80" sx={{ m: 2 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          defaultValue={confirmPassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        {errors.confirmPassword && <p className='text-red-500 text-xs italic'>{String(errors.confirmPassword?.message)}</p>}
      </FormControl>
    </Stack>
  );
}