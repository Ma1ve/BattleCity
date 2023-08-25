export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: null
  password: string
  phone: string
  email: string
}

export type TUserRegistrationData = Omit<
  IUser,
  'id' | 'avatar' | 'display_name'
>

export type TUserProfileData = Omit<IUser, 'id' | 'password'>
