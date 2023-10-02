import { PayloadAction } from '@reduxjs/toolkit'

import * as toolkitRaw from '@reduxjs/toolkit'
const { createSlice, createSelector } = toolkitRaw.default ?? toolkitRaw

import { TUserProfileData } from '../../models/IUser'
import { RootState } from '..'

interface IUserState {
  userInfo: TUserProfileData | null
}

const initialState: IUserState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (
      state: IUserState,
      action: PayloadAction<{ data: TUserProfileData } | null>
    ) => {
      state.userInfo = action.payload?.data ?? null
    },
  },
})

export const userActions = userSlice.actions

// Создание селектора для получения данных пользователя
export const selectUser = (state: RootState) => state.user.userInfo
// Создание мемоизированного селектора с использованием createSelector
export const selectUserInfo = createSelector(
  [selectUser],
  (userInfo: IUserState) => userInfo
)

export default userSlice.reducer
