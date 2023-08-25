import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'

interface IUserState {
  userInfo: IUser[]
}

const initialState: IUserState = {
  userInfo: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = [action.payload]
    },
  },
})

export const { getUserInfo } = userSlice.actions

export default userSlice.reducer
