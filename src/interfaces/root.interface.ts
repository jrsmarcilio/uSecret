export interface Root {
  users: User[]
  accounts: Account[]
  profiles: Profile[]
  tags: Tags[]
  userGroups: UserGroup[]
}

export interface User {
  id?: number
  deleted?: boolean
  avatar: string
  email: string
  fullname: string
  password: string
  username: string
  profileId: number
  rootId: number
  userGroupId: number
  createdAt?: string
  updatedAt?: string
}

export interface Account {
  id?: number
  deleted?: boolean
  favorite?: boolean
  name: string
  notes: string
  password: string
  private: boolean
  type: string
  url: string
  username: string
  userId?: any
  rootId?: number
  createdAt?: string
  updatedAt?: string
}

export interface Profile {
  id: number
  name: string
  description: string
  rootId: number
  createdAt: string
  updatedAt: string
}

export interface UserGroup {
  id: number
  description: string
  name: string
  rootId: number
  createdAt: string
  updatedAt: string
}

export interface Tags {
  id: number
  name: string
  rootId: number
  createdAt: Date
  updatedAt: Date
}