import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit'
const { createSlice, createSelector } = toolkitRaw.default ?? toolkitRaw

import { TUserProfileData } from '../../models/IUser'
import { RootState } from '..'
import { Theme } from '../../models/types'

export interface IUserState {
  userInfo: TUserProfileData | null
  theme: string | null
  selectedLevel: number
}

const initialState: IUserState = {
  userInfo: null,
  theme: null,
  selectedLevel: 1,
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
    setTheme: (
      state: IUserState,
      action: PayloadAction<{ theme: string } | null>
    ) => {
      state.theme = action.payload?.theme ?? Theme.DARK
    },
    setLevel: (state: IUserState, action: PayloadAction<{ level: number }>) => {
      state.selectedLevel = action.payload.level
    },
  },
})

export const userActions = userSlice.actions

// Создание селектора для получения данных пользователя
export const selectUser = (state: RootState) => state.user.userInfo
export const selectTheme = (state: RootState) => state.user.theme
export const selectLevel = (state: RootState) => state.user.selectedLevel
// Создание мемоизированного селектора с использованием createSelector
export const selectUserInfo = createSelector(
  [selectUser],
  (userInfo: IUserState) => userInfo
)

export const selectUserTheme = createSelector(
  [selectTheme],
  (theme: string) => theme
)

export const selectUserLevel = createSelector(
  [selectLevel],
  (level: number) => level
)

export default userSlice.reducer
