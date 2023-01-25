import React, { createContext, useEffect, useState } from 'react';

import { TChildrenReactNode } from '@/interfaces';
import { Root } from '@/interfaces/root.interface';
import { api } from '@/services/api';
import UserService from '@/services/user.service';
import { useAuth } from './auth';
import Cookies from 'js-cookie';

type TProfileContext = {
  rootProfile: Root;
  userProfile?: Root;
  setRootProfile: (rootProfile: Root) => void;
  setUserProfile: (userProfile: Root) => void;
}

const defaultValues: TProfileContext = {
  rootProfile: {
    accounts: [],
    userGroups: [],
    users: [],
    profiles: [],
    tags: []
  },
  userProfile: undefined,
  setRootProfile: () => { },
  setUserProfile: () => { }
}

export const ProfileContext = createContext<TProfileContext>(defaultValues);

export const ProfileProvider = ({ children }: TChildrenReactNode) => {
  const [userProfile, setUserProfile] = useState<Root>();
  const [rootProfile, setRootProfile] = useState<Root>(defaultValues.rootProfile);

  const { user } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      if (user?.isAdmin) {
        api.defaults.headers.Authorization = `Bearer ${Cookies.get('SESSION_TOKEN')}`;
        const { data } = await api.get(`/root`);
        setRootProfile({
          accounts: data.accounts,
          userGroups: data.userGroups,
          users: data.users,
          profiles: data.profiles,
          tags: data.tags
        });
      } else {
        const { data } = await UserService.getProfile();
        setUserProfile(data);
      }
    }

    fetchUser();
  }, [user])

  return (
    <ProfileContext.Provider value={{ userProfile, setUserProfile, rootProfile, setRootProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => React.useContext(ProfileContext);
export const ProfileConsumer = ProfileContext.Consumer;



