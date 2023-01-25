import { StoreContext } from "@/context/store";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

export default function ProfileForm() {

  const [image, setImage] = useState('');

  const {
    profile: {
      profile: { avatar, userGroupId, profileId },
      profileForm: { register, setValue }
    },
  } = useContext<any>(StoreContext)


  const randomImage = useCallback(async () => {
    const response = await fetch('api/randomUser');
    const { data } = await response.json();
    setImage(data.image);
    setValue('avatar', data.image);
  }, [setValue]);

  useEffect(() => {
    if (!image && avatar) setImage(avatar);
    else if (image === '') randomImage();
  }, [randomImage, avatar, image])

  return (
    <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>
      <Avatar
        alt="Random user image"
        src={image}
        sx={{ width: 100, height: 100 }}
      />
      <Button onClick={randomImage} variant="contained" component="label" fullWidth>Reload Image</Button>

      <TextField name="userGroupId" {...register('userGroupId')} defaultValue={userGroupId} disabled className="w-80" label="Group" value="Admin" placeholder="Admin" variant="outlined" />

      <TextField name="profileId" {...register('profileId')} defaultValue={profileId} disabled className="w-80" label="Profile" value="Admin" placeholder="Admin" variant="outlined" />
    </Stack>
  );
}