import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TUserProfileData } from '../../models/IUser'
import { RootState } from '..'

interface IUserState {
  userInfo: TUserProfileData
}

const initialState: IUserState = {
  userInfo: {
    first_name: 'Ivan',
    second_name: 'Ivanov',
    display_name: 'Vanya',
    login: 'mylogin',
    avatar: null,
    phone: '+8 999 999 99 99',
    email: 'test@gmail.com',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<TUserProfileData>) => {
      state.userInfo = action.payload
    },
  },
})

export const userActions = userSlice.actions

// Создание селектора для получения данных пользователя
export const selectUser = (state: RootState) => state.user.userInfo
// Создание мемоизированного селектора с использованием createSelector
export const selectUserInfo = createSelector([selectUser], userInfo => userInfo)

export default userSlice.reducer
