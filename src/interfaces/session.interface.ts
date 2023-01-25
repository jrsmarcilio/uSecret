import { LoginSchema } from "."

export interface ISESSION_USER {
  id: number
  name: string
  avatar: string
  profile: string
  userGroup: string
  isAdmin: boolean
}

export type TChildrenReactNode = {
  children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[] | JSX.Element | JSX.Element[]
}

export interface IAuthContext {
  user: ISESSION_USER | null;
  login: (login: LoginProps) => void;
  loginRoot: (login: LoginRootProps) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: () => boolean;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface LoginRootProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    user: ISESSION_USER,
    token: string
  }
  message?: string
}