import { StoreContext } from "@/context/store";
import { Stack, TextField } from "@mui/material";
import { useContext } from "react";


export default function InformationForm() {

  const {
    information: {
      information: { email, fullname },
      informationForm: { errors, register }
    }
  } = useContext<any>(StoreContext)

  return (
    <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>
      <TextField defaultValue={fullname} {...register('fullname')} error={!!errors.fullname} label="Full Name" name="fullname" className="w-80" variant="outlined" />

      {errors.fullname?.message && <p className='text-red-500 text-xs italic'>{String(errors.fullname?.message)}</p>}

      <TextField defaultValue={email} {...register('email')} error={!!errors.email} label="Email" name="email" className="w-80" variant="outlined" />
      {errors.email?.message && <p className='text-red-500 text-xs italic'>{String(errors.email?.message)}</p>}
    </Stack>
  );
}