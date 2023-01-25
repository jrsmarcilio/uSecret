import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'


import { ISESSION_USER, TChildrenReactNode, IAuthContext, LoginProps, LoginResponse, LoginRootProps } from '@/interfaces/session.interface'
import { api } from '@/services/api'

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: (login: LoginProps) => { },
  loginRoot: (login: LoginRootProps) => { },
  logout: () => { },
  isLoading: true,
  isAuthenticated: () => false
});

export const AuthProvider = ({ children }: TChildrenReactNode) => {
  const [user, setUser] = useState<ISESSION_USER | null>(null);
  const [isLoading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    async function loadUserCookies() {
      const SESSION_TOKEN = Cookies.get('SESSION_TOKEN');

      if (SESSION_TOKEN) {
        api.defaults.headers.Authorization = `Bearer ${SESSION_TOKEN}`;
      }
      setLoading(false);
    }

    loadUserCookies();
  }, [])

  const login = async (login: LoginProps) => {
    setLoading(true);
    const { data: { token, user } }: LoginResponse = await api.post('/user/login', login);
    if (token) {
      Cookies.set('SESSION_TOKEN', token, { expires: 60 });
      Cookies.set('SESSION_USER', JSON.stringify(user), { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
    }
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  }

  const loginRoot = async (login: LoginRootProps) => {
    setLoading(true);
    const { data: { token, user } }: LoginResponse = await api.post('/login/root', login);
    if (token) {
      Cookies.set('SESSION_TOKEN', token, { expires: 60 });
      Cookies.set('SESSION_USER', JSON.stringify(user), { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
    }
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  }

  const logout = () => {
    Cookies.remove('SESSION_TOKEN');
    Cookies.remove('ROOT_PROFILE');
    setUser(null);
    delete api.defaults.headers.Authorization;
    setLoading(false);
    router.push('/login');
  }

  const isAuthenticated = (): boolean => {
    if (!!user && !Cookies.get('SESSION_TOKEN')) {
      logout();
      return false;
    }
    setUser(JSON.parse(Cookies.get('SESSION_USER') || '{}'));
    return !!user;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginRoot, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;



