import { UseFormRegister, FieldValues, FieldErrorsImpl, UseFormHandleSubmit } from "react-hook-form"

export type TUser = {
  fullname: string
  email: string

  username: string
  password: string
  confirmPassword: string

  avatar: string
  userGroupId: number
  profileId: number
}

export type TUserInforForm = { fullname: string; email: string }
export type TUserAccountForm = { username: string; password: string; confirmPassword: string }
export type TUserProfileForm = { avatar: string; userGroupId: number; profileId: number; }

export const defaultUserInfo: TUserInforForm = { fullname: '', email: '' }
export const defaultUserAccount: TUserAccountForm = { username: '', password: '', confirmPassword: '' }
export const defaultUserProfile: TUserProfileForm = { avatar: '', userGroupId: 0, profileId: 0 }

export const defaultUser: TUser = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullname: '',
  avatar: '',
  userGroupId: 0,
  profileId: 0
}

export type IHookForms = {
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<{ [x: string]: any; }>>
  handleSubmit: UseFormHandleSubmit<FieldValues>
}

