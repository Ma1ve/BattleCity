import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit'
import { DestroyedTank } from '../../../pages/Game/shared/types'
const { createSlice, createSelector } = toolkitRaw.default ?? toolkitRaw

export interface ITanksState {
  destroyedTanks: DestroyedTank[] | []
}

const initialState: ITanksState = {
  destroyedTanks: [],
}

export const destroyedTanksSlice = createSlice({
  name: 'destroyedTanks',
  initialState,
  reducers: {
    addDestroyedTank: (
      state: ITanksState,
      action: PayloadAction<DestroyedTank>
    ) => {
      state.destroyedTanks.push(action.payload)
    },
    getDestroyedTanks: (state: ITanksState) => {
      return state.destroyedTanks
    },
  },
})

export const destroyedTanksActions = destroyedTanksSlice.actions

// Создание селектора для получения данных пользователя
export const selectDestroyedTanks = (state: RootState) =>
  state.tanks.destroyedTanks

// Создание мемоизированного селектора с использованием createSelector
export const selectDestroyedTanksInfo = createSelector(
  [selectDestroyedTanks],
  (destroyedTanksInfo: ITanksState) => destroyedTanksInfo
)

export default destroyedTanksSlice.reducer
