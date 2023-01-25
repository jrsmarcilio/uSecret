import React, { createContext, useState } from 'react';

import {
  defaultUserAccount,
  defaultUserInfo,
  defaultUserProfile,
  TUserAccountForm,
  TUserInforForm,
  TUserProfileForm
} from '@/interfaces/userInterface';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { accountSchema, informationSchema, profileSchema } from '@/schemas/userSchema';

export const StoreContext = createContext({
  information: {
    information: defaultUserInfo,
    setInformation: (value: TUserInforForm) => { },
    informationForm: {}
  },
  account: {
    account: defaultUserAccount,
    setAccount: (value: TUserAccountForm) => { },
    accountForm: {}
  },
  profile: {
    profile: defaultUserProfile,
    setProfile: (value: TUserProfileForm) => { },
    profileForm: {}
  }
});

export const StoreContextProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [information, setInformation] = useState<TUserInforForm>(defaultUserInfo);
  const [account, setAccount] = useState<TUserAccountForm>(defaultUserAccount);
  const [profile, setProfile] = useState<TUserProfileForm>(defaultUserProfile);

  const informationForm = useForm({ resolver: yupResolver(informationSchema) });
  const accountForm = useForm({ resolver: yupResolver(accountSchema) });
  const profileForm = useForm({ resolver: yupResolver(profileSchema) });

  const store = {
    information: {
      information,
      setInformation,
      informationForm: {
        register: informationForm.register,
        errors: informationForm.formState.errors,
        handleSubmit: informationForm.handleSubmit
      }
    },

    account: {
      account,
      setAccount,
      accountForm: {
        register: accountForm.register,
        errors: accountForm.formState.errors,
        handleSubmit: accountForm.handleSubmit
      }
    },

    profile: {
      profile,
      setProfile,
      profileForm: {
        register: profileForm.register,
        errors: profileForm.formState.errors,
        handleSubmit: profileForm.handleSubmit,
        setValue: profileForm.setValue
      }
    }
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}