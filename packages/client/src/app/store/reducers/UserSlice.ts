import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUserProfileData } from '../../models/IUser'

interface IUserState {
  userInfo: TUserProfileData[]
}

const initialState: IUserState = {
  userInfo: [
    {
      first_name: 'Ivan',
      second_name: 'Ivanov',
      display_name: 'Vanya',
      login: 'mylogin',
      avatar: null,
      phone: '+8 999 999 99 99',
      email: 'test@gmail.com',
    },
  ],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<TUserProfileData>) => {
      state.userInfo = [action.payload]
    },
  },
})

export const { getUserInfo } = userSlice.actions

export default userSlice.reducer
